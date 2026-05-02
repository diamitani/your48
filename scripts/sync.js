#!/usr/bin/env node
/**
 * Your48 Daily Sync Script
 * 
 * Pulls fresh data from ward sources and updates the site.
 * Run manually: node scripts/sync.js
 * Run via cron: 0 7 * * * cd /path/to/Your48 && node scripts/sync.js
 * Run via GitHub Actions: see .github/workflows/daily-sync.yml
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', 'data', 'sync_log.json');
const EVENTS_FILE = path.join(__dirname, '..', 'events.js');

// Utility: fetch URL content
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Your48-Sync/1.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Source 1: Check 48th Ward website for updates
async function check48thWard() {
  try {
    const html = await fetchUrl('https://the48thward.org');
    const updates = [];
    
    // Look for event-like patterns in the page
    const eventMatches = html.match(/<h[23][^>]*>([^<]*(?:meeting|town hall|event|deadline|hearing)[^<]*)<\/h[23]>/gi) || [];
    eventMatches.forEach(m => {
      const title = m.replace(/<[^>]+>/g, '').trim();
      if (title.length > 5 && title.length < 200) {
        updates.push({ source: '48thward.org', type: 'event_mention', title });
      }
    });
    
    console.log(`✓ 48thward.org — found ${updates.length} mentions`);
    return updates;
  } catch (e) {
    console.log(`✗ 48thward.org — ${e.message}`);
    return [];
  }
}

// Source 2: Check Chicago.gov ward page
async function checkChicagoGov() {
  try {
    const html = await fetchUrl('https://www.chicago.gov/city/en/about/wards/48.html');
    console.log(`✓ chicago.gov/ward48 — page fetched (${html.length} bytes)`);
    return [{ source: 'chicago.gov', type: 'page_check', status: 'ok', size: html.length }];
  } catch (e) {
    console.log(`✗ chicago.gov — ${e.message}`);
    return [];
  }
}

// Source 3: Chicago City Council calendar (legislative.cityofchicago.org)
async function checkCouncilCalendar() {
  try {
    const html = await fetchUrl('https://www.chicago.gov/city/en/about/council.html');
    console.log(`✓ City Council page — fetched`);
    return [{ source: 'council', type: 'page_check', status: 'ok' }];
  } catch (e) {
    console.log(`✗ Council calendar — ${e.message}`);
    return [];
  }
}

// Source 4: Cook County elections for deadlines
async function checkElections() {
  try {
    const html = await fetchUrl('https://www.chicagoelections.com');
    const deadlines = [];
    
    // Look for date patterns near "deadline" or "registration"
    const matches = html.match(/(?:deadline|registration|early voting)[^.]{0,200}/gi) || [];
    matches.forEach(m => {
      deadlines.push({ source: 'chicagoelections.com', type: 'deadline_mention', text: m.trim().substring(0, 150) });
    });
    
    console.log(`✓ chicagoelections.com — found ${deadlines.length} deadline mentions`);
    return deadlines;
  } catch (e) {
    console.log(`✗ chicagoelections.com — ${e.message}`);
    return [];
  }
}

// Auto-generate recurring events for next 3 months
function generateRecurring() {
  const today = new Date();
  const events = [];
  
  // City Council: 2nd & 4th Wednesday
  for (let m = 0; m < 3; m++) {
    const month = new Date(today.getFullYear(), today.getMonth() + m, 1);
    let wedCount = 0;
    for (let d = 1; d <= 31; d++) {
      const date = new Date(month.getFullYear(), month.getMonth(), d);
      if (date.getMonth() !== month.getMonth()) break;
      if (date.getDay() === 3) { // Wednesday
        wedCount++;
        if (wedCount === 2 || wedCount === 4) {
          if (date >= today) {
            events.push({
              title: 'City Council Meeting',
              date: date.toISOString().split('T')[0],
              recur: '2nd & 4th Wed monthly',
              cat: 'government',
              desc: 'Full Chicago City Council session at City Hall',
              link: 'https://www.chicago.gov/city/en/about/council.html'
            });
          }
        }
      }
    }
  }
  
  // Beat meetings: 3rd Thursday
  for (let m = 0; m < 3; m++) {
    const month = new Date(today.getFullYear(), today.getMonth() + m, 1);
    let thuCount = 0;
    for (let d = 1; d <= 31; d++) {
      const date = new Date(month.getFullYear(), month.getMonth(), d);
      if (date.getMonth() !== month.getMonth()) break;
      if (date.getDay() === 4) { // Thursday
        thuCount++;
        if (thuCount === 3 && date >= today) {
          events.push({
            title: '20th District Beat Meeting',
            date: date.toISOString().split('T')[0],
            recur: 'Monthly',
            cat: 'safety',
            desc: 'Police-community beat meeting for the 48th Ward area',
            link: 'https://www.chicago.gov/city/en/depts/cpd.html'
          });
        }
      }
    }
  }
  
  // Weekly newsletter (Mondays)
  for (let d = 0; d < 14; d++) {
    const date = new Date(today.getTime() + d * 86400000);
    if (date.getDay() === 1) { // Monday
      events.push({
        title: '48th Ward Newsletter',
        date: date.toISOString().split('T')[0],
        recur: 'Weekly (Monday)',
        cat: 'ward',
        desc: 'Weekly email newsletter from the ward office',
        link: 'https://mailchi.mp/the48thward/newsletter-signup'
      });
    }
  }
  
  return events;
}

// Main sync function
async function sync() {
  console.log('═══════════════════════════════════════');
  console.log('  Your48 Daily Sync');
  console.log(`  ${new Date().toLocaleString()}`);
  console.log('═══════════════════════════════════════\n');

  // Run all checks
  const results = await Promise.all([
    check48thWard(),
    checkChicagoGov(),
    checkCouncilCalendar(),
    checkElections(),
  ]);
  
  const allFindings = results.flat();
  
  // Generate recurring events
  const recurring = generateRecurring();
  console.log(`\n✓ Generated ${recurring.length} recurring events for next 3 months`);

  // Read existing events file to preserve manually-added events
  let existingEvents = [];
  try {
    const content = fs.readFileSync(EVENTS_FILE, 'utf8');
    // Extract the array from the JS file
    const match = content.match(/const EVENTS = (\[[\s\S]*?\]);/);
    if (match) {
      existingEvents = eval(match[1]);
    }
  } catch (e) {
    console.log('No existing events file found, creating fresh');
  }

  // Merge: keep manual events (non-recurring), add fresh recurring
  const manualEvents = existingEvents.filter(e => !e.recur);
  const mergedEvents = [...manualEvents, ...recurring];
  
  // Deduplicate by title+date
  const seen = new Set();
  const uniqueEvents = mergedEvents.filter(e => {
    const key = e.title + e.date;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Write updated events file
  const eventsJs = `const EVENTS = ${JSON.stringify(uniqueEvents, null, 2)};\n\n// Sort by date\nEVENTS.sort((a,b) => new Date(a.date) - new Date(b.date));\n`;
  fs.writeFileSync(EVENTS_FILE, eventsJs);
  console.log(`\n✓ Wrote ${uniqueEvents.length} events to events.js`);

  // Write sync log
  const log = {
    lastSync: new Date().toISOString(),
    findings: allFindings.length,
    eventsGenerated: recurring.length,
    totalEvents: uniqueEvents.length,
    sources: {
      '48thward.org': results[0].length,
      'chicago.gov': results[1].length,
      'council': results[2].length,
      'elections': results[3].length,
    },
    details: allFindings.slice(0, 20), // Keep last 20 findings
  };
  
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
  console.log(`✓ Sync log written to data/sync_log.json`);

  console.log('\n═══════════════════════════════════════');
  console.log(`  ✅ Sync complete — ${uniqueEvents.length} events`);
  console.log('═══════════════════════════════════════\n');
  
  return log;
}

sync().catch(console.error);

// AI Chat Agent powered by DeepSeek
const CHAT_CONFIG = {
  apiUrl: 'https://api.deepseek.com/chat/completions',
  apiKey: 'sk-a5b7d0dc13754585b28d6704b65afae0',
  model: 'deepseek-chat',
  systemPrompt: `You are the Your48 Ward Assistant — a helpful, friendly AI for residents of Chicago's 48th Ward (Edgewater, Uptown, Andersonville). You help neighbors find information about:

- Ward office contacts: Alderwoman Leni Manaa-Hoppenworth, Chief of Staff Nicole Granacki (773-352-1554), Angel Rubi Navarijo (Dir. Neighborhood Services, 773-352-1553), Agnes Chan (Dir. Planning), Audrey Champelli (Comms), Conor Hart (Volunteers). Office: 1129 W Bryn Mawr Ave, 773-784-5277, info@the48thward.org
- City services: 311 for non-emergency, potholes, graffiti, streetlights, garbage. Police 20th District: 312-742-8714.
- Programs: Newsies (flyer volunteers), Digital Newsies (social media), Participatory Budgeting, Town Halls (twice yearly), Beat Meetings, Newsletter signup at mailchi.mp/the48thward/newsletter-signup
- Facebook groups: Edgewater Neighbors, Edgewater Neighborhood News, Uptown Community Connections, Andersonville Neighborhood News & Discourse
- Community resources: Edgewater Library (6000 N Broadway), Berger Park (6205 N Sheridan), Swedish American Museum, Loyola University, Hopleaf Bar
- Elected officials: Mayor Brandon Johnson, Sen. Durbin, Sen. Duckworth, Rep. Mike Quigley (IL-5), Gov. Pritzker
- Voter registration: chicagoelections.com, Cook County Board of Elections 312-603-0906

Keep answers concise, warm, and neighborly. Use the brand voice: editorial, not patriotic. If unsure, direct people to call 773-784-5277 or email info@the48thward.org.`
};

function initChat() {
  const chatHTML = `
  <div id="chatWidget" class="chat-widget">
    <button id="chatToggle" class="chat-toggle" onclick="toggleChat()" aria-label="Open ward assistant">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
      <span class="chat-badge">Ask</span>
    </button>
    <div id="chatPanel" class="chat-panel">
      <div class="chat-header">
        <div class="chat-header-left">
          <div class="chat-avatar">48</div>
          <div><div class="chat-header-title">Ward Assistant</div><div class="chat-header-sub">Ask about the 48th Ward</div></div>
        </div>
        <button onclick="toggleChat()" class="chat-close">✕</button>
      </div>
      <div id="chatMessages" class="chat-messages">
        <div class="chat-msg bot"><div class="chat-bubble">Hey neighbor! 👋 I'm the Your48 assistant. Ask me about ward services, contacts, events, or anything about Edgewater, Uptown, and Andersonville.</div></div>
      </div>
      <div class="chat-input-row">
        <input type="text" id="chatInput" placeholder="Ask about your ward…" onkeydown="if(event.key==='Enter')sendChat()">
        <button onclick="sendChat()" class="chat-send">→</button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', chatHTML);
}

function toggleChat() {
  const panel = document.getElementById('chatPanel');
  const toggle = document.getElementById('chatToggle');
  panel.classList.toggle('open');
  toggle.classList.toggle('hidden');
}

async function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  const messages = document.getElementById('chatMessages');
  messages.innerHTML += `<div class="chat-msg user"><div class="chat-bubble">${escapeHtml(msg)}</div></div>`;
  messages.innerHTML += `<div class="chat-msg bot" id="typing"><div class="chat-bubble typing-dots"><span></span><span></span><span></span></div></div>`;
  messages.scrollTop = messages.scrollHeight;

  try {
    const history = [{role:'system',content:CHAT_CONFIG.systemPrompt},{role:'user',content:msg}];
    const res = await fetch(CHAT_CONFIG.apiUrl, {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${CHAT_CONFIG.apiKey}`},
      body:JSON.stringify({model:CHAT_CONFIG.model,messages:history,max_tokens:500,temperature:0.7})
    });
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "I'm having trouble right now. Please call the ward office at 773-784-5277.";
    document.getElementById('typing')?.remove();
    messages.innerHTML += `<div class="chat-msg bot"><div class="chat-bubble">${escapeHtml(reply)}</div></div>`;
  } catch(e) {
    document.getElementById('typing')?.remove();
    messages.innerHTML += `<div class="chat-msg bot"><div class="chat-bubble">Sorry, I couldn't connect. Try calling 773-784-5277 or email info@the48thward.org.</div></div>`;
  }
  messages.scrollTop = messages.scrollHeight;
}

function escapeHtml(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');}

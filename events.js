const EVENTS = [
  {
    "title": "Vehicle Sticker Renewal",
    "date": "2026-07-01",
    "cat": "deadline",
    "desc": "City vehicle sticker must be renewed by July 1. Purchase at chicityclerk.com.",
    "link": "https://www.chicityclerk.com"
  },
  {
    "title": "Property Tax Bill — 1st Installment",
    "date": "2026-03-01",
    "cat": "deadline",
    "desc": "Cook County 1st installment property tax due",
    "link": "https://www.cookcountytreasurer.com"
  },
  {
    "title": "Property Tax Bill — 2nd Installment",
    "date": "2026-08-01",
    "cat": "deadline",
    "desc": "Cook County 2nd installment property tax due",
    "link": "https://www.cookcountytreasurer.com"
  },
  {
    "title": "CPS School Enrollment Opens",
    "date": "2026-03-01",
    "cat": "deadline",
    "desc": "GoCPS application opens for K-12 school selection",
    "link": "https://www.cps.edu/gocps/"
  },
  {
    "title": "Senior Freeze Exemption",
    "date": "2026-03-01",
    "cat": "deadline",
    "desc": "Apply for senior property tax freeze via Cook County Assessor",
    "link": "https://www.cookcountyassessor.com"
  },
  {
    "title": "Participatory Budgeting Vote",
    "date": "2026-06-01",
    "cat": "ward",
    "desc": "Vote on ward infrastructure projects — details TBA",
    "link": "https://the48thward.org"
  },
  {
    "title": "Shred & Electronics Recycling",
    "date": "2026-06-07",
    "cat": "ward",
    "desc": "Free document shredding and e-waste recycling at 5853 N Broadway",
    "link": "https://the48thward.org"
  },
  {
    "title": "Chicago Farmers Markets Open",
    "date": "2026-05-17",
    "cat": "community",
    "desc": "Seasonal farmers markets across the city — check locations",
    "link": "https://www.chicago.gov/city/en/depts/dca/supp_info/chicago_702702702702702702702s_702702702702702markets.html"
  },
  {
    "title": "Beach Season Opens",
    "date": "2026-05-23",
    "cat": "community",
    "desc": "Chicago beaches open Memorial Day weekend including Edgewater Beach",
    "link": "https://www.chicagoparkdistrict.com"
  },
  {
    "title": "Street Sweeping Season",
    "date": "2026-04-01",
    "end": "2026-11-30",
    "cat": "city",
    "desc": "Street sweeping runs April–November. Check posted signs for your block schedule.",
    "link": "https://www.chicago.gov/city/en/depts/streets.html"
  },
  {
    "title": "Edgewater Arts Festival",
    "date": "2026-06-15",
    "cat": "community",
    "desc": "Annual neighborhood arts festival on the lakefront",
    "link": "https://the48thward.org"
  },
  {
    "title": "Voter Registration Deadline — General",
    "date": "2026-10-06",
    "cat": "deadline",
    "desc": "Last day to register online for November general election",
    "link": "https://www.chicagoelections.com"
  },
  {
    "title": "General Election",
    "date": "2026-11-03",
    "cat": "government",
    "desc": "Federal midterm election — U.S. House, IL Governor, state races",
    "link": "https://www.chicagoelections.com"
  },
  {
    "title": "Early Voting Begins",
    "date": "2026-10-19",
    "cat": "government",
    "desc": "Early voting at designated sites across Chicago",
    "link": "https://www.chicagoelections.com"
  },
  {
    "title": "City Council Meeting",
    "date": "2026-05-13",
    "recur": "2nd & 4th Wed monthly",
    "cat": "government",
    "desc": "Full Chicago City Council session at City Hall",
    "link": "https://www.chicago.gov/city/en/about/council.html"
  },
  {
    "title": "City Council Meeting",
    "date": "2026-05-27",
    "recur": "2nd & 4th Wed monthly",
    "cat": "government",
    "desc": "Full Chicago City Council session at City Hall",
    "link": "https://www.chicago.gov/city/en/about/council.html"
  },
  {
    "title": "City Council Meeting",
    "date": "2026-06-10",
    "recur": "2nd & 4th Wed monthly",
    "cat": "government",
    "desc": "Full Chicago City Council session at City Hall",
    "link": "https://www.chicago.gov/city/en/about/council.html"
  },
  {
    "title": "City Council Meeting",
    "date": "2026-06-24",
    "recur": "2nd & 4th Wed monthly",
    "cat": "government",
    "desc": "Full Chicago City Council session at City Hall",
    "link": "https://www.chicago.gov/city/en/about/council.html"
  },
  {
    "title": "City Council Meeting",
    "date": "2026-07-08",
    "recur": "2nd & 4th Wed monthly",
    "cat": "government",
    "desc": "Full Chicago City Council session at City Hall",
    "link": "https://www.chicago.gov/city/en/about/council.html"
  },
  {
    "title": "City Council Meeting",
    "date": "2026-07-22",
    "recur": "2nd & 4th Wed monthly",
    "cat": "government",
    "desc": "Full Chicago City Council session at City Hall",
    "link": "https://www.chicago.gov/city/en/about/council.html"
  },
  {
    "title": "20th District Beat Meeting",
    "date": "2026-05-21",
    "recur": "Monthly",
    "cat": "safety",
    "desc": "Police-community beat meeting for the 48th Ward area",
    "link": "https://www.chicago.gov/city/en/depts/cpd.html"
  },
  {
    "title": "20th District Beat Meeting",
    "date": "2026-06-18",
    "recur": "Monthly",
    "cat": "safety",
    "desc": "Police-community beat meeting for the 48th Ward area",
    "link": "https://www.chicago.gov/city/en/depts/cpd.html"
  },
  {
    "title": "20th District Beat Meeting",
    "date": "2026-07-16",
    "recur": "Monthly",
    "cat": "safety",
    "desc": "Police-community beat meeting for the 48th Ward area",
    "link": "https://www.chicago.gov/city/en/depts/cpd.html"
  },
  {
    "title": "48th Ward Newsletter",
    "date": "2026-05-04",
    "recur": "Weekly (Monday)",
    "cat": "ward",
    "desc": "Weekly email newsletter from the ward office",
    "link": "https://mailchi.mp/the48thward/newsletter-signup"
  },
  {
    "title": "48th Ward Newsletter",
    "date": "2026-05-11",
    "recur": "Weekly (Monday)",
    "cat": "ward",
    "desc": "Weekly email newsletter from the ward office",
    "link": "https://mailchi.mp/the48thward/newsletter-signup"
  }
];

// Sort by date
EVENTS.sort((a,b) => new Date(a.date) - new Date(b.date));

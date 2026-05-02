// Shared navigation and footer for all pages
function renderNav(active){
  const links=[
    {href:'index.html',label:'Home'},
    {href:'directory.html',label:'Directory'},
    {href:'services.html',label:'Services'},
    {href:'community.html',label:'Community'},
  ];
  return `<div class="topbar"><div class="container">
    <a href="index.html" class="wordmark"><span class="pre">your</span><span class="num">48<span class="dot">.</span></span></a>
    <nav>${links.map(l=>`<a href="${l.href}"${l.href===active?' class="active-link"':''}>${l.label}</a>`).join('')}
    <a href="https://mailchi.mp/the48thward/newsletter-signup" class="cta" target="_blank" rel="noopener">Newsletter ✉</a></nav>
  </div></div>`;
}
function renderFooter(){
  return `<footer><div class="container">
    <div class="footer-grid">
      <div><a href="index.html" class="wordmark" style="margin-bottom:16px;display:inline-flex"><span class="pre" style="color:var(--lake-soft)">your</span><span class="num" style="color:var(--foam)">48<span class="dot" style="color:var(--maple)">.</span></span></a>
      <p class="footer-desc">A civic home for Edgewater, Uptown, and Andersonville — built so neighbors find each other, find their alderman, and find what's happening on their block.</p></div>
      <div><h4>Ward <em>Office</em></h4><ul>
        <li><a href="tel:7737845277">773-784-5277</a></li>
        <li><a href="mailto:info@the48thward.org">info@the48thward.org</a></li>
        <li><a href="https://the48thward.org" target="_blank">the48thward.org</a></li>
        <li><a href="https://mailchi.mp/the48thward/newsletter-signup" target="_blank">Newsletter Signup</a></li>
      </ul></div>
      <div><h4>Quick <em>Links</em></h4><ul>
        <li><a href="directory.html">Ward Directory</a></li>
        <li><a href="services.html">City Services</a></li>
        <li><a href="community.html">Community</a></li>
        <li><a href="https://www.chicagoelections.com" target="_blank">Voter Registration</a></li>
      </ul></div>
      <div><h4><em>Connect</em></h4><ul>
        <li><a href="https://www.facebook.com/the48thward/" target="_blank">Facebook</a></li>
        <li><a href="https://www.instagram.com/the48thward/" target="_blank">Instagram</a></li>
        <li><a href="https://www.facebook.com/share/g/18AJvP8RQa/" target="_blank">Edgewater FB Group</a></li>
        <li><a href="https://www.facebook.com/share/g/1Byp7Lo8nb/" target="_blank">Uptown FB Group</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom"><div>Platform v1.0 · Spring 2026</div><div>A project of <a href="#">Patrick Diamitani · Polsia</a></div></div>
  </div></footer>`;
}
function initPage(active){
  document.getElementById('nav-slot').innerHTML=renderNav(active);
  document.getElementById('footer-slot').innerHTML=renderFooter();
  initChat();
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.15});
revealEls.forEach(el => io.observe(el));

// Skill bars animate when scrolled into view
const skillTrack = document.querySelector('.skills-list');
const skillIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      document.querySelectorAll('.skill-fill').forEach((fill, i) => {
        fill.style.transitionDelay = (i * 90) + 'ms';
        fill.style.width = fill.dataset.pct + '%';
      });
      skillIO.disconnect();
    }
  });
}, {threshold:0.3});
if(skillTrack) skillIO.observe(skillTrack);

// Project filter tabs
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.proj-card');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-pressed', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-pressed', 'true');
    const filter = tab.dataset.filter;
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hide', !match);
    });
  });
});

// Contact form
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if(!name || !email || !message){
    formMsg.textContent = 'Please fill in every field before sending.';
    formMsg.style.color = 'var(--coral)';
    formMsg.classList.add('show');
    return;
  }
  formMsg.textContent = 'Message received — thanks, Reonaldo will reply soon.';
  formMsg.style.color = 'var(--sage)';
  formMsg.classList.add('show');
  form.reset();
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navlinks = document.getElementById('navlinks');
function setMenu(open){
  navlinks.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? 'CLOSE' : 'MENU';
}
menuBtn.addEventListener('click', () => setMenu(!navlinks.classList.contains('open')));
navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if(e.key === 'Escape') setMenu(false); });

// Highlight the nav link of the section currently in view
const navAnchors = document.querySelectorAll('.navlinks a');
const sectionIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, {rootMargin:'-40% 0px -55% 0px'});
document.querySelectorAll('main section[id]').forEach(sec => sectionIO.observe(sec));

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
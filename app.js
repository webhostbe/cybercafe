
  // Mobile menu
  const burger = document.getElementById('burgerBtn');
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const menuClose = document.getElementById('menuClose');
  function openMenu(){ menu.classList.add('open'); overlay.classList.add('show'); }
  function closeMenu(){ menu.classList.remove('open'); overlay.classList.remove('show'); }
  burger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Back to top button
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 500);
  });
  backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Scroll reveal for service & why cards
  const revealEls = document.querySelectorAll('.svc-card, .why-card');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.15});
  revealEls.forEach(el => io.observe(el));

  // Animated stat counters
  const stats = document.querySelectorAll('.stat strong');
  let statsAnimated = false;
  function animateStats(){
    if(statsAnimated) return;
    statsAnimated = true;
    stats.forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.max(1, Math.round(target / 40));
      const tick = () => {
        current += step;
        if(current >= target){ el.textContent = target + suffix; return; }
        el.textContent = current + suffix;
        requestAnimationFrame(tick);
      };
      tick();
    });
  }
  const statsSection = document.querySelector('.why-stats');
  if(statsSection){
    const statsIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if(entry.isIntersecting) animateStats(); });
    }, {threshold: 0.3});
    statsIO.observe(statsSection);
  }

  // Contact form (no backend — confirms locally)
  const form = document.getElementById('reqForm');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const service = document.getElementById('service').value;
    formMsg.style.display = 'block';
    formMsg.textContent = `Thanks, ${name}. Your request for "${service}" has been noted — please visit the centre or await our email confirmation.`;
    form.reset();
  });

  // Nav email toggle
  const navEmailBtn = document.getElementById('navEmailBtn');
  if(navEmailBtn){
    navEmailBtn.addEventListener('click', function(){
      const isOpen = this.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      this.setAttribute('title', isOpen ? 'Click to hide email address' : 'Click to show email address');
    });
  }

  // Book Slot button action
  const bookSlotBtns = document.querySelectorAll('.btn-book-slot');
  const serviceSelect = document.getElementById('service');
  const contactSection = document.getElementById('contact');
  const nameInput = document.getElementById('name');

  bookSlotBtns.forEach(btn => {
    btn.addEventListener('click', function(){
      const targetService = this.getAttribute('data-service');
      if(serviceSelect && targetService){
        for(let i = 0; i < serviceSelect.options.length; i++){
          const opt = serviceSelect.options[i];
          if(opt.text.toLowerCase().includes(targetService.toLowerCase()) || targetService.toLowerCase().includes(opt.text.toLowerCase())){
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
      if(contactSection){
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      if(nameInput){
        setTimeout(() => nameInput.focus(), 600);
      }
    });
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

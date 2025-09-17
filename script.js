// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if(href.length > 1){
      e.preventDefault();
      document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
      const navList = document.getElementById('navList');
      navList.classList.remove('show');
    }
  });
});

// Toggle menu mobile
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navList').classList.toggle('show');
});

// Preenche ano do rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Animação de barras de skill ao entrar na tela
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.querySelectorAll('.skill').forEach(skill => {
        const pct = skill.dataset.skill;
        const fill = skill.querySelector('.fill');
        fill.style.transition = 'width 1.2s cubic-bezier(.2,.8,.2,1)';
        fill.style.width = pct + '%';
      });

      entry.target.querySelectorAll('.circle').forEach(circle => {
        const pct = circle.dataset.skill;
        const progress = circle.querySelector('.progress');
        const dash = (pct / 100) * 100;
        progress.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)';
        progress.style.strokeDashoffset = 100 - dash;
      });

      observer.unobserve(entry.target);
    }
  });
}, {threshold: .3});

observer.observe(document.getElementById('skills'));

// Filtro de projetos
const filterButtons = document.querySelectorAll('.btn--chip');
const galleryItems = document.querySelectorAll('.gallery__item');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const type = btn.dataset.filter;
    galleryItems.forEach(item => {
      item.style.display = (type === 'all' || item.dataset.type === type) ? 'block' : 'none';
    });
  });
});

// Personaliza mensagem do WhatsApp com a origem da página
(function(){
  const number = '55SEUNUMERO'; // <-- substitua aqui pelo seu número com DDD
  const msg = encodeURIComponent('Oi Sabrina, vim do seu portfólio e gostaria de falar sobre um projeto.');
  const url = `https://wa.me/${number}?text=${msg}`;

  const waA = document.getElementById('waLink');
  const waB = document.getElementById('waButton');
  if (waA) waA.href = url;
  if (waB) waB.href = url;
})();

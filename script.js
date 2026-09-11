// Navegação suave para links de âncora
document.querySelectorAll('a[href^="#"], .btn[data-scroll]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href')?.startsWith('#')
      ? link.getAttribute('href')
      : link.dataset.scroll;

    if (!targetId || !targetId.startsWith('#')) return;

    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });

  navList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navList.classList.remove('open');
    });
  });
}

// Filtro do portfólio
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#portfolio-grid .project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach(card => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;
      card.style.display = show ? 'block' : 'none';
      card.style.opacity = show ? '1' : '0';
    });
  });
});

// Animação das skills ao entrar na tela
const skillFills = document.querySelectorAll('.skill-fill');
if ('IntersectionObserver' in window && skillFills.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const value = bar.dataset.skill;
        bar.style.width = value + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  skillFills.forEach(bar => observer.observe(bar));
} else {
  // fallback: preenche direto
  skillFills.forEach(bar => {
    const value = bar.dataset.skill;
    bar.style.width = value + '%';
  });
}

// Ano automático no rodapé
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

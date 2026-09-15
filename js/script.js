/**
 * CTI DOS ÓCULOS - Interatividade e Boas Práticas Web
 * Menu expansível limpo, rolagem suave, navegação ativa e acessibilidade
 */

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const menuDropdown = document.getElementById('menuDropdown');
  const navLinks = document.querySelectorAll('.nav-link, .menu-cta-btn');

  /* ------------------------------------------------------------------ */
  /* MENU HAMBÚRGUER (DROPDOWN LIMPO E SEM OFUSCAMENTO)                 */
  /* ------------------------------------------------------------------ */
  if (menuToggle && menuDropdown) {

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menuDropdown.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
      if (menuDropdown.classList.contains('is-open')) {
        if (!menuDropdown.contains(e.target) && !menuToggle.contains(e.target)) {
          closeMenu();
        }
      }
    });

    // Fechar ao pressionar a tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuDropdown.classList.contains('is-open')) {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Fechar ao clicar em qualquer item do menu
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
  }

  function openMenu() {
    menuToggle.classList.add('is-active');
    menuDropdown.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menuToggle.classList.remove('is-active');
    menuDropdown.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  /* ------------------------------------------------------------------ */
  /* ACTIVE LINK HIGHLIGHT (Scroll e IntersectionObserver)             */
  /* ------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const menuNavLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    // Se estiver no topo da página, força "Início" como ativo
    if (window.scrollY < 120) {
      menuNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#inicio');
      });
      return;
    }

    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      menuNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
      });
    }
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
});

/**
 * CTI DOS ÓCULOS - Interatividade e Boas Práticas Web
 * Menu expansível, rolagem suave, navegação ativa e acessibilidade
 */

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const menuDropdown = document.getElementById('menuDropdown');
  const navLinks = document.querySelectorAll('.nav-link, .menu-cta-btn');

  // Toggle do Menu Hambúrguer
  if (menuToggle && menuDropdown) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menuDropdown.classList.contains('is-open');
      
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
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

  // Active Link Highlight com IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const menuNavLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          menuNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));
  }
});

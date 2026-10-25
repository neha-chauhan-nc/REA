/**
 * Netflix Homepage Clone Interactive Script
 * Reconstructed based on REA Evidence and DOM structure
 */

document.addEventListener('DOMContentLoaded', () => {
  initFAQAccordion();
  initTrendingCarousel();
  initMovieModal();
  initLanguageSync();
});

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function initFAQAccordion() {
  const faqButtons = document.querySelectorAll('.faq-question-btn');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const answerId = button.getAttribute('aria-controls');
      const answerElement = document.getElementById(answerId);

      // Close all other open items (standard Netflix accordion behavior)
      faqButtons.forEach(otherBtn => {
        if (otherBtn !== button) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherAnsId = otherBtn.getAttribute('aria-controls');
          const otherAns = document.getElementById(otherAnsId);
          if (otherAns) {
            otherAns.hidden = true;
          }
        }
      });

      // Toggle current item
      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        if (answerElement) answerElement.hidden = true;
      } else {
        button.setAttribute('aria-expanded', 'true');
        if (answerElement) answerElement.hidden = false;
      }
    });
  });
}

/* ==========================================================================
   TRENDING CAROUSEL
   ========================================================================== */
function initTrendingCarousel() {
  const track = document.getElementById('trendingTrack');
  const wrapper = document.querySelector('.trending-carousel-wrapper');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (!track || !wrapper || !prevBtn || !nextBtn) return;

  const scrollDistance = 500;

  prevBtn.addEventListener('click', () => {
    wrapper.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    wrapper.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  });

  // Update button enabled/disabled states based on scroll position
  const updateButtons = () => {
    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth - 5;
    prevBtn.disabled = wrapper.scrollLeft <= 5;
    nextBtn.disabled = wrapper.scrollLeft >= maxScroll;
  };

  wrapper.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons, { passive: true });
  updateButtons();
}

/* ==========================================================================
   MOVIE CARD MODAL
   ========================================================================== */
function initMovieModal() {
  const modal = document.getElementById('movieModal');
  const closeBtn = document.getElementById('modalClose');
  const titleEl = document.getElementById('modalTitle');
  const genreEl = document.getElementById('modalGenre');
  const descEl = document.getElementById('modalDesc');
  const bannerEl = document.getElementById('modalBanner');

  if (!modal || !closeBtn) return;

  const cards = document.querySelectorAll('.ranked-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const genre = card.getAttribute('data-genre');
      const desc = card.getAttribute('data-desc');
      const index = card.getAttribute('data-index');

      titleEl.textContent = title;
      genreEl.textContent = genre;
      descEl.textContent = desc;
      bannerEl.style.backgroundImage = `url('images/poster_${index}.svg')`;

      modal.removeAttribute('hidden');
      modal.setAttribute('aria-hidden', 'false');
      closeBtn.focus();
    });
  });

  const closeModal = () => {
    modal.setAttribute('hidden', '');
    modal.setAttribute('aria-hidden', 'true');
  };

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   FORM HANDLING & VALIDATION
   ========================================================================== */
function handleEmailSubmit(form) {
  const inputWrap = form.querySelector('.floating-input-wrap');
  const input = form.querySelector('.floating-input');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!input.value || !emailRegex.test(input.value)) {
    inputWrap.classList.add('has-error');
    input.focus();
  } else {
    inputWrap.classList.remove('has-error');
    alert(`Thank you! Ready to start membership demo for: ${input.value}`);
  }
}

/* Real-time clear error on typing */
document.querySelectorAll('.floating-input').forEach(input => {
  input.addEventListener('input', () => {
    const wrap = input.closest('.floating-input-wrap');
    if (wrap && wrap.classList.contains('has-error')) {
      wrap.classList.remove('has-error');
    }
  });
});

/* ==========================================================================
   LANGUAGE SELECTOR SYNC
   ========================================================================== */
function initLanguageSync() {
  const headerLang = document.getElementById('headerLanguage');
  const footerLang = document.getElementById('footerLanguage');

  if (!headerLang || !footerLang) return;

  headerLang.addEventListener('change', (e) => {
    footerLang.value = e.target.value;
  });

  footerLang.addEventListener('change', (e) => {
    headerLang.value = e.target.value;
  });
}


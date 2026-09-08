/**
 * SARIDIS SHK – APPLICATION ARCHITECTURE (V5.0 Bespoke Craft Edition)
 * Lenis Smooth Scroll • Vorher/Nachher Engine • Quick-Configurator • Consent & Modals
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. LENIS SMOOTH SCROLL INITIALIZATION ─────────────────
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: false, // Wichtig: Natives Touch-Scrollen auf Smartphones
      autoResize: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sanftes Scrollen für alle internen Anker-Links (#...)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#' && !targetId.includes('Modal') && targetId !== '#impressum' && targetId !== '#datenschutz') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -75, duration: 0.9 });
            // Mobile Nav schließen, falls geöffnet
            closeMobileNav();
          }
        }
      });
    });
  }

  // ── 2. MOBILE NAVIGATION TOGGLE ───────────────────────────
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');

  function toggleMobileNav() {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  function openMobileNav() {
    mobileDrawer.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeMobileNav() {
    mobileDrawer.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
  }

  mobileToggle?.addEventListener('click', toggleMobileNav);

  // Klick auf mobile Links schließt das Menü
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // ── 3. SIGNATURE FEATURE: VORHER/NACHHER SPLIT-SLIDER ──────
  const stage = document.getElementById('comparisonStage');
  const handle = document.getElementById('sliderHandle');
  const beforeClip = document.getElementById('beforeClip');
  let isDragging = false;

  function updateSliderPosition(clientX) {
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    let x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;

    // Begrenzung zwischen 5% und 95%
    if (percentage < 3) percentage = 3;
    if (percentage > 97) percentage = 97;

    stage.style.setProperty('--split', `${percentage}%`);
    handle.setAttribute('aria-valuenow', Math.round(percentage));
  }

  if (stage && handle) {
    // Maus-Events
    stage.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch-Events für Smartphones & Tablets
    stage.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches && e.touches[0]) {
        updateSliderPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        updateSliderPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Tastatur-Steuerung auf dem Slider-Handle
    handle.addEventListener('keydown', (e) => {
      let currentVal = parseFloat(handle.getAttribute('aria-valuenow')) || 50;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        currentVal = Math.max(5, currentVal - 5);
        stage.style.setProperty('--split', `${currentVal}%`);
        handle.setAttribute('aria-valuenow', currentVal);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        currentVal = Math.min(95, currentVal + 5);
        stage.style.setProperty('--split', `${currentVal}%`);
        handle.setAttribute('aria-valuenow', currentVal);
      }
    });
  }

  // Hotspot Pins Interaktivität (Klick auf mobile Geräte)
  document.querySelectorAll('.hotspot-pin').forEach(pin => {
    const btn = pin.querySelector('.pin-trigger');
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = pin.classList.contains('active');
      document.querySelectorAll('.hotspot-pin').forEach(p => p.classList.remove('active'));
      if (!isActive) {
        pin.classList.add('active');
      }
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.hotspot-pin').forEach(p => p.classList.remove('active'));
  });

  // ── 4. QUICK-CONFIGURATOR LOGIK (Rechner & WhatsApp) ───────
  const roomSelect = document.getElementById('roomSizeSelect');
  const scopeSelect = document.getElementById('renovationTypeSelect');
  const timeSelect = document.getElementById('timeSlotSelect');
  const calcDuration = document.getElementById('calcDuration');
  const calcBudget = document.getElementById('calcBudget');
  const btnWhatsApp = document.getElementById('btnConfigWhatsApp');
  const btnTransfer = document.getElementById('btnConfigTransfer');

  // Matrix für realistische Richtwert-Kalkulation
  const budgetMatrix = {
    small: {
      partial: { duration: '5 – 7 Werktage', budget: '6.500 € – 9.800 €' },
      complete: { duration: '8 – 10 Werktage', budget: '11.500 € – 16.500 €' },
      luxury: { duration: '10 – 14 Werktage', budget: '16.500 € – 23.000 €' }
    },
    medium: {
      partial: { duration: '7 – 9 Werktage', budget: '8.900 € – 13.500 €' },
      complete: { duration: '9 – 12 Werktage', budget: '14.500 € – 24.000 €' },
      luxury: { duration: '12 – 16 Werktage', budget: '24.000 € – 36.000 €' }
    },
    large: {
      partial: { duration: '9 – 12 Werktage', budget: '12.000 € – 17.500 €' },
      complete: { duration: '13 – 18 Werktage', budget: '23.500 € – 38.000 €' },
      luxury: { duration: '16 – 22 Werktage', budget: '38.000 € – 55.000 €' }
    }
  };

  function updateConfigurator() {
    const room = roomSelect?.value || 'medium';
    const scope = scopeSelect?.value || 'complete';
    const time = timeSelect?.value || 'evening';

    const data = budgetMatrix[room]?.[scope] || budgetMatrix.medium.complete;

    if (calcDuration) calcDuration.textContent = data.duration;
    if (calcBudget) calcBudget.textContent = data.budget;

    // Text für WhatsApp zusammenstellen
    const roomText = roomSelect?.options[roomSelect.selectedIndex]?.text || 'Standard-Familienbad';
    const scopeText = scopeSelect?.options[scopeSelect.selectedIndex]?.text || 'Komplettsanierung';
    const timeText = timeSelect?.options[timeSelect.selectedIndex]?.text || 'Feierabend (17-20 Uhr)';

    const msg = encodeURIComponent(
      `Hallo Herr Saridis, ich habe den Bad-Inspektor auf Ihrer Website genutzt:\n` +
      `• Raum: ${roomText}\n` +
      `• Vorhaben: ${scopeText}\n` +
      `• Wunschtermin: ${timeText}\n` +
      `• Richtwert lt. Rechner: ${data.budget}\n\n` +
      `Können wir einen unverbindlichen Vor-Ort-Termin vereinbaren?`
    );

    if (btnWhatsApp) {
      btnWhatsApp.href = `https://wa.me/4915237384702?text=${msg}`;
    }
  }

  roomSelect?.addEventListener('change', updateConfigurator);
  scopeSelect?.addEventListener('change', updateConfigurator);
  timeSelect?.addEventListener('change', updateConfigurator);
  updateConfigurator(); // Initialer Aufruf

  // "Im Formular übernehmen" Button
  btnTransfer?.addEventListener('click', (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('kontakt');
    if (contactSection && lenis) {
      lenis.scrollTo(contactSection, { offset: -70, duration: 0.9 });
    } else if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Felder im Kontaktformular vorbefüllen
    const formService = document.getElementById('formService');
    const formTime = document.getElementById('formTimePreference');
    const formMessage = document.getElementById('formMessage');

    if (formService && scopeSelect) {
      if (scopeSelect.value === 'partial') formService.value = 'walk-in-dusche';
      else formService.value = 'badsanierung';
    }

    if (formTime && timeSelect) {
      formTime.value = timeSelect.value;
    }

    if (formMessage && roomSelect && scopeSelect && calcBudget) {
      formMessage.value = `Projektanfrage aus dem Bad-Inspektor:\n- ${roomSelect.options[roomSelect.selectedIndex].text}\n- ${scopeSelect.options[scopeSelect.selectedIndex].text}\n- Budgetorientierung: ${calcBudget.textContent}`;
    }
  });

  // ── 5. MODALS (Impressum & Datenschutz gem. § 5 DDG & DSGVO) ─
  const modalBackdrops = document.querySelectorAll('.modal-backdrop');

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();

    // Fokus auf den Schließen-Button legen
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn?.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }

  // Trigger für Modals
  document.querySelectorAll('.legal-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      let targetId = trigger.getAttribute('data-target');
      if (!targetId) {
        const href = trigger.getAttribute('href');
        if (href === '#impressum') targetId = 'impressumModal';
        else if (href === '#datenschutz') targetId = 'datenschutzModal';
      }
      if (targetId) openModal(targetId);
    });
  });

  // Close Buttons
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close');
      const modal = document.getElementById(modalId);
      closeModal(modal);
    });
  });

  // Klick auf Backdrop schließt Modal
  modalBackdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  // ESC schließt Modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalBackdrops.forEach(backdrop => {
        if (!backdrop.hasAttribute('hidden')) {
          closeModal(backdrop);
        }
      });
    }
  });

  // ── 6. DSGVO CONSENT & TWO-CLICK MAPS ─────────────────────
  const CONSENT_KEY = 'saridis_consent_v1';
  const consentBanner = document.getElementById('consentBanner');
  const btnAccept = document.getElementById('consentAccept');
  const btnReject = document.getElementById('consentReject');
  const reopenLink = document.getElementById('cookieSettingsLink');
  const mapPlaceholder = document.getElementById('mapPlaceholder');
  const btnActivateMap = document.getElementById('btnActivateMap');
  const mapsIframe = document.getElementById('mapsIframe');

  function activateGoogleMaps() {
    if (mapsIframe && mapsIframe.dataset.src) {
      mapsIframe.src = mapsIframe.dataset.src;
      delete mapsIframe.dataset.src;
    }
    if (mapPlaceholder) {
      mapPlaceholder.classList.add('hidden');
    }
  }

  function setConsent(accepted) {
    if (accepted) {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      activateGoogleMaps();
    } else {
      localStorage.setItem(CONSENT_KEY, 'rejected');
    }
    consentBanner?.classList.add('hidden');
  }

  // Beim Laden prüfen
  const savedConsent = localStorage.getItem(CONSENT_KEY);
  if (savedConsent === 'accepted') {
    activateGoogleMaps();
    consentBanner?.classList.add('hidden');
  } else if (savedConsent === 'rejected') {
    consentBanner?.classList.add('hidden');
  } else {
    // Erstbesuch: Banner anzeigen
    setTimeout(() => {
      consentBanner?.classList.remove('hidden');
    }, 1200);
  }

  btnAccept?.addEventListener('click', () => setConsent(true));
  btnReject?.addEventListener('click', () => setConsent(false));

  btnActivateMap?.addEventListener('click', () => {
    setConsent(true);
  });

  reopenLink?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem(CONSENT_KEY);
    consentBanner?.classList.remove('hidden');
  });

  // ── 7. FAQ ACCORDION LOGIK ────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question?.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';

      // Alle anderen schließen
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-answer')?.setAttribute('hidden', '');
        }
      });

      if (isExpanded) {
        question.setAttribute('aria-expanded', 'false');
        answer?.setAttribute('hidden', '');
        item.classList.remove('open');
      } else {
        question.setAttribute('aria-expanded', 'true');
        answer?.removeAttribute('hidden');
        item.classList.add('open');
      }
    });
  });

  // ── 8. FORM SUBMISSION FEEDBACK ───────────────────────────
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    const btn = document.getElementById('btnSubmitForm');
    if (btn) {
      btn.innerHTML = '<span>Anfrage wird übermittelt...</span>';
    }
  });

});

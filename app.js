/**
 * SARIDIS SHK – MASTER APPLICATION ARCHITECTURE
 * ScrollCraft Integration • 3D Armaturen-Studio • Vorher/Nachher Engine • Feierabend-Rechner • Legal Compliance
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. SMOOTH ANCHOR SCROLLING (Native & Reliable) ────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#' || targetId.includes('Modal')) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Mobile Nav schließen, falls geöffnet
        closeMobileNav();
      }
    });
  });

  // ── 2. REAL-TIME ÖFFNUNGSZEITEN TELEMETRIE ────────────────
  const liveStatusEl = document.getElementById('headerLiveStatus');
  function updateLiveStatus() {
    if (!liveStatusEl) return;
    const now = new Date();
    const day = now.getDay(); // 0 = Sonntag, 1 = Montag, ..., 6 = Samstag
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour + minute / 60;

    let isOpen = false;
    let statusText = '';

    if (day >= 1 && day <= 5) {
      // Montag bis Freitag: 10:00 – 20:00 Uhr
      if (currentTime >= 10 && currentTime < 20) {
        isOpen = true;
        statusText = 'Geöffnet bis 20 Uhr';
      } else if (currentTime < 10) {
        statusText = 'Öffnet heute 10 Uhr';
      } else {
        statusText = day === 5 ? 'Öffnet Sa 08 Uhr' : 'Öffnet morgen 10 Uhr';
      }
    } else if (day === 6) {
      // Samstag: 08:00 – 18:00 Uhr
      if (currentTime >= 8 && currentTime < 18) {
        isOpen = true;
        statusText = 'Geöffnet bis 18 Uhr';
      } else if (currentTime < 8) {
        statusText = 'Öffnet heute 08 Uhr';
      } else {
        statusText = 'Öffnet Mo 10 Uhr';
      }
    } else {
      // Sonntag: Geschlossen
      statusText = 'Öffnet Mo 10 Uhr';
    }

    const dot = liveStatusEl.querySelector('.status-dot');
    const textNode = liveStatusEl.querySelector('.status-text');

    if (textNode) textNode.textContent = statusText;
    if (dot) {
      dot.style.background = isOpen ? '#10b981' : '#f59e0b';
      dot.style.boxShadow = isOpen ? '0 0 8px rgba(16, 185, 129, 0.6)' : 'none';
    }
  }
  updateLiveStatus();
  setInterval(updateLiveStatus, 60000); // Jede Minute prüfen

  // ── 3. MOBILE NAVIGATION DRAWER ───────────────────────────
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');

  function toggleMobileNav() {
    const isOpen = mobileDrawer?.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  function openMobileNav() {
    mobileDrawer?.classList.add('open');
    mobileToggle?.setAttribute('aria-expanded', 'true');
    mobileDrawer?.setAttribute('aria-hidden', 'false');
  }

  function closeMobileNav() {
    mobileDrawer?.classList.remove('open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    mobileDrawer?.setAttribute('aria-hidden', 'true');
  }

  mobileToggle?.addEventListener('click', toggleMobileNav);
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // ── 4. SIGNATURE FEATURE 1: VORHER/NACHHER SPLIT-SLIDER ───
  const comparisonStage = document.getElementById('comparisonStage');
  const sliderHandle = document.getElementById('sliderHandle');
  let isSliding = false;

  function setSliderSplit(clientX) {
    if (!comparisonStage) return;
    const rect = comparisonStage.getBoundingClientRect();
    let pos = ((clientX - rect.left) / rect.width) * 100;
    if (pos < 3) pos = 3;
    if (pos > 97) pos = 97;

    comparisonStage.style.setProperty('--split', `${pos}%`);
    sliderHandle?.setAttribute('aria-valuenow', Math.round(pos));
  }

  if (comparisonStage && sliderHandle) {
    // Maus-Steuerung
    comparisonStage.addEventListener('mousedown', (e) => {
      isSliding = true;
      setSliderSplit(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isSliding) return;
      setSliderSplit(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isSliding = false;
    });

    // Touch-Steuerung für Smartphones
    comparisonStage.addEventListener('touchstart', (e) => {
      isSliding = true;
      if (e.touches && e.touches[0]) {
        setSliderSplit(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isSliding) return;
      if (e.touches && e.touches[0]) {
        setSliderSplit(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isSliding = false;
    });

    // Tastatursteuerung für Barrierefreiheit
    sliderHandle.addEventListener('keydown', (e) => {
      let currentVal = parseFloat(sliderHandle.getAttribute('aria-valuenow')) || 50;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        currentVal = Math.max(5, currentVal - 5);
        comparisonStage.style.setProperty('--split', `${currentVal}%`);
        sliderHandle.setAttribute('aria-valuenow', currentVal);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        currentVal = Math.min(95, currentVal + 5);
        comparisonStage.style.setProperty('--split', `${currentVal}%`);
        sliderHandle.setAttribute('aria-valuenow', currentVal);
      }
    });
  }

  // Hotspot Pins auf dem Nachher-Bild
  document.querySelectorAll('.hotspot-pin').forEach(pin => {
    const trigger = pin.querySelector('.pin-trigger');
    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = pin.classList.contains('active');
      document.querySelectorAll('.hotspot-pin').forEach(p => p.classList.remove('active'));
      if (!isActive) pin.classList.add('active');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.hotspot-pin').forEach(p => p.classList.remove('active'));
  });

  // ── 5. SIGNATURE FEATURE 2: 3D ARMATUREN- & MATERIAL-STUDIO ─
  const canvas3d = document.getElementById('armatur3dCanvas');
  const canvasWrapper = document.getElementById('canvasWrapper');
  const toggleWaterBtn = document.getElementById('toggleWaterBtn');
  const waterBtnText = document.getElementById('waterBtnText');
  const webglFallback = document.getElementById('webglFallback');

  if (canvas3d && typeof THREE !== 'undefined') {
    init3DStudio();
  } else if (webglFallback) {
    webglFallback.style.display = 'flex';
  }

  function init3DStudio() {
    let scene, camera, renderer, faucetGroup, waterParticles;
    let isWaterFlowing = false;
    let animFrameId = null;
    let isVisible = true;

    // Material-Definitionen mit echten PVD-Eigenschaften
    const materials = {
      brass: new THREE.MeshStandardMaterial({
        color: 0xc79e56,
        roughness: 0.32,
        metalness: 0.92,
        name: 'brass'
      }),
      black: new THREE.MeshStandardMaterial({
        color: 0x1d1e22,
        roughness: 0.82,
        metalness: 0.2,
        name: 'black'
      }),
      chrome: new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        roughness: 0.12,
        metalness: 0.98,
        name: 'chrome'
      }),
      rosegold: new THREE.MeshStandardMaterial({
        color: 0xb7796d,
        roughness: 0.35,
        metalness: 0.88,
        name: 'rosegold'
      })
    };

    let activeMaterial = materials.brass;

    // 1. Scene & Camera
    scene = new THREE.Scene();
    const width = canvasWrapper?.clientWidth || 500;
    const height = canvasWrapper?.clientHeight || 480;

    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.2);
    camera.lookAt(0, 0.4, 0);

    // 2. WebGL Renderer mit mobilen Performance-Safeguards
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas3d,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      // Begrenzung auf maximal 2 für 60fps auf Retina-Smartphones
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
    } catch (err) {
      console.warn('WebGL nicht verfügbar:', err);
      if (webglFallback) webglFallback.style.display = 'flex';
      return;
    }

    // 3. Beleuchtung (Weiches architektonisches Studio-Licht)
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(2.5, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xbfdbfe, 0.8);
    fillLight.position.set(-3, 1.5, -1);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfef08a, 1.0);
    rimLight.position.set(0, -2, -2);
    scene.add(rimLight);

    // 4. Prozedurale Modellierung der Designer-Waschtischarmatur
    faucetGroup = new THREE.Group();

    // A. Sockelplatte / Rosette
    const baseGeo = new THREE.CylinderGeometry(0.38, 0.42, 0.08, 36);
    const baseMesh = new THREE.Mesh(baseGeo, activeMaterial);
    baseMesh.position.y = 0.04;
    faucetGroup.add(baseMesh);

    // B. Armaturenkörper (Säule)
    const bodyGeo = new THREE.CylinderGeometry(0.24, 0.26, 0.85, 36);
    const bodyMesh = new THREE.Mesh(bodyGeo, activeMaterial);
    bodyMesh.position.y = 0.48;
    faucetGroup.add(bodyMesh);

    // C. Horizontaler Wandauslauf / Schwenkauslauf
    const spoutArmGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.75, 32);
    const spoutArmMesh = new THREE.Mesh(spoutArmGeo, activeMaterial);
    spoutArmMesh.rotation.z = Math.PI / 2;
    spoutArmMesh.position.set(0.36, 0.82, 0);
    faucetGroup.add(spoutArmMesh);

    // D. Gebogene Auslaufspitze (90 Grad Bogen nach unten)
    const curveGeo = new THREE.TorusGeometry(0.16, 0.11, 16, 24, Math.PI / 2);
    const curveMesh = new THREE.Mesh(curveGeo, activeMaterial);
    curveMesh.position.set(0.72, 0.66, 0);
    curveMesh.rotation.z = -Math.PI / 2;
    faucetGroup.add(curveMesh);

    // E. Perlator-Düse
    const nozzleGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 24);
    const nozzleMesh = new THREE.Mesh(nozzleGeo, activeMaterial);
    nozzleMesh.position.set(0.88, 0.62, 0);
    faucetGroup.add(nozzleMesh);

    // F. Einhebel-Mischhebel oben
    const handleBaseGeo = new THREE.CylinderGeometry(0.16, 0.18, 0.16, 24);
    const handleBase = new THREE.Mesh(handleBaseGeo, activeMaterial);
    handleBase.position.set(0, 0.96, 0);
    handleBase.rotation.x = -0.15; // Elegante Schrägstellung
    faucetGroup.add(handleBase);

    const leverPinGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.55, 16);
    const leverPin = new THREE.Mesh(leverPinGeo, activeMaterial);
    leverPin.rotation.x = -Math.PI / 3;
    leverPin.position.set(0, 1.15, -0.12);
    faucetGroup.add(leverPin);

    // Positionierung der gesamten Armatur
    faucetGroup.position.set(-0.35, -0.4, 0);
    scene.add(faucetGroup);

    // 5. Partikel-Wassersimulation
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = 0.88 + (Math.random() - 0.5) * 0.06;
      particlePositions[i * 3 + 1] = 0.58 - Math.random() * 1.2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
      particleSpeeds[i] = 0.03 + Math.random() * 0.04;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.06,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    waterParticles = new THREE.Points(particleGeo, particleMat);
    waterParticles.visible = false;
    faucetGroup.add(waterParticles);

    // 6. Intuitive Touch- & Maus-Orbit-Steuerung
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0.45;
    let targetRotX = 0;

    function onPointerDown(x, y) {
      isDragging = true;
      prevMouseX = x;
      prevMouseY = y;
    }

    function onPointerMove(x, y) {
      if (!isDragging) return;
      const deltaX = x - prevMouseX;
      const deltaY = y - prevMouseY;
      prevMouseX = x;
      prevMouseY = y;

      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.005;

      // Vertikalen Neigungswinkel begrenzen
      targetRotX = Math.max(-0.4, Math.min(0.4, targetRotX));
    }

    function onPointerUp() {
      isDragging = false;
    }

    // Maus-Events auf dem Canvas
    canvas3d.addEventListener('mousedown', (e) => onPointerDown(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onPointerUp);

    // Touch-Events auf dem Canvas mit { passive: true }
    canvas3d.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', onPointerUp);

    // 7. Material-Umschalter
    const matButtons = document.querySelectorAll('.mat-btn');
    matButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const finish = btn.getAttribute('data-finish');
        if (materials[finish]) {
          activeMaterial = materials[finish];

          // Alle Meshes der Armatur aktualisieren
          faucetGroup.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = activeMaterial;
            }
          });

          matButtons.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-checked', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-checked', 'true');
        }
      });
    });

    // 8. Wasserfluss-Toggle
    toggleWaterBtn?.addEventListener('click', () => {
      isWaterFlowing = !isWaterFlowing;
      waterParticles.visible = isWaterFlowing;
      toggleWaterBtn.classList.toggle('active', isWaterFlowing);
      toggleWaterBtn.setAttribute('aria-pressed', isWaterFlowing ? 'true' : 'false');
      if (waterBtnText) {
        waterBtnText.textContent = isWaterFlowing ? 'Wasserstrahl stoppen' : 'Wasserstrahl aktivieren';
      }
    });

    // 9. Animations-Loop mit Lerp & Pausierung bei Unsichtbarkeit
    function animate() {
      if (!isVisible) {
        animFrameId = null;
        return;
      }

      animFrameId = requestAnimationFrame(animate);

      // Sanfte Rotation ansteuern
      faucetGroup.rotation.y += (targetRotY - faucetGroup.rotation.y) * 0.08;
      faucetGroup.rotation.x += (targetRotX - faucetGroup.rotation.x) * 0.08;

      // Autonome ganz leichte Schwebung, wenn nicht gezogen wird
      if (!isDragging) {
        targetRotY += 0.002;
      }

      // Wasserpartikel nach unten bewegen
      if (isWaterFlowing && waterParticles) {
        const positions = particleGeo.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] -= particleSpeeds[i];
          if (positions[i * 3 + 1] < -0.8) {
            positions[i * 3 + 1] = 0.58;
            positions[i * 3] = 0.88 + (Math.random() - 0.5) * 0.05;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
          }
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    }

    // 10. IntersectionObserver zur Ressourcenschonung (60fps Garantie)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animFrameId) {
          animate();
        }
      });
    }, { threshold: 0.1 });

    const studioSection = document.getElementById('armaturen-studio');
    if (studioSection) observer.observe(studioSection);

    // Initialer Start
    animate();

    // 11. Responsive Canvas Resize
    window.addEventListener('resize', () => {
      if (!canvasWrapper || !renderer || !camera) return;
      const newW = canvasWrapper.clientWidth;
      const newH = canvasWrapper.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
  }

  // ── 6. FEIERABEND- & BAD-KALKULATOR LOGIK ─────────────────
  const roomSelect = document.getElementById('roomSizeSelect');
  const scopeSelect = document.getElementById('renovationTypeSelect');
  const timeSelect = document.getElementById('timeSlotSelect');
  const calcDuration = document.getElementById('calcDuration');
  const calcPrice = document.getElementById('calcPrice');
  const whatsappConfigBtn = document.getElementById('whatsappConfigBtn');

  const kalkulationsMatrix = {
    small: {
      partial: { days: '5 – 7 Werktage', price: '7.500 € – 11.000 €' },
      complete: { days: '7 – 9 Werktage', price: '12.500 € – 17.500 €' },
      luxury: { days: '9 – 12 Werktage', price: '17.500 € – 24.000 €' }
    },
    medium: {
      partial: { days: '7 – 9 Werktage', price: '9.500 € – 14.000 €' },
      complete: { days: '9 – 12 Werktage', price: '18.500 € – 26.000 €' },
      luxury: { days: '12 – 16 Werktage', price: '26.000 € – 38.000 €' }
    },
    large: {
      partial: { days: '9 – 12 Werktage', price: '13.000 € – 19.500 €' },
      complete: { days: '13 – 18 Werktage', price: '27.000 € – 42.000 €' },
      luxury: { days: '16 – 22 Werktage', price: '42.000 € – 65.000 €' }
    }
  };

  function updateKalkulator() {
    const room = roomSelect?.value || 'medium';
    const scope = scopeSelect?.value || 'complete';
    const data = kalkulationsMatrix[room]?.[scope] || kalkulationsMatrix.medium.complete;

    if (calcDuration) calcDuration.textContent = data.days;
    if (calcPrice) calcPrice.textContent = data.price;

    const roomText = roomSelect?.options[roomSelect.selectedIndex]?.text || 'Standardbad';
    const scopeText = scopeSelect?.options[scopeSelect.selectedIndex]?.text || 'Komplettsanierung';
    const timeText = timeSelect?.options[timeSelect.selectedIndex]?.text || 'Feierabend (17–20 Uhr)';

    const msg = encodeURIComponent(
      `Hallo Herr Saridis, ich habe den Bad-Rechner auf Ihrer Website ausgefüllt:\n\n` +
      `• Raumgröße: ${roomText}\n` +
      `• Sanierungsumfang: ${scopeText}\n` +
      `• Wunschtermin: ${timeText}\n` +
      `• Orientierung lt. Rechner: ca. ${data.price} (${data.days})\n\n` +
      `Haben Sie Zeit für ein unverbindliches Erstgespräch vor Ort in Ingolstadt?`
    );

    if (whatsappConfigBtn) {
      whatsappConfigBtn.href = `https://wa.me/4915237384702?text=${msg}`;
    }
  }

  roomSelect?.addEventListener('change', updateKalkulator);
  scopeSelect?.addEventListener('change', updateKalkulator);
  timeSelect?.addEventListener('change', updateKalkulator);
  updateKalkulator();

  // ── 7. TWO-CLICK GOOGLE MAPS AKTIVIERUNG ──────────────────
  const loadMapBtn = document.getElementById('loadMapBtn');
  const mapPlaceholder = document.getElementById('mapPlaceholder');
  const mapIframeWrapper = document.getElementById('mapIframeWrapper');

  function renderMapIframe() {
    if (!mapIframeWrapper) return;
    mapIframeWrapper.innerHTML = `
      <iframe 
        title="Standort Saridis SHK Ingolstadt" 
        src="https://maps.google.com/maps?q=Saridis%20SHK%20Geibelstra%C3%9Fe%2022%2085055%20Ingolstadt&t=&z=15&ie=UTF8&iwloc=&output=embed" 
        width="100%" 
        height="100%" 
        style="border:0; min-height: 380px;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    `;
    if (mapPlaceholder) mapPlaceholder.style.display = 'none';
    mapIframeWrapper.style.display = 'block';
  }

  loadMapBtn?.addEventListener('click', () => {
    localStorage.setItem('saridis_maps_consent', 'true');
    renderMapIframe();
  });

  if (localStorage.getItem('saridis_maps_consent') === 'true') {
    renderMapIframe();
  }

  // ── 8. MODALS (Impressum § 5 DDG & Datenschutz DSGVO) ─────
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.legal-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-target') || 
        (trigger.getAttribute('href') === '#impressum' ? 'impressumModal' : 'datenschutzModal');
      openModal(targetId);
    });
  });

  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close');
      closeModal(modalId);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.legal-modal.open').forEach(m => {
        closeModal(m.id);
      });
    }
  });

  // ── 9. TDDDG / DSGVO CONSENT BANNER ───────────────────────
  const consentBanner = document.getElementById('consentBanner');
  const consentAccept = document.getElementById('consentAccept');
  const consentReject = document.getElementById('consentReject');
  const openConsentSettings = document.getElementById('openConsentSettings');

  function handleConsent(accepted) {
    localStorage.setItem('saridis_cookie_consent', accepted ? 'all' : 'essential');
    consentBanner?.classList.remove('visible');
    if (accepted) {
      localStorage.setItem('saridis_maps_consent', 'true');
      renderMapIframe();
    }
  }

  const existingConsent = localStorage.getItem('saridis_cookie_consent');
  if (!existingConsent) {
    setTimeout(() => {
      consentBanner?.classList.add('visible');
    }, 1000);
  }

  consentAccept?.addEventListener('click', () => handleConsent(true));
  consentReject?.addEventListener('click', () => handleConsent(false));
  openConsentSettings?.addEventListener('click', (e) => {
    e.preventDefault();
    consentBanner?.classList.add('visible');
  });

  // ── 10. KONTAKTFORMULAR SUBMIT FEEDBACK ───────────────────
  const contactForm = document.getElementById('contactForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');
  const submitFormBtn = document.getElementById('submitFormBtn');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (submitFormBtn) {
      submitFormBtn.disabled = true;
      submitFormBtn.innerHTML = '<span>Anfrage wird übermittelt...</span>';
    }

    setTimeout(() => {
      if (formSuccessMessage) formSuccessMessage.style.display = 'block';
      if (submitFormBtn) submitFormBtn.style.display = 'none';
      contactForm.reset();
    }, 800);
  });

  // Aktuelles Jahr im Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});

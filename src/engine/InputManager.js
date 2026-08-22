import { UNITS } from '../config/units.js';

export class InputManager {
  constructor(engine, uiManager) {
    this.engine = engine;
    this.uiManager = uiManager;
    this.keysDown = new Set();
    this.setupListeners();
    this.setupMouseAndTouch();
  }

  setupMouseAndTouch() {
    const canvas = this.engine.canvas;
    const viewport = document.getElementById('viewport-container');
    if (!canvas || !viewport) return;

    // --- MOUSE DRAGGING ---
    viewport.addEventListener('mousedown', (e) => {
      // Ignore clicks on UI buttons/overlays inside viewport
      if (e.target !== canvas && e.target !== viewport) return;
      this.engine.camera.startDrag(e.clientX);
      canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (this.engine.camera.isDragging) {
        this.engine.camera.onDrag(e.clientX);
      }
    });

    window.addEventListener('mouseup', () => {
      if (this.engine.camera.isDragging) {
        this.engine.camera.endDrag();
        if (canvas) canvas.style.cursor = 'grab';
      }
    });

    // --- MOUSE WHEEL ZOOM & PAN ---
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      // If holding Shift or scrolling horizontally, pan camera
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        const panDelta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
        this.engine.camera.panBy(panDelta * 1.2);
      } else {
        // Vertical wheel zooms in / out smoothly
        const zoomFactor = -e.deltaY * 0.0015;
        this.engine.camera.zoomBy(zoomFactor);
      }
    }, { passive: false });

    // --- TOUCH / TRACKPAD DRAGGING ---
    let initialPinchDist = null;
    let initialPinchZoom = 1.0;

    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.engine.camera.startDrag(e.touches[0].clientX);
      } else if (e.touches.length === 2) {
        initialPinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        initialPinchZoom = this.engine.camera.zoom;
      }
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.engine.camera.isDragging) {
        this.engine.camera.onDrag(e.touches[0].clientX);
      } else if (e.touches.length === 2 && initialPinchDist) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = currentDist / initialPinchDist;
        this.engine.camera.setZoom(initialPinchZoom * factor);
      }
    }, { passive: true });

    viewport.addEventListener('touchend', () => {
      this.engine.camera.endDrag();
      initialPinchDist = null;
    }, { passive: true });
  }

  setupListeners() {
    window.addEventListener('keydown', (e) => {
      this.keysDown.add(e.code);

      if (e.code === 'KeyW') {
        this.uiManager.toggleWiki();
        return;
      }

      if (e.code === 'Escape') {
        if (this.uiManager.screenWiki && !this.uiManager.screenWiki.classList.contains('hidden')) {
          this.uiManager.closeWiki();
          return;
        }
      }

      if (this.engine.state !== 'playing' && e.code !== 'KeyP' && e.code !== 'Escape') return;

      const age = this.engine.playerBase ? this.engine.playerBase.age : 1;
      const currentUnitKeys = Object.keys(UNITS).filter(k => UNITS[k].ageId === age);

      if (e.code === 'Digit1') {
        if (currentUnitKeys[0]) this.uiManager.trainUnit(currentUnitKeys[0]);
      } else if (e.code === 'Digit2') {
        if (currentUnitKeys[1]) this.uiManager.trainUnit(currentUnitKeys[1]);
      } else if (e.code === 'Digit3') {
        if (currentUnitKeys[2]) this.uiManager.trainUnit(currentUnitKeys[2]);
      } else if (e.code === 'KeyE') {
        this.uiManager.tryEvolve();
      } else if (e.code === 'Space') {
        e.preventDefault();
        this.uiManager.useSpecial();
      } else if (e.code === 'KeyQ') {
        if (!this.engine.playerHero || this.engine.playerHero.state === 'dead') {
          this.engine.spawnHero();
        } else {
          this.engine.triggerHeroSkill();
        }
      } else if (e.code === 'KeyR') {
        this.uiManager.toggleFallBack();
      } else if (e.code === 'KeyF') {
        this.uiManager.triggerCharge();
      } else if (e.code === 'KeyZ') {
        this.uiManager.setSpeed(1.0);
      } else if (e.code === 'KeyX') {
        this.uiManager.setSpeed(2.0);
      } else if (e.code === 'KeyC') {
        this.uiManager.setSpeed(4.0);
      } else if (e.code === 'KeyP' || e.code === 'Escape') {
        this.uiManager.togglePause();
      } else if (e.code === 'KeyM') {
        this.uiManager.toggleSound();
      } else if (e.code === 'Equal' || e.code === 'NumpadAdd') {
        this.engine.camera.zoomBy(0.1);
      } else if (e.code === 'Minus' || e.code === 'NumpadSubtract') {
        this.engine.camera.zoomBy(-0.1);
      } else if (e.code === 'Digit0' || e.code === 'KeyO') {
        this.engine.camera.resetZoom();
      } else if (e.code === 'KeyH') {
        this.engine.camera.jumpToPlayer(this.engine);
      } else if (e.code === 'KeyB') {
        this.engine.camera.jumpToFrontline(this.engine);
      } else if (e.code === 'KeyJ') {
        this.engine.camera.jumpToEnemy(this.engine);
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keysDown.delete(e.code);
    });

    // Continuous smooth panning on hold
    setInterval(() => {
      if (this.engine.state !== 'playing') return;
      if (this.keysDown.has('KeyA') || this.keysDown.has('ArrowLeft')) {
        this.engine.camera.panBy(-30);
      }
      if (this.keysDown.has('KeyD') || this.keysDown.has('ArrowRight')) {
        this.engine.camera.panBy(30);
      }
    }, 25);
  }
}

/**
 * SoundManager - Pure Web Audio API Synthesizer for Dynamic BGM & SFX
 * No external audio files needed! All sound waves & music are generated procedurally.
 */
export class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('ageofwar_muted') === 'true';
    this.bgmMuted = false;
    this.sfxMuted = false;
    this.masterVolume = 0.7;
    this.bgmVolume = 0.45;
    this.sfxVolume = 0.8;
    this.isBgmPlaying = false;
    this.currentAge = 1;

    this.musicTimer = null;
    this.currentBeat = 0;
    this.bpm = 138;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  ensureContext() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startBGM(age = 1) {
    this.currentAge = age;
    this.ensureContext();
    if (!this.ctx || this.isBgmPlaying) return;

    this.isBgmPlaying = true;
    this.scheduleMusicLoop();
  }

  stopBGM() {
    this.isBgmPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  setAge(age) {
    this.currentAge = age;
  }

  // --- PROCEDURAL MUSIC ENGINE ---
  scheduleMusicLoop() {
    if (!this.isBgmPlaying || !this.ctx) return;

    // Music progression: C minor / G minor / Bb major / Eb major chord vibes
    // Scale: C, D, Eb, F, G, Ab, Bb (C Natural Minor)
    const notes = {
      C2: 65.41, G2: 98.0, C3: 130.81, D3: 146.83, Eb3: 155.56, F3: 174.61, G3: 196.0, Ab3: 207.65, Bb3: 233.08,
      C4: 261.63, D4: 293.66, Eb4: 311.13, F4: 349.23, G4: 392.0, Ab4: 415.3, Bb4: 466.16,
      C5: 523.25, D5: 587.33, Eb5: 622.25, G5: 783.99, Bb5: 932.33
    };

    const basslines = [
      // 16 16th-notes per bar
      [notes.C3, 0, notes.C3, notes.C3, notes.Eb3, 0, notes.G3, 0, notes.Bb2, 0, notes.Bb2, notes.C3, notes.Eb3, 0, notes.F3, notes.G3],
      [notes.Ab2, 0, notes.Ab2, notes.Ab2, notes.C3, 0, notes.Eb3, 0, notes.Bb2, 0, notes.Bb2, notes.Bb2, notes.D3, 0, notes.F3, 0],
      [notes.C3, notes.C3, 0, notes.C3, notes.G3, 0, notes.Eb3, 0, notes.F3, 0, notes.F3, notes.G3, notes.Ab3, 0, notes.G3, notes.F3],
      [notes.G2, 0, notes.G2, notes.G2, notes.D3, 0, notes.F3, 0, notes.G3, 0, notes.Ab3, 0, notes.Bb3, 0, notes.B3, 0]
    ];

    const leadMelodies = [
      [notes.C5, 0, notes.Eb5, notes.G5, notes.F5, 0, notes.Eb5, notes.D5, notes.C5, 0, notes.Bb4, notes.C5, 0, 0, notes.Eb5, notes.D5],
      [notes.C5, 0, notes.G5, 0, notes.Bb5, 0, notes.Ab5, notes.G5, notes.F5, 0, notes.Eb5, notes.F5, notes.G5, 0, notes.F5, notes.Eb5],
      [notes.Eb5, notes.F5, notes.G5, 0, notes.C5, 0, notes.D5, notes.Eb5, notes.F5, 0, notes.Bb4, 0, notes.C5, notes.D5, notes.Eb5, notes.F5],
      [notes.G5, 0, notes.F5, notes.Eb5, notes.D5, 0, notes.C5, notes.Bb4, notes.C5, 0, 0, 0, notes.C5, 0, notes.G4, notes.C5]
    ];

    const bar = Math.floor(this.currentBeat / 16) % 4;
    const step = this.currentBeat % 16;
    const beatInterval = (60 / this.bpm) / 4; // 16th note in seconds

    if (!this.isMuted && !this.bgmMuted) {
      const now = this.ctx.currentTime;
      // Play Bass
      const bassNote = basslines[bar][step];
      if (bassNote > 0) {
        this.playSynthNote(bassNote, now, beatInterval * 0.9, 'sawtooth', 0.18 * this.bgmVolume * this.masterVolume, 400);
      }

      // Play Drum Kick on beats 0, 4, 8, 12
      if (step % 4 === 0) {
        this.playDrumKick(now);
      }
      // Play Snare on beats 4, 12
      if (step === 4 || step === 12) {
        this.playDrumSnare(now);
      }
      // Play HiHat on every 2 steps
      if (step % 2 === 0) {
        this.playDrumHiHat(now, step % 4 === 0 ? 0.05 : 0.025);
      }

      // Play Lead melody
      const leadNote = leadMelodies[bar][step];
      if (leadNote > 0) {
        const synthType = this.currentAge >= 4 ? 'sawtooth' : this.currentAge === 3 ? 'square' : 'triangle';
        this.playSynthNote(leadNote, now, beatInterval * 1.5, synthType, 0.12 * this.bgmVolume * this.masterVolume, 1200);
      }
    }

    this.currentBeat++;
    const nextTick = (beatInterval * 1000);
    this.musicTimer = setTimeout(() => this.scheduleMusicLoop(), nextTick);
  }

  playSynthNote(freq, startTime, duration, type = 'sine', gainVal = 0.1, filterFreq = 1000) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq, startTime);

    gain.gain.setValueAtTime(gainVal, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  playDrumKick(time) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.12);

    gain.gain.setValueAtTime(0.25 * this.bgmVolume * this.masterVolume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.13);
  }

  playDrumSnare(time) {
    if (!this.ctx) return;
    // Noise buffer
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15 * this.bgmVolume * this.masterVolume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(time);
    noise.stop(time + 0.1);
  }

  playDrumHiHat(time, vol = 0.05) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol * this.bgmVolume * this.masterVolume, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(time);
    noise.stop(time + 0.04);
  }

  // --- SOUND EFFECTS (SFX) ---
  playSfx(type) {
    if (this.isMuted || this.sfxMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const vol = this.sfxVolume * this.masterVolume;

    switch (type) {
      case 'spawn': {
        // High ping
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.2 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }
      case 'club':
      case 'hit':
      case 'hit_club': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
        gain.gain.setValueAtTime(0.3 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
        break;
      }
      case 'sword':
      case 'sword_slash': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.15);
        gain.gain.setValueAtTime(0.22 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
        break;
      }
      case 'boss_spawn': {
        // Ominous deep war horn
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.linearRampToValueAtTime(75, now + 0.8);
        gain.gain.setValueAtTime(0.4 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 1.2);
        break;
      }
      case 'fireball':
      case 'artillery': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.3);
        gain.gain.setValueAtTime(0.35 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
        break;
      }
      case 'arrow_shoot': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
        gain.gain.setValueAtTime(0.18 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.11);
        break;
      }
      case 'gunshot': {
        // Noise burst + pop
        const bufferSize = this.ctx.sampleRate * 0.15;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3000, now);
        filter.frequency.exponentialRampToValueAtTime(400, now + 0.12);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.35 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(now);
        noise.stop(now + 0.15);
        break;
      }
      case 'cannon': {
        // Deep sub-bass boom + noise
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);
        gain.gain.setValueAtTime(0.5 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
        break;
      }
      case 'rocket_launch': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.linearRampToValueAtTime(800, now + 0.25);
        gain.gain.setValueAtTime(0.25 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.26);
        break;
      }
      case 'explosion': {
        // Explosion noise + sub
        const bufferSize = this.ctx.sampleRate * 0.4;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, now);
        filter.frequency.exponentialRampToValueAtTime(80, now + 0.38);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.45 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(now);
        noise.stop(now + 0.4);
        break;
      }
      case 'laser': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.14);
        gain.gain.setValueAtTime(0.25 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }
      case 'siren': {
        // Air raid siren
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.linearRampToValueAtTime(850, now + 0.6);
        osc.frequency.linearRampToValueAtTime(450, now + 1.2);
        gain.gain.setValueAtTime(0.3 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 1.3);
        break;
      }
      case 'evolve': {
        // Fanfare arpeggio: C4, E4, G4, C5
        const freqs = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99];
        freqs.forEach((freq, idx) => {
          const t = now + idx * 0.08;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.25 * vol, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.35);
        });
        break;
      }
      case 'click': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.12 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }
      case 'victory': {
        // Victory fanfare chords
        const chords = [
          [261.63, 329.63, 392.0], // C
          [293.66, 369.99, 440.0], // D
          [329.63, 415.3, 493.88], // E
          [523.25, 659.25, 783.99]  // High C
        ];
        chords.forEach((chord, i) => {
          const t = now + i * 0.22;
          chord.forEach(f => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, t);
            gain.gain.setValueAtTime(0.18 * vol, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + (i === 3 ? 0.8 : 0.2));
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + (i === 3 ? 0.8 : 0.22));
          });
        });
        break;
      }
      case 'defeat': {
        const freqs = [392.0, 369.99, 329.63, 261.63, 196.0];
        freqs.forEach((freq, idx) => {
          const t = now + idx * 0.2;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.15 * vol, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.28);
        });
        break;
      }
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('ageofwar_muted', this.isMuted.toString());
    if (!this.isMuted) {
      this.ensureContext();
    }
    return this.isMuted;
  }

  toggleBgm() {
    this.bgmMuted = !this.bgmMuted;
    return this.bgmMuted;
  }

  toggleSfx() {
    this.sfxMuted = !this.sfxMuted;
    return this.sfxMuted;
  }
}

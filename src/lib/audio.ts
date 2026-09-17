// Procedural Web Audio API sound synthesizer
// Zero external assets required — reliable, offline, instant

class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;
  public isMuted = false;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleAmbient(): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  public getIsAmbientPlaying(): boolean {
    return this.isAmbientPlaying;
  }

  public startAmbient() {
    const ctx = this.initCtx();
    if (!ctx || this.isMuted) return;

    try {
      if (this.isAmbientPlaying) return;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 3);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(160, ctx.currentTime);
      filter.Q.setValueAtTime(4, ctx.currentTime);

      // Low frequency drone
      const osc1 = ctx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

      // Gentle sub harmonic
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(110, ctx.currentTime);

      // LFO filter sweep for cosmic breathing effect
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
      lfoGain.gain.setValueAtTime(60, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      this.ambientOsc1 = osc1;
      this.ambientOsc2 = osc2;
      this.ambientFilter = filter;
      this.ambientGain = masterGain;
      this.isAmbientPlaying = true;
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public stopAmbient() {
    if (!this.ctx || !this.ambientGain || !this.isAmbientPlaying) return;
    try {
      const currTime = this.ctx.currentTime;
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, currTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, currTime + 1.2);
      setTimeout(() => {
        try {
          this.ambientOsc1?.stop();
          this.ambientOsc2?.stop();
          this.ambientOsc1?.disconnect();
          this.ambientOsc2?.disconnect();
        } catch {}
        this.isAmbientPlaying = false;
      }, 1300);
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  public playHover() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.05);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {}
  }

  public playClick() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "triangle";
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  public playModeSwitch() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        const now = ctx.currentTime + idx * 0.045;
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.16);
      });
    } catch {}
  }

  public playSliderTick(val: number = 0.5) {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      
      const baseFreq = 300 + val * 400;
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, now);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {}
  }

  public playSuccess() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const notes = [440, 554.37, 659.25, 880]; // A major chime
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const now = ctx.currentTime + i * 0.08;
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.45);
      });
    } catch {}
  }
}

export const soundEngine = new SoundEngine();

/**
 * QRub Audio Engine
 * Managed identity sound effects for learning reinforcement.
 */

export type QrubSoundEffect = 'swoosh' | 'success' | 'error' | 'pulse' | 'click' | 'data_entry' | 'success_final'

class AudioEngine {
  private static instance: AudioEngine
  private enabled: boolean = true
  private volume: number = 0.4
  private audioCache: Map<string, HTMLAudioElement> = new Map()

  private constructor() {
    // In a browser environment, we check for preferences
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('qrub_audio_enabled')
      this.enabled = saved !== 'false'
    }
  }

  static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine()
    }
    return AudioEngine.instance
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
    localStorage.setItem('qrub_audio_enabled', String(enabled))
  }

  /** Play a sound effect with identity */
  async play(effect: QrubSoundEffect) {
    if (!this.enabled || typeof window === 'undefined') return

    try {
      // Logic for playing assets
      // For now, we use a Web Audio API fallback to ensure immediate feedback
      this.playSynthetic(effect)
      
      /* Target implementation once assets are ready:
      let audio = this.audioCache.get(effect)
      if (!audio) {
        audio = new Audio(`/sounds/${effect}.mp3`)
        audio.volume = this.volume
        this.audioCache.set(effect, audio)
      }
      audio.currentTime = 0
      await audio.play()
      */
    } catch (e) {
      console.warn('AudioEngine: Failed to play sound', e)
    }
  }

  /** Synthetic Feedback (Web Audio API) - Ensuring we have a "Futuristic" feel even without assets */
  private playSynthetic(effect: QrubSoundEffect) {
    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return

    const ctx = new AudioContextClass()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime

    switch (effect) {
      case 'success':
        osc.type = 'sine'
        osc.frequency.setValueAtTime(440, now)
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1)
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(this.volume, now + 0.05)
        gain.gain.linearRampToValueAtTime(0, now + 0.3)
        osc.start(now)
        osc.stop(now + 0.3)
        break
      case 'error':
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(120, now)
        osc.frequency.linearRampToValueAtTime(80, now + 0.2)
        gain.gain.setValueAtTime(this.volume, now)
        gain.gain.linearRampToValueAtTime(0, now + 0.2)
        osc.start(now)
        osc.stop(now + 0.2)
        break
      case 'swoosh':
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(100, now)
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.4)
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(this.volume * 0.5, now + 0.2)
        gain.gain.linearRampToValueAtTime(0, now + 0.4)
        osc.start(now)
        osc.stop(now + 0.4)
        break
      case 'pulse':
        osc.type = 'sine'
        osc.frequency.setValueAtTime(523.25, now) // C5
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(this.volume, now + 0.05)
        gain.gain.linearRampToValueAtTime(0, now + 0.1)
        gain.gain.linearRampToValueAtTime(this.volume, now + 0.15)
        gain.gain.linearRampToValueAtTime(0, now + 0.2)
        osc.start(now)
        osc.stop(now + 0.3)
        break
      case 'click':
        osc.type = 'sine'
        osc.frequency.setValueAtTime(800, now)
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(this.volume * 0.2, now + 0.01)
        gain.gain.linearRampToValueAtTime(0, now + 0.05)
        osc.start(now)
        osc.stop(now + 0.05)
        break
      case 'data_entry':
        osc.type = 'square'
        osc.frequency.setValueAtTime(1000, now)
        osc.frequency.setValueAtTime(2000, now + 0.05)
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(this.volume * 0.3, now + 0.01)
        gain.gain.linearRampToValueAtTime(0, now + 0.1)
        osc.start(now)
        osc.stop(now + 0.1)
        break
      case 'success_final':
        osc.type = 'sine'
        osc.frequency.setValueAtTime(523, now)
        osc.frequency.exponentialRampToValueAtTime(659, now + 0.1)
        osc.frequency.exponentialRampToValueAtTime(783, now + 0.2)
        osc.frequency.exponentialRampToValueAtTime(1046, now + 0.3)
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(this.volume, now + 0.05)
        gain.gain.linearRampToValueAtTime(0, now + 0.5)
        osc.start(now)
        osc.stop(now + 0.5)
        break
    }
  }
}

export const QrubAudio = AudioEngine.getInstance()

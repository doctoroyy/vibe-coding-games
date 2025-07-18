class AudioManager {
  private audioContext: AudioContext | null = null;
  private sounds: { [key: string]: AudioBuffer } = {};
  private enabled: boolean = true;

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported');
    }
  }

  // 生成简单的音效
  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine'): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const numSamples = duration * sampleRate;
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      let sample = 0;

      switch (type) {
        case 'sine':
          sample = Math.sin(2 * Math.PI * frequency * t);
          break;
        case 'square':
          sample = Math.sin(2 * Math.PI * frequency * t) > 0 ? 1 : -1;
          break;
        case 'triangle':
          sample = (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * frequency * t));
          break;
      }

      // 添加淡出效果
      const fadeOut = Math.max(0, 1 - (t / duration) * 2);
      channelData[i] = sample * fadeOut * 0.1; // 降低音量
    }

    return buffer;
  }

  // 初始化游戏音效
  initGameSounds() {
    if (!this.audioContext) return;

    // 贪吃蛇音效
    this.sounds.snakeEat = this.createTone(800, 0.1, 'sine') || new AudioBuffer({ length: 1, sampleRate: 44100 });
    this.sounds.snakeGameOver = this.createTone(200, 0.5, 'square') || new AudioBuffer({ length: 1, sampleRate: 44100 });

    // 俄罗斯方块音效
    this.sounds.tetrisMove = this.createTone(400, 0.05, 'square') || new AudioBuffer({ length: 1, sampleRate: 44100 });
    this.sounds.tetrisRotate = this.createTone(600, 0.08, 'sine') || new AudioBuffer({ length: 1, sampleRate: 44100 });
    this.sounds.tetrisLineClear = this.createTone(1000, 0.2, 'sine') || new AudioBuffer({ length: 1, sampleRate: 44100 });
    this.sounds.tetrisGameOver = this.createTone(150, 0.8, 'square') || new AudioBuffer({ length: 1, sampleRate: 44100 });

    // 2048音效
    this.sounds.tile2048Move = this.createTone(500, 0.1, 'sine') || new AudioBuffer({ length: 1, sampleRate: 44100 });
    this.sounds.tile2048Merge = this.createTone(700, 0.15, 'triangle') || new AudioBuffer({ length: 1, sampleRate: 44100 });
    this.sounds.game2048Win = this.createTone(1200, 0.3, 'sine') || new AudioBuffer({ length: 1, sampleRate: 44100 });
  }

  playSound(soundName: string) {
    if (!this.enabled || !this.audioContext || !this.sounds[soundName]) return;

    try {
      const source = this.audioContext.createBufferSource();
      source.buffer = this.sounds[soundName];
      source.connect(this.audioContext.destination);
      source.start();
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  // 恢复音频上下文（用户交互后）
  resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

export const audioManager = new AudioManager();

// 在用户首次交互时初始化音效
export const initAudioOnUserInteraction = () => {
  const handleUserInteraction = () => {
    audioManager.resumeAudioContext();
    audioManager.initGameSounds();
    
    // 移除事件监听器
    document.removeEventListener('click', handleUserInteraction);
    document.removeEventListener('touchstart', handleUserInteraction);
    document.removeEventListener('keydown', handleUserInteraction);
  };

  document.addEventListener('click', handleUserInteraction);
  document.addEventListener('touchstart', handleUserInteraction);
  document.addEventListener('keydown', handleUserInteraction);
};
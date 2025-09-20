'use client';

import { useEffect, useRef } from 'react';

export type SoundType =
  | 'success'
  | 'celebration'
  | 'gentle-notify'
  | 'needs-attention'
  | 'click'
  | 'whoosh'
  | 'sparkle';

interface SoundEffectsProps {
  enabled?: boolean;
}

class AudioManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<SoundType, () => void> = new Map();

  constructor() {
    this.initializeAudioContext();
    this.setupSounds();
  }

  private initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }

  private setupSounds() {
    if (!this.audioContext) return;

    // Success sound - gentle ascending tones
    this.sounds.set('success', () => {
      this.playTone([440, 554, 659], [0.1, 0.15, 0.2], 0.3);
    });

    // Celebration sound - party-like sequence
    this.sounds.set('celebration', () => {
      this.playTone([523, 659, 784, 1047], [0.1, 0.1, 0.1, 0.15], 0.4);
    });

    // Gentle notification - soft and calming
    this.sounds.set('gentle-notify', () => {
      this.playTone([523, 659], [0.2, 0.3], 0.2);
    });

    // Error sound - understanding, not harsh
    this.sounds.set('needs-attention', () => {
      this.playTone([330, 294], [0.2, 0.3], 0.2);
    });

    // Click sound - satisfying feedback
    this.sounds.set('click', () => {
      this.playTone([800], [0.05], 0.1);
    });

    // Whoosh sound - for transitions
    this.sounds.set('whoosh', () => {
      this.playWhiteNoise(0.1, 'lowpass', 400);
    });

    // Sparkle sound - magical and light
    this.sounds.set('sparkle', () => {
      this.playTone([1047, 1319, 1568, 2093], [0.05, 0.05, 0.05, 0.1], 0.15);
    });
  }

  private playTone(
    frequencies: number[],
    durations: number[],
    volume: number = 0.1
  ) {
    if (!this.audioContext) return;

    const currentTime = this.audioContext.currentTime;
    let startTime = currentTime;

    frequencies.forEach((frequency, index) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);

      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        startTime + (durations[index] || 0.1)
      );

      oscillator.start(startTime);
      oscillator.stop(startTime + (durations[index] || 0.1));

      startTime += (durations[index] || 0.1) * 0.8; // Overlap slightly for smoother sound
    });
  }

  private playWhiteNoise(
    duration: number,
    filterType: BiquadFilterType = 'lowpass',
    frequency: number = 1000
  ) {
    if (!this.audioContext) return;

    const bufferSize = this.audioContext.sampleRate * duration;
    const buffer = this.audioContext.createBuffer(
      1,
      bufferSize,
      this.audioContext.sampleRate
    );
    const output = buffer.getChannelData(0);

    // Generate white noise
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const source = this.audioContext.createBufferSource();
    const filter = this.audioContext.createBiquadFilter();
    const gainNode = this.audioContext.createGain();

    source.buffer = buffer;
    filter.type = filterType;
    filter.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + duration
    );

    source.start();
    source.stop(this.audioContext.currentTime + duration);
  }

  public play(soundType: SoundType) {
    const sound = this.sounds.get(soundType);
    if (sound) {
      // Resume audio context if it's suspended (required for user interaction)
      if (this.audioContext?.state === 'suspended') {
        this.audioContext.resume();
      }
      sound();
    }
  }

  public setVolume(_volume: number) {
    // Volume control would be implemented here
    // For now, volumes are set per sound in the playTone method
  }
}

let audioManager: AudioManager | null = null;

export function SoundEffects({ enabled = true }: SoundEffectsProps) {
  const audioManagerRef = useRef<AudioManager | null>(null);

  useEffect(() => {
    if (enabled && !audioManagerRef.current) {
      audioManagerRef.current = new AudioManager();
      audioManager = audioManagerRef.current;
    }

    return () => {
      // Cleanup if needed
    };
  }, [enabled]);

  return null; // This component doesn't render anything
}

// Hook for using sound effects throughout the app
export function useSoundEffects() {
  const playSound = (soundType: SoundType) => {
    if (audioManager) {
      audioManager.play(soundType);
    }
  };

  return { playSound };
}

// Utility functions for common sound patterns
export const SoundUtils = {
  // Play success sound with haptic feedback
  playSuccess: () => {
    if (audioManager) {
      audioManager.play('success');
    }
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 100]);
    }
  },

  // Play celebration with enhanced feedback
  playCelebration: () => {
    if (audioManager) {
      audioManager.play('celebration');
    }
    // Enhanced haptic pattern
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }
  },

  // Play gentle notification
  playNotification: () => {
    if (audioManager) {
      audioManager.play('gentle-notify');
    }
    // Gentle haptic
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  },

  // Play gentle attention-getting sound
  playNeedsAttention: () => {
    if (audioManager) {
      audioManager.play('needs-attention');
    }
    // No harsh vibration for attention - just sound
  },

  // Play satisfying click
  playClick: () => {
    if (audioManager) {
      audioManager.play('click');
    }
    // Light haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  },

  // Play magical sparkle sound
  playSparkle: () => {
    if (audioManager) {
      audioManager.play('sparkle');
    }
    // Light magical vibration
    if ('vibrate' in navigator) {
      navigator.vibrate([20, 10, 20, 10, 30]);
    }
  },
};

// High-order component to add sound to buttons
interface WithSoundProps {
  soundType?: SoundType;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function WithSound({
  soundType = 'click',
  children,
  onClick,
  className = '',
  disabled = false,
  ...props
}: WithSoundProps) {
  const { playSound } = useSoundEffects();

  const handleClick = () => {
    if (!disabled) {
      playSound(soundType);
      onClick?.();
    }
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

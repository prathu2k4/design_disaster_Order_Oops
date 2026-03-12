// Random sound effects for maximum annoyance
const sounds = {
  doorbell: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
  explosion: 'https://assets.mixkit.co/active_storage/sfx/2809/2809-preview.mp3',
  alarm: 'https://assets.mixkit.co/active_storage/sfx/2363/2363-preview.mp3',
  laugh: 'https://assets.mixkit.co/active_storage/sfx/2011/2011-preview.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  whoosh: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3',
};

const soundKeys = Object.keys(sounds) as Array<keyof typeof sounds>;

export const playRandomSound = () => {
  try {
    const randomKey = soundKeys[Math.floor(Math.random() * soundKeys.length)];
    const audio = new Audio(sounds[randomKey]);
    audio.volume = 0.3; // Not too loud
    audio.play().catch(() => {
      // Ignore errors if sound can't play (some browsers block autoplay)
    });
  } catch (error) {
    // Silently fail if audio doesn't work
  }
};

export const playSpecificSound = (soundName: keyof typeof sounds) => {
  try {
    const audio = new Audio(sounds[soundName]);
    audio.volume = 0.3;
    audio.play().catch(() => {});
  } catch (error) {
    // Silently fail
  }
};

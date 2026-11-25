export function isTtsSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof window.SpeechSynthesisUtterance !== 'undefined'
  );
}

export function stopSpeaking(): void {
  if (!isTtsSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    // Ignore errors on unsupported mobile WebViews
  }
}

export function speakPortuguese(
  text: string,
  callbacks?: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  }
): boolean {
  if (!isTtsSupported() || !text.trim()) {
    callbacks?.onError?.();
    return false;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.96;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const ptVoice =
      voices.find((v) => v.lang.toLowerCase() === 'pt-br') ??
      voices.find((v) => v.lang.toLowerCase().startsWith('pt'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onstart = () => callbacks?.onStart?.();
    utterance.onend = () => callbacks?.onEnd?.();
    utterance.onerror = () => callbacks?.onError?.();

    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    callbacks?.onError?.();
    return false;
  }
}

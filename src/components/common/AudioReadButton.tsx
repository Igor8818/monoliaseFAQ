import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { isTtsSupported, speakPortuguese, stopSpeaking } from '../../utils/tts';

interface AudioReadButtonProps {
  text: string;
  label?: string;
  compact?: boolean;
  variant?: 'light' | 'dark';
}

export function AudioReadButton({
  text,
  label = 'Ouvir',
  compact = false,
  variant = 'light',
}: AudioReadButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const supported = isTtsSupported();

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [text]);

  if (!supported) return null;

  const handleToggle = () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }

    const started = speakPortuguese(text, {
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
    if (started) setSpeaking(true);
  };

  const styles =
    variant === 'dark'
      ? speaking
        ? 'bg-amber-400 text-forest-deep border-amber-300'
        : 'bg-white/15 hover:bg-white/25 text-white border-white/20'
      : speaking
        ? 'bg-forest-primary text-white border-forest-primary'
        : 'bg-forest-soft hover:bg-forest-soft/80 text-forest-deep border-forest-primary/20';

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={speaking ? 'Parar leitura em voz alta' : `${label} em voz alta`}
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold transition-all active:scale-95 ${
        compact ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs sm:text-sm'
      } ${styles}`}
    >
      {speaking ? (
        <>
          <VolumeX className="w-3.5 h-3.5 shrink-0" />
          <span>Parar</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 shrink-0" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

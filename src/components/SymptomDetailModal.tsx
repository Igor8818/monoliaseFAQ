import React, { useEffect, useState } from 'react';
import { AlertTriangle, Bookmark, CheckCircle2, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import type { SymptomItem } from '../types/guide';
import { AudioReadButton } from './common/AudioReadButton';

interface SymptomDetailModalProps {
  symptom: SymptomItem | null;
  onClose: () => void;
}

export function SymptomDetailModal({ symptom, onClose }: SymptomDetailModalProps) {
  const { isFavorite, toggleFavorite } = useAppState();
  const [zoom, setZoom] = useState<1 | 2 | 3>(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [symptom?.id]);

  useEffect(() => {
    if (!symptom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [symptom, onClose]);

  if (!symptom) return null;

  const saved = isFavorite('sintomas', symptom.id);
  const ttsText = `${symptom.title}. Estágio ${symptom.stageLabel}. ${symptom.shortDesc}. ${symptom.detailedObservation}`;

  const stageBadgeClass =
    symptom.stage === 'iniciais'
      ? 'bg-amber-500 text-white'
      : symptom.stage === 'intermediarios'
        ? 'bg-cacaoBrown text-white'
        : 'bg-dangerRed text-white';

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoom === 1) return;
    setDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || zoom === 1) return;
    const maxOffset = zoom === 2 ? 120 : 200;
    const nextX = Math.max(-maxOffset, Math.min(maxOffset, e.clientX - dragStart.x));
    const nextY = Math.max(-maxOffset, Math.min(maxOffset, e.clientY - dragStart.y));
    setPan({ x: nextX, y: nextY });
  };

  const handlePointerUp = () => setDragging(false);

  const cycleZoom = (target: 1 | 2 | 3) => {
    setZoom(target);
    if (target === 1) setPan({ x: 0, y: 0 });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-forest-deep/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={symptom.title}
    >
      <div className="w-full sm:max-w-xl bg-parchment rounded-t-3xl sm:rounded-3xl border border-borderSoft shadow-2xl overflow-hidden max-h-[88vh] sm:max-h-[84vh] flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="bg-forest-primary text-white px-5 py-4 flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <span
              className={`inline-block text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${stageBadgeClass}`}
            >
              {symptom.stageLabel}
            </span>
            <h2 className="text-lg font-extrabold truncate mt-1">{symptom.title}</h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => toggleFavorite('sintomas', symptom.id)}
              aria-label={saved ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
              className={`p-2.5 rounded-xl border transition-colors ${
                saved
                  ? 'bg-fitomolGold text-forest-deep border-amber-300'
                  : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
              }`}
            >
              <Bookmark className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} />
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar detalhe do sintoma"
              className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto min-h-0 flex-1 p-4 sm:p-5 space-y-4">
          {/* Interactive Zoomable Visual Plate */}
          <div className="bg-white rounded-2xl border border-borderSoft overflow-hidden shadow-card">
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className={`relative h-56 sm:h-64 bg-[#102414] overflow-hidden select-none ${
                zoom > 1 ? 'cursor-grab active:cursor-grabbing touch-none' : 'cursor-zoom-in'
              }`}
              onClick={() => {
                if (zoom === 1) cycleZoom(2);
              }}
            >
              <img
                src={symptom.image}
                alt={`Ilustração comparativa de ${symptom.title}`}
                className="w-full h-full object-cover transition-transform duration-200 ease-out"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                }}
                draggable={false}
              />

              {/* Zoom Toolbar */}
              <div
                className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/65 backdrop-blur-md text-white rounded-xl p-1 border border-white/15"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => cycleZoom(zoom === 3 ? 2 : 1)}
                  disabled={zoom === 1}
                  aria-label="Diminuir zoom"
                  className="p-1.5 rounded-lg hover:bg-white/15 disabled:opacity-40"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold px-1.5 tabular-nums">{zoom}×</span>
                <button
                  type="button"
                  onClick={() => cycleZoom(zoom === 1 ? 2 : 3)}
                  disabled={zoom === 3}
                  aria-label="Aumentar zoom"
                  className="p-1.5 rounded-lg hover:bg-white/15 disabled:opacity-40"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                {zoom > 1 && (
                  <button
                    type="button"
                    onClick={() => cycleZoom(1)}
                    aria-label="Resetar zoom"
                    className="p-1.5 rounded-lg hover:bg-white/15"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="px-4 py-2.5 bg-warmSand/70 border-t border-borderSoft flex items-center justify-between gap-2 text-xs text-slate-600">
              <span>Imagem ilustrativa de referência comparativa</span>
              {zoom > 1 && <span className="font-semibold text-forest-primary">Arraste para explorar</span>}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-forest-deep">{symptom.shortDesc}</p>
            <AudioReadButton text={ttsText} label="Ouvir" compact />
          </div>

          <div className="bg-white rounded-2xl border border-borderSoft p-4 shadow-card space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900">Descrição fitopatológica</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{symptom.detailedObservation}</p>
          </div>

          <div className="bg-forest-soft/80 rounded-2xl border border-forest-primary/15 p-4 space-y-2.5">
            <h3 className="text-sm font-extrabold text-forest-deep">
              O que observar neste estágio
            </h3>
            <ul className="space-y-2">
              {symptom.fieldChecklist.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-forest-deep">
                  <CheckCircle2 className="w-4 h-4 text-forest-primary shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {symptom.criticalWarning && (
            <div className="bg-dangerSoft border border-red-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-dangerRed shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-bold text-red-900 leading-relaxed">
                {symptom.criticalWarning}
              </p>
            </div>
          )}

          <div className="bg-warningAmberSoft border border-amber-300/70 rounded-2xl p-3.5 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-amber-950 leading-relaxed">
              Este aplicativo NÃO faz diagnóstico. Em caso de dúvida ou suspeita, mantenha distância, não colha o fruto e acione a CEPLAC ou a Defesa Agropecuária.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

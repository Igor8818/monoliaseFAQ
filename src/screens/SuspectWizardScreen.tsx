import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  FileDown,
  MapPin,
  Phone,
  Pin,
  Share2,
  X,
} from 'lucide-react';
import { OFFICIAL_CONTACTS } from '../data/officialContacts';
import { SUSPECT_PROTOCOL_STEPS } from '../data/suspectProtocol';
import { SYMPTOMS_CATALOG } from '../data/symptoms';
import {
  buildSuspectWhatsappText,
  generateSuspectAlertPdf,
  openWhatsappWithText,
} from '../utils/alertExport';
import { AudioReadButton } from '../components/common/AudioReadButton';
import { SuspectStepIcon } from '../components/icons/BotanicalIcons';

interface SuspectWizardScreenProps {
  onBack: () => void;
  onOpenFullContacts: () => void;
}

export function SuspectWizardScreen({
  onBack,
  onOpenFullContacts,
}: SuspectWizardScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [checkedSigns, setCheckedSigns] = useState<string[]>([]);
  const [farmNote, setFarmNote] = useState('');
  const [gpsCoords, setGpsCoords] = useState<{
    lat: number;
    lng: number;
    accuracy: number | null;
  } | null>(null);
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [gpsError, setGpsError] = useState('');
  const [quickCompareOpen, setQuickCompareOpen] = useState(false);
  const [pdfFeedback, setPdfFeedback] = useState<string | null>(null);
  const [selectedUf, setSelectedUf] = useState('BA');

  const totalSteps = SUSPECT_PROTOCOL_STEPS.length;
  const currentStep = SUSPECT_PROTOCOL_STEPS[stepIndex];
  const progressPct = Math.round(((stepIndex + 1) / totalSteps) * 100);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stepIndex]);

  const togglePoint = (text: string) => {
    setCheckedSigns((prev) =>
      prev.includes(text) ? prev.filter((item) => item !== text) : [...prev, text]
    );
  };

  const handleCaptureGps = () => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setGpsStatus('error');
      setGpsError('Geolocalização não suportada neste aparelho.');
      return;
    }

    setGpsStatus('loading');
    setGpsError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy ?? null,
        });
        setGpsStatus('success');
      },
      (err) => {
        setGpsStatus('error');
        setGpsError(
          err.code === 1
            ? 'Permissão de localização recusada. Você pode continuar normalmente digitando o nome da roça.'
            : 'Sinal GPS indisponível no momento. Você pode informar a localização por texto.'
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const reportPayload = {
    farmOrPlotNote: farmNote,
    observedSigns: checkedSigns,
    latitude: gpsCoords?.lat ?? null,
    longitude: gpsCoords?.lng ?? null,
    accuracyMeters: gpsCoords?.accuracy ?? null,
  };

  const handleDownloadPdf = async () => {
    try {
      const outcome = await generateSuspectAlertPdf(reportPayload);
      setPdfFeedback(
        outcome === 'shared'
          ? 'Ficha PDF pronta para compartilhamento!'
          : 'Ficha PDF salva nos seus downloads.'
      );
      setTimeout(() => setPdfFeedback(null), 4000);
    } catch {
      setPdfFeedback('Não foi possível salvar o PDF neste navegador. Use o envio via WhatsApp.');
    }
  };

  const handleSendWhatsapp = () => {
    const text = buildSuspectWhatsappText(reportPayload);
    openWhatsappWithText(text);
  };

  const ttsText = `Passo ${currentStep.stepNumber} de ${totalSteps}: ${currentStep.title}. ${currentStep.subtitle}. Pontos de atenção: ${currentStep.attentionPoints.join('. ')}. Atenção: ${currentStep.alertText}`;

  const alertStyles =
    currentStep.alertVariant === 'red'
      ? 'bg-dangerSoft border-red-200 text-red-900'
      : currentStep.alertVariant === 'yellow'
        ? 'bg-warningAmberSoft border-amber-300 text-amber-950'
        : 'bg-forest-soft border-forest-primary/25 text-forest-deep';

  const ufContact =
    OFFICIAL_CONTACTS.find((c) => c.uf === selectedUf) ?? OFFICIAL_CONTACTS[0];

  return (
    <div className="animate-fade-in-up min-h-[calc(100vh-5rem)] flex flex-col">
      {/* Green Header with step counter & linear progress bar matching prototype */}
      <header className="bg-forest-primary text-white sticky top-0 z-20 shadow-sm md:rounded-3xl md:static">
        <div className="px-4 sm:px-6 pt-4 pb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              aria-label="Sair do guia Fruto Suspeito"
              className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">
              Fruto Suspeito
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <AudioReadButton text={ttsText} label="Ouvir" variant="dark" compact />
            <span className="text-sm font-extrabold tabular-nums bg-white/15 px-3 py-1 rounded-full">
              {currentStep.stepNumber}/{totalSteps}
            </span>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="px-4 sm:px-6 pb-3.5">
          <div className="w-full h-1.5 rounded-full bg-white/25 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Step Body */}
      <div className="flex-1 p-4 sm:p-6 space-y-4 max-w-2xl w-full mx-auto">
        {/* Elevated Central Step Card */}
        <section className="bg-white rounded-3xl border border-borderSoft p-5 sm:p-6 shadow-card text-center space-y-2.5">
          <div className="w-16 h-16 rounded-2xl bg-forest-soft text-forest-primary mx-auto flex items-center justify-center mb-1">
            <SuspectStepIcon iconKey={currentStep.iconKey} className="w-9 h-9" />
          </div>

          <p className="text-xs font-extrabold uppercase tracking-widest text-forest-primary">
            PASSO {currentStep.stepNumber}
          </p>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {currentStep.title}
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            {currentStep.subtitle}
          </p>

          {currentStep.hasQuickCompare && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setQuickCompareOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-soft hover:bg-forest-primary hover:text-white text-forest-deep text-xs sm:text-sm font-bold transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Espiar fotos de &ldquo;Como Reconhecer&rdquo;</span>
              </button>
            </div>
          )}
        </section>

        {/* Pontos de atenção (green soft box matching prototype, interactive optional checkboxes) */}
        <section className="bg-forest-soft/85 rounded-3xl border border-forest-primary/15 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-forest-deep">
              <Pin className="w-4 h-4 text-forest-primary rotate-45" />
              <h3 className="text-sm sm:text-base font-extrabold">Pontos de atenção</h3>
            </div>
            <span className="text-[11px] font-semibold text-forest-deep/70">
              Toque para anotar (opcional)
            </span>
          </div>

          <ul className="space-y-2.5">
            {currentStep.attentionPoints.map((point, idx) => {
              const marked = checkedSigns.includes(point);
              return (
                <li key={point}>
                  <button
                    type="button"
                    onClick={() => togglePoint(point)}
                    className={`w-full text-left flex items-start gap-3 p-2.5 rounded-2xl transition-all ${
                      marked
                        ? 'bg-white/95 border border-forest-primary/40 shadow-sm'
                        : 'hover:bg-white/50 border border-transparent'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        marked
                          ? 'bg-forest-primary text-white'
                          : 'bg-forest-primary/90 text-white'
                      }`}
                    >
                      {marked ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : idx + 1}
                    </span>
                    <span className="text-sm text-slate-800 leading-snug">{point}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Step 4 Optional Offline GPS + Farm Reference */}
        {currentStep.hasOfflineGps && (
          <section className="bg-white rounded-3xl border border-borderSoft p-4 sm:p-5 shadow-card space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900">
              Registro rápido para informar ao técnico (opcional)
            </h3>

            <input
              type="text"
              value={farmNote}
              onChange={(e) => setFarmNote(e.target.value)}
              placeholder="Ex.: Fazenda Boa Vista, Roça do Fundo, perto do cocho"
              className="w-full px-3.5 py-2.5 rounded-xl bg-parchment border border-borderSoft text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-primary"
            />

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleCaptureGps}
                disabled={gpsStatus === 'loading'}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-soft hover:bg-forest-primary hover:text-white text-forest-deep text-xs sm:text-sm font-bold transition-colors disabled:opacity-60"
              >
                <MapPin className="w-4 h-4" />
                <span>
                  {gpsStatus === 'loading'
                    ? 'Obtendo satélite...'
                    : gpsCoords
                      ? 'Atualizar GPS Offline'
                      : 'Capturar GPS Offline'}
                </span>
              </button>

              {gpsCoords && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-primary tabular-nums">
                  <CheckCircle2 className="w-4 h-4" />
                  {gpsCoords.lat.toFixed(5)}, {gpsCoords.lng.toFixed(5)}
                </span>
              )}
            </div>

            {gpsStatus === 'error' && gpsError && (
              <p className="text-xs text-amber-800 bg-warningAmberSoft rounded-xl p-2.5">
                {gpsError}
              </p>
            )}
          </section>
        )}

        {/* Mandatory Alert Box */}
        <div className={`rounded-2xl border p-4 flex items-start gap-3 ${alertStyles}`}>
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-semibold leading-relaxed">
            {currentStep.alertText}
          </p>
        </div>

        {/* Step 6 Final Notification Actions */}
        {currentStep.isFinalNotification && (
          <section className="bg-white rounded-3xl border border-borderSoft p-4 sm:p-5 shadow-card space-y-4">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                Enviar Ficha Preliminar & Acionar Defesa
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {checkedSigns.length} ponto{checkedSigns.length === 1 ? '' : 's'} anotado
                {checkedSigns.length === 1 ? '' : 's'} ·{' '}
                {gpsCoords ? 'GPS capturado' : 'Sem GPS'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleSendWhatsapp}
                className="py-3.5 px-4 rounded-2xl bg-forest-primary hover:bg-forest-deep text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Enviar Alerta no WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                className="py-3.5 px-4 rounded-2xl bg-warmSand hover:bg-borderSoft text-slate-900 font-bold text-sm flex items-center justify-center gap-2 border border-borderSoft transition-colors"
              >
                <FileDown className="w-4 h-4" />
                <span>Baixar Ficha PDF</span>
              </button>
            </div>

            {pdfFeedback && (
              <p className="text-xs font-bold text-forest-primary bg-forest-soft rounded-xl px-3 py-2">
                {pdfFeedback}
              </p>
            )}

            {/* Quick UF Contact Dialer */}
            <div className="pt-3 border-t border-borderSoft space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                  Ligar para Defesa Estadual
                </span>
                <button
                  type="button"
                  onClick={onOpenFullContacts}
                  className="text-xs font-bold text-forest-primary hover:underline whitespace-nowrap shrink-0"
                >
                  Ver todos os estados →
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {OFFICIAL_CONTACTS.map((c) => (
                  <button
                    key={c.uf}
                    type="button"
                    onClick={() => setSelectedUf(c.uf)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      selectedUf === c.uf
                        ? 'bg-forest-primary text-white'
                        : 'bg-parchment text-slate-700 border border-borderSoft'
                    }`}
                  >
                    {c.uf}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl bg-parchment border border-borderSoft p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">
                    {ufContact.agency}
                  </p>
                  <p className="text-xs text-slate-600 truncate">{ufContact.notes}</p>
                </div>
                <a
                  href={ufContact.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-dangerRed hover:bg-red-800 text-white text-xs sm:text-sm font-bold shrink-0 tabular-nums transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Ligar {ufContact.phone}</span>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Navigation Buttons matching prototype */}
        <div className="flex items-center gap-3 pt-2 pb-4">
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              className="px-5 py-3.5 rounded-2xl bg-white border-2 border-forest-primary text-forest-primary font-extrabold text-sm sm:text-base hover:bg-forest-soft transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
          )}

          {stepIndex < totalSteps - 1 ? (
            <button
              type="button"
              onClick={() => setStepIndex((i) => Math.min(totalSteps - 1, i + 1))}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-forest-primary hover:bg-forest-deep text-white font-extrabold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Próximo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onBack}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-forest-deep hover:bg-forest-primary text-white font-extrabold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Concluir e voltar ao Início</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Compare Modal (without losing step 2/6 progress) */}
      {quickCompareOpen && (
        <div
          className="fixed inset-0 z-50 bg-forest-deep/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Referência rápida de sintomas"
        >
          <div className="w-full sm:max-w-2xl bg-parchment rounded-t-3xl sm:rounded-3xl border border-borderSoft shadow-2xl max-h-[88vh] flex flex-col overflow-hidden animate-fade-in-up">
            <div className="bg-forest-primary text-white px-5 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base">Referência Rápida de Sintomas</h3>
                <p className="text-xs text-emerald-100/85">
                  Compare sem sair do Passo {currentStep.stepNumber}/6
                </p>
              </div>
              <button
                type="button"
                onClick={() => setQuickCompareOpen(false)}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25"
                aria-label="Fechar referência rápida"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SYMPTOMS_CATALOG.map((sym) => (
                <div
                  key={sym.id}
                  className="bg-white rounded-2xl border border-borderSoft shadow-card flex items-start gap-3 p-3"
                >
                  <img
                    src={sym.image}
                    alt={sym.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-[#102414]"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-forest-soft text-forest-primary">
                      {sym.stageLabel}
                    </span>
                    <p className="font-extrabold text-slate-900 text-sm mt-1 leading-snug">
                      {sym.title}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {sym.shortDesc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

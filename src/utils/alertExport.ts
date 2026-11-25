import { jsPDF } from 'jspdf';

export interface SuspectAlertReportData {
  farmOrPlotNote: string;
  observedSigns: string[];
  latitude?: number | null;
  longitude?: number | null;
  accuracyMeters?: number | null;
  createdAtIso?: string;
}

export const PRELIMINARY_DISCLAIMER =
  'Relato Preliminar de Produtor — Este aplicativo NÃO faz diagnóstico laboratorial. As informações servem apenas para orientar a visita técnica da CEPLAC / Defesa Agropecuária.';

export function buildSuspectWhatsappText(data: SuspectAlertReportData): string {
  const dateLabel = new Date(data.createdAtIso ?? Date.now()).toLocaleString('pt-BR');
  const locationText = data.farmOrPlotNote.trim() || 'Não informado';
  const gpsText =
    data.latitude != null && data.longitude != null
      ? `${data.latitude.toFixed(6)}, ${data.longitude.toFixed(6)}${
          data.accuracyMeters ? ` (±${Math.round(data.accuracyMeters)}m)` : ''
        }`
      : 'Não capturado';

  const signsList =
    data.observedSigns.length > 0
      ? data.observedSigns.map((s) => `- ${s}`).join('\n')
      : '- Nenhum item específico marcado (solicita avaliação visual)';

  return [
    '*ALERTA PRELIMINAR — FRUTO SUSPEITO (Monilíase em Alerta)*',
    `Data/Hora: ${dateLabel}`,
    `Local / Roça / Referência: ${locationText}`,
    `Coordenada GPS: ${gpsText}`,
    '',
    '*Sinais observados (sem tocar/colher o fruto):*',
    signsList,
    '',
    '*Conduta adotada:* Fruto mantido na árvore, área isolada e sem transporte de material.',
    `_${PRELIMINARY_DISCLAIMER}_`,
  ].join('\n');
}

export function openWhatsappWithText(text: string): void {
  const encoded = encodeURIComponent(text);
  const url = `https://wa.me/?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export async function generateSuspectAlertPdf(
  data: SuspectAlertReportData
): Promise<'downloaded' | 'shared'> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const dateLabel = new Date(data.createdAtIso ?? Date.now()).toLocaleString('pt-BR');
  const locationText = data.farmOrPlotNote.trim() || 'Não informado pelo usuário';
  const gpsText =
    data.latitude != null && data.longitude != null
      ? `${data.latitude.toFixed(6)}, ${data.longitude.toFixed(6)}${
          data.accuracyMeters ? ` (precisão ±${Math.round(data.accuracyMeters)} m)` : ''
        }`
      : 'Não capturado';

  // Header verde institucional
  doc.setFillColor(27, 101, 53);
  doc.rect(0, 0, 210, 32, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.text('MONILÍASE EM ALERTA — FICHA PRELIMINAR DE SUSPEITA', 14, 15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('CEPLAC · FITOMOL | Guia de Prevenção do Cacaueiro (Offline)', 14, 23);

  // Carimbo de aviso obrigatório
  doc.setFillColor(255, 247, 224);
  doc.setDrawColor(217, 119, 6);
  doc.roundedRect(14, 39, 182, 20, 2, 2, 'FD');
  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  const disclaimerLines = doc.splitTextToSize(PRELIMINARY_DISCLAIMER, 174);
  doc.text(disclaimerLines, 18, 46);

  // Dados da ocorrência
  doc.setTextColor(22, 34, 26);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('1. Identificação do Registro', 14, 70);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.text(`Data e hora do registro: ${dateLabel}`, 14, 78);

  const locLines = doc.splitTextToSize(`Propriedade / Quadra / Referência: ${locationText}`, 182);
  doc.text(locLines, 14, 85);

  const afterLocY = 85 + locLines.length * 6;
  doc.text(`Coordenada GPS (offline): ${gpsText}`, 14, afterLocY);

  // Sinais marcados
  let cursorY = afterLocY + 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('2. Sinais Observados em Campo (a >= 30 cm)', 14, cursorY);
  cursorY += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  const items =
    data.observedSigns.length > 0
      ? data.observedSigns
      : ['Nenhum item específico selecionado na triagem preliminar.'];

  for (const item of items) {
    const wrapped = doc.splitTextToSize(`• ${item}`, 178);
    doc.text(wrapped, 16, cursorY);
    cursorY += wrapped.length * 6 + 2;
  }

  // Conduta recomendada
  cursorY += 6;
  doc.setFillColor(229, 244, 233);
  doc.roundedRect(14, cursorY, 182, 34, 2, 2, 'F');
  doc.setTextColor(15, 63, 35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('3. Conduta de Segurança Adotada', 18, cursorY + 8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  const conductLines = doc.splitTextToSize(
    'O fruto suspeito NÃO foi colhido nem transportado. A árvore/fileira foi sinalizada para vistoria segura exclusiva por técnico oficial da CEPLAC ou da Agência Estadual de Defesa Agropecuária.',
    174
  );
  doc.text(conductLines, 18, cursorY + 15);

  // Rodapé institucional
  doc.setDrawColor(220, 227, 220);
  doc.line(14, 276, 196, 276);
  doc.setTextColor(90, 105, 95);
  doc.setFontSize(8.5);
  doc.text('Monilíase em Alerta — Guia de prevenção do cacaueiro · CEPLAC / FITOMOL', 14, 283);

  const fileName = `alerta-moniliase-${new Date().toISOString().slice(0, 10)}.pdf`;

  try {
    const blob = doc.output('blob');
    const file = new File([blob], fileName, { type: 'application/pdf' });
    if (
      typeof navigator !== 'undefined' &&
      'canShare' in navigator &&
      navigator.canShare?.({ files: [file] })
    ) {
      await navigator.share({
        title: 'Ficha Preliminar — Monilíase em Alerta',
        text: buildSuspectWhatsappText(data),
        files: [file],
      });
      return 'shared';
    }
  } catch {
    // Fallback to direct download below
  }

  doc.save(fileName);
  return 'downloaded';
}

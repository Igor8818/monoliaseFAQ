export type DisinfectantTarget = 'pediluvio' | 'ferramentas' | 'veiculos';

export interface DilutionResult {
  valid: boolean;
  errorMessage?: string;
  waterLiters: number;
  bleachConcentrationPct: number;
  targetConcentrationPct: number;
  bleachMl: number;
  waterToAddMl: number;
  cups200ml: number;
  contactMinutes: number;
  practicalTip: string;
}

export const DISINFECTANT_TARGETS: Record<
  DisinfectantTarget,
  { label: string; recommendedTargetPct: number; contactMinutes: number; tip: string }
> = {
  pediluvio: {
    label: 'Botas e Pedilúvio',
    recommendedTargetPct: 0.5,
    contactMinutes: 1,
    tip: 'Escove e lave toda a lama da sola antes de mergulhar no pedilúvio. Troque a solução quando ficar turva.',
  },
  ferramentas: {
    label: 'Ferramentas (pós-campo)',
    recommendedTargetPct: 0.5,
    contactMinutes: 2,
    tip: 'Entre cada planta durante o corte prefira álcool 70%. Ao usar cloro no fim do dia, enxágue e seque para evitar ferrugem.',
  },
  veiculos: {
    label: 'Pneus, Caixas e Carroceria',
    recommendedTargetPct: 0.25,
    contactMinutes: 3,
    tip: 'Retire folhas secas, cascas e terra com jato de água antes de pulverizar a solução clorada.',
  },
};

/**
 * Calcula o volume exato de água sanitária comercial (2.0% ou 2.5% de cloro ativo)
 * para preparar uma solução sanitária pelo método C1 * V1 = C2 * V2.
 */
export function calculateBleachDilution(
  waterLiters: number,
  bleachConcentrationPct: number,
  targetConcentrationPct: number,
  target: DisinfectantTarget = 'pediluvio'
): DilutionResult {
  const targetMeta = DISINFECTANT_TARGETS[target];

  if (
    !Number.isFinite(waterLiters) ||
    !Number.isFinite(bleachConcentrationPct) ||
    !Number.isFinite(targetConcentrationPct) ||
    waterLiters <= 0 ||
    bleachConcentrationPct <= 0 ||
    targetConcentrationPct <= 0
  ) {
    return {
      valid: false,
      errorMessage: 'Informe volume e concentrações maiores que zero.',
      waterLiters: 0,
      bleachConcentrationPct: 0,
      targetConcentrationPct: 0,
      bleachMl: 0,
      waterToAddMl: 0,
      cups200ml: 0,
      contactMinutes: targetMeta.contactMinutes,
      practicalTip: targetMeta.tip,
    };
  }

  if (targetConcentrationPct >= bleachConcentrationPct) {
    return {
      valid: false,
      errorMessage: 'A concentração desejada deve ser menor que a da água sanitária original.',
      waterLiters,
      bleachConcentrationPct,
      targetConcentrationPct,
      bleachMl: 0,
      waterToAddMl: 0,
      cups200ml: 0,
      contactMinutes: targetMeta.contactMinutes,
      practicalTip: targetMeta.tip,
    };
  }

  const totalVolumeMl = waterLiters * 1000;
  // C1 * V1 = C2 * V_total => V1 = (C2 / C1) * V_total
  const bleachMl = Math.round((targetConcentrationPct / bleachConcentrationPct) * totalVolumeMl);
  const waterToAddMl = Math.max(0, Math.round(totalVolumeMl - bleachMl));
  const cups200ml = Math.round((bleachMl / 200) * 10) / 10;

  return {
    valid: true,
    waterLiters,
    bleachConcentrationPct,
    targetConcentrationPct,
    bleachMl,
    waterToAddMl,
    cups200ml,
    contactMinutes: targetMeta.contactMinutes,
    practicalTip: targetMeta.tip,
  };
}

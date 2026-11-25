import { describe, expect, it } from 'vitest';
import { calculateBleachDilution } from '../dilutionCalculator';

describe('dilutionCalculator', () => {
  it('calcula corretamente 10 L de solução a 0,5% usando água sanitária 2,5%', () => {
    // C1*V1 = C2*Vtotal => V1 = (0.5 / 2.5) * 10000 = 2000 mL (10 copos de 200mL)
    const result = calculateBleachDilution(10, 2.5, 0.5, 'pediluvio');
    expect(result.valid).toBe(true);
    expect(result.bleachMl).toBe(2000);
    expect(result.waterToAddMl).toBe(8000);
    expect(result.cups200ml).toBe(10);
    expect(result.contactMinutes).toBe(1);
  });

  it('calcula corretamente 5 L a 0,25% usando água sanitária 2,0%', () => {
    // (0.25 / 2.0) * 5000 = 625 mL (3.1 copos)
    const result = calculateBleachDilution(5, 2.0, 0.25, 'veiculos');
    expect(result.valid).toBe(true);
    expect(result.bleachMl).toBe(625);
    expect(result.waterToAddMl).toBe(4375);
    expect(result.cups200ml).toBe(3.1);
  });

  it('rejeita valores zero ou negativos sem gerar NaN/Infinity', () => {
    const r1 = calculateBleachDilution(0, 2.5, 0.5);
    expect(r1.valid).toBe(false);
    expect(Number.isNaN(r1.bleachMl)).toBe(false);

    const r2 = calculateBleachDilution(10, 0, 0.5);
    expect(r2.valid).toBe(false);
  });

  it('rejeita concentração desejada maior ou igual ao produto comercial', () => {
    const r = calculateBleachDilution(10, 2.0, 2.5);
    expect(r.valid).toBe(false);
    expect(r.errorMessage).toBeTruthy();
  });
});

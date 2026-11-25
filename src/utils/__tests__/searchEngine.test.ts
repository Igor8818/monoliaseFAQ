import { describe, expect, it } from 'vitest';
import { normalizeForSearch, searchGuideContent } from '../searchEngine';

describe('searchEngine', () => {
  it('normaliza acentos e maiúsculas corretamente', () => {
    expect(normalizeForSearch('Monilíase ÁLCOOL Calçados')).toBe('moniliase alcool calcados');
  });

  it('retorna vazio para string em branco', () => {
    expect(searchGuideContent('   ')).toEqual([]);
  });

  it('encontra sintomas, prevenção, biossegurança e FAQ sem precisar de acentos', () => {
    const moniliase = searchGuideContent('moniliase');
    expect(moniliase.length).toBeGreaterThan(0);

    const alcool = searchGuideContent('alcool');
    expect(alcool.some((item) => item.id === 'prev-do-3')).toBe(true);

    const calcados = searchGuideContent('calcados');
    expect(calcados.some((item) => item.id === 'bio-calcados')).toBe(true);

    const transporte = searchGuideContent('transportar frutos');
    expect(transporte.some((item) => item.id === 'faq-transportar-frutos')).toBe(true);
  });

  it('prioriza correspondências no título antes de corpo', () => {
    const res = searchGuideContent('Manchas Aquosas');
    expect(res[0]?.id).toBe('sym-manchas-aquosas');
  });
});

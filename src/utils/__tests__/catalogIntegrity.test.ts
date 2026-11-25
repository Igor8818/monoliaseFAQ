import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { BIOSECURITY_CATEGORIES } from '../../data/biosecurity';
import { DISEASE_OVERVIEW } from '../../data/diseaseInfo';
import { FAQ_ITEMS } from '../../data/faq';
import { OFFICIAL_CONTACTS } from '../../data/officialContacts';
import { PREVENTION_AVOID_ITEMS, PREVENTION_DO_ITEMS } from '../../data/prevention';
import { SUSPECT_PROTOCOL_STEPS } from '../../data/suspectProtocol';
import { DISEASE_COMPARISONS, SYMPTOMS_CATALOG } from '../../data/symptoms';

describe('catalogIntegrity', () => {
  it('mantém os textos literais essenciais do protótipo original', () => {
    expect(SYMPTOMS_CATALOG.map((s) => s.title)).toContain('Manchas Aquosas');
    expect(SYMPTOMS_CATALOG.map((s) => s.title)).toContain('Descoloração Inicial');

    const doTexts = PREVENTION_DO_ITEMS.map((d) => d.text);
    expect(doTexts).toEqual([
      'Monitorar regularmente as plantas e os frutos',
      'Remover e enterrar frutos infectados a pelo menos 30 cm',
      'Desinfectar ferramentas com álcool 70% entre cada planta',
      'Manter espaçamento adequado entre plantas para arejamento',
      'Realizar podas sanitárias periódicas',
      'Usar mudas certificadas e de origem conhecida',
      'Manter registros de ocorrências na propriedade',
      'Buscar assistência técnica ao menor sinal suspeito',
    ]);

    expect(BIOSECURITY_CATEGORIES.map((b) => b.title)).toEqual([
      'Pessoas',
      'Visitantes',
      'Roupas',
      'Calçados',
      'Ferramentas',
      'Equipamentos',
      'Veículos',
      'Material Vegetal',
    ]);

    expect(SUSPECT_PROTOCOL_STEPS).toHaveLength(6);
    expect(SUSPECT_PROTOCOL_STEPS[0].title).toBe('Observe o Fruto');
    expect(SUSPECT_PROTOCOL_STEPS[1].title).toBe('Compare os Sinais');
    expect(SUSPECT_PROTOCOL_STEPS[1].alertText).toContain('Este aplicativo NÃO faz diagnóstico.');

    const homeFaqs = FAQ_ITEMS.filter((f) => f.featuredOnHome).map((f) => f.question);
    expect(homeFaqs).toContain('Posso transportar frutos de cacau entre propriedades?');
    expect(homeFaqs).toContain('O visitante deve tomar algum cuidado especial?');
  });

  it('possui IDs únicos em todos os catálogos e contatos oficiais completos', () => {
    const allIds = [
      ...SYMPTOMS_CATALOG.map((x) => x.id),
      ...PREVENTION_DO_ITEMS.map((x) => x.id),
      ...PREVENTION_AVOID_ITEMS.map((x) => x.id),
      ...BIOSECURITY_CATEGORIES.map((x) => x.id),
      ...FAQ_ITEMS.map((x) => x.id),
      ...OFFICIAL_CONTACTS.map((x) => x.id),
    ];
    expect(new Set(allIds).size).toBe(allIds.length);
    expect(DISEASE_COMPARISONS).toHaveLength(3);
    expect(DISEASE_OVERVIEW.cyclePhases).toHaveLength(5);
    expect(OFFICIAL_CONTACTS.length).toBeGreaterThanOrEqual(6);
  });

  it('todas as imagens referenciadas existem em public/images/symptoms', () => {
    const publicDir = path.resolve(process.cwd(), 'public');
    const paths = [
      ...SYMPTOMS_CATALOG.map((s) => s.image),
      ...DISEASE_COMPARISONS.map((d) => d.image),
    ];

    for (const relPath of paths) {
      expect(relPath.startsWith('./images/symptoms/')).toBe(true);
      const cleanRel = relPath.replace(/^\.\//, '');
      const fullPath = path.join(publicDir, cleanRel);
      expect(fs.existsSync(fullPath), `Imagem ausente: ${fullPath}`).toBe(true);
    }
  });

  it('não contém créditos pessoais removidos por solicitação do usuário', () => {
    const serialized = JSON.stringify({
      SYMPTOMS_CATALOG,
      PREVENTION_DO_ITEMS,
      PREVENTION_AVOID_ITEMS,
      BIOSECURITY_CATEGORIES,
      SUSPECT_PROTOCOL_STEPS,
      DISEASE_OVERVIEW,
      FAQ_ITEMS,
      OFFICIAL_CONTACTS,
    });
    expect(serialized).not.toMatch(/Tauan/i);
    expect(serialized).not.toMatch(/Desenvolvido por/i);
  });
});

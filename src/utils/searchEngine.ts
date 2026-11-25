import { BIOSECURITY_CATEGORIES } from '../data/biosecurity';
import { DISEASE_OVERVIEW } from '../data/diseaseInfo';
import { FAQ_ITEMS } from '../data/faq';
import { PREVENTION_AVOID_ITEMS, PREVENTION_DO_ITEMS } from '../data/prevention';
import { SUSPECT_PROTOCOL_STEPS } from '../data/suspectProtocol';
import { SYMPTOMS_CATALOG } from '../data/symptoms';
import type { SearchResultItem } from '../types/guide';

export function normalizeForSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function searchGuideContent(rawQuery: string, limit = 24): SearchResultItem[] {
  const query = normalizeForSearch(rawQuery);
  if (!query) return [];

  const tokens = query.split(/\s+/).filter(Boolean);
  const results: SearchResultItem[] = [];

  const scoreMatch = (title: string, snippet: string, extraBody = ''): number => {
    const normTitle = normalizeForSearch(title);
    const normSnippet = normalizeForSearch(snippet);
    const normBody = normalizeForSearch(extraBody);
    const combined = `${normTitle} ${normSnippet} ${normBody}`;

    const matchesAll = tokens.every((t) => combined.includes(t));
    if (!matchesAll) return 0;

    let score = 0;
    if (normTitle.includes(query)) score += 100;
    for (const token of tokens) {
      if (normTitle.includes(token)) score += 35;
      if (normSnippet.includes(token)) score += 15;
      if (normBody.includes(token)) score += 6;
    }
    return score;
  };

  for (const sym of SYMPTOMS_CATALOG) {
    const score = scoreMatch(
      sym.title,
      sym.shortDesc,
      `${sym.stageLabel} ${sym.detailedObservation} ${sym.fieldChecklist.join(' ')}`
    );
    if (score > 0) {
      results.push({
        id: sym.id,
        type: 'sintoma',
        typeLabel: `Sintoma · ${sym.stageLabel}`,
        title: sym.title,
        snippet: sym.shortDesc,
        score,
        targetRoute: 'recognize',
        targetId: sym.id,
      });
    }
  }

  for (const item of PREVENTION_DO_ITEMS) {
    const score = scoreMatch(item.text, item.howTo, item.quarantineNote ?? '');
    if (score > 0) {
      results.push({
        id: item.id,
        type: 'prevencao',
        typeLabel: 'Prevenção · FAÇA',
        title: item.text,
        snippet: item.howTo,
        score,
        targetRoute: 'prevent',
        targetId: item.id,
      });
    }
  }

  for (const item of PREVENTION_AVOID_ITEMS) {
    const score = scoreMatch(item.text, item.whyAvoid);
    if (score > 0) {
      results.push({
        id: item.id,
        type: 'prevencao',
        typeLabel: 'Prevenção · EVITE',
        title: item.text,
        snippet: item.whyAvoid,
        score,
        targetRoute: 'prevent',
        targetId: item.id,
      });
    }
  }

  for (const bio of BIOSECURITY_CATEGORIES) {
    const score = scoreMatch(
      bio.title,
      bio.shortSummary,
      `${bio.whyCritical} ${bio.entrySteps.join(' ')} ${bio.exitSteps.join(' ')} ${bio.recommendedDisinfectants.join(' ')}`
    );
    if (score > 0) {
      results.push({
        id: bio.id,
        type: 'biosseguranca',
        typeLabel: 'Biossegurança',
        title: bio.title,
        snippet: bio.shortSummary,
        score,
        targetRoute: 'biosecurity',
        targetId: bio.id,
      });
    }
  }

  for (const faq of FAQ_ITEMS) {
    const score = scoreMatch(faq.question, faq.keyTakeaway, `${faq.category} ${faq.answer}`);
    if (score > 0) {
      results.push({
        id: faq.id,
        type: 'faq',
        typeLabel: `FAQ · ${faq.category}`,
        title: faq.question,
        snippet: faq.keyTakeaway,
        score,
        targetRoute: 'faq',
        targetId: faq.id,
      });
    }
  }

  for (const step of SUSPECT_PROTOCOL_STEPS) {
    const score = scoreMatch(
      `Passo ${step.stepNumber}: ${step.title}`,
      step.subtitle,
      `${step.attentionPoints.join(' ')} ${step.alertText}`
    );
    if (score > 0) {
      results.push({
        id: `suspect-${step.stepNumber}`,
        type: 'protocolo',
        typeLabel: 'Fruto Suspeito',
        title: `Passo ${step.stepNumber}/6 — ${step.title}`,
        snippet: step.subtitle,
        score,
        targetRoute: 'suspect',
        targetId: String(step.stepNumber),
      });
    }
  }

  for (const card of DISEASE_OVERVIEW.summaryCards) {
    const score = scoreMatch(card.title, card.body, 'moniliase ciclo fungo cupuacu');
    if (score > 0) {
      results.push({
        id: card.id,
        type: 'sobre',
        typeLabel: 'O que é a Monilíase',
        title: card.title,
        snippet: card.body,
        score,
        targetRoute: 'about',
        targetId: card.id,
      });
    }
  }

  return results
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'pt-BR'))
    .slice(0, limit);
}

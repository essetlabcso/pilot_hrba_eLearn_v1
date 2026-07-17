export const normalizeStableIds = (value: unknown, ids: readonly string[], legacy: readonly string[] = []) => Array.from(new Set(
  (Array.isArray(value) ? value : [])
    .map((item) => {
      if (typeof item === 'number' && Number.isInteger(item)) return legacy[item];
      if (typeof item === 'string' && /^\d+$/.test(item)) return legacy[Number(item)];
      return typeof item === 'string' ? item : '';
    })
    .filter((item): item is string => Boolean(item) && ids.includes(item)),
));

export function normalizeSafetyState(
  saved: Record<string, unknown>,
  itemIds: readonly string[],
) {
  const rawAnswers = saved.safetyAnswers && typeof saved.safetyAnswers === 'object' && !Array.isArray(saved.safetyAnswers)
    ? saved.safetyAnswers as Record<string, unknown>
    : {};
  const rawChecked = saved.safetyChecked && typeof saved.safetyChecked === 'object' && !Array.isArray(saved.safetyChecked)
    ? saved.safetyChecked as Record<string, unknown>
    : {};
  const activeItemSet = saved.batch2ItemSetVersion === 8;
  const answers: Record<string, string> = {};
  const checked: Record<string, boolean> = {};

  itemIds.forEach((id, index) => {
    const legacyNumericKey = String(index + 1);
    const answer = id === 'safe-item.08' && !activeItemSet
      ? rawAnswers['safe-item.11']
      : rawAnswers[id] ?? rawAnswers[legacyNumericKey];
    const wasChecked = id === 'safe-item.08' && !activeItemSet
      ? rawChecked['safe-item.11']
      : rawChecked[id] ?? rawChecked[legacyNumericKey];
    if (answer === 'safe' || answer === 'do-not-write') answers[id] = answer;
    checked[id] = wasChecked === true;
  });

  return { answers, checked };
}

export function useModels() {
  const models = [
    // 'openai/gpt-5-nano',
    // 'gpt-5-nano',
    'gpt-4o-mini',
    'anthropic/claude-haiku-4.5',
    'google/gemini-2.5-flash'
  ];

  const model = useCookie<string>('model', { default: () => models[0] as string });

  return {
    models,
    model
  };
}

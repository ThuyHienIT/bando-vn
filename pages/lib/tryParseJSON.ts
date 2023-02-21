export function tryParseJson(jsonStr: string, defaultValue?: any) {
  if (typeof jsonStr !== 'string') return jsonStr;
  try {
    return JSON.parse(jsonStr);
  } catch (e: any) {
    console.debug('Parse JSON Error::JSON str', jsonStr);
    return defaultValue;
  }
}

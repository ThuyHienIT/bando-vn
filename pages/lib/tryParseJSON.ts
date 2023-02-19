export function tryParseJson(jsonStr: string, defaultValue?: any) {
  try {
    return JSON.parse(jsonStr);
  } catch (e: any) {
    console.debug('Parse JSON Error::JSON str', jsonStr);
    console.debug('Parse JSON Error::', e);
    return defaultValue;
  }
}

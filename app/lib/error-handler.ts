export async function errorHandler<T>(fn: Function, defaultValue?: T): Promise<T | undefined> {
  try {
    return await fn();
  } catch (e: any) {
    return Promise.resolve(defaultValue);
  }
}

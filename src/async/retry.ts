/**
 * Async retry with exponential backoff.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 300
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 1) throw err;
    await new Promise((r) => setTimeout(r, delay));
    return retry(fn, retries - 1, delay * 2);
  }
}

/**
 * Derived computed reactive signals.
 */
import { Signal } from "./signal";

export function computed<T>(fn: () => T, deps: Signal<any>[]): () => T {
  let cached: T = fn();
  deps.forEach(d => d.subscribe(() => { cached = fn(); }));
  return () => cached;
}

import { randomUUID } from 'crypto';

interface Entry { answer: number; expires: number; }

// Lightweight in-memory CAPTCHA store (sufficient for a school project / single instance).
// For production/multi-instance you'd move this to Redis.
const store = new Map<string, Entry>();
const TTL_MS = 5 * 60 * 1000; // 5 minutes

function purge() {
  const now = Date.now();
  for (const [id, e] of store) if (e.expires < now) store.delete(id);
}

export function createCaptcha() {
  purge();
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const id = randomUUID();
  store.set(id, { answer: a + b, expires: Date.now() + TTL_MS });
  return { captchaId: id, question: `${a} + ${b} = ?` };
}

export function verifyCaptcha(id: string, answer: number | string): boolean {
  purge();
  if (!id) return false;
  const entry = store.get(id);
  if (!entry) return false;
  store.delete(id); // single-use
  if (entry.expires < Date.now()) return false;
  return Number(answer) === entry.answer;
}

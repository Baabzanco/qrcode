import { UrlFormData } from '../types';
import { validateUrl } from '../validators';

export function generateUrlPayload(data: UrlFormData): { payload: string; error?: string } {
  const trimmed = data.url.trim();
  const validation = validateUrl(trimmed);
  if (!validation.isValid) {
    return { payload: '', error: validation.error };
  }

  let normalized = trimmed;
  if (!normalized.includes('://')) {
    normalized = 'https://' + normalized;
  }

  return { payload: normalized };
}

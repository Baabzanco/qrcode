import { TextFormData } from '../types';

export function generateTextPayload(data: TextFormData): { payload: string; error?: string } {
  const text = data.text;
  if (!text.trim()) {
    return { payload: '', error: 'Text content cannot be empty.' };
  }
  return { payload: text };
}

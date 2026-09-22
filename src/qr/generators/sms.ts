import { SmsFormData } from '../types';
import { validatePhone } from '../validators';

export function generateSmsPayload(data: SmsFormData): { payload: string; error?: string } {
  const phoneValidation = validatePhone(data.phone);
  if (!phoneValidation.isValid) {
    return { payload: '', error: phoneValidation.error };
  }

  const cleanedPhone = data.phone.trim().replace(/\s+/g, '');
  const message = data.message.trim();

  // Format: SMSTO:number:message or smsto:+number:message
  const payload = message ? `SMSTO:${cleanedPhone}:${message}` : `SMSTO:${cleanedPhone}`;
  return { payload };
}

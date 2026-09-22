import { WhatsappFormData } from '../types';
import { validatePhone } from '../validators';

export function generateWhatsappPayload(data: WhatsappFormData): { payload: string; error?: string } {
  const phoneValidation = validatePhone(data.phone);
  if (!phoneValidation.isValid) {
    return { payload: '', error: phoneValidation.error };
  }

  // Remove +, spaces, dashes for wa.me URL
  const cleanedPhone = data.phone.trim().replace(/[\+\s\-\(\)]/g, '');
  if (!cleanedPhone || cleanedPhone.length < 5) {
    return { payload: '', error: 'Enter a valid phone number with country code.' };
  }

  let url = `https://wa.me/${cleanedPhone}`;
  if (data.message.trim()) {
    url += `?text=${encodeURIComponent(data.message.trim())}`;
  }

  return { payload: url };
}

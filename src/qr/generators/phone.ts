import { PhoneFormData } from '../types';
import { validatePhone } from '../validators';

export function generatePhonePayload(data: PhoneFormData): { payload: string; error?: string } {
  const phoneValidation = validatePhone(data.phone);
  if (!phoneValidation.isValid) {
    return { payload: '', error: phoneValidation.error };
  }

  const cleaned = data.phone.trim().replace(/\s+/g, '');
  return { payload: `tel:${cleaned}` };
}

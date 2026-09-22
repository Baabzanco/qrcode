import { EmailFormData } from '../types';
import { validateEmail } from '../validators';

export function generateEmailPayload(data: EmailFormData): { payload: string; error?: string } {
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    return { payload: '', error: emailValidation.error };
  }

  const email = encodeURIComponent(data.email.trim());
  let mailto = `mailto:${email}`;

  const params: string[] = [];
  if (data.subject.trim()) {
    params.push(`subject=${encodeURIComponent(data.subject.trim())}`);
  }
  if (data.message.trim()) {
    params.push(`body=${encodeURIComponent(data.message.trim())}`);
  }

  if (params.length > 0) {
    mailto += `?${params.join('&')}`;
  }

  return { payload: mailto };
}

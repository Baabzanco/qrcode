import { GeneratorTabType } from '../../types';
import { QRFormData } from '../types';
import { generateUrlPayload } from './url';
import { generateTextPayload } from './text';
import { generateWifiPayload } from './wifi';
import { generateEmailPayload } from './email';
import { generatePhonePayload } from './phone';
import { generateSmsPayload } from './sms';
import { generateWhatsappPayload } from './whatsapp';
import { generateVCardPayload } from './vcard';

export function generatePayload(type: GeneratorTabType, formData: QRFormData): { payload: string; error?: string } {
  switch (type) {
    case 'URL':
      return generateUrlPayload(formData.URL);
    case 'Text':
      return generateTextPayload(formData.Text);
    case 'WiFi':
      return generateWifiPayload(formData.WiFi);
    case 'Email':
      return generateEmailPayload(formData.Email);
    case 'Phone':
      return generatePhonePayload(formData.Phone);
    case 'SMS':
      return generateSmsPayload(formData.SMS);
    case 'WhatsApp':
      return generateWhatsappPayload(formData.WhatsApp);
    case 'vCard':
      return generateVCardPayload(formData.vCard);
    default:
      return { payload: '', error: 'Invalid QR type selected.' };
  }
}

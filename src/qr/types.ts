import { GeneratorTabType } from '../types';

export interface UrlFormData {
  url: string;
}

export interface TextFormData {
  text: string;
}

export interface WifiFormData {
  ssid: string;
  password: string;
  security: 'WPA/WPA2' | 'WEP' | 'None';
  hidden: boolean;
}

export interface EmailFormData {
  email: string;
  subject: string;
  message: string;
}

export interface PhoneFormData {
  phone: string;
}

export interface SmsFormData {
  phone: string;
  message: string;
}

export interface WhatsappFormData {
  phone: string;
  message: string;
}

export interface VCardFormData {
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

export type QRFormData = {
  URL: UrlFormData;
  Text: TextFormData;
  WiFi: WifiFormData;
  Email: EmailFormData;
  Phone: PhoneFormData;
  SMS: SmsFormData;
  WhatsApp: WhatsappFormData;
  vCard: VCardFormData;
};

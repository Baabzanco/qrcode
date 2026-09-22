export type GeneratorTabType = 
  | 'URL'
  | 'Text'
  | 'WiFi'
  | 'Email'
  | 'Phone'
  | 'SMS'
  | 'WhatsApp'
  | 'vCard';

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

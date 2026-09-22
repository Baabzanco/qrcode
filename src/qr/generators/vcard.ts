import { VCardFormData } from '../types';
import { validateVCardName } from '../validators';

// Helper to escape vCard special characters: \, ,, ;
function escapeVCard(str: string): string {
  return str.replace(/([\\,;])/g, '\\$1').replace(/\n/g, '\\n');
}

export function generateVCardPayload(data: VCardFormData): { payload: string; error?: string } {
  const nameValidation = validateVCardName(data.firstName, data.lastName);
  if (!nameValidation.isValid) {
    return { payload: '', error: nameValidation.error };
  }

  const firstName = escapeVCard(data.firstName.trim());
  const lastName = escapeVCard(data.lastName.trim());
  const fullName = `${firstName} ${lastName}`.trim();

  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${fullName}`
  ];

  if (data.company.trim()) {
    lines.push(`ORG:${escapeVCard(data.company.trim())}`);
  }
  if (data.jobTitle.trim()) {
    lines.push(`TITLE:${escapeVCard(data.jobTitle.trim())}`);
  }
  if (data.phone.trim()) {
    lines.push(`TEL:${escapeVCard(data.phone.trim())}`);
  }
  if (data.email.trim()) {
    lines.push(`EMAIL:${escapeVCard(data.email.trim())}`);
  }
  if (data.website.trim()) {
    lines.push(`URL:${escapeVCard(data.website.trim())}`);
  }
  if (data.address.trim()) {
    lines.push(`ADR:;;${escapeVCard(data.address.trim())};;;;`);
  }

  lines.push('END:VCARD');

  return { payload: lines.join('\n') };
}

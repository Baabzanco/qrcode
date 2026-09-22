export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateUrl(input: string): ValidationResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { isValid: false, error: 'URL is required.' };
  }

  // Check if it's a domain or URL
  let candidate = trimmed;
  if (!candidate.includes('://')) {
    candidate = 'https://' + candidate;
  }

  try {
    const parsed = new URL(candidate);
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return { isValid: false, error: 'Enter a valid domain or URL.' };
    }
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Enter a valid URL (e.g. example.com).' };
  }
}

export function validateEmail(input: string): ValidationResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Email address is required.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Enter a valid email address.' };
  }
  return { isValid: true };
}

export function validatePhone(input: string): ValidationResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Phone number is required.' };
  }
  // Allow international characters +, digits, spaces, hyphens, parentheses
  const phoneRegex = /^[\+]?[\d\s\-\(\)\.]{7,25}$/;
  if (!phoneRegex.test(trimmed)) {
    return { isValid: false, error: 'Enter a valid phone number.' };
  }
  return { isValid: true };
}

export function validateSsid(input: string): ValidationResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Network name (SSID) is required.' };
  }
  return { isValid: true };
}

export function validateVCardName(firstName: string, lastName: string): ValidationResult {
  if (!firstName.trim() && !lastName.trim()) {
    return { isValid: false, error: 'First name or last name is required.' };
  }
  return { isValid: true };
}

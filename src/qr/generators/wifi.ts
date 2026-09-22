import { WifiFormData } from '../types';
import { validateSsid } from '../validators';

// Helper to escape WiFi special characters: \, ;, ,, ", :
function escapeWifi(str: string): string {
  return str.replace(/([\\;,":])/g, '\\$1');
}

export function generateWifiPayload(data: WifiFormData): { payload: string; error?: string } {
  const ssidValidation = validateSsid(data.ssid);
  if (!ssidValidation.isValid) {
    return { payload: '', error: ssidValidation.error };
  }

  const ssid = escapeWifi(data.ssid.trim());
  const hidden = data.hidden ? 'true' : 'false';

  let type = 'WPA';
  if (data.security === 'WEP') {
    type = 'WEP';
  } else if (data.security === 'None') {
    type = 'nopass';
  }

  let payload = `WIFI:T:${type};S:${ssid};`;

  if (type !== 'nopass') {
    const password = escapeWifi(data.password);
    payload += `P:${password};`;
  }

  payload += `H:${hidden};;`;

  return { payload };
}

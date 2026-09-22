import QRCode from 'qrcode';

export async function generateQrSvg(text: string): Promise<string> {
  if (!text) return '';
  try {
    const svgString = await QRCode.toString(text, {
      type: 'svg',
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#111827',
        light: '#FFFFFF',
      },
    });
    return svgString;
  } catch (err: any) {
    if (err && err.message && err.message.includes('too long')) {
      throw new Error('This content is too large for a QR code.');
    }
    throw new Error('Failed to generate QR code.');
  }
}

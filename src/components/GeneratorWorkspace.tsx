import React, { useState, useEffect } from 'react';
import { GeneratorTabType } from '../types';
import { QRFormData } from '../qr/types';
import { GeneratorTabs } from './GeneratorTabs';
import { Input } from './Input';
import { Button } from './Button';
import { PrivacyBadge } from './PrivacyBadge';
import { generatePayload } from '../qr/generators';
import { generateQrSvg } from '../qr/utils/qrRenderer';
import { Copy, Check, QrCode as QrCodeIcon, AlertCircle } from 'lucide-react';

export const GeneratorWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GeneratorTabType>('URL');
  
  const [formData, setFormData] = useState<QRFormData>({
    URL: { url: 'https://example.com' },
    Text: { text: 'Hello from QR Toolkit! Fast, private, and secure.' },
    WiFi: { ssid: 'TestWiFi', password: 'test123456', security: 'WPA/WPA2', hidden: false },
    Email: { email: 'test@example.com', subject: 'Hello', message: 'Test message' },
    Phone: { phone: '+14155552671' },
    SMS: { phone: '+14155552671', message: 'Hello from QR Toolkit' },
    WhatsApp: { phone: '+14155552671', message: 'Hello from QR Toolkit' },
    vCard: {
      firstName: 'John',
      lastName: 'Doe',
      company: 'Acme Inc.',
      jobTitle: '',
      phone: '+14155552671',
      email: 'john@example.com',
      website: '',
      address: ''
    }
  });

  const [showVCardOptional, setShowVCardOptional] = useState(true);
  const [copied, setCopied] = useState(false);
  const [qrSvg, setQrSvg] = useState<string>('');
  const [generationError, setGenerationError] = useState<string>('');
  const [fieldError, setFieldError] = useState<string>('');

  // Real-time QR generation effect
  useEffect(() => {
    const { payload, error } = generatePayload(activeTab, formData);
    
    if (error) {
      setFieldError(error);
      setQrSvg('');
      setGenerationError('');
      return;
    }

    setFieldError('');

    if (!payload) {
      setQrSvg('');
      setGenerationError('');
      return;
    }

    generateQrSvg(payload)
      .then((svg) => {
        setQrSvg(svg);
        setGenerationError('');
      })
      .catch((err) => {
        setQrSvg('');
        setGenerationError(err.message || 'This content is too large for a QR code.');
      });
  }, [activeTab, formData]);

  const handleCopyPayload = () => {
    const { payload } = generatePayload(activeTab, formData);
    if (payload) {
      navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-5 sm:p-8">
      {/* 1. Type selector */}
      <div className="mb-6">
        <GeneratorTabs activeTab={activeTab} onSelectTab={setActiveTab} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left side: Controls (approx 5 cols on lg) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-4">
            {activeTab === 'URL' && (
              <Input
                label="Website URL"
                placeholder="https://example.com"
                value={formData.URL.url}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    URL: { url: e.target.value },
                  })
                }
                helperText="Domains without protocol will be normalized to https://"
                error={!!fieldError}
              />
            )}

            {activeTab === 'Text' && (
              <div className="space-y-1.5">
                <label className="block text-[14px] font-medium text-[#374151]">
                  Plain Text Content
                </label>
                <textarea
                  rows={5}
                  className={`w-full bg-white p-3 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] rounded-[10px] border transition-all outline-none resize-none ${
                    fieldError
                      ? 'border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                      : 'border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#635BFF] focus:ring-[3px] focus:ring-[#635BFF]/12'
                  }`}
                  placeholder="Enter any text, notes, or code..."
                  value={formData.Text.text}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Text: { text: e.target.value },
                    })
                  }
                />
                <p className="text-[12px] text-[#6B7280]">Multilingual and multiline text supported.</p>
              </div>
            )}

            {activeTab === 'WiFi' && (
              <div className="space-y-4">
                <Input
                  label="Network Name (SSID)"
                  placeholder="e.g. Home-Network"
                  value={formData.WiFi.ssid}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      WiFi: { ...formData.WiFi, ssid: e.target.value },
                    })
                  }
                  error={!!fieldError}
                />
                {formData.WiFi.security !== 'None' && (
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Network password"
                    value={formData.WiFi.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        WiFi: { ...formData.WiFi, password: e.target.value },
                      })
                    }
                  />
                )}
                <div className="space-y-1.5">
                  <label className="block text-[14px] font-medium text-[#374151]">
                    Security
                  </label>
                  <select
                    value={formData.WiFi.security}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        WiFi: {
                          ...formData.WiFi,
                          security: e.target.value as 'WPA/WPA2' | 'WEP' | 'None',
                        },
                      })
                    }
                    className="w-full h-[44px] bg-white px-3 text-[14px] text-[#111827] rounded-[10px] border border-[#E5E7EB] focus:border-[#635BFF] focus:ring-[3px] focus:ring-[#635BFF]/12 outline-none cursor-pointer"
                  >
                    <option value="WPA/WPA2">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="None">None (Open)</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="hidden-wifi"
                    checked={formData.WiFi.hidden}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        WiFi: { ...formData.WiFi, hidden: e.target.checked },
                      })
                    }
                    className="w-4 h-4 rounded border-[#E5E7EB] text-[#635BFF] focus:ring-[#635BFF]"
                  />
                  <label htmlFor="hidden-wifi" className="text-[14px] text-[#374151] select-none cursor-pointer">
                    Hidden Network
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'Email' && (
              <div className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.Email.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Email: { ...formData.Email, email: e.target.value },
                    })
                  }
                  error={!!fieldError}
                />
                <Input
                  label="Subject (Optional)"
                  placeholder="Inquiry subject"
                  value={formData.Email.subject}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Email: { ...formData.Email, subject: e.target.value },
                    })
                  }
                />
                <div className="space-y-1.5">
                  <label className="block text-[14px] font-medium text-[#374151]">Message (Optional)</label>
                  <textarea
                    rows={3}
                    className="w-full bg-white p-3 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] rounded-[10px] border border-[#E5E7EB] focus:border-[#635BFF] focus:ring-[3px] focus:ring-[#635BFF]/12 outline-none resize-none"
                    placeholder="Email message body..."
                    value={formData.Email.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Email: { ...formData.Email, message: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            )}

            {activeTab === 'Phone' && (
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.Phone.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Phone: { phone: e.target.value },
                  })
                }
                helperText="Supports international country codes (e.g. +14155552671)"
                error={!!fieldError}
              />
            )}

            {activeTab === 'SMS' && (
              <div className="space-y-4">
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.SMS.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      SMS: { ...formData.SMS, phone: e.target.value },
                    })
                  }
                  error={!!fieldError}
                />
                <div className="space-y-1.5">
                  <label className="block text-[14px] font-medium text-[#374151]">Default Message</label>
                  <input
                    className="w-full h-[44px] bg-white px-3 py-3 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] rounded-[10px] border border-[#E5E7EB] focus:border-[#635BFF] focus:ring-[3px] focus:ring-[#635BFF]/12 outline-none"
                    placeholder="Text message..."
                    value={formData.SMS.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        SMS: { ...formData.SMS, message: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            )}

            {activeTab === 'WhatsApp' && (
              <div className="space-y-4">
                <Input
                  label="WhatsApp Number with Country Code"
                  type="tel"
                  placeholder="+1555019283"
                  value={formData.WhatsApp.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      WhatsApp: { ...formData.WhatsApp, phone: e.target.value },
                    })
                  }
                  helperText="Format: +1 followed by 10 digit number"
                  error={!!fieldError}
                />
                <div className="space-y-1.5">
                  <label className="block text-[14px] font-medium text-[#374151]">Pre-filled Message</label>
                  <input
                    className="w-full h-[44px] bg-white px-3 py-3 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] rounded-[10px] border border-[#E5E7EB] focus:border-[#635BFF] focus:ring-[3px] focus:ring-[#635BFF]/12 outline-none"
                    placeholder="Hi, I'd like more info..."
                    value={formData.WhatsApp.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        WhatsApp: { ...formData.WhatsApp, message: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            )}

            {activeTab === 'vCard' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="First Name"
                    placeholder="John"
                    value={formData.vCard.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vCard: { ...formData.vCard, firstName: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    value={formData.vCard.lastName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vCard: { ...formData.vCard, lastName: e.target.value },
                      })
                    }
                  />
                </div>
                {fieldError && <p className="text-[12px] text-[#DC2626]">{fieldError}</p>}

                {showVCardOptional && (
                  <div className="space-y-4 pt-2 border-t border-[#F3F4F6]">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Company"
                        placeholder="Acme Inc."
                        value={formData.vCard.company}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vCard: { ...formData.vCard, company: e.target.value },
                          })
                        }
                      />
                      <Input
                        label="Job Title"
                        placeholder="Engineering"
                        value={formData.vCard.jobTitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vCard: { ...formData.vCard, jobTitle: e.target.value },
                          })
                        }
                      />
                    </div>
                    <Input
                      label="Phone"
                      type="tel"
                      placeholder="+14155552671"
                      value={formData.vCard.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vCard: { ...formData.vCard, phone: e.target.value },
                        })
                      }
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.vCard.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vCard: { ...formData.vCard, email: e.target.value },
                        })
                      }
                    />
                    <Input
                      label="Website"
                      placeholder="https://example.com"
                      value={formData.vCard.website}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vCard: { ...formData.vCard, website: e.target.value },
                        })
                      }
                    />
                    <Input
                      label="Address"
                      placeholder="123 Main St, City, Country"
                      value={formData.vCard.address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vCard: { ...formData.vCard, address: e.target.value },
                        })
                      }
                    />
                  </div>
                )}

                {!showVCardOptional && (
                  <button
                    type="button"
                    onClick={() => setShowVCardOptional(true)}
                    className="text-[13px] font-semibold text-[#635BFF] hover:text-[#5147E5] inline-flex items-center gap-1 mt-1"
                  >
                    + Add more information (Company, Email, Address, etc.)
                  </button>
                )}
              </div>
            )}

            {fieldError && activeTab !== 'vCard' && (
              <div className="flex items-center gap-1.5 text-[#DC2626] text-[13px] bg-[#FEF2F2] p-2.5 rounded-[8px] border border-[#FEE2E2]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{fieldError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right side: QR Preview (approx 7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-[#F9FAFB] border border-[#E5E7EB] rounded-[16px] p-6 sm:p-8 text-center min-h-[380px]">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-[14px] font-semibold text-[#374151]">Live Preview</span>
            <span className="text-[12px] text-[#6B7280]">Instant Client-Side QR</span>
          </div>

          {/* QR Preview Card */}
          <div className="bg-white p-6 rounded-[14px] border border-[#E5E7EB] shadow-xs relative group my-2 flex items-center justify-center min-h-[250px] min-w-[250px]">
            {generationError ? (
              <div className="text-center p-4 space-y-2 max-w-[220px]">
                <AlertCircle className="w-8 h-8 text-[#DC2626] mx-auto" />
                <p className="text-[14px] font-medium text-[#DC2626]">{generationError}</p>
              </div>
            ) : qrSvg ? (
              <div
                className="w-[210px] h-[210px] sm:w-[230px] sm:h-[230px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-3 text-[#9CA3AF] p-6">
                <div className="w-16 h-16 rounded-[12px] bg-[#F5F3FF] text-[#635BFF] flex items-center justify-center">
                  <QrCodeIcon className="w-8 h-8 opacity-60" />
                </div>
                <p className="text-[14px] font-medium text-[#6B7280]">
                  Your QR code will appear here
                </p>
              </div>
            )}
          </div>

          {/* Action buttons for preview */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full mt-4">
            <Button
              variant="secondary"
              onClick={handleCopyPayload}
              disabled={!qrSvg}
              className={`flex items-center gap-2 ${!qrSvg ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {copied ? <Check className="w-4 h-4 text-[#16A34A]" /> : <Copy className="w-4 h-4 text-[#4B5563]" />}
              <span>{copied ? 'Copied Data!' : 'Copy Payload'}</span>
            </Button>
          </div>

          {/* Privacy indicator */}
          <div className="mt-6 pt-4 border-t border-[#E5E7EB] w-full flex items-center justify-center">
            <PrivacyBadge />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorWorkspace;

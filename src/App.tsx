import React, { useState } from 'react';
import { Header } from './components/Header';
import { GeneratorWorkspace } from './components/GeneratorWorkspace';
import { ToolCard } from './components/ToolCard';
import { Footer } from './components/Footer';
import { AdsPlaceholder } from './components/AdsPlaceholder';
import { Button } from './components/Button';
import { PrivacyBadge } from './components/PrivacyBadge';
import { ToolItem } from './types';
import { Shield, Zap, Sparkles, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

const TOOLS: ToolItem[] = [
  {
    id: 'scanner',
    name: 'QR Scanner',
    description: 'Scan QR codes instantly using your device camera or uploaded image.',
    iconName: 'Scan',
  },
  {
    id: 'inspector',
    name: 'QR Inspector',
    description: 'Analyze QR code payload structure, error correction level, and version.',
    iconName: 'Search',
  },
  {
    id: 'repair',
    name: 'QR Repair',
    description: 'Recover unreadable or damaged QR codes using error correction parity.',
    iconName: 'Wrench',
  },
  {
    id: 'health',
    name: 'QR Health Check',
    description: 'Verify scannability and contrast ratings across different mobile devices.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'compare',
    name: 'QR Compare',
    description: 'Compare two QR payloads side by side for integrity and version differences.',
    iconName: 'GitCompare',
  },
  {
    id: 'contrast',
    name: 'QR Contrast Checker',
    description: 'Ensure foreground and background colors meet optical scanning standards.',
    iconName: 'Eye',
  },
];

export default function App() {
  const [activeNav, setActiveNav] = useState('Create');

  const scrollToGenerator = () => {
    setActiveNav('Create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTools = () => {
    setActiveNav('Tools');
    const el = document.getElementById('tools-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex flex-col font-sans selection:bg-[#635BFF] selection:text-white">
      {/* Header */}
      <Header activeNav={activeNav} onNavClick={setActiveNav} />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 space-y-16">
        {activeNav === 'Resources' ? (
          <div className="max-w-3xl mx-auto py-12 space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-[36px] sm:text-[48px] font-bold tracking-tight text-[#111827]">
                Resources & Guides
              </h1>
              <p className="text-[16px] text-[#4B5563]">
                Everything you need to know about QR codes, error correction, and browser-first privacy.
              </p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-8 space-y-6 shadow-xs">
              <h2 className="text-[22px] font-bold text-[#111827]">How Client-Side QR Generation Works</h2>
              <p className="text-[15px] text-[#4B5563] leading-relaxed">
                QR Toolkit generates all codes directly inside your web browser using modern canvas and vector rendering algorithms. Your data never touches an external server, ensuring absolute confidentiality and speed.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-[#F9FAFB] rounded-[10px] border border-[#E5E7EB]">
                  <h3 className="font-semibold text-[15px] mb-1">Zero Server Logs</h3>
                  <p className="text-[13px] text-[#6B7280]">No tracking, no database storage, and no IP logging.</p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-[10px] border border-[#E5E7EB]">
                  <h3 className="font-semibold text-[15px] mb-1">Vector & Raster Exports</h3>
                  <p className="text-[13px] text-[#6B7280]">Export pristine SVG vectors or high-res PNGs instantly.</p>
                </div>
              </div>
            </div>
          </div>
        ) : activeNav === 'Privacy' ? (
          <div className="max-w-3xl mx-auto py-12 space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-[36px] sm:text-[48px] font-bold tracking-tight text-[#111827]">
                Privacy Policy
              </h1>
              <p className="text-[16px] text-[#4B5563]">
                Our commitment to zero data collection.
              </p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-8 space-y-6 shadow-xs">
              <h2 className="text-[20px] font-bold text-[#111827]">100% Client-Side Processing</h2>
              <p className="text-[15px] text-[#4B5563] leading-relaxed">
                At QR Toolkit, we believe privacy is a fundamental right. When you generate a QR code for your website, WiFi network, contact vCard, or personal text, the QR matrix is calculated entirely inside your browser's memory.
              </p>
              <p className="text-[15px] text-[#4B5563] leading-relaxed">
                We do not collect, store, or analyze any input data or generated QR graphics.
              </p>
            </div>
          </div>
        ) : activeNav === 'About' ? (
          <div className="max-w-3xl mx-auto py-12 space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-[36px] sm:text-[48px] font-bold tracking-tight text-[#111827]">
                About QR Toolkit
              </h1>
              <p className="text-[16px] text-[#4B5563]">
                Built for professionals, developers, and creators who need fast, clean, privacy-first QR utilities.
              </p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-8 space-y-6 shadow-xs">
              <h2 className="text-[20px] font-bold text-[#111827]">Our Philosophy</h2>
              <p className="text-[15px] text-[#4B5563] leading-relaxed">
                QR Toolkit was created to eliminate bloated, ad-ridden, and subscription-locked QR generators. Every tool is free, fast, watermark-free, and open to all.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section className="text-center max-w-3xl mx-auto pt-6 sm:pt-10 pb-4 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F3FF] border border-[#635BFF]/20 text-[#635BFF] text-[13px] font-medium shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Professional Browser Utilities</span>
              </div>

              <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] font-bold tracking-tight text-[#111827] leading-[1.1]">
                Free QR Code Generator
              </h1>

              <p className="text-[18px] sm:text-[20px] text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
                Create QR codes directly in your browser.
              </p>

              {/* Small privacy / value line */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[14px] text-[#6B7280] font-medium pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> No signup
                </span>
                <span className="text-[#D1D5DB]">•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> No watermark
                </span>
                <span className="text-[#D1D5DB]">•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> No expiration
                </span>
              </div>

              {/* Primary & Secondary CTA */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <Button onClick={scrollToGenerator} className="gap-2">
                  <span>Create a QR Code</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="secondary" onClick={scrollToTools}>
                  Explore Tools
                </Button>
              </div>
            </section>

            {/* Generator Preview Section / Workspace */}
            <section id="generator-section" className="scroll-mt-24">
              <GeneratorWorkspace />
            </section>

            {/* Optional structured Ads container */}
            <AdsPlaceholder />

            {/* Tools Preview Section */}
            <section id="tools-section" className="pt-8 space-y-8 scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5E7EB] pb-4">
                <div>
                  <h2 className="text-[28px] sm:text-[36px] font-bold text-[#111827] tracking-tight">
                    QR Tools
                  </h2>
                  <p className="text-[15px] text-[#6B7280] mt-1">
                    Advanced utilities for inspecting, repairing, and analyzing QR codes.
                  </p>
                </div>
                <span className="text-[13px] font-medium text-[#635BFF] bg-[#F5F3FF] px-3 py-1 rounded-[8px] border border-[#635BFF]/10 self-start sm:self-auto">
                  6 Professional Utilities
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {TOOLS.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    name={tool.name}
                    description={tool.description}
                    iconName={tool.iconName}
                    onClick={() => {
                      // Placeholder action for tools click
                      alert(`You selected ${tool.name}. Full tool functionality will be available in the next release step!`);
                    }}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavClick={setActiveNav} />
    </div>
  );
}

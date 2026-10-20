import React, { forwardRef } from 'react';
import { Employee, BoardSettings } from '../types';
import { toArabicNumerals } from '../data/defaultData';
import { GoldenStarAura } from './artwork/GoldenStarAura';
import { ArabesqueCorners } from './artwork/ArabesqueCorners';
import { CalligraphyHeader } from './artwork/CalligraphyHeader';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface IndividualCertificateProps {
  employee: Employee;
  monthName: string;
  year: number;
  useArabicNumerals?: boolean;
  settings: BoardSettings;
  customText?: string;
  isPrintMode?: boolean;
}

export const IndividualCertificate = forwardRef<HTMLDivElement, IndividualCertificateProps>(
  (
    {
      employee,
      monthName,
      year,
      useArabicNumerals = true,
      settings,
      customText,
      isPrintMode = false,
    },
    ref
  ) => {
    const formattedYear = useArabicNumerals ? toArabicNumerals(year) : year;

    const defaultTribute =
      customText ||
      `تقديراً وتثميناً لجهوده المخلصة وعطائه المشهود في خدمة الإمام الحسين (عليه السلام) وزائريه الكرام، وتتويجاً لتفانيه وتميزه كمنتسب مميز لشهر ${monthName} لعام ${formattedYear} م. سائلين العليّ القدير له دوام التوفيق والبركة في هذا الشرف المبارك.`;

    const publicUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}?view=public`
        : '';

    return (
      <div
        ref={ref}
        id="individual-certificate-node"
        className={`relative overflow-hidden w-full select-none text-slate-900 bg-amber-50/30 ${
          isPrintMode ? 'w-[794px] min-h-[1123px]' : 'aspect-[1/1.414] shadow-2xl rounded-2xl'
        }`}
        style={{
          backgroundImage: `url('/backgrounds/hussain_corner.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontFamily: "'Amiri', 'Cairo', serif",
        }}
      >
        {/* Soft Parchment Overlay for Readability */}
        <div className="absolute inset-0 bg-[#faf7ef]/90 pointer-events-none" />

        {/* Ornate Islamic Borders */}
        <div className="absolute inset-4 sm:inset-6 border-[3px] border-amber-600/80 rounded-2xl pointer-events-none" />
        <div className="absolute inset-6 sm:inset-8 border border-amber-500/50 rounded-xl pointer-events-none" />
        <div className="absolute inset-7 sm:inset-9 border border-dashed border-amber-400/40 rounded-lg pointer-events-none" />

        {/* Corner Arabesque Filigree */}
        <ArabesqueCorners opacity={0.8} />

        {/* Main Certificate Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between py-8 px-8 sm:py-12 sm:px-16 text-center">
          {/* Top Section */}
          <div className="flex flex-col items-center">
            {/* Basmala Calligraphy */}
            <p
              className="text-amber-900/90 text-sm sm:text-base font-bold tracking-widest"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            {/* Emblem / Header */}
            <div className="mt-2 sm:mt-3">
              <CalligraphyHeader title={settings.organizationName} />
            </div>

            {/* Grand Certificate Title */}
            <div className="mt-4 sm:mt-6 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold mb-1">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>وسام التميز والعطاء الشهري</span>
              </div>
              <h1
                className="text-3xl sm:text-5xl font-black text-amber-950 tracking-wide mt-1"
                style={{
                  fontFamily: "'Amiri', serif",
                  textShadow: '0 1px 2px rgba(0,0,0,0.08)',
                }}
              >
                شَهَادَةُ شُكْرٍ وَتَقْدِيرٍ
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mt-2 rounded-full" />
            </div>
          </div>

          {/* Middle Section: Photo & Recipient Name */}
          <div className="flex flex-col items-center my-auto py-2">
            <p className="text-sm sm:text-base font-bold text-slate-700 mb-3">
              تتشرّف إدارة المجمع بمنح هذه الشهادة للأخ المنتسب المتميز:
            </p>

            {/* Photo with Star Aura */}
            <div className="relative flex items-center justify-center mb-3">
              <GoldenStarAura density="luxury" enableAnimation={!isPrintMode} />
              <div
                className="relative rounded-full overflow-hidden shadow-xl z-10 border-4 border-amber-500"
                style={{
                  width: 'clamp(110px, 16vw, 150px)',
                  height: 'clamp(110px, 16vw, 150px)',
                  boxShadow: '0 0 20px rgba(245, 158, 11, 0.4), 0 10px 25px rgba(0,0,0,0.2)',
                }}
              >
                <img
                  src={employee.photoUrl}
                  alt={employee.name}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  crossOrigin="anonymous"
                />
              </div>
            </div>

            {/* Honoree Name Pill */}
            <div
              className="px-8 py-2 rounded-full shadow-md z-10 mt-1"
              style={{
                backgroundColor: settings.badgeColor || '#152e59',
                color: settings.badgeTextColor || '#ffffff',
              }}
            >
              <h2
                className="text-xl sm:text-2xl font-black tracking-wide"
                style={{ fontFamily: "'Cairo', 'Amiri', sans-serif" }}
              >
                {employee.name}
              </h2>
            </div>

            {/* Title & Department */}
            <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
              {employee.title && <span>{employee.title}</span>}
              {employee.title && employee.department && <span>•</span>}
              {employee.department && (
                <span className="text-amber-900 font-bold">{employee.department}</span>
              )}
            </div>

            {/* Appreciation Text Paragraph */}
            <div className="mt-4 max-w-lg mx-auto px-4 py-3 bg-white/70 border border-amber-200/80 rounded-2xl shadow-xs">
              <p
                className="text-xs sm:text-sm leading-relaxed text-slate-800 font-medium"
                style={{ fontFamily: "'Cairo', 'Amiri', sans-serif" }}
              >
                {defaultTribute}
              </p>
            </div>
          </div>

          {/* Bottom Section: Signatures & Official Stamp */}
          <div className="pt-2 border-t border-amber-200/60 mt-auto">
            <div className="flex items-center justify-between px-2 sm:px-6">
              {/* Right Signer */}
              <div className="text-center">
                <span className="block text-xs sm:text-sm font-bold text-slate-800">
                  {settings.signer1Title || 'مسؤول مجمع سيد الشهداء (ع)'}
                </span>
                <div className="h-10 sm:h-12 flex items-center justify-center">
                  <span
                    className="text-amber-800 font-serif italic text-base sm:text-lg opacity-85 select-none"
                    style={{ fontFamily: "'Amiri', serif" }}
                  >
                    التوقيع والاعتماد
                  </span>
                </div>
              </div>

              {/* Center Official Stamp & QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-amber-700/80 p-1 flex items-center justify-center relative bg-amber-50/50 shadow-inner">
                  <div className="w-full h-full rounded-full border border-amber-600 flex flex-col items-center justify-center text-center p-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    <span className="text-[8px] font-bold text-amber-950 leading-tight mt-0.5">
                      مجمع سيد الشهداء
                    </span>
                    <span className="text-[7px] text-amber-800 font-semibold">مُعتمَد رسمياً</span>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-1 text-[9px] text-slate-500 font-mono">
                  <span>كود التحقق:</span>
                  <span className="font-bold text-amber-900">{formattedYear}-{monthName}</span>
                </div>
              </div>

              {/* Left Signer */}
              <div className="text-center">
                <span className="block text-xs sm:text-sm font-bold text-slate-800">
                  {settings.signer2Title || 'رئيس الموارد البشرية والشؤون الإدارية'}
                </span>
                <div className="h-10 sm:h-12 flex items-center justify-center">
                  <span
                    className="text-amber-800 font-serif italic text-base sm:text-lg opacity-85 select-none"
                    style={{ fontFamily: "'Amiri', serif" }}
                  >
                    التوقيع والاعتماد
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

IndividualCertificate.displayName = 'IndividualCertificate';

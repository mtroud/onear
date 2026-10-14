import React, { forwardRef } from 'react';
import { Employee, BoardSettings } from '../types';
import { toArabicNumerals } from '../data/defaultData';
import { ShrineDomeWatermark } from './artwork/ShrineDomeWatermark';
import { ArabesqueCorners } from './artwork/ArabesqueCorners';
import { CalligraphyHeader } from './artwork/CalligraphyHeader';
import { CertificateFrame } from './artwork/CertificateFrame';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'motion/react';

interface CertificateBoardProps {
  settings: BoardSettings;
  monthName: string;
  year: number;
  useArabicNumerals?: boolean;
  person1: Employee | null;
  person2: Employee | null;
  customName1?: string;
  customTitle1?: string;
  customPhoto1?: string;
  photoOffset1?: { x: number; y: number; zoom: number };
  customName2?: string;
  customTitle2?: string;
  customPhoto2?: string;
  photoOffset2?: { x: number; y: number; zoom: number };
  isPrintMode?: boolean;
  animationKey?: number | string;
}

export const CertificateBoard = forwardRef<HTMLDivElement, CertificateBoardProps>(
  (
    {
      settings,
      monthName,
      year,
      useArabicNumerals = true,
      person1,
      person2,
      customName1,
      customTitle1,
      customPhoto1,
      photoOffset1 = { x: 0, y: 0, zoom: 1 },
      customName2,
      customTitle2,
      customPhoto2,
      photoOffset2 = { x: 0, y: 0, zoom: 1 },
      isPrintMode = false,
      animationKey = 0,
    },
    ref
  ) => {
    const shouldAnimate = settings.enableAnimations !== false && !isPrintMode;

    // Determine details for Person 1 (Displayed on the right in RTL or left depending on custom)
    const name1 = customName1 || person1?.name || 'الاسم الكامل للمنتسب الأول';
    const title1 = customTitle1 || person1?.title || 'المسمى الوظيفي';
    const dept1 = person1?.department || '';
    const photo1 =
      customPhoto1 ||
      person1?.photoUrl ||
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80';

    // Determine details for Person 2
    const name2 = customName2 || person2?.name || 'الاسم الكامل للمنتسب الثاني';
    const title2 = customTitle2 || person2?.title || 'المسمى الوظيفي';
    const dept2 = person2?.department || '';
    const photo2 =
      customPhoto2 ||
      person2?.photoUrl ||
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80';

    const formattedYear = useArabicNumerals ? toArabicNumerals(year) : year;

    // Background selection based on theme
    const getBackgroundStyles = () => {
      if (settings.theme === 'hussain_dome_corner') {
        return {
          backgroundImage: `url('/backgrounds/hussain_corner.jpg')`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        };
      }
      if (settings.theme === 'karbala_gold_frame') {
        return {
          backgroundImage: `url('/backgrounds/karbala_frame.jpg')`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        };
      }
      if (settings.theme === 'custom_bg' && settings.customBgUrl) {
        return {
          backgroundImage: `url(${settings.customBgUrl})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        };
      }
      if (settings.theme === 'royal_gold') {
        return {
          background: 'linear-gradient(135deg, #fdfbf7 0%, #f7f1e5 50%, #f1e7d0 100%)',
        };
      }
      if (settings.theme === 'emerald_luxury') {
        return {
          background: 'linear-gradient(135deg, #fbfdfc 0%, #f0f7f3 50%, #e2efe8 100%)',
        };
      }
      // shrine_classic
      return {
        background: 'radial-gradient(ellipse at 70% 30%, #ffffff 0%, #faf6ec 45%, #f4ebd7 100%)',
      };
    };

    const isImageBg =
      settings.theme === 'hussain_dome_corner' ||
      settings.theme === 'karbala_gold_frame' ||
      (settings.theme === 'custom_bg' && settings.customBgUrl);

    return (
      <div
        ref={ref}
        id="printable-honor-board"
        className={`relative overflow-hidden w-full select-none text-slate-900 ${
          isPrintMode ? 'print-board-dimensions' : 'aspect-[1.414/1] shadow-2xl rounded-2xl'
        }`}
        style={{
          ...getBackgroundStyles(),
          fontFamily: "'Amiri', 'Cairo', serif",
        }}
      >
        {/* Subtle backdrop overlay if brightness adjustment is needed */}
        {isImageBg && settings.bgBrightness && settings.bgBrightness !== 1 && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${Math.max(0, 1 - settings.bgBrightness)})`,
            }}
          />
        )}

        {/* Selectable Decorative Frame Overlay */}
        <CertificateFrame style={settings.frameStyle || 'ornate_gold'} />

        {/* 1. Holy Shrine Dome & Minaret Watermark (For vector shrine_classic theme) */}
        {settings.theme === 'shrine_classic' && (
          <ShrineDomeWatermark opacity={settings.domeOpacity} />
        )}

        {/* 2. Ornate Golden Arabesque Corners (For vector shrine_classic or royal_gold) */}
        {(settings.theme === 'shrine_classic' || settings.theme === 'royal_gold') && (
          <ArabesqueCorners opacity={settings.filigreeOpacity} />
        )}

        {/* Main Content Area */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between py-6 px-8 sm:py-8 sm:px-14">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center text-center mt-1 sm:mt-2">
            {/* Top Calligraphy Badge */}
            <motion.div
              key={`calligraphy-${animationKey}`}
              initial={shouldAnimate ? { opacity: 0, y: -25 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              <CalligraphyHeader title={settings.organizationName} />
            </motion.div>

            {/* Main Honor Title */}
            <motion.h1
              key={`title-${animationKey}`}
              initial={shouldAnimate ? { opacity: 0, scale: 0.9, y: -15 } : false}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="mt-3 sm:mt-4 text-2xl sm:text-4xl md:text-5xl font-bold text-slate-950 tracking-tight leading-tight"
              style={{
                fontFamily: "'Amiri', serif",
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              <span>{settings.mainTitlePrefix} </span>
              <span className="text-amber-900 underline decoration-amber-600/40 underline-offset-8">
                {monthName}
              </span>
              <span> لعام </span>
              <span className="text-slate-900">{formattedYear}</span>
              <span> م</span>
            </motion.h1>

            {/* Subtitle / Honorary Motto */}
            {settings.subTitle && (
              <motion.p
                key={`subtitle-${animationKey}`}
                initial={shouldAnimate ? { opacity: 0, y: -8 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mt-2 text-lg sm:text-2xl font-bold text-slate-800 tracking-wide"
                style={{ fontFamily: "'Reem Kufi', 'Amiri', sans-serif" }}
              >
                {settings.subTitle}
              </motion.p>
            )}
          </div>

          {/* Center Portraits Section (Two Distinguished Affiliates) */}
          <div className="flex items-center justify-center gap-8 sm:gap-16 md:gap-24 my-auto py-2">
            {/* Person 1 (Right in RTL) */}
            <motion.div
              key={`person1-${animationKey}`}
              initial={shouldAnimate ? { opacity: 0, scale: 0.72, y: 35 } : false}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.38,
                type: 'spring',
                stiffness: 130,
                damping: 14,
              }}
              className="flex flex-col items-center group"
            >
              {/* Circular Portrait Frame */}
              <div
                className="relative rounded-full overflow-hidden shadow-2xl transition-transform duration-300"
                style={{
                  width: 'clamp(140px, 22vw, 240px)',
                  height: 'clamp(140px, 22vw, 240px)',
                  border: `${settings.photoBorderWidth}px solid ${settings.photoBorderColor}`,
                  boxShadow:
                    '0 15px 35px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0,0,0,0.1)',
                }}
              >
                <div className="w-full h-full bg-slate-200 overflow-hidden flex items-center justify-center relative">
                  <img
                    src={photo1}
                    alt={name1}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    style={{
                      transform: `translate(${photoOffset1.x}px, ${photoOffset1.y}px) scale(${photoOffset1.zoom})`,
                      transformOrigin: 'center center',
                    }}
                    crossOrigin="anonymous"
                  />
                  {/* Subtle inner circular shadow ring */}
                  <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none border border-black/10" />
                </div>
              </div>

              {/* Name Pill Badge (Navy Blue Capsule) */}
              <motion.div
                key={`badge1-${animationKey}`}
                initial={shouldAnimate ? { opacity: 0, y: 18, scale: 0.95 } : false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.55 }}
                className="mt-4 sm:mt-5 px-6 sm:px-8 py-2 sm:py-2.5 rounded-full shadow-lg transition-transform duration-200"
                style={{
                  backgroundColor: settings.badgeColor,
                  color: settings.badgeTextColor,
                  boxShadow: '0 8px 20px -2px rgba(15, 23, 42, 0.35)',
                  minWidth: 'clamp(160px, 20vw, 260px)',
                  textAlign: 'center',
                }}
              >
                <span
                  className="block text-base sm:text-xl md:text-2xl font-bold tracking-wide whitespace-nowrap"
                  style={{ fontFamily: "'Cairo', 'Amiri', sans-serif" }}
                >
                  {name1}
                </span>
              </motion.div>

              {/* Optional Title / Department beneath */}
              {(settings.showTitles || settings.showDepartments) && (
                <div className="mt-1.5 text-center">
                  {settings.showTitles && title1 && (
                    <span className="block text-xs sm:text-sm font-semibold text-slate-700">
                      {title1}
                    </span>
                  )}
                  {settings.showDepartments && dept1 && (
                    <span className="block text-[11px] sm:text-xs text-amber-900/80 font-medium">
                      {dept1}
                    </span>
                  )}
                </div>
              )}
            </motion.div>

            {/* Person 2 (Left in RTL) */}
            <motion.div
              key={`person2-${animationKey}`}
              initial={shouldAnimate ? { opacity: 0, scale: 0.72, y: 35 } : false}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.48,
                type: 'spring',
                stiffness: 130,
                damping: 14,
              }}
              className="flex flex-col items-center group"
            >
              {/* Circular Portrait Frame */}
              <div
                className="relative rounded-full overflow-hidden shadow-2xl transition-transform duration-300"
                style={{
                  width: 'clamp(140px, 22vw, 240px)',
                  height: 'clamp(140px, 22vw, 240px)',
                  border: `${settings.photoBorderWidth}px solid ${settings.photoBorderColor}`,
                  boxShadow:
                    '0 15px 35px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0,0,0,0.1)',
                }}
              >
                <div className="w-full h-full bg-slate-200 overflow-hidden flex items-center justify-center relative">
                  <img
                    src={photo2}
                    alt={name2}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    style={{
                      transform: `translate(${photoOffset2.x}px, ${photoOffset2.y}px) scale(${photoOffset2.zoom})`,
                      transformOrigin: 'center center',
                    }}
                    crossOrigin="anonymous"
                  />
                  {/* Subtle inner circular shadow ring */}
                  <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none border border-black/10" />
                </div>
              </div>

              {/* Name Pill Badge (Navy Blue Capsule) */}
              <motion.div
                key={`badge2-${animationKey}`}
                initial={shouldAnimate ? { opacity: 0, y: 18, scale: 0.95 } : false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.65 }}
                className="mt-4 sm:mt-5 px-6 sm:px-8 py-2 sm:py-2.5 rounded-full shadow-lg transition-transform duration-200"
                style={{
                  backgroundColor: settings.badgeColor,
                  color: settings.badgeTextColor,
                  boxShadow: '0 8px 20px -2px rgba(15, 23, 42, 0.35)',
                  minWidth: 'clamp(160px, 20vw, 260px)',
                  textAlign: 'center',
                }}
              >
                <span
                  className="block text-base sm:text-xl md:text-2xl font-bold tracking-wide whitespace-nowrap"
                  style={{ fontFamily: "'Cairo', 'Amiri', sans-serif" }}
                >
                  {name2}
                </span>
              </motion.div>

              {/* Optional Title / Department beneath */}
              {(settings.showTitles || settings.showDepartments) && (
                <div className="mt-1.5 text-center">
                  {settings.showTitles && title2 && (
                    <span className="block text-xs sm:text-sm font-semibold text-slate-700">
                      {title2}
                    </span>
                  )}
                  {settings.showDepartments && dept2 && (
                    <span className="block text-[11px] sm:text-xs text-amber-900/80 font-medium">
                      {dept2}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Footer Section: Optional Official Stamp or Signatures */}
          <div className="relative flex items-end justify-between pt-2 pb-1 text-slate-700 min-h-[45px]">
            {/* Signer 1 */}
            {settings.showSignatures ? (
              <div className="text-center w-40">
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  {settings.signer1Title}
                </p>
                <div className="h-9 border-b border-dashed border-amber-900/40 flex items-center justify-center">
                  <span className="text-[10px] text-amber-800/60 italic font-serif">
                    التوقيع والاعتماد
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-12" />
            )}

            {/* Official Seal / Stamp in Center */}
            {settings.showOfficialSeal ? (
              <motion.div
                key={`seal-${animationKey}`}
                initial={shouldAnimate ? { opacity: 0, scale: 1.45, rotate: -35 } : false}
                animate={{ opacity: 1, scale: 1, rotate: -12 }}
                transition={{ duration: 0.55, delay: 0.75, type: 'spring', stiffness: 180, damping: 14 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-700/60 p-1 flex items-center justify-center text-center bg-amber-500/10 shadow-sm">
                  <div className="w-full h-full rounded-full border border-dashed border-amber-700 flex flex-col items-center justify-center">
                    <span className="text-[9px] text-amber-900 font-bold leading-tight">
                      {settings.organizationName}
                    </span>
                    <span className="text-[10px] text-amber-800 font-black tracking-tighter">
                      {settings.sealText}
                    </span>
                    <span className="text-[8px] text-amber-900/80">
                      {formattedYear} م
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center gap-2 text-amber-900/70 text-xs sm:text-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                <span>لوحة شرف شهرية معتمدة</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              </div>
            )}

            {/* Signer 2 */}
            {settings.showSignatures ? (
              <div className="text-center w-40">
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  {settings.signer2Title}
                </p>
                <div className="h-9 border-b border-dashed border-amber-900/40 flex items-center justify-center">
                  <span className="text-[10px] text-amber-800/60 italic font-serif">
                    التوقيع والاعتماد
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-12" />
            )}

            {/* Optional Digital Verification QR Code */}
            {settings.showQRCode && (
              <motion.div
                key={`qr-${animationKey}`}
                initial={shouldAnimate ? { opacity: 0, scale: 0.75 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.82, duration: 0.4 }}
                className="absolute bottom-1 right-2 sm:bottom-2 sm:right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-xl border border-amber-600/40 shadow-xs pointer-events-auto"
              >
                <div className="bg-white p-0.5 rounded-md">
                  <QRCodeSVG
                    value={
                      settings.customWebsiteUrl?.trim()
                        ? (settings.customWebsiteUrl.includes('?view=public')
                            ? settings.customWebsiteUrl.trim()
                            : `${settings.customWebsiteUrl.trim().replace(/\/$/, '')}?view=public`)
                        : (typeof window !== 'undefined'
                            ? `${window.location.origin}${window.location.pathname}?view=public`
                            : 'https://example.com')
                    }
                    size={42}
                    level="M"
                    fgColor="#152e59"
                  />
                </div>
                <div className="text-[9px] leading-tight text-amber-950 font-bold hidden sm:block">
                  <div>لوحة الشرف</div>
                  <div className="text-amber-800">امسح للزيارة</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

CertificateBoard.displayName = 'CertificateBoard';

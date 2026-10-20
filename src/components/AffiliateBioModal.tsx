import React, { useState } from 'react';
import { Employee } from '../types';
import {
  Award,
  Calendar,
  Building,
  BadgeCheck,
  Phone,
  Share2,
  Copy,
  Check,
  Printer,
  Sparkles,
  Heart,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AffiliateBioModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  monthName?: string;
  year?: number;
  onPrintCertificate?: (employee: Employee) => void;
}

export const AffiliateBioModal: React.FC<AffiliateBioModalProps> = ({
  isOpen,
  onClose,
  employee,
  monthName = 'أيلول',
  year = 2026,
  onPrintCertificate,
}) => {
  const [copied, setCopied] = useState(false);
  const [claps, setClaps] = useState(12);
  const [hasClapped, setHasClapped] = useState(false);

  if (!isOpen || !employee) return null;

  const congratulationMessage = `✨ تهنئة مباركة من مجمع سيد الشهداء (ع) ✨\n\nنبارك للأخ العزيز: *${employee.name}* (${employee.title} - ${employee.department})\nبمناسبة اختياره وتتويجه كـ «المنتسب المميز» لشهر ${monthName} ${year} م، تقديراً لجهوده المخلصة وتفانيه في خدمة الإمام الحسين (ع) وزائريه الكرام.\n\nسائلين الله له دوام التوفيق والبركة في هذا الشرف الرفيع! 🕌🤍`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(congratulationMessage);
    setCopied(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClap = () => {
    if (!hasClapped) {
      setClaps((prev) => prev + 1);
      setHasClapped(true);
      confetti({ particleCount: 20, spread: 40, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Decorative Banner */}
        <div className="relative h-28 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 p-4 flex items-start justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>بطاقة تميز المنتسب</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center font-bold text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Profile Card Body */}
        <div className="px-6 pb-6 pt-0 relative">
          {/* Avatar with Golden Frame */}
          <div className="flex items-end justify-between -mt-14 mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
                <img
                  src={employee.photoUrl}
                  alt={employee.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md border-2 border-white">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Interaction Button (Send Kudos / Clap) */}
            <button
              onClick={handleClap}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                hasClapped
                  ? 'bg-red-50 text-red-600 border-red-200 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${hasClapped ? 'fill-red-500 text-red-500' : 'text-slate-400'}`}
              />
              <span>{claps} تهنئة وثناء</span>
            </button>
          </div>

          {/* Name & Title */}
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              {employee.name}
            </h3>
            <p className="text-sm font-semibold text-amber-800 mt-0.5">
              {employee.title} • {employee.department}
            </p>
          </div>

          {/* Info Badges */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
            {employee.badgeNumber && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <BadgeCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-500">الرقم الوظيفي</span>
                  <span className="font-bold text-slate-800">{employee.badgeNumber}</span>
                </div>
              </div>
            )}

            {employee.joinDate && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-500">تاريخ الانضمام للمجمع</span>
                  <span className="font-bold text-slate-800">{employee.joinDate}</span>
                </div>
              </div>
            )}

            {employee.phone && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-500">رقم الهاتف</span>
                  <span className="font-bold text-slate-800 font-mono">{employee.phone}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
              <Award className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="block text-[10px] text-amber-900 font-semibold">حالة التكريم</span>
                <span className="font-bold text-amber-950">منتسب متميز لشهر {monthName}</span>
              </div>
            </div>
          </div>

          {/* Tribute & Why Distinguished */}
          <div className="mt-4 p-3.5 bg-amber-50/50 rounded-2xl border border-amber-200/80">
            <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>مبررات واستحقاق التكريم:</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              تميز الأخ {employee.name} بالانضباط العالي، وحسن استقبال ورعاية زوار الإمام الحسين (ع)،
              والمبادرة المستمرة في تحسين بيئة العمل وتقديم المساعدة لزملائه في شعبة {employee.department}.
            </p>
          </div>

          {/* WhatsApp Congratulation Sharing Box */}
          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>رسالة تهنئة جاهزة للواتساب:</span>
              </span>
              <button
                onClick={handleCopyMessage}
                className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-600 line-clamp-2 bg-white p-2 rounded-xl border border-slate-200 font-sans select-all">
              {congratulationMessage}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex items-center justify-end gap-2.5">
            {onPrintCertificate && (
              <button
                onClick={() => {
                  onPrintCertificate(employee);
                  onClose();
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة شهادة تقدير فردية</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

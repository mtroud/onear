import React, { useState } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import confetti from 'canvas-confetti';
import {
  Printer,
  Download,
  Share2,
  FileCheck,
  CheckCircle2,
  Info,
  Sparkles,
  Loader2,
  X,
  Maximize2,
} from 'lucide-react';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  boardElementId: string;
  monthName: string;
  year: number;
  person1Name: string;
  person2Name: string;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  boardElementId,
  monthName,
  year,
  person1Name,
  person2Name,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Fire celebratory confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d97706', '#b45309', '#152e59', '#ca8a04', '#fef08a'],
    });
  };

  // Direct Browser Print
  const handleDirectPrint = () => {
    triggerConfetti();
    setTimeout(() => {
      window.print();
    }, 300);
  };

  // Export 300 DPI High Resolution PNG
  const handleExportHighResPNG = async () => {
    const node = document.getElementById(boardElementId);
    if (!node) {
      alert('تعذر العثور على لوحة التكريم للطباعة');
      return;
    }

    try {
      setIsExporting(true);
      setExportSuccessMessage(null);

      // High resolution pixelRatio 3 corresponds to ~300 DPI for standard landscape prints
      const dataUrl = await toPng(node, {
        quality: 1.0,
        pixelRatio: 3,
        cacheBust: true,
        style: {
          borderRadius: '0px',
        },
      });

      const fileName = `لوحة_المنتسبين_المميزين_${monthName}_${year}.png`;
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      triggerConfetti();
      setExportSuccessMessage('تم تصدير الصورة بدقة 300 DPI فائقة الوضوح وجاهزة للطباعة فوراً!');
    } catch (err) {
      console.error('Export error:', err);
      alert('حدث خطأ أثناء تصدير الصورة عالية الدقة. يمكنك استخدام زر الطباعة المباشرة.');
    } finally {
      setIsExporting(false);
    }
  };

  // Export Regular JPG for WhatsApp/Social Media
  const handleExportSocialJPG = async () => {
    const node = document.getElementById(boardElementId);
    if (!node) return;

    try {
      setIsExporting(true);
      const dataUrl = await toJpeg(node, {
        quality: 0.92,
        pixelRatio: 2,
        cacheBust: true,
      });

      const fileName = `المنتسبين_المميزين_${monthName}_${year}_للنشر.jpg`;
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      setExportSuccessMessage('تم تصدير الصورة بنجاح للمشاركة عبر الواتساب ووسائل التواصل!');
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                طباعة وتصدير اللوحة التقديرية
              </h3>
              <p className="text-xs text-slate-500">
                شهر {monthName} لعام {year} م • ({person1Name} و {person2Name})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Success Alert */}
        {exportSuccessMessage && (
          <div className="my-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-emerald-900 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{exportSuccessMessage}</span>
          </div>
        )}

        {/* Print & Export Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {/* 1. Direct Browser Print */}
          <button
            onClick={handleDirectPrint}
            className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-amber-600 bg-amber-50/60 hover:bg-amber-100/70 text-amber-950 transition-all hover:scale-[1.02] shadow-sm text-center group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md">
              <Printer className="w-6 h-6" />
            </div>
            <span className="font-bold text-base block">الطباعة المباشرة الآن</span>
            <span className="text-xs text-amber-800/80 mt-1">
              إرسال مباشر لطابعة الورق أو الطابعة الملونة
            </span>
          </button>

          {/* 2. High Res 300 DPI PNG Download */}
          <button
            onClick={handleExportHighResPNG}
            disabled={isExporting}
            className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-slate-900 bg-slate-900 hover:bg-slate-800 text-white transition-all hover:scale-[1.02] shadow-md text-center group cursor-pointer disabled:opacity-50"
          >
            <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md">
              {isExporting ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Download className="w-6 h-6" />
              )}
            </div>
            <span className="font-bold text-base block">
              {isExporting ? 'جاري المعالجة...' : 'تحميل صورة فائقة الدقة (300 DPI)'}
            </span>
            <span className="text-xs text-slate-300 mt-1">
              صيغة PNG عالية الجودة مناسبة للمطابع والإعلانات
            </span>
          </button>
        </div>

        {/* Secondary Export: WhatsApp / Web */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleExportSocialJPG}
            disabled={isExporting}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-600" />
            <span>تحميل نسخة مضغوطة للنشر على مواقع التواصل وواتساب (JPG)</span>
          </button>
        </div>

        {/* Printing Best Practice Tips Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
            <Info className="w-4 h-4 text-amber-600" />
            <span>إرشادات للحصول على أفضل جودة طباعة ورقية:</span>
          </div>
          <ul className="text-xs space-y-1.5 list-disc list-inside text-slate-600 pr-1">
            <li>
              <strong>الاتجاه (Layout):</strong> اختر <strong>أفقي (Landscape)</strong> في إعدادات الطابعة.
            </li>
            <li>
              <strong>رسومات الخلفية (Background Graphics):</strong> تأكد من تفعيل علامة الصح ليظهر اللون العاجي والزخارف الذهبية.
            </li>
            <li>
              <strong>الهوامش (Margins):</strong> اختر <strong>بلا هوامش (None)</strong> أو الحد الأدنى لملء كامل الصفحة A4 أو A3.
            </li>
            <li>
              <strong>نوع الورق المقترح:</strong> ورق مصقول فاخر (Glossy / Matte Cardstock 250-300 GSM) يعطي لمعاناً وفخامة للألوان.
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

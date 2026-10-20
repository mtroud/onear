import React, { useState, useRef } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import confetti from 'canvas-confetti';
import {
  Printer,
  Download,
  Share2,
  CheckCircle2,
  Info,
  Sparkles,
  Loader2,
  Award,
  Layers,
  Smartphone,
  Square,
  Users,
} from 'lucide-react';
import { Employee, BoardSettings } from '../types';
import { IndividualCertificate } from './IndividualCertificate';
import { DEFAULT_BOARD_SETTINGS } from '../data/defaultData';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  boardElementId: string;
  monthName: string;
  year: number;
  person1Name: string;
  person2Name: string;
  person1?: Employee | null;
  person2?: Employee | null;
  settings?: BoardSettings;
  initialMode?: 'board' | 'certificate' | 'story' | 'square';
  selectedEmployeeForCert?: Employee | null;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  boardElementId,
  monthName,
  year,
  person1Name,
  person2Name,
  person1,
  person2,
  settings = DEFAULT_BOARD_SETTINGS,
  initialMode = 'board',
  selectedEmployeeForCert,
}) => {
  const [activeTab, setActiveTab] = useState<'board' | 'certificate' | 'story' | 'square'>(initialMode);
  const [selectedPersonForCert, setSelectedPersonForCert] = useState<1 | 2>(
    selectedEmployeeForCert && selectedEmployeeForCert.id === person2?.id ? 2 : 1
  );
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);

  const certRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentCertEmployee =
    selectedPersonForCert === 1
      ? person1 || {
          id: 'temp-1',
          name: person1Name,
          title: 'المنتسب الأول',
          department: 'مجمع سيد الشهداء',
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
        }
      : person2 || {
          id: 'temp-2',
          name: person2Name,
          title: 'المنتسب الثاني',
          department: 'مجمع سيد الشهداء',
          photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
        };

  // Fire celebratory confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
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

  // Print Individual Certificate specifically
  const handlePrintCertificate = async () => {
    const certNode = document.getElementById('individual-certificate-node');
    if (!certNode) {
      alert('تعذر العثور على الشهادة الفردية للطباعة');
      return;
    }

    try {
      setIsExporting(true);
      const dataUrl = await toPng(certNode, {
        quality: 1.0,
        pixelRatio: 3,
        cacheBust: true,
      });

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html lang="ar" dir="rtl">
            <head>
              <title>شهادة تقدير - ${currentCertEmployee.name}</title>
              <style>
                @page { size: A4 portrait; margin: 0; }
                body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; background: #fff; }
                img { width: 100vw; height: 100vh; object-fit: contain; }
              </style>
            </head>
            <body>
              <img src="${dataUrl}" onload="window.print(); window.close();" />
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        // Fallback: download directly
        const link = document.createElement('a');
        link.download = `شهادة_تقدير_${currentCertEmployee.name}.png`;
        link.href = dataUrl;
        link.click();
      }
      triggerConfetti();
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء إعداد الشهادة للطباعة');
    } finally {
      setIsExporting(false);
    }
  };

  // Export 300 DPI High Resolution PNG
  const handleExportHighRes = async (targetId: string, defaultName: string) => {
    const node = document.getElementById(targetId);
    if (!node) {
      alert('تعذر العثور على العنصر للتصدير');
      return;
    }

    try {
      setIsExporting(true);
      setExportSuccessMessage(null);

      const dataUrl = await toPng(node, {
        quality: 1.0,
        pixelRatio: 3,
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = defaultName;
      link.href = dataUrl;
      link.click();

      triggerConfetti();
      setExportSuccessMessage('تم تصدير الصورة بدقة 300 DPI فائقة الوضوح وجاهزة للطباعة أو النشر!');
    } catch (err) {
      console.error('Export error:', err);
      alert('حدث خطأ أثناء تصدير الصورة عالية الدقة.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-5 sm:p-7 animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                مركز الطباعة والتصدير والمشاركة
              </h3>
              <p className="text-xs text-slate-500">
                شهر {monthName} {year} م • مجمع سيد الشهداء (ع)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 p-1.5 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setActiveTab('board')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'board'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>لوحة التكريم (A4)</span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'certificate'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>شهادة تقدير فردية</span>
          </button>

          <button
            onClick={() => setActiveTab('story')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'story'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span>ستوري واتساب (9:16)</span>
          </button>

          <button
            onClick={() => setActiveTab('square')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'square'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Square className="w-3.5 h-3.5 text-blue-600" />
            <span>مربع إنستغرام (1:1)</span>
          </button>
        </div>

        {/* Success Alert */}
        {exportSuccessMessage && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-emerald-900 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{exportSuccessMessage}</span>
          </div>
        )}

        {/* 1. Collective Board Tab */}
        {activeTab === 'board' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Direct Print */}
              <button
                onClick={handleDirectPrint}
                className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-amber-600 bg-amber-50/70 hover:bg-amber-100/80 text-amber-950 transition-all shadow-xs text-center cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center mb-2 shadow-xs">
                  <Printer className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm block">الطباعة المباشرة الآن</span>
                <span className="text-[11px] text-amber-800/80 mt-0.5">
                  طباعة فورية على ورق A4 أو A3 العرضي
                </span>
              </button>

              {/* High Res Download */}
              <button
                onClick={() =>
                  handleExportHighRes(
                    boardElementId,
                    `لوحة_المنتسبين_المميزين_${monthName}_${year}.png`
                  )
                }
                disabled={isExporting}
                className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-slate-900 bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm text-center cursor-pointer disabled:opacity-50"
              >
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mb-2 shadow-xs">
                  {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                </div>
                <span className="font-bold text-sm block">تحميل صورة فائقة الدقة (300 DPI)</span>
                <span className="text-[11px] text-slate-300 mt-0.5">
                  صيغة PNG عالية الجودة للمطابع ولوحات الحائط
                </span>
              </button>
            </div>
          </div>
        )}

        {/* 2. Individual Appreciation Certificate Tab */}
        {activeTab === 'certificate' && (
          <div className="space-y-4 animate-in fade-in">
            {/* Person Switcher */}
            <div className="flex items-center justify-between p-2.5 bg-amber-50/80 rounded-2xl border border-amber-200">
              <span className="text-xs font-bold text-amber-950">اختر المكرم للشهادة الفردية:</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedPersonForCert(1)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPersonForCert === 1
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-amber-100'
                  }`}
                >
                  {person1?.name || person1Name}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPersonForCert(2)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPersonForCert === 2
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-amber-100'
                  }`}
                >
                  {person2?.name || person2Name}
                </button>
              </div>
            </div>

            {/* Live Certificate Mini Preview */}
            <div className="max-h-72 overflow-y-auto rounded-2xl border border-slate-200 p-2 bg-slate-50 flex justify-center">
              <div className="w-full max-w-sm transform scale-90 origin-top">
                <IndividualCertificate
                  employee={currentCertEmployee}
                  monthName={monthName}
                  year={year}
                  settings={settings}
                />
              </div>
            </div>

            {/* Action Buttons for Certificate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handlePrintCertificate}
                disabled={isExporting}
                className="flex items-center justify-center gap-2 p-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الشهادة الفردية (A4 عمودي)</span>
              </button>

              <button
                onClick={() =>
                  handleExportHighRes(
                    'individual-certificate-node',
                    `شهادة_تقدير_${currentCertEmployee.name}_${monthName}_${year}.png`
                  )
                }
                disabled={isExporting}
                className="flex items-center justify-center gap-2 p-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>تحميل كشهادة تقدير PNG (300 DPI)</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. Story / Status 9:16 Tab */}
        {activeTab === 'story' && (
          <div className="space-y-4 animate-in fade-in">
            {/* 9:16 Story Node for capture */}
            <div className="flex justify-center">
              <div
                id="story-export-node"
                className="w-56 aspect-[9/16] rounded-2xl shadow-lg overflow-hidden relative p-4 flex flex-col justify-between text-center select-none text-white"
                style={{
                  backgroundImage: `url('/backgrounds/hussain_corner.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-slate-950/65" />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-900/60 px-2 py-0.5 rounded-full">
                    مجمع سيد الشهداء (ع)
                  </span>
                  <h4 className="text-sm font-black text-amber-200 mt-1">المنتسبين المميزين</h4>
                  <span className="text-[10px] text-slate-300">شهر {monthName} {year}</span>
                </div>

                <div className="relative z-10 space-y-3 my-auto">
                  {/* Person 1 */}
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-1.5 rounded-xl border border-white/20 text-right">
                    <img
                      src={person1?.photoUrl || currentCertEmployee.photoUrl}
                      alt={person1Name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <span className="block text-xs font-bold text-white truncate">{person1Name}</span>
                      <span className="block text-[9px] text-amber-300 truncate">{person1?.department || ''}</span>
                    </div>
                  </div>

                  {/* Person 2 */}
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-1.5 rounded-xl border border-white/20 text-right">
                    <img
                      src={person2?.photoUrl || currentCertEmployee.photoUrl}
                      alt={person2Name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <span className="block text-xs font-bold text-white truncate">{person2Name}</span>
                      <span className="block text-[9px] text-amber-300 truncate">{person2?.department || ''}</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 text-[9px] text-slate-300">
                  خدمة الإمام الحسين (ع) فخرنا وشرفنا
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={() =>
                  handleExportHighRes(
                    'story-export-node',
                    `ستوري_المنتسبين_${monthName}_${year}.png`
                  )
                }
                disabled={isExporting}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>تحميل بطاقة ستوري الواتساب (9:16)</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. Square 1:1 Tab */}
        {activeTab === 'square' && (
          <div className="space-y-4 animate-in fade-in">
            {/* 1:1 Square Node */}
            <div className="flex justify-center">
              <div
                id="square-export-node"
                className="w-64 h-64 rounded-2xl shadow-lg overflow-hidden relative p-4 flex flex-col justify-between text-center select-none text-white"
                style={{
                  backgroundImage: `url('/backgrounds/hussain_corner.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-slate-950/70" />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-amber-300">مجمع سيد الشهداء (ع)</span>
                  <h4 className="text-sm font-black text-white">تكريم المنتسبين المميزين</h4>
                  <span className="text-[10px] text-amber-400">شهر {monthName} لعام {year} م</span>
                </div>

                <div className="relative z-10 flex items-center justify-center gap-4 my-auto">
                  <div className="flex flex-col items-center">
                    <img
                      src={person1?.photoUrl || currentCertEmployee.photoUrl}
                      alt={person1Name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-md"
                    />
                    <span className="text-[11px] font-bold text-white mt-1 max-w-[90px] truncate">{person1Name}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <img
                      src={person2?.photoUrl || currentCertEmployee.photoUrl}
                      alt={person2Name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-md"
                    />
                    <span className="text-[11px] font-bold text-white mt-1 max-w-[90px] truncate">{person2Name}</span>
                  </div>
                </div>

                <div className="relative z-10 text-[9px] text-slate-300">
                  معاً في خدمة مرقد الإمام الحسين (ع) وزائريه الكرام
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={() =>
                  handleExportHighRes(
                    'square-export-node',
                    `بطاقة_انستغرام_${monthName}_${year}.png`
                  )
                }
                disabled={isExporting}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>تحميل البطاقة المربعة (Instagram / 1:1)</span>
              </button>
            </div>
          </div>
        )}

        {/* Printing Best Practice Tips Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-700 mt-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
            <Info className="w-3.5 h-3.5 text-amber-600" />
            <span>إرشادات للطباعة الورقية:</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            للوحة المشتركة اختر اتجاه <strong>أفقي (Landscape)</strong>، وللشهادة الفردية اختر{' '}
            <strong>عمودي (Portrait)</strong>، وتأكد من تفعيل «رسومات الخلفية» وبلا هوامش.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Employee, MonthlyHonorees, BoardSettings } from '../types';
import { CertificateBoard } from './CertificateBoard';
import { PrintModal } from './PrintModal';
import {
  Award,
  Calendar,
  Share2,
  Printer,
  Lock,
  Sparkles,
  ChevronLeft,
  Building,
  Heart,
  QrCode,
  Check,
} from 'lucide-react';
import { toArabicNumerals } from '../data/defaultData';
import confetti from 'canvas-confetti';

interface PublicVisitorViewProps {
  boardSettings: BoardSettings;
  monthName: string;
  year: number;
  useArabicNumerals: boolean;
  person1: Employee | null;
  person2: Employee | null;
  photoOffset1: { x: number; y: number; zoom: number };
  photoOffset2: { x: number; y: number; zoom: number };
  history: MonthlyHonorees[];
  employees: Employee[];
  onOpenAdminLogin: () => void;
  onOpenQRCodeModal: () => void;
}

export const PublicVisitorView: React.FC<PublicVisitorViewProps> = ({
  boardSettings,
  monthName,
  year,
  useArabicNumerals,
  person1,
  person2,
  photoOffset1,
  photoOffset2,
  history,
  employees,
  onOpenAdminLogin,
  onOpenQRCodeModal,
}) => {
  const [selectedAward, setSelectedAward] = useState<MonthlyHonorees | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [animKey, setAnimKey] = useState<number>(0);

  // Active display data (either current month or selected historical month)
  const displayYear = selectedAward ? selectedAward.year : year;
  const displayMonthName = selectedAward ? selectedAward.monthName : monthName;
  const displayPerson1 = selectedAward
    ? employees.find((e) => e.id === selectedAward.person1Id) || null
    : person1;
  const displayPerson2 = selectedAward
    ? employees.find((e) => e.id === selectedAward.person2Id) || null
    : person2;

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
    });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-amber-50/20 to-slate-100 flex flex-col font-['Cairo',sans-serif]">
      {/* Top Visitor Header Bar */}
      <header className="no-print bg-white/90 backdrop-blur-md border-b border-amber-200/60 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {boardSettings.organizationName}
              </h1>
              <p className="text-[11px] text-amber-900 font-bold">
                لوحة الشرف الرقمية للمنتسبين المميزين
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              title="مشاركة الرابط"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">تم النسخ!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">مشاركة اللوحة</span>
                </>
              )}
            </button>

            {/* QR Code view */}
            <button
              onClick={onOpenQRCodeModal}
              className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300/60 rounded-xl transition-colors"
              title="عرض الباركود"
            >
              <QrCode className="w-4 h-4" />
            </button>

            {/* Print Board */}
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة اللوحة</span>
            </button>

            {/* Admin Login Button */}
            <button
              onClick={onOpenAdminLogin}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors mr-1"
              title="تسجيل دخول مسؤول النظام"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">دخول الإدارة</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Welcome & Honor Banner */}
        <div className="no-print text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>
              تكريم شهر {displayMonthName} لعام {toArabicNumerals(displayYear)} م
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            نبارك للمنتسبين المميزين عطاءهم المبارك
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {boardSettings.subTitle} • تقديراً للجهود المتميزة والتفاني والإخلاص في خدمة الزائرين الكرام
          </p>

          {selectedAward && (
            <div className="pt-2">
              <button
                onClick={() => setSelectedAward(null)}
                className="text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-50 border border-amber-300 px-3 py-1 rounded-full inline-flex items-center gap-1"
              >
                <span>العودة لتكريم الشهر الحالي</span>
                <ChevronLeft className="w-3 h-3" />
              </button>
            </div>
          )}
          {/* Action to replay animation */}
          <div className="flex justify-center gap-2 pt-1">
            <button
              onClick={() => {
                setAnimKey((prev) => prev + 1);
                confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>إعادة عرض حركة التكريم</span>
            </button>
          </div>
        </div>

        {/* The Honor Board Component */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden">
            <CertificateBoard
              settings={boardSettings}
              monthName={displayMonthName}
              year={displayYear}
              useArabicNumerals={useArabicNumerals}
              person1={displayPerson1}
              person2={displayPerson2}
              photoOffset1={selectedAward?.photoOffset1 || photoOffset1}
              photoOffset2={selectedAward?.photoOffset2 || photoOffset2}
              animationKey={animKey}
            />
          </div>
        </div>

        {/* Honorees Spotlight Cards */}
        <div className="no-print grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {/* Person 1 */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs flex items-center gap-4">
            <img
              src={displayPerson1?.photoUrl || ''}
              alt={displayPerson1?.name || ''}
              className="w-18 h-18 rounded-full object-cover border-2 border-amber-600 shadow-md flex-shrink-0"
            />
            <div>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                المنتسب المميز
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {displayPerson1?.name || 'الاسم'}
              </h3>
              <p className="text-xs font-semibold text-slate-600">
                {displayPerson1?.title || 'المسمى الوظيفي'}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                <Building className="w-3.5 h-3.5 text-amber-600" />
                <span>{displayPerson1?.department || 'القسم'}</span>
              </div>
            </div>
          </div>

          {/* Person 2 */}
          <div className="bg-white p-5 rounded-2xl border border-blue-200/80 shadow-xs flex items-center gap-4">
            <img
              src={displayPerson2?.photoUrl || ''}
              alt={displayPerson2?.name || ''}
              className="w-18 h-18 rounded-full object-cover border-2 border-blue-600 shadow-md flex-shrink-0"
            />
            <div>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                المنتسب المميز
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {displayPerson2?.name || 'الاسم'}
              </h3>
              <p className="text-xs font-semibold text-slate-600">
                {displayPerson2?.title || 'المسمى الوظيفي'}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>{displayPerson2?.department || 'القسم'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Past Months Gallery for Visitors */}
        {history.length > 0 && (
          <div className="no-print bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">سجل التكريمات السابقة</h3>
              </div>
              <span className="text-xs text-slate-500">
                انقر على أي شهر لرؤية لوحة شرفه
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {history.map((item) => {
                const isCurrent =
                  item.year === displayYear && item.monthName === displayMonthName;
                const p1 = employees.find((e) => e.id === item.person1Id);
                const p2 = employees.find((e) => e.id === item.person2Id);

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedAward(item)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isCurrent
                        ? 'border-amber-600 bg-amber-50/80 shadow-xs'
                        : 'border-slate-200 hover:border-amber-400 bg-slate-50/70 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span>{item.monthName}</span>
                      <span>{toArabicNumerals(item.year)} م</span>
                    </div>

                    <div className="flex items-center -space-x-2 space-x-reverse my-2">
                      <img
                        src={p1?.photoUrl || ''}
                        alt=""
                        className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      />
                      <img
                        src={p2?.photoUrl || ''}
                        alt=""
                        className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      />
                    </div>

                    <p className="text-[10px] text-slate-500 truncate">
                      {p1?.name || ''} و {p2?.name || ''}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Visitor Footer */}
      <footer className="no-print border-t border-slate-200/80 bg-white py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
          <p className="text-xs text-slate-500 font-medium">
            {boardSettings.organizationName} • {boardSettings.subTitle}
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
            <span>لوحة الشرف الرقمية</span>
            <span>•</span>
            <button
              onClick={onOpenAdminLogin}
              className="text-slate-500 hover:text-amber-800 underline flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>تسجيل دخول الإدارة</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Print Modal for Visitor */}
      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        boardElementId="printable-honor-board"
        monthName={displayMonthName}
        year={displayYear}
        person1Name={displayPerson1?.name || 'المنتسب الأول'}
        person2Name={displayPerson2?.name || 'المنتسب الثاني'}
      />
    </div>
  );
};

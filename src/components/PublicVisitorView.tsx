import React, { useState } from 'react';
import { Employee, MonthlyHonorees, BoardSettings } from '../types';
import { CertificateBoard } from './CertificateBoard';
import { PrintModal } from './PrintModal';
import { AnnualHallOfFame } from './AnnualHallOfFame';
import { AffiliateBioModal } from './AffiliateBioModal';
import { NominationManager } from './NominationManager';
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
  Trophy,
  Users,
  Eye,
  UserCheck,
  Shuffle,
} from 'lucide-react';
import { toArabicNumerals } from '../data/defaultData';
import confetti from 'canvas-confetti';

interface PublicVisitorViewProps {
  boardSettings: BoardSettings;
  monthName: string;
  year: number;
  selectedYear?: number;
  selectedMonthIndex?: number;
  useArabicNumerals: boolean;
  person1: Employee | null;
  person2: Employee | null;
  photoOffset1: { x: number; y: number; zoom: number };
  photoOffset2: { x: number; y: number; zoom: number };
  history: MonthlyHonorees[];
  employees: Employee[];
  onOpenAdminLogin: () => void;
  onOpenQRCodeModal: () => void;
  onAssignToPerson1?: (id: string) => void;
  onAssignToPerson2?: (id: string) => void;
}

export const PublicVisitorView: React.FC<PublicVisitorViewProps> = ({
  boardSettings,
  monthName,
  year,
  selectedYear = year,
  selectedMonthIndex = 8,
  useArabicNumerals,
  person1,
  person2,
  photoOffset1,
  photoOffset2,
  history,
  employees,
  onOpenAdminLogin,
  onOpenQRCodeModal,
  onAssignToPerson1 = () => {},
  onAssignToPerson2 = () => {},
}) => {
  const [visitorTab, setVisitorTab] = useState<'board' | 'nominations' | 'hall_of_fame'>('board');
  const [bioEmployee, setBioEmployee] = useState<Employee | null>(null);
  const [bioMonth, setBioMonth] = useState<string>(monthName);
  const [bioYear, setBioYear] = useState<number>(year);
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
      {/* 1. Top Admin Switcher Notice Bar (Very prominent) */}
      <div className="no-print bg-slate-900 text-amber-300 px-4 py-2 text-xs font-semibold border-b border-amber-500/30">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              أنت الآن في <strong>وضع الزائر (المعاينة العامة)</strong>. للوصول إلى لوحة التحكم الكاملة والقرعة الإلكترونية:
            </span>
          </div>
          <button
            onClick={onOpenAdminLogin}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition-all shadow-sm cursor-pointer text-xs"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>دخول لوحة تحكم المسؤول (PIN) ⚙️</span>
          </button>
        </div>
      </div>

      {/* 2. Top Visitor Header Bar */}
      <header className="no-print bg-white/95 backdrop-blur-md border-b border-amber-200/60 sticky top-0 z-30 shadow-xs">
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
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
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
              className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300/60 rounded-xl transition-colors cursor-pointer"
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
              <span className="hidden sm:inline">طباعة اللوحة</span>
            </button>

            {/* Admin Login Button - Always visible with icon and text! */}
            <button
              onClick={onOpenAdminLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-xs cursor-pointer border border-amber-500/40"
              title="تسجيل دخول مسؤول النظام"
            >
              <Lock className="w-3.5 h-3.5 text-slate-900" />
              <span>دخول الإدارة ⚙️</span>
            </button>
          </div>
        </div>

        {/* Visitor Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-2 border-t border-amber-100 overflow-x-auto py-1.5">
          <button
            onClick={() => setVisitorTab('board')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              visitorTab === 'board'
                ? 'bg-amber-100/90 text-amber-950 border border-amber-300 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>لوحة التكريم الشهرية</span>
          </button>

          <button
            onClick={() => setVisitorTab('nominations')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              visitorTab === 'nominations'
                ? 'bg-amber-500 text-slate-950 font-black ring-2 ring-amber-400 shadow-sm'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>ترشيحات المسؤولين والقرعة 🎲</span>
            <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">جديد</span>
          </button>

          <button
            onClick={() => setVisitorTab('hall_of_fame')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              visitorTab === 'hall_of_fame'
                ? 'bg-amber-100/90 text-amber-950 border border-amber-300 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>قاعة الشرف السنوية</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Tab 1: Nominations and Lottery Tab */}
        {visitorTab === 'nominations' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950">
              <div>
                <p className="font-bold text-sm">
                  🎲 شاشة ترشيحات مسؤولي الشعب والقرعة الإلكترونية المباشرة
                </p>
                <p className="text-slate-600 mt-0.5">
                  يمكنك مشاهدة قائمة مرشحي مسؤولي الأقسام ونتائج القرعة. لإضافة ترشيح رسمي أو تعديل اللوحة يرجى تسجيل الدخول كمسؤول.
                </p>
              </div>
              <button
                onClick={onOpenAdminLogin}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold cursor-pointer shrink-0"
              >
                دخول الإدارة للترشيح ←
              </button>
            </div>

            <NominationManager
              employees={employees}
              selectedYear={selectedYear}
              selectedMonthIndex={selectedMonthIndex}
              monthName={displayMonthName}
              person1Id={person1?.id || 'emp-1'}
              person2Id={person2?.id || 'emp-2'}
              onAssignToPerson1={(id) => onAssignToPerson1(id)}
              onAssignToPerson2={(id) => onAssignToPerson2(id)}
            />
          </div>
        )}

        {/* Tab 2: Hall of fame */}
        {visitorTab === 'hall_of_fame' && (
          <AnnualHallOfFame
            history={history}
            employees={employees}
            useArabicNumerals={useArabicNumerals}
            onSelectMonth={(yr, mIdx) => {
              const match = history.find((h) => h.year === yr && h.monthIndex === mIdx);
              if (match) setSelectedAward(match);
              setVisitorTab('board');
            }}
            onOpenBio={(emp, mName, yr) => {
              setBioEmployee(emp);
              setBioMonth(mName);
              setBioYear(yr);
            }}
            onPrintCertificate={() => {
              setIsPrintModalOpen(true);
            }}
          />
        )}

        {/* Tab 3: Monthly Board View */}
        {visitorTab === 'board' && (
          <>
            {/* Quick Access Banner to Nominations & Lottery */}
            <div className="no-print p-4 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-white border-2 border-amber-300/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                  🎲
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <span>نظام ترشيحات مسؤولي الأقسام والقرعة الإلكترونية الشهرية</span>
                    <span className="text-[10px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                      جديد
                    </span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    يقوم كل مسؤول شعبة بترشيح منتسب مميز من قسمه، وقبل نهاية الشهر تُجرى القرعة العشوائية الإلكترونية لاختيار المكرمَين الاثنين بنزاهة وشفافية مطلقة.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setVisitorTab('nominations')}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer self-start sm:self-center shrink-0"
              >
                <span>مشاهدة ترشيحات الشعب والقرعة 🎲 ←</span>
              </button>
            </div>

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
                    className="text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-50 border border-amber-300 px-3 py-1 rounded-full inline-flex items-center gap-1 cursor-pointer"
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
                    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-800 bg-amber-100/70 hover:bg-amber-200 px-3 py-1 rounded-full font-bold transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  <span>إعادة الحركة والتأثيرات</span>
                </button>
              </div>
            </div>

            {/* The Certificate Board */}
            <div className="flex justify-center w-full">
              <div className="w-full max-w-5xl">
                <CertificateBoard
                  settings={boardSettings}
                  monthName={displayMonthName}
                  year={displayYear}
                  useArabicNumerals={useArabicNumerals}
                  person1={displayPerson1}
                  person2={displayPerson2}
                  photoOffset1={photoOffset1}
                  photoOffset2={photoOffset2}
                  animationKey={animKey}
                />
              </div>
            </div>

            {/* Honorees Profiles Grid */}
            <div className="no-print grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
              {displayPerson1 && (
                <div className="bg-white rounded-3xl p-5 border border-amber-200/80 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 shadow-sm flex-shrink-0">
                    <img
                      src={displayPerson1.photoUrl}
                      alt={displayPerson1.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block">
                      المكرم الأول
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {displayPerson1.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {displayPerson1.department} • {displayPerson1.title}
                    </p>
                    <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                      نال التكريم تقديراً لإخلاصه وانضباطه العالي وحسن تعامله مع زوار العتبة المقدسة.
                    </p>
                  </div>
                </div>
              )}

              {displayPerson2 && (
                <div className="bg-white rounded-3xl p-5 border border-amber-200/80 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 shadow-sm flex-shrink-0">
                    <img
                      src={displayPerson2.photoUrl}
                      alt={displayPerson2.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block">
                      المكرم الثاني
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {displayPerson2.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {displayPerson2.department} • {displayPerson2.title}
                    </p>
                    <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                      نال التكريم تقديراً لجهوده وتفانيه في إنجاز المهام الموكلة إليه بكل أمانة واقتدار.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
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
              className="text-amber-700 hover:text-amber-900 font-bold underline flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>دخول لوحة تحكم المسؤول (PIN)</span>
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
        person1={displayPerson1}
        person2={displayPerson2}
        settings={boardSettings}
      />

      {/* Bio Modal */}
      {bioEmployee && (
        <AffiliateBioModal
          isOpen={Boolean(bioEmployee)}
          employee={bioEmployee}
          monthName={bioMonth}
          year={bioYear}
          onClose={() => setBioEmployee(null)}
          onPrintCertificate={() => setIsPrintModalOpen(true)}
        />
      )}
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Employee, MonthlyHonorees, BoardSettings } from './types';
import {
  INITIAL_EMPLOYEES,
  INITIAL_MONTHLY_HONOREES,
  DEFAULT_BOARD_SETTINGS,
  MONTH_NAMES_SIMPLE,
  toArabicNumerals,
} from './data/defaultData';
import { CertificateBoard } from './components/CertificateBoard';
import { MonthlySelector } from './components/MonthlySelector';
import { EmployeeManager } from './components/EmployeeManager';
import { BoardCustomizer } from './components/BoardCustomizer';
import { HistoryArchive } from './components/HistoryArchive';
import { PrintModal } from './components/PrintModal';
import { QRCodeModal } from './components/QRCodeModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { PublicVisitorView } from './components/PublicVisitorView';
import {
  Printer,
  Award,
  Users,
  Palette,
  History,
  Sparkles,
  Download,
  Share2,
  Calendar,
  Layers,
  CheckCircle,
  Eye,
  Maximize2,
  RefreshCw,
  QrCode,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // 1. Admin Authentication & Role State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'public') {
        return false;
      }
    }
    const saved = localStorage.getItem('honor_board_is_admin');
    return saved !== null ? saved === 'true' : true;
  });

  const [adminPin, setAdminPin] = useState<string>(() => {
    return localStorage.getItem('honor_board_admin_pin') || '1234';
  });

  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState<boolean>(false);
  const [isChangingPin, setIsChangingPin] = useState<boolean>(false);
  const [newPinInput, setNewPinInput] = useState<string>('');

  // 2. Persistent State or Initial Defaults
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('honor_board_employees');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_EMPLOYEES;
  });

  const [history, setHistory] = useState<MonthlyHonorees[]>(() => {
    const saved = localStorage.getItem('honor_board_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_MONTHLY_HONOREES;
  });

  const [boardSettings, setBoardSettings] = useState<BoardSettings>(() => {
    const saved = localStorage.getItem('honor_board_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.theme === 'shrine_classic') {
          parsed.theme = 'hussain_dome_corner';
        }
        return { ...DEFAULT_BOARD_SETTINGS, ...parsed };
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_BOARD_SETTINGS;
  });

  // Active Selection State
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(8); // أيلول (September)
  const [person1Id, setPerson1Id] = useState<string>('emp-1'); // حسن عبد الامير جودي
  const [person2Id, setPerson2Id] = useState<string>('emp-2'); // مصطفى جواد كاظم
  const [useArabicNumerals, setUseArabicNumerals] = useState<boolean>(true);

  // Photo fine tuning offsets
  const [photoOffset1, setPhotoOffset1] = useState<{ x: number; y: number; zoom: number }>({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const [photoOffset2, setPhotoOffset2] = useState<{ x: number; y: number; zoom: number }>({
    x: 0,
    y: 0,
    zoom: 1,
  });

  // Active view tab: 'preview' | 'employees' | 'customizer' | 'history'
  const [activeTab, setActiveTab] = useState<'preview' | 'employees' | 'customizer' | 'history'>('preview');

  // Print Modal
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [activeArchiveId, setActiveArchiveId] = useState<string>('award-2026-08');

  // Animation trigger key
  const [animKey, setAnimKey] = useState<number>(0);

  // Board ref
  const boardRef = useRef<HTMLDivElement>(null);

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem('honor_board_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('honor_board_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('honor_board_settings', JSON.stringify(boardSettings));
  }, [boardSettings]);

  useEffect(() => {
    localStorage.setItem('honor_board_is_admin', String(isAdmin));
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem('honor_board_admin_pin', adminPin);
  }, [adminPin]);

  // Save or update active month in history
  const handleSaveToHistory = () => {
    const monthName = MONTH_NAMES_SIMPLE[selectedMonthIndex];
    const awardId = `award-${selectedYear}-${String(selectedMonthIndex).padStart(2, '0')}`;

    const newRecord: MonthlyHonorees = {
      id: awardId,
      year: selectedYear,
      monthIndex: selectedMonthIndex,
      monthName,
      person1Id,
      person2Id,
      photoOffset1,
      photoOffset2,
      organizationName: boardSettings.organizationName,
      subTitle: boardSettings.subTitle,
      slogan: 'تكريماً لجهودهم المتميزة وتفانيهم في أداء الواجب',
      createdAt: new Date().toISOString(),
    };

    setHistory((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === awardId);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = newRecord;
        return copy;
      }
      return [newRecord, ...prev];
    });

    setActiveArchiveId(awardId);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ca8a04', '#152e59', '#d97706'],
    });

    alert(`تم حفظ تكريم شهر ${monthName} ${selectedYear} م في السجل بنجاح!`);
  };

  // Load a record from history
  const handleLoadAward = (award: MonthlyHonorees) => {
    setSelectedYear(award.year);
    setSelectedMonthIndex(award.monthIndex);
    setPerson1Id(award.person1Id);
    setPerson2Id(award.person2Id);
    if (award.photoOffset1) setPhotoOffset1(award.photoOffset1);
    if (award.photoOffset2) setPhotoOffset2(award.photoOffset2);
    setActiveArchiveId(award.id);
    setActiveTab('preview');
  };

  const handleDeleteAward = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    if (activeArchiveId === id) {
      setActiveArchiveId('');
    }
  };

  // Reset to initial sample data
  const handleResetToDefault = () => {
    if (confirm('هل تريد استعادة البيانات الافتراضية الأصلية؟')) {
      setEmployees(INITIAL_EMPLOYEES);
      setHistory(INITIAL_MONTHLY_HONOREES);
      setBoardSettings(DEFAULT_BOARD_SETTINGS);
      setSelectedYear(2026);
      setSelectedMonthIndex(8);
      setPerson1Id('emp-1');
      setPerson2Id('emp-2');
      setPhotoOffset1({ x: 0, y: 0, zoom: 1 });
      setPhotoOffset2({ x: 0, y: 0, zoom: 1 });
      localStorage.clear();
    }
  };

  const handleSaveNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinInput.trim() || newPinInput.length < 3) {
      alert('يرجى إدخال رمز مرور مكون من 3 أرقام أو حروف على الأقل');
      return;
    }
    setAdminPin(newPinInput);
    setIsChangingPin(false);
    setNewPinInput('');
    alert('تم تحديث رمز مرور المسؤول بنجاح!');
  };

  const person1 = employees.find((e) => e.id === person1Id) || null;
  const person2 = employees.find((e) => e.id === person2Id) || null;
  const currentMonthName = MONTH_NAMES_SIMPLE[selectedMonthIndex];

  const publicUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}?view=public`
      : '';

  // 3. If Public Visitor Mode is active:
  if (!isAdmin) {
    return (
      <>
        <PublicVisitorView
          boardSettings={boardSettings}
          monthName={currentMonthName}
          year={selectedYear}
          useArabicNumerals={useArabicNumerals}
          person1={person1}
          person2={person2}
          photoOffset1={photoOffset1}
          photoOffset2={photoOffset2}
          history={history}
          employees={employees}
          onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
          onOpenQRCodeModal={() => setIsQRCodeModalOpen(true)}
        />

        {/* Admin Login Modal */}
        <AdminLoginModal
          isOpen={isAdminLoginModalOpen}
          onClose={() => setIsAdminLoginModalOpen(false)}
          onSuccess={() => {
            setIsAdmin(true);
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.6 },
            });
          }}
          adminPin={adminPin}
        />

        {/* QR Code Modal */}
        <QRCodeModal
          isOpen={isQRCodeModalOpen}
          onClose={() => setIsQRCodeModalOpen(false)}
          publicUrl={publicUrl}
          showQRCodeOnBoard={boardSettings.showQRCode}
          setShowQRCodeOnBoard={(val) =>
            setBoardSettings((prev) => ({ ...prev, showQRCode: val }))
          }
          organizationName={boardSettings.organizationName}
          monthName={currentMonthName}
          year={selectedYear}
          onSwitchToPublicView={() => {}}
          customWebsiteUrl={boardSettings.customWebsiteUrl}
          setCustomWebsiteUrl={(url) =>
            setBoardSettings((prev) => ({ ...prev, customWebsiteUrl: url }))
          }
        />
      </>
    );
  }

  // 4. Admin Mode (لوحة التحكم والإعدادات الكاملة):
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-['Cairo',sans-serif]">
      {/* Top Application Bar (Hidden when printing) */}
      <header className="no-print bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
        {/* Admin Status Notice Banner */}
        <div className="bg-slate-900 text-amber-300 px-4 py-1.5 text-xs font-semibold flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                <strong>وضع المسؤول (الآدمن) مفعّل:</strong> لوحة التحكم الكاملة متاحة لك فقط.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsChangingPin(true)}
                className="hover:text-white transition-colors underline flex items-center gap-1 text-[11px]"
              >
                <KeyRound className="w-3 h-3" />
                <span>تغيير رمز المرور</span>
              </button>

              <button
                onClick={() => setIsAdmin(false)}
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-2.5 py-0.5 rounded text-[11px] transition-all flex items-center gap-1 cursor-pointer"
                title="معاينة الصفحة كما تظهر للزائر العادي"
              >
                <Eye className="w-3 h-3" />
                <span>معاينة كزائر</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('هل تريد تسجيل الخروج من لوحة التحكم؟')) {
                    setIsAdmin(false);
                  }
                }}
                className="hover:text-red-300 text-slate-400 text-[11px] flex items-center gap-1 transition-colors"
                title="تسجيل الخروج"
              >
                <LogOut className="w-3 h-3" />
                <span>خروج</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-700 to-amber-500 text-white flex items-center justify-center shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  نظام تكريم المنتسبين المميزين
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                  {boardSettings.organizationName}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                لوحات تقدير شهرية بدقة طباعة عالية (300 DPI)
              </p>
            </div>
          </div>

          {/* Quick Print & Action Buttons */}
          <div className="flex items-center gap-2">
            {/* QR Code Button */}
            <button
              onClick={() => setIsQRCodeModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-bold border border-slate-300 transition-all cursor-pointer"
              title="توليد باركود للزوار"
            >
              <QrCode className="w-4 h-4 text-amber-700" />
              <span className="hidden md:inline">الباركود الإلكتروني (QR)</span>
            </button>

            {/* Print Board */}
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة وتصدير اللوحة</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 border-t border-slate-100 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-amber-50 text-amber-900 border border-amber-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>لوحة التكريم والتحكم</span>
          </button>

          <button
            onClick={() => setActiveTab('employees')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'employees'
                ? 'bg-amber-50 text-amber-900 border border-amber-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4 text-amber-600" />
            <span>سجل المنتسبين ({employees.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('customizer')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'customizer'
                ? 'bg-amber-50 text-amber-900 border border-amber-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Palette className="w-4 h-4 text-amber-600" />
            <span>تخصيص القالب والإطار</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'history'
                ? 'bg-amber-50 text-amber-900 border border-amber-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <History className="w-4 h-4 text-amber-600" />
            <span>أرشيف الشرف ({history.length})</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Preview & Monthly Selection */}
        {activeTab === 'preview' && (
          <div className="space-y-6">
            {/* 1. Monthly Selector Panel */}
            <div className="no-print">
              <MonthlySelector
                employees={employees}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                selectedMonthIndex={selectedMonthIndex}
                setSelectedMonthIndex={setSelectedMonthIndex}
                person1Id={person1Id}
                setPerson1Id={setPerson1Id}
                person2Id={person2Id}
                setPerson2Id={setPerson2Id}
                photoOffset1={photoOffset1}
                setPhotoOffset1={setPhotoOffset1}
                photoOffset2={photoOffset2}
                setPhotoOffset2={setPhotoOffset2}
                onSaveToHistory={handleSaveToHistory}
                historyMonthIds={history.map((h) => `${h.year}-${h.monthIndex}`)}
              />
            </div>

            {/* 2. Interactive Board Preview Header */}
            <div className="no-print flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  معاينة اللوحة التقديرية الجاهزة للطباعة
                </span>
                <span className="text-xs text-slate-400">
                  (مطابقة لمقاس A4 / A3 العرضي بدقة عالية)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAnimKey((prev) => prev + 1);
                    confetti({ particleCount: 20, spread: 45, origin: { y: 0.6 } });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-bold transition-all border border-amber-200 cursor-pointer"
                  title="إعادة تشغيل التأثير الحركي لعناصر اللوحة"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  <span>إعادة الحركة</span>
                </button>

                <button
                  onClick={() => setIsQRCodeModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all border border-slate-300"
                >
                  <QrCode className="w-3.5 h-3.5 text-amber-700" />
                  <span>مشاركة الباركود</span>
                </button>

                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>طباعة أو حفظ كصورة</span>
                </button>
              </div>
            </div>

            {/* 3. The Certificate Board Component */}
            <div className="flex justify-center w-full">
              <div className="w-full max-w-5xl">
                <CertificateBoard
                  ref={boardRef}
                  settings={boardSettings}
                  monthName={currentMonthName}
                  year={selectedYear}
                  useArabicNumerals={useArabicNumerals}
                  person1={person1}
                  person2={person2}
                  photoOffset1={photoOffset1}
                  photoOffset2={photoOffset2}
                  animationKey={animKey}
                />
              </div>
            </div>

            {/* Quick Helper Tips underneath preview */}
            <div className="no-print bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  ✓
                </div>
                <p className="text-xs text-amber-950 font-medium">
                  <strong>نصيحة المسؤول:</strong> عند طباعة اللوحة، يمكنك تفعيل خيار "تضمين الباركود" ليظهر رمز QR صغير في زاوية اللوحة الورقية يمكن للزوار مسحه بهواتفهم.
                </p>
              </div>
              <button
                onClick={() => setIsQRCodeModalOpen(true)}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 underline whitespace-nowrap"
              >
                إعدادات الباركود والرابط العام ←
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Affiliates Directory Management */}
        {activeTab === 'employees' && (
          <div className="no-print">
            <EmployeeManager
              employees={employees}
              setEmployees={setEmployees}
              onSelectPerson1={(id) => {
                setPerson1Id(id);
                setActiveTab('preview');
              }}
              onSelectPerson2={(id) => {
                setPerson2Id(id);
                setActiveTab('preview');
              }}
              onResetToDefault={handleResetToDefault}
            />
          </div>
        )}

        {/* Tab 3: Board Customizer */}
        {activeTab === 'customizer' && (
          <div className="no-print space-y-6">
            <BoardCustomizer
              settings={boardSettings}
              setSettings={setBoardSettings}
              useArabicNumerals={useArabicNumerals}
              setUseArabicNumerals={setUseArabicNumerals}
            />

            {/* Miniature live preview */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-600" />
                <span>معاينة فورية للتعديلات:</span>
              </h3>
              <div className="max-w-3xl mx-auto">
                <CertificateBoard
                  settings={boardSettings}
                  monthName={currentMonthName}
                  year={selectedYear}
                  useArabicNumerals={useArabicNumerals}
                  person1={person1}
                  person2={person2}
                  photoOffset1={photoOffset1}
                  photoOffset2={photoOffset2}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: History & Past Honors */}
        {activeTab === 'history' && (
          <div className="no-print">
            <HistoryArchive
              history={history}
              employees={employees}
              onLoadAward={handleLoadAward}
              onDeleteAward={handleDeleteAward}
              activeAwardId={activeArchiveId}
            />
          </div>
        )}
      </main>

      {/* Footer (Hidden when printing) */}
      <footer className="no-print border-t border-slate-200 bg-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 flex items-center justify-between">
          <span>نظام تكريم المنتسبين المميزين • متوافق مع كافة الطابعات الملونة بدقة 300 DPI وورق A4/A3</span>
          <button
            onClick={() => setIsAdmin(false)}
            className="text-amber-800 hover:underline font-semibold"
          >
            الانتقال لصفحة الزائر العامة (رؤية فقط)
          </button>
        </div>
      </footer>

      {/* Print & Export High Resolution Modal */}
      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        boardElementId="printable-honor-board"
        monthName={currentMonthName}
        year={selectedYear}
        person1Name={person1?.name || 'المنتسب الأول'}
        person2Name={person2?.name || 'المنتسب الثاني'}
      />

      {/* QR Code Generator Modal */}
      <QRCodeModal
        isOpen={isQRCodeModalOpen}
        onClose={() => setIsQRCodeModalOpen(false)}
        publicUrl={publicUrl}
        showQRCodeOnBoard={boardSettings.showQRCode}
        setShowQRCodeOnBoard={(val) =>
          setBoardSettings((prev) => ({ ...prev, showQRCode: val }))
        }
        organizationName={boardSettings.organizationName}
        monthName={currentMonthName}
        year={selectedYear}
        onSwitchToPublicView={() => setIsAdmin(false)}
        customWebsiteUrl={boardSettings.customWebsiteUrl}
        setCustomWebsiteUrl={(url) =>
          setBoardSettings((prev) => ({ ...prev, customWebsiteUrl: url }))
        }
      />

      {/* Change PIN Modal */}
      {isChangingPin && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">تغيير رمز مرور الإدارة</h3>
              <button
                onClick={() => setIsChangingPin(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveNewPin} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الرمز السري الجديد:
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: 5566"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm font-mono tracking-widest text-center focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsChangingPin(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl"
                >
                  حفظ الرمز الجديد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

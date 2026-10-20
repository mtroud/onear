import React, { useState } from 'react';
import { Employee } from '../types';
import { MONTH_NAMES_SIMPLE } from '../data/defaultData';
import {
  Users,
  Calendar,
  ArrowLeftRight,
  ZoomIn,
  ZoomOut,
  Move,
  Search,
  Check,
  Award,
  Sparkles,
  Sliders,
  History,
  RotateCcw,
} from 'lucide-react';

interface MonthlySelectorProps {
  employees: Employee[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonthIndex: number;
  setSelectedMonthIndex: (month: number) => void;
  person1Id: string;
  setPerson1Id: (id: string) => void;
  person2Id: string;
  setPerson2Id: (id: string) => void;
  photoOffset1: { x: number; y: number; zoom: number };
  setPhotoOffset1: (offset: { x: number; y: number; zoom: number }) => void;
  photoOffset2: { x: number; y: number; zoom: number };
  setPhotoOffset2: (offset: { x: number; y: number; zoom: number }) => void;
  onSaveToHistory: () => void;
  historyMonthIds: string[];
  onOpenNominations?: () => void;
}

export const MonthlySelector: React.FC<MonthlySelectorProps> = ({
  employees,
  selectedYear,
  setSelectedYear,
  selectedMonthIndex,
  setSelectedMonthIndex,
  person1Id,
  setPerson1Id,
  person2Id,
  setPerson2Id,
  photoOffset1,
  setPhotoOffset1,
  photoOffset2,
  setPhotoOffset2,
  onSaveToHistory,
  historyMonthIds,
  onOpenNominations,
}) => {
  const [modalTarget, setModalTarget] = useState<'person1' | 'person2' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [adjustTarget, setAdjustTarget] = useState<'person1' | 'person2' | null>(null);

  const person1 = employees.find((e) => e.id === person1Id);
  const person2 = employees.find((e) => e.id === person2Id);

  // Swap persons
  const handleSwap = () => {
    const tempId = person1Id;
    setPerson1Id(person2Id);
    setPerson2Id(tempId);

    const tempOffset = { ...photoOffset1 };
    setPhotoOffset1({ ...photoOffset2 });
    setPhotoOffset2(tempOffset);
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMonthKey = `${selectedYear}-${selectedMonthIndex}`;
  const isAlreadyInHistory = historyMonthIds.includes(currentMonthKey);

  const currentOffset = adjustTarget === 'person1' ? photoOffset1 : photoOffset2;
  const setCurrentOffset = adjustTarget === 'person1' ? setPhotoOffset1 : setPhotoOffset2;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 mb-6">
      {/* Top Header Controls: Month & Year Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              تحديد الشهر والمنتسبين المميزين
            </h2>
            <p className="text-xs text-slate-500">
              اختر الشهر والسنة ثم حدد المنتسبين الاثنين للتكريم في اللوحة
            </p>
          </div>
        </div>

        {/* Date Pickers */}
        <div className="flex items-center gap-3">
          {/* Month selector */}
          <div className="flex flex-col">
            <label className="text-[11px] font-semibold text-slate-500 mb-1">الشهر</label>
            <select
              value={selectedMonthIndex}
              onChange={(e) => setSelectedMonthIndex(Number(e.target.value))}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer"
            >
              {MONTH_NAMES_SIMPLE.map((name, idx) => (
                <option key={idx} value={idx}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Year selector */}
          <div className="flex flex-col">
            <label className="text-[11px] font-semibold text-slate-500 mb-1">السنة</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer"
            >
              {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((yr) => (
                <option key={yr} value={yr}>
                  {yr} م
                </option>
              ))}
            </select>
          </div>

          {/* Save to History Button */}
          <div className="flex flex-col justify-end">
            <label className="text-[11px] text-transparent mb-1">إجراء</label>
            <button
              onClick={onSaveToHistory}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold shadow-sm transition-all ${
                isAlreadyInHistory
                  ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{isAlreadyInHistory ? 'تحديث في السجل' : 'حفظ في السجل'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Banner to Nominations & Electronic Lottery */}
      {onOpenNominations && (
        <div className="mt-4 p-3.5 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-slate-50 border border-amber-300/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
              🎲
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-black text-slate-900">
                  نظام ترشيحات مسؤولي الشعب والقرعة الإلكترونية لنهاية الشهر
                </h4>
                <span className="text-[10px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                  جديد
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                يقوم كل مسؤول شعبة بترشيح منتسب مميز، وقبل نهاية الشهر يتم إجراء القرعة العشوائية الإلكترونية لاختيار المكرمين الاثنين تلقائياً.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenNominations}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer self-start sm:self-center shrink-0"
          >
            <span>إجراء القرعة / إدارة الترشيحات ←</span>
          </button>
        </div>
      )}

      {/* The Two Selected Affiliates Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 relative">
        {/* Person 1 Card */}
        <div className="bg-gradient-to-br from-amber-50/50 to-slate-50/70 border-2 border-amber-500/20 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={person1?.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'}
                alt={person1?.name || 'المنتسب الأول'}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-600 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
                1
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                المنتسب الأول (اليمين)
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {person1?.name || 'لم يتم الاختيار'}
              </h3>
              <p className="text-xs text-slate-500">
                {person1?.department || 'القسم'} • {person1?.title || 'المسمى الوظيفي'}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => {
                setModalTarget('person1');
                setSearchQuery('');
              }}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
            >
              <Users className="w-3.5 h-3.5" />
              <span>تغيير</span>
            </button>
            <button
              onClick={() => setAdjustTarget('person1')}
              title="ضبط موضع وحجم الصورة في الدائرة"
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-600" />
              <span>ضبط الصورة</span>
            </button>
          </div>
        </div>

        {/* Swap Button (Floating between cards on larger screens) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <button
            onClick={handleSwap}
            title="تبديل المواقع بين المنتسبين"
            className="w-10 h-10 rounded-full bg-white border border-slate-300 shadow-lg text-slate-700 hover:text-amber-600 hover:border-amber-500 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Person 2 Card */}
        <div className="bg-gradient-to-br from-blue-50/40 to-slate-50/70 border-2 border-blue-500/20 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={person2?.photoUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200'}
                alt={person2?.name || 'المنتسب الثاني'}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-600 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
                2
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                المنتسب الثاني (اليسار)
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {person2?.name || 'لم يتم الاختيار'}
              </h3>
              <p className="text-xs text-slate-500">
                {person2?.department || 'القسم'} • {person2?.title || 'المسمى الوظيفي'}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => {
                setModalTarget('person2');
                setSearchQuery('');
              }}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
            >
              <Users className="w-3.5 h-3.5" />
              <span>تغيير</span>
            </button>
            <button
              onClick={() => setAdjustTarget('person2')}
              title="ضبط موضع وحجم الصورة في الدائرة"
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              <span>ضبط الصورة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Swap Button */}
      <div className="flex md:hidden justify-center mt-3">
        <button
          onClick={handleSwap}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span>تبديل مواقع المنتسبين (يمين / يسار)</span>
        </button>
      </div>

      {/* Select Employee Modal */}
      {modalTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  اختيار {modalTarget === 'person1' ? 'المنتسب الأول' : 'المنتسب الثاني'}
                </h3>
                <p className="text-xs text-slate-500">
                  انقر على أي منتسب لاعتماده في لوحة هذا الشهر
                </p>
              </div>
              <button
                onClick={() => setModalTarget(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <div className="relative">
                <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="ابحث بالاسم أو القسم أو المسمى الوظيفي..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pr-9 pl-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  autoFocus
                />
              </div>
            </div>

            {/* Employee List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredEmployees.map((emp) => {
                const isSelected =
                  (modalTarget === 'person1' && emp.id === person1Id) ||
                  (modalTarget === 'person2' && emp.id === person2Id);
                const isOther =
                  (modalTarget === 'person1' && emp.id === person2Id) ||
                  (modalTarget === 'person2' && emp.id === person1Id);

                return (
                  <div
                    key={emp.id}
                    onClick={() => {
                      if (modalTarget === 'person1') {
                        setPerson1Id(emp.id);
                        if (emp.id === person2Id) {
                          // Swap if same was selected for other slot
                          setPerson2Id(person1Id);
                        }
                      } else {
                        setPerson2Id(emp.id);
                        if (emp.id === person1Id) {
                          setPerson1Id(person2Id);
                        }
                      }
                      setModalTarget(null);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/80 shadow-xs'
                        : isOther
                        ? 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
                        : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.photoUrl}
                        alt={emp.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{emp.name}</h4>
                          {isOther && (
                            <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full">
                              مختار في الموضع الآخر
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">
                          {emp.department} • {emp.title}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredEmployees.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-sm">
                  لم يتم العثور على منتسب يطابق بحثك. يمكنك إضافة منتسب جديد من تبويب "إدارة المنتسبين".
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Adjust Photo Position/Zoom Modal */}
      {adjustTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                ضبط موضع الصورة في الدائرة ({adjustTarget === 'person1' ? person1?.name : person2?.name})
              </h3>
              <button
                onClick={() => setAdjustTarget(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Circular Preview */}
            <div className="my-6 flex justify-center">
              <div className="w-40 h-40 rounded-full border-4 border-amber-600 shadow-xl overflow-hidden relative bg-slate-200">
                <img
                  src={
                    (adjustTarget === 'person1' ? person1?.photoUrl : person2?.photoUrl) || ''
                  }
                  alt="preview"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  style={{
                    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px) scale(${currentOffset.zoom})`,
                  }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* Zoom control */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>تكبير / تصغير (Zoom)</span>
                  <span>{Math.round(currentOffset.zoom * 100)}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <ZoomOut className="w-4 h-4 text-slate-400" />
                  <input
                    type="range"
                    min="0.6"
                    max="2.5"
                    step="0.05"
                    value={currentOffset.zoom}
                    onChange={(e) =>
                      setCurrentOffset({ ...currentOffset, zoom: parseFloat(e.target.value) })
                    }
                    className="flex-1 accent-amber-600"
                  />
                  <ZoomIn className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Pan Horizontal */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>إزاحة أفقية (يمين / يسار)</span>
                  <span>{currentOffset.x}px</span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={currentOffset.x}
                  onChange={(e) =>
                    setCurrentOffset({ ...currentOffset, x: parseInt(e.target.value) })
                  }
                  className="w-full accent-amber-600"
                />
              </div>

              {/* Pan Vertical */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>إزاحة عمودية (أعلى / أسفل)</span>
                  <span>{currentOffset.y}px</span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={currentOffset.y}
                  onChange={(e) =>
                    setCurrentOffset({ ...currentOffset, y: parseInt(e.target.value) })
                  }
                  className="w-full accent-amber-600"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentOffset({ x: 0, y: 0, zoom: 1 })}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط</span>
              </button>
              <button
                onClick={() => setAdjustTarget(null)}
                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl shadow-sm"
              >
                تم واعتماد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

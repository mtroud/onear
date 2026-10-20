import React, { useState } from 'react';
import { Employee, Nomination } from '../types';
import {
  UserCheck,
  Plus,
  ThumbsUp,
  Star,
  Award,
  Check,
  Trash2,
  Users,
  Building,
  Sparkles,
  Shuffle,
  Trophy,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FolderPlus,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ElectronicLotteryModal } from './ElectronicLotteryModal';

export const DEFAULT_OFFICIALS = [
  { id: 'off-1', title: 'مسؤول شعبة الخدمات والمضيف', dept: 'شعبة الخدمات والمضيف' },
  { id: 'off-2', title: 'مسؤول شعبة الأمن والسلامة', dept: 'شعبة الأمن والسلامة' },
  { id: 'off-3', title: 'مسؤول شعبة الصيانة الفنية والمنظومات', dept: 'شعبة الصيانة الفنية' },
  { id: 'off-4', title: 'مسؤول شعبة العلاقات العامة والإعلام', dept: 'شعبة العلاقات العامة والإعلام' },
  { id: 'off-5', title: 'مسؤول شعبة الشؤون الإدارية والموارد البشرية', dept: 'الشؤون الإدارية' },
  { id: 'off-6', title: 'مسؤول شعبة التوجيه الديني والثقافي', dept: 'الشؤون الدينية والثقافية' },
  { id: 'off-7', title: 'مسؤول شعبة المشتريات والمخازن', dept: 'شعبة المشتريات والمخازن' },
  { id: 'off-8', title: 'مسؤول شعبة تكنولوجيا المعلومات والاتصالات', dept: 'شعبة تكنولوجيا المعلومات' },
  { id: 'off-9', title: 'مسؤول شعبة الآليات والنقل', dept: 'شعبة الآليات' },
];

const QUICK_REASONS = [
  'تفانٍ استثنائي في خدمة زائري الإمام الحسين (ع) على مدار الساعة.',
  'انضباط عالي والتزام تام بمهام العمل والمناوبة بكل إخلاص.',
  'مبادرة متميزة وسرعة استجابة في حل المشكلات الميدانية الطارئة.',
  'حسن التعامل والخلق الرفيع مع الزائرين والزملاء في القسم.',
  'جهود متميزة في أعمال الصيانة الدورية وتأمين سلامة المنظومات.',
];

interface NominationManagerProps {
  employees: Employee[];
  selectedYear: number;
  selectedMonthIndex: number;
  monthName: string;
  onAssignToPerson1: (empId: string) => void;
  onAssignToPerson2: (empId: string) => void;
  person1Id: string;
  person2Id: string;
}

export const NominationManager: React.FC<NominationManagerProps> = ({
  employees,
  selectedYear,
  selectedMonthIndex,
  monthName,
  onAssignToPerson1,
  onAssignToPerson2,
  person1Id,
  person2Id,
}) => {
  const storageKey = `honor_nominations_${selectedYear}_${selectedMonthIndex}`;

  const [nominations, setNominations] = useState<Nomination[]>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Default initial sample nominations
    return [
      {
        id: 'nom-1',
        year: selectedYear,
        monthIndex: selectedMonthIndex,
        employeeId: 'emp-1', // حسن عبد الامير جودي
        nominatedBy: 'مسؤول شعبة الخدمات والمضيف',
        reason: 'تفانٍ استثنائي في استقبال وتفويج زوار العتبة المقدسة خلال الزيارات المليونية.',
        votes: 8,
        createdAt: '2026-09-01T12:00:00.000Z',
      },
      {
        id: 'nom-2',
        year: selectedYear,
        monthIndex: selectedMonthIndex,
        employeeId: 'emp-2', // مصطفى جواد كاظم
        nominatedBy: 'مسؤول شعبة الأمن والسلامة',
        reason: 'يقظة أمنية عالية وسرعة استجابة في مساعدة الزوار وتأمين بوابات المجمع.',
        votes: 7,
        createdAt: '2026-09-02T10:00:00.000Z',
      },
      {
        id: 'nom-3',
        year: selectedYear,
        monthIndex: selectedMonthIndex,
        employeeId: 'emp-3', // علي حسين مهدي
        nominatedBy: 'مسؤول شعبة الصيانة الفنية والمنظومات',
        reason: 'إصلاح وصيانة عاجلة لمنظومات التبريد والكهرباء في وقت قياسي دون توقف الخدمة.',
        votes: 5,
        createdAt: '2026-09-03T15:30:00.000Z',
      },
      {
        id: 'nom-4',
        year: selectedYear,
        monthIndex: selectedMonthIndex,
        employeeId: 'emp-4', // كرار حيدر جاسم
        nominatedBy: 'مسؤول شعبة العلاقات العامة والإعلام',
        reason: 'توثيق إعلامي متميز وتغطية أنشطة العتبة والمجمع باحترافية عالية ونشاط دؤوب.',
        votes: 4,
        createdAt: '2026-09-04T09:15:00.000Z',
      },
    ];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(employees[0]?.id || '');
  const [nominatedBy, setNominatedBy] = useState('');
  const [reason, setReason] = useState('');
  const [isLotteryOpen, setIsLotteryOpen] = useState(false);

  // Custom official adder
  const [customOfficialTitle, setCustomOfficialTitle] = useState('');
  const [showAddCustomOfficial, setShowAddCustomOfficial] = useState(false);
  const [officialsList, setOfficialsList] = useState(DEFAULT_OFFICIALS);

  const saveNominations = (updated: Nomination[]) => {
    setNominations(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleAddNomination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmpId || !reason.trim()) {
      alert('يرجى اختيار المنتسب وكتابة سبب الترشيح.');
      return;
    }

    const officialName = nominatedBy.trim() || 'مسؤول القسم';

    // Check if employee is already nominated this month
    const alreadyNominated = nominations.find((n) => n.employeeId === selectedEmpId);
    if (alreadyNominated) {
      if (!confirm('هذا المنتسب مرشح مسبقاً لهذا الشهر! هل ترغب في تسجيل ترشيح إضافي له من مسؤول آخر؟')) {
        return;
      }
    }

    const newNom: Nomination = {
      id: `nom-${Date.now()}`,
      year: selectedYear,
      monthIndex: selectedMonthIndex,
      employeeId: selectedEmpId,
      nominatedBy: officialName,
      reason: reason.trim(),
      votes: 1,
      createdAt: new Date().toISOString(),
    };

    const updated = [newNom, ...nominations];
    saveNominations(updated);
    setIsAdding(false);
    setReason('');
    setNominatedBy('');
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
  };

  const handleVote = (nomId: string) => {
    const updated = nominations.map((n) =>
      n.id === nomId ? { ...n, votes: n.votes + 1 } : n
    );
    saveNominations(updated);
  };

  const handleDelete = (nomId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الترشيح من قائمة القرعة؟')) {
      saveNominations(nominations.filter((n) => n.id !== nomId));
    }
  };

  const handleQuickNominateForOfficial = (officialTitle: string, deptHint?: string) => {
    setNominatedBy(officialTitle);
    // Try to pre-select an employee from this department if available
    if (deptHint) {
      const match = employees.find((emp) =>
        emp.department.toLowerCase().includes(deptHint.toLowerCase()) ||
        deptHint.toLowerCase().includes(emp.department.toLowerCase())
      );
      if (match) setSelectedEmpId(match.id);
    }
    setIsAdding(true);
  };

  const handleAddCustomOfficial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customOfficialTitle.trim()) return;
    const newOff = {
      id: `off-${Date.now()}`,
      title: customOfficialTitle.trim(),
      dept: customOfficialTitle.trim().replace(/^مسؤول\s+/, ''),
    };
    setOfficialsList((prev) => [...prev, newOff]);
    setNominatedBy(newOff.title);
    setCustomOfficialTitle('');
    setShowAddCustomOfficial(false);
  };

  // Find nominated employees details
  const nominatedCount = nominations.length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Explanation */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-1.5">
              <UserCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>نظام ترشيحات المسؤولين • شهر {monthName} {selectedYear} م</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              ترشيحات مسؤولي الأقسام والقرعة الإلكترونية الشهرية
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              يقوم كل مسؤول شعبة بترشيح منتسب مميز من قسمه، وقبل نهاية الشهر تُجرى قرعة إلكترونية لاختيار المكرمَين الاثنين بنزاهة وشفافية مطلقة ونقلهما فوراً إلى لوحة التكريم.
            </p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>{isAdding ? 'إغلاق النموذج' : 'تسجيل ترشيح مسؤول جديد'}</span>
          </button>
        </div>

        {/* 1. Prominent Electronic Lottery Banner (Before End of Month) */}
        <div className="my-5 p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 rounded-3xl text-white shadow-xl border-2 border-amber-500/60 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start gap-4 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-bold shadow-xl shrink-0 ring-4 ring-amber-400/25">
              <Shuffle className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  القرعة الإلكترونية لنهاية شهر {monthName}
                </h3>
                <span className="text-[11px] font-bold bg-amber-500 text-slate-950 px-3 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  سحب آلي عشوائي موثق
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 max-w-xl leading-relaxed">
                سحب إلكتروني مرئي وتفاعلي بين جميع منتسبي الشعب المرشحين من قِبل مسؤوليهم. ينتج عن السحب اختيار المكرمين الاثنين لنقلهما تلقائياً للوحة التكريم والشهادات.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs font-bold text-amber-300">
                <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-xl border border-amber-500/30">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>المرشحون الجاهزون للسحب: ({nominatedCount}) منتسبين مسجلين</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-xl border border-amber-500/30 text-slate-300">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>موعد السحب: قبل نهاية الشهر الجاري</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (nominations.length < 2) {
                alert('يرجى تسجيل مرشحين اثنين على الأقل لبدء القرعة الإلكترونية.');
                return;
              }
              setIsLotteryOpen(true);
            }}
            className="relative z-10 flex items-center justify-center gap-2.5 px-7 py-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
          >
            <Shuffle className="w-5 h-5" />
            <span>إجراء القرعة الإلكترونية الآن 🎲</span>
          </button>
        </div>

        {/* 2. Department Officials Nomination Status Checklist */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-amber-600" />
                <span>حالة ترشيحات مسؤولي الشعب لهذا الشهر:</span>
              </h3>
              <p className="text-xs text-slate-500">
                قائمة مسؤولي الشعب لمتابعة من قام بالترشيح ومن ينتظر تقديم مرشحه قبل موعد القرعة
              </p>
            </div>

            <button
              onClick={() => setShowAddCustomOfficial(!showAddCustomOfficial)}
              className="text-xs text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1 cursor-pointer self-start"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>إضافة مسؤول شعبة أخرى</span>
            </button>
          </div>

          {/* Add custom official mini form */}
          {showAddCustomOfficial && (
            <form onSubmit={handleAddCustomOfficial} className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center gap-2 animate-in fade-in">
              <input
                type="text"
                placeholder="اسم منصب المسؤول، مثلاً: مسؤول شعبة المخازن المركزية"
                value={customOfficialTitle}
                onChange={(e) => setCustomOfficialTitle(e.target.value)}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-amber-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold"
              >
                حفظ المسؤول
              </button>
              <button
                type="button"
                onClick={() => setShowAddCustomOfficial(false)}
                className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-xl text-xs"
              >
                إلغاء
              </button>
            </form>
          )}

          {/* Officials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {officialsList.map((off) => {
              // Find if this official has nominated someone
              const existingNom = nominations.find((n) =>
                n.nominatedBy.toLowerCase().includes(off.title.toLowerCase()) ||
                off.title.toLowerCase().includes(n.nominatedBy.toLowerCase())
              );
              const emp = existingNom ? employees.find((e) => e.id === existingNom.employeeId) : null;

              return (
                <div
                  key={off.id}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2.5 ${
                    existingNom
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {off.title}
                    </h4>
                    {existingNom && emp ? (
                      <p className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1 mt-0.5 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>رشّح: {emp.name}</span>
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        بانتظار تقديم الترشيح للقرعة
                      </p>
                    )}
                  </div>

                  {existingNom ? (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                      معتمد ✓
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleQuickNominateForOfficial(off.title, off.dept)}
                      className="text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-xl transition-all cursor-pointer shrink-0"
                    >
                      تسجيل ترشيح
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Add Nomination Form */}
        {isAdding && (
          <form
            onSubmit={handleAddNomination}
            className="mt-6 p-5 sm:p-6 bg-gradient-to-br from-amber-50/80 to-yellow-50/50 border-2 border-amber-300 rounded-3xl space-y-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between pb-3 border-b border-amber-200">
              <h3 className="text-sm font-black text-amber-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>تسجيل ترشيح رسمي من مسؤول القسم لشهر {monthName}:</span>
              </h3>
              <span className="text-xs text-amber-800 font-bold">
                خطوة 1: اختيار المنتسب • خطوة 2: الدخول في القرعة الإلكترونية
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  المسؤول القائم بالترشيح (اسم المنصب أو الشعبة):
                </label>
                <input
                  type="text"
                  required
                  placeholder="اختر من القائمة أدناه أو اكتب هنا..."
                  value={nominatedBy}
                  onChange={(e) => setNominatedBy(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-amber-500"
                />

                {/* Quick Presets for Officials */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {officialsList.map((off) => (
                    <button
                      key={off.id}
                      type="button"
                      onClick={() => setNominatedBy(off.title)}
                      className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                        nominatedBy === off.title
                          ? 'bg-amber-600 text-white border-amber-600 font-bold'
                          : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {off.title}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  اختر المنتسب المرشح للتكريم والقرعة:
                </label>
                <select
                  value={selectedEmpId}
                  onChange={(e) => setSelectedEmpId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.title} - {emp.department})
                    </option>
                  ))}
                </select>

                {/* Selected Employee Preview */}
                {(() => {
                  const previewEmp = employees.find((e) => e.id === selectedEmpId);
                  if (!previewEmp) return null;
                  return (
                    <div className="flex items-center gap-2.5 mt-2 p-2 bg-white rounded-xl border border-amber-200/80">
                      <img
                        src={previewEmp.photoUrl}
                        alt={previewEmp.name}
                        className="w-8 h-8 rounded-full object-cover border border-amber-500"
                      />
                      <div className="text-[11px] leading-tight">
                        <span className="font-bold text-slate-900">{previewEmp.name}</span>
                        <span className="text-slate-500 mr-1.5">• {previewEmp.department}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                أسباب ومبررات التميز في خدمة الإمام الحسين (ع) وزائريه:
              </label>
              <textarea
                required
                rows={2}
                placeholder="اكتب أسباب ترشيح هذا المنتسب، مثل: الانضباط العالي، المبادرة، حسن التعامل مع الزوار، الإتقان، العمل الإضافي..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-amber-500"
              />

              {/* Quick suggestion chips */}
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <span className="text-[10px] text-slate-400 font-bold self-center">عبارات جاهزة:</span>
                {QUICK_REASONS.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setReason(q)}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-amber-100/70 hover:bg-amber-200 text-amber-900 transition-colors cursor-pointer"
                  >
                    {q.slice(0, 36)}...
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-amber-200/80">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow-sm"
              >
                اعتماد الترشيح وإدراجه في القرعة
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 4. Qualified Nominees Pool List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              <span>قائمة المنتسبين المؤهلين للقرعة الإلكترونية ({nominations.length})</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              هؤلاء المنتسبون تم ترشيحهم رسمياً من قِبل مسؤولي شعبهم وسيدخلون السحب الآلي
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (nominations.length < 2) {
                  alert('يرجى تسجيل مرشحين اثنين على الأقل لبدء القرعة.');
                  return;
                }
                setIsLotteryOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              <span>فتح شاشة القرعة 🎲</span>
            </button>
          </div>
        </div>

        {nominations.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-xl">
              🎲
            </div>
            <h4 className="text-base font-bold text-slate-800">
              لا توجد ترشيحات مسجلة لشهر {monthName} حتى الآن
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              انقر على "تسجيل ترشيح مسؤول جديد" أعلاه أو اختر إحدى الشعب للبدء بإضافة مرشحي مسؤولي الأقسام.
            </p>
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>تسجيل أول ترشيح الآن</span>
            </button>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {nominations
              .sort((a, b) => b.votes - a.votes)
              .map((nom, index) => {
                const emp = employees.find((e) => e.id === nom.employeeId);
                if (!emp) return null;

                const isPerson1 = person1Id === emp.id;
                const isPerson2 = person2Id === emp.id;
                const isSelected = isPerson1 || isPerson2;

                return (
                  <div
                    key={nom.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-400/40 shadow-sm'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    {/* Left: Employee Info & Nomination Reason */}
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0 mt-0.5">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-amber-500 shadow-md bg-white">
                          <img
                            src={emp.photoUrl}
                            alt={emp.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-900 text-amber-400 font-bold text-[10px] flex items-center justify-center border border-white">
                          #{index + 1}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm sm:text-base font-black text-slate-900">
                            {emp.name}
                          </h4>
                          <span className="text-[11px] font-bold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-md">
                            {emp.department}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            ({emp.title})
                          </span>

                          {isSelected && (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                              <Check className="w-3 h-3 text-emerald-700" />
                              <span>مختار في لوحة التكريم ({isPerson1 ? 'المكرم الأول' : 'المكرم الثاني'})</span>
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed max-w-2xl bg-white/70 p-2 rounded-xl border border-slate-100">
                          {nom.reason}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                          <span className="font-bold text-amber-900 bg-amber-100/60 px-2 py-0.5 rounded">
                            المرشِّح: {nom.nominatedBy}
                          </span>
                          <span>•</span>
                          <span>تاريخ الترشيح: {new Date(nom.createdAt).toLocaleDateString('ar-IQ')}</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">مؤهل للقرعة الإلكترونية ✓</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 self-end md:self-center shrink-0 border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-between md:justify-end">
                      {/* Vote/Endorsement Button */}
                      <button
                        onClick={() => handleVote(nom.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                        title="تأييد الترشيح"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-amber-600" />
                        <span>{nom.votes} تأييد</span>
                      </button>

                      {/* Manual Assignment Options if needed */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onAssignToPerson1(emp.id)}
                          disabled={isPerson1}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isPerson1
                              ? 'bg-amber-600 text-white cursor-default shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                          }`}
                          title="تعيين يدوياً كشخص أول"
                        >
                          <span>{isPerson1 ? 'المكرم 1 ✓' : 'تعيين مكرم 1'}</span>
                        </button>

                        <button
                          onClick={() => onAssignToPerson2(emp.id)}
                          disabled={isPerson2}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isPerson2
                              ? 'bg-amber-600 text-white cursor-default shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                          }`}
                          title="تعيين يدوياً كشخص ثانٍ"
                        >
                          <span>{isPerson2 ? 'المكرم 2 ✓' : 'تعيين مكرم 2'}</span>
                        </button>

                        <button
                          onClick={() => handleDelete(nom.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                          title="حذف الترشيح"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* 5. Render Electronic Lottery Modal */}
      <ElectronicLotteryModal
        isOpen={isLotteryOpen}
        onClose={() => setIsLotteryOpen(false)}
        nominations={nominations}
        employees={employees}
        monthName={monthName}
        year={selectedYear}
        onApplyWinners={(person1WinnerId, person2WinnerId) => {
          onAssignToPerson1(person1WinnerId);
          onAssignToPerson2(person2WinnerId);
          setIsLotteryOpen(false);
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ca8a04', '#152e59', '#10b981'],
          });
        }}
      />
    </div>
  );
};

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
  ArrowRightLeft,
} from 'lucide-react';
import confetti from 'canvas-confetti';

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
    // Default initial nominations for demonstration
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
        nominatedBy: 'رئيس شعبة الأمن والسلامة',
        reason: 'يقظة أمنية عالية وسرعة استجابة في مساعدة الزوار وتأمين بوابات المجمع.',
        votes: 7,
        createdAt: '2026-09-02T10:00:00.000Z',
      },
      {
        id: 'nom-3',
        year: selectedYear,
        monthIndex: selectedMonthIndex,
        employeeId: 'emp-3', // علي حسين مهدي
        nominatedBy: 'مسؤول شعبة الصيانة الفنية',
        reason: 'إصلاح وصيانة عاجلة لمنظومات التبريد والكهرباء في وقت قياسي دون توقف الخدمة.',
        votes: 5,
        createdAt: '2026-09-03T15:30:00.000Z',
      },
    ];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(employees[0]?.id || '');
  const [nominatedBy, setNominatedBy] = useState('');
  const [reason, setReason] = useState('');

  const saveNominations = (updated: Nomination[]) => {
    setNominations(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleAddNomination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmpId || !reason) return;

    const newNom: Nomination = {
      id: `nom-${Date.now()}`,
      year: selectedYear,
      monthIndex: selectedMonthIndex,
      employeeId: selectedEmpId,
      nominatedBy: nominatedBy || 'مسؤول القسم',
      reason,
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
    if (confirm('هل تريد حذف هذا الترشيح؟')) {
      saveNominations(nominations.filter((n) => n.id !== nomId));
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold mb-1">
            <UserCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>نظام الترشيح الداخلي لشهر {monthName}</span>
          </div>
          <h3 className="text-lg font-black text-slate-900">
            ترشيحات الأقسام والشعب للمنتسبين المتميزين
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            يقوم رؤساء الأقسام بطرح الأسماء المرشحة مع بيان أسباب التميز، لتسهيل اختيار الفائزَين الشهريين.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'إغلاق النموذج' : 'إضافة ترشيح جديد'}</span>
        </button>
      </div>

      {/* Add Nomination Form */}
      {isAdding && (
        <form
          onSubmit={handleAddNomination}
          className="my-5 p-5 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-4 animate-in fade-in"
        >
          <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>تسجيل ترشيح منتسب لشهر {monthName}:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                اختر المنتسب المرشح:
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
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                جهة الترشيح (اسم المسؤول أو الشعبة):
              </label>
              <input
                type="text"
                required
                placeholder="مثال: مسؤول شعبة الخدمات"
                value={nominatedBy}
                onChange={(e) => setNominatedBy(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              أسباب ومبررات التميز لهذا الشهر:
            </label>
            <textarea
              required
              rows={2}
              placeholder="اكتب أسباب ترشيح هذا المنتسب، كالانضباط أو المبادرات الخاصة في خدمة الزوار..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              اعتماد الترشيح
            </button>
          </div>
        </form>
      )}

      {/* Nominations List */}
      <div className="mt-5 space-y-3">
        {nominations.length === 0 ? (
          <p className="text-center py-8 text-xs text-slate-400">
            لا توجد ترشيحات مسجلة لهذا الشهر حتى الآن. انقر على "إضافة ترشيح جديد" للبدء.
          </p>
        ) : (
          nominations
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
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/30'
                      : 'bg-slate-50/60 border-slate-200 hover:bg-white'
                  }`}
                >
                  {/* Left: Employee Info & Nomination Reason */}
                  <div className="flex items-start gap-3.5">
                    <div className="relative shrink-0 mt-0.5">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500 shadow-sm bg-white">
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

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{emp.name}</h4>
                        <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                          {emp.department}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>مختار في لوحة التكريم ({isPerson1 ? 'الأول' : 'الثاني'})</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {nom.reason}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                        <span>المرشِّح: {nom.nominatedBy}</span>
                        <span>•</span>
                        <span>تاريخ الطرح: {new Date(nom.createdAt).toLocaleDateString('ar-EG')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions & Votes */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {/* Vote Button */}
                    <button
                      onClick={() => handleVote(nom.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                      title="تصويت وتأييد الترشيح"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-amber-600" />
                      <span>{nom.votes} تأييد</span>
                    </button>

                    {/* Quick Assign to Board Person 1 */}
                    <button
                      onClick={() => onAssignToPerson1(emp.id)}
                      disabled={isPerson1}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isPerson1
                          ? 'bg-amber-600 text-white cursor-default'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                      title="تعيين في لوحة التكريم كشخص أول"
                    >
                      <span>{isPerson1 ? 'المكرم 1 ✓' : 'اختيار كمكرم 1'}</span>
                    </button>

                    {/* Quick Assign to Board Person 2 */}
                    <button
                      onClick={() => onAssignToPerson2(emp.id)}
                      disabled={isPerson2}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isPerson2
                          ? 'bg-amber-600 text-white cursor-default'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                      title="تعيين في لوحة التكريم كشخص ثانٍ"
                    >
                      <span>{isPerson2 ? 'المكرم 2 ✓' : 'اختيار كمكرم 2'}</span>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(nom.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="حذف الترشيح"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

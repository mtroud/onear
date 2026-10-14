import React from 'react';
import { MonthlyHonorees, Employee } from '../types';
import { Award, Calendar, Eye, Trash2, Printer, ChevronLeft } from 'lucide-react';
import { toArabicNumerals } from '../data/defaultData';

interface HistoryArchiveProps {
  history: MonthlyHonorees[];
  employees: Employee[];
  onLoadAward: (award: MonthlyHonorees) => void;
  onDeleteAward: (id: string) => void;
  activeAwardId?: string;
}

export const HistoryArchive: React.FC<HistoryArchiveProps> = ({
  history,
  employees,
  onLoadAward,
  onDeleteAward,
  activeAwardId,
}) => {
  const getEmp = (id: string) => employees.find((e) => e.id === id);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 mb-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">سجل التكريمات الشهرية السابقة</h2>
            <p className="text-xs text-slate-500">
              أرشيف الشرف للمنتسبين المكرمين في الأشهر الماضية مع إمكانية إعادة طباعة أي لوحة بنقرة واحدة
            </p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
          {history.length} دورة تكريمية
        </span>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl">
          <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-500">
            لم يتم حفظ أي تكريم شهري بعد في السجل.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            عند اختيار المنتسبين، اضغط على زر "حفظ في السجل" لإضافتهم هنا.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.map((item) => {
            const p1 = getEmp(item.person1Id);
            const p2 = getEmp(item.person2Id);
            const isActive = item.id === activeAwardId;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isActive
                    ? 'border-amber-600 bg-amber-50/40 ring-2 ring-amber-500/20'
                    : 'border-slate-200 hover:border-amber-300 bg-slate-50/50 hover:bg-white'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    <h3 className="font-bold text-slate-900 text-sm">
                      شهر {item.monthName} لعام {toArabicNumerals(item.year)} م
                    </h3>
                  </div>
                  {isActive && (
                    <span className="text-[10px] font-bold bg-amber-600 text-white px-2 py-0.5 rounded-full">
                      معروض حالياً
                    </span>
                  )}
                </div>

                {/* Honorees photos & names */}
                <div className="grid grid-cols-2 gap-3 my-3">
                  {/* Person 1 */}
                  <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-100 shadow-xs">
                    <img
                      src={
                        item.customPhoto1 ||
                        p1?.photoUrl ||
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
                      }
                      alt={item.customName1 || p1?.name || ''}
                      className="w-10 h-10 rounded-full object-cover border border-amber-500 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {item.customName1 || p1?.name || 'المنتسب 1'}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {item.customTitle1 || p1?.department || ''}
                      </p>
                    </div>
                  </div>

                  {/* Person 2 */}
                  <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-100 shadow-xs">
                    <img
                      src={
                        item.customPhoto2 ||
                        p2?.photoUrl ||
                        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
                      }
                      alt={item.customName2 || p2?.name || ''}
                      className="w-10 h-10 rounded-full object-cover border border-blue-500 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {item.customName2 || p2?.name || 'المنتسب 2'}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {item.customTitle2 || p2?.department || ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <button
                    onClick={() => onLoadAward(item)}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 hover:underline"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>عرض وطباعة اللوحة</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`هل أنت متأكد من حذف تكريم شهر ${item.monthName} ${item.year}؟`)) {
                        onDeleteAward(item.id);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                    title="حذف من السجل"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

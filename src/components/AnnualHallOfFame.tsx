import React, { useState, useMemo } from 'react';
import { Employee, MonthlyHonorees } from '../types';
import {
  Award,
  Calendar,
  Building,
  Search,
  Filter,
  Sparkles,
  Printer,
  ChevronLeft,
  Users,
  Trophy,
  ExternalLink,
} from 'lucide-react';
import { toArabicNumerals } from '../data/defaultData';

interface AnnualHallOfFameProps {
  history: MonthlyHonorees[];
  employees: Employee[];
  useArabicNumerals?: boolean;
  onSelectMonth: (year: number, monthIndex: number) => void;
  onOpenBio: (employee: Employee, monthName: string, year: number) => void;
  onPrintCertificate: (employee: Employee, monthName: string, year: number) => void;
}

export const AnnualHallOfFame: React.FC<AnnualHallOfFameProps> = ({
  history,
  employees,
  useArabicNumerals = true,
  onSelectMonth,
  onOpenBio,
  onPrintCertificate,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Extract available years from history
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(history.map((h) => h.year)));
    if (!years.includes(2026)) years.push(2026);
    return years.sort((a, b) => b - a);
  }, [history]);

  // Extract available departments
  const availableDepartments = useMemo(() => {
    const depts = Array.from(new Set(employees.map((e) => e.department).filter(Boolean)));
    return ['all', ...depts];
  }, [employees]);

  // Flatten all honors for the selected year
  interface HonoreeCardData {
    awardId: string;
    monthName: string;
    monthIndex: number;
    year: number;
    employee: Employee;
  }

  const yearHonorees = useMemo(() => {
    const list: HonoreeCardData[] = [];

    history
      .filter((h) => h.year === selectedYear)
      .forEach((record) => {
        const emp1 = employees.find((e) => e.id === record.person1Id);
        if (emp1) {
          list.push({
            awardId: `${record.id}-p1`,
            monthName: record.monthName,
            monthIndex: record.monthIndex,
            year: record.year,
            employee: emp1,
          });
        }
        const emp2 = employees.find((e) => e.id === record.person2Id);
        if (emp2) {
          list.push({
            awardId: `${record.id}-p2`,
            monthName: record.monthName,
            monthIndex: record.monthIndex,
            year: record.year,
            employee: emp2,
          });
        }
      });

    return list;
  }, [history, selectedYear, employees]);

  // Filter by department and search term
  const filteredHonorees = useMemo(() => {
    return yearHonorees.filter((item) => {
      const matchesDept =
        selectedDepartment === 'all' || item.employee.department === selectedDepartment;
      const matchesSearch =
        item.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.employee.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.monthName.includes(searchTerm);
      return matchesDept && matchesSearch;
    });
  }, [yearHonorees, selectedDepartment, searchTerm]);

  // Compute department statistics
  const deptStats = useMemo(() => {
    const counts: Record<string, number> = {};
    yearHonorees.forEach((item) => {
      const dept = item.employee.department || 'عام';
      counts[dept] = (counts[dept] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [yearHonorees]);

  return (
    <div className="space-y-6">
      {/* Hero Banner for Hall of Fame */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-amber-500/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 mb-3">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>قاعة الشرف التقديرية السنوية</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              سجل الخالدين ومكرمي لعام{' '}
              <span className="text-amber-400">
                {useArabicNumerals ? toArabicNumerals(selectedYear) : selectedYear} م
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              سجل شرفي يخلد عطاء وإخلاص منتسبي مجمع سيد الشهداء (عليه السلام) الذين نالوا شرف التميز
              والتكريم الشهري تقديراً لتفانيهم في خدمة الزائرين الكرام.
            </p>
          </div>

          {/* Quick Year Switcher */}
          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/80 self-start md:self-center">
            {availableYears.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedYear === yr
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                {useArabicNumerals ? toArabicNumerals(yr) : yr} م
              </button>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs">
            <span className="text-[11px] text-slate-400 block">إجمالي المنتسبين المكرمين</span>
            <span className="text-2xl font-black text-amber-400">
              {useArabicNumerals ? toArabicNumerals(yearHonorees.length) : yearHonorees.length}
            </span>
          </div>

          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs">
            <span className="text-[11px] text-slate-400 block">الأشهر الموثقة</span>
            <span className="text-2xl font-black text-white">
              {useArabicNumerals
                ? toArabicNumerals(new Set(yearHonorees.map((h) => h.monthIndex)).size)
                : new Set(yearHonorees.map((h) => h.monthIndex)).size}
            </span>
          </div>

          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs">
            <span className="text-[11px] text-slate-400 block">أعلى قسم تميزاً</span>
            <span className="text-base sm:text-lg font-bold text-emerald-400 truncate block">
              {deptStats[0] ? deptStats[0][0] : '—'}
            </span>
          </div>

          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs">
            <span className="text-[11px] text-slate-400 block">نوع التكريم</span>
            <span className="text-base sm:text-lg font-bold text-amber-300">شهري مستمر</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث باسم المنتسب أو الشهر..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Department Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          {availableDepartments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedDepartment === dept
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {dept === 'all' ? 'جميع الأقسام' : dept}
            </button>
          ))}
        </div>
      </div>

      {/* Honorees Gallery Grid */}
      {filteredHonorees.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">لا توجد سجلات مطابقة للبحث</h3>
          <p className="text-xs text-slate-500 mt-1">
            جرب اختيار سنة أخرى أو مسح معايير الفلترة للبحث.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredHonorees.map((item, idx) => (
            <div
              key={`${item.awardId}-${idx}`}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-400/80 transition-all p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-700" />
                    <span>مكرم شهر {item.monthName}</span>
                  </span>

                  <span className="text-[10px] text-slate-400 font-mono">
                    #{idx + 1}
                  </span>
                </div>

                {/* Photo & Identity */}
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 shadow-md">
                      <img
                        src={item.employee.photoUrl}
                        alt={item.employee.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] shadow-sm">
                      ★
                    </div>
                  </div>

                  <div className="overflow-hidden">
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors truncate">
                      {item.employee.name}
                    </h4>
                    <span className="block text-xs font-semibold text-slate-600 truncate mt-0.5">
                      {item.employee.title}
                    </span>
                    <span className="inline-block text-[11px] text-amber-900 font-medium bg-amber-50 px-2 py-0.5 rounded mt-1">
                      {item.employee.department}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenBio(item.employee, item.monthName, item.year)}
                  className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-amber-800 px-2.5 py-1.5 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5 text-amber-600" />
                  <span>السيرة والتهنئة</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onPrintCertificate(item.employee, item.monthName, item.year)}
                    className="p-1.5 text-slate-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                    title="طباعة شهادة تقدير فردية"
                  >
                    <Printer className="w-4 h-4 text-amber-700" />
                  </button>

                  <button
                    onClick={() => onSelectMonth(item.year, item.monthIndex)}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span>لوحة الشهر</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

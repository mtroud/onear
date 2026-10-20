import React, { useState } from 'react';
import { Employee, MonthlyHonorees, BoardSettings } from '../types';
import {
  Download,
  Upload,
  Database,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  X,
  FileJson,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BackupRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  setEmployees: (val: Employee[]) => void;
  history: MonthlyHonorees[];
  setHistory: (val: MonthlyHonorees[]) => void;
  boardSettings: BoardSettings;
  setBoardSettings: (val: BoardSettings) => void;
}

export const BackupRestoreModal: React.FC<BackupRestoreModalProps> = ({
  isOpen,
  onClose,
  employees,
  setEmployees,
  history,
  setHistory,
  boardSettings,
  setBoardSettings,
}) => {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1. Export JSON Backup
  const handleExportJSON = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      organization: boardSettings.organizationName,
      employees,
      history,
      boardSettings,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `نسخة_احتياطية_نظام_التكريم_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    setSuccessMsg('تم تصدير النسخة الاحتياطية بنجاح بصيغة JSON!');
  };

  // 2. Export CSV for Excel
  const handleExportCSV = () => {
    let csvContent = '\uFEFF'; // UTF-8 BOM for Arabic Excel
    csvContent += 'الرقم التعريفي,الاسم الكامل,المسمى الوظيفي,القسم,الرقم الوظيفي,تاريخ الانضمام,رقم الهاتف\n';

    employees.forEach((emp) => {
      csvContent += `"${emp.id}","${emp.name}","${emp.title}","${emp.department}","${emp.badgeNumber || ''}","${emp.joinDate || ''}","${emp.phone || ''}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `قائمة_منتسبي_المجمع_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();

    setSuccessMsg('تم تصدير سجل المنتسبين كملف Excel (CSV) بنجاح!');
  };

  // 3. Restore from JSON Backup
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        if (!parsed.employees || !Array.isArray(parsed.employees)) {
          alert('ملف النسخة الاحتياطية غير صالح أو ناقص البيانات!');
          return;
        }

        if (confirm(`هل أنت متأكد من استعادة النسخة الاحتياطية؟ سيتم تحديث ${parsed.employees.length} منتسب و ${parsed.history?.length || 0} سجل تكريم.`)) {
          setEmployees(parsed.employees);
          localStorage.setItem('honor_board_employees', JSON.stringify(parsed.employees));

          if (parsed.history && Array.isArray(parsed.history)) {
            setHistory(parsed.history);
            localStorage.setItem('honor_board_history', JSON.stringify(parsed.history));
          }

          if (parsed.boardSettings) {
            setBoardSettings(parsed.boardSettings);
            localStorage.setItem('honor_board_settings', JSON.stringify(parsed.boardSettings));
          }

          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
          setSuccessMsg('تم استرجاع كامل قاعدة البيانات والإعدادات بنجاح تام!');
        }
      } catch (err) {
        console.error('Import error:', err);
        alert('حدث خطأ أثناء قراءة الملف. تأكد من أنه ملف JSON صالح.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-7 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                النسخ الاحتياطي وتصدير البيانات
              </h3>
              <p className="text-xs text-slate-500">
                حفظ واستعادة سجل المنتسبين والأرشيف والإعدادات
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

        {/* Success Alert */}
        {successMsg && (
          <div className="my-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-900 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Actions Grid */}
        <div className="space-y-4 my-5">
          {/* 1. Export JSON */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileJson className="w-4 h-4 text-amber-600" />
                <span>حفظ نسخة احتياطية كاملة (JSON)</span>
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                تحميل ملف يحتوي على جميع المنتسبين ({employees.length}) وسجل التكريمات والإعدادات.
              </p>
            </div>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل النسخة</span>
            </button>
          </div>

          {/* 2. Export Excel CSV */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>تصدير قائمة المنتسبين كملف Excel (CSV)</span>
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                ملف جدول إلكتروني بالأسماء والأقسام والهواتف يفتح مباشرة في Microsoft Excel.
              </p>
            </div>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تصدير Excel</span>
            </button>
          </div>

          {/* 3. Restore JSON */}
          <div className="p-4 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/40 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-amber-700" />
                <span>استعادة بيانات من نسخة سابقة</span>
              </span>
              <p className="text-[11px] text-slate-600 mt-0.5">
                اختر ملف نسخة احتياطية (.json) لاستعادة البيانات بالكامل إلى النظام.
              </p>
            </div>

            <label className="flex items-center gap-1 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>استيراد ملف</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
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

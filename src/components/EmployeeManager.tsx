import React, { useState } from 'react';
import { Employee } from '../types';
import {
  UserPlus,
  Search,
  Edit2,
  Trash2,
  Upload,
  Camera,
  X,
  Check,
  Building,
  BadgeCheck,
  Phone,
  FileSpreadsheet,
  RotateCcw,
} from 'lucide-react';

interface EmployeeManagerProps {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  onSelectPerson1: (id: string) => void;
  onSelectPerson2: (id: string) => void;
  onResetToDefault: () => void;
}

export const EmployeeManager: React.FC<EmployeeManagerProps> = ({
  employees,
  setEmployees,
  onSelectPerson1,
  onSelectPerson2,
  onResetToDefault,
}) => {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Form states
  const [formData, setFormData] = useState<{
    name: string;
    title: string;
    department: string;
    photoUrl: string;
    phone: string;
    badgeNumber: string;
  }>({
    name: '',
    title: '',
    department: '',
    photoUrl: '',
    phone: '',
    badgeNumber: '',
  });

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  ];

  const departments = Array.from(new Set(employees.map((e) => e.department).filter(Boolean)));

  const handleOpenAdd = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      title: 'منتسب',
      department: departments[0] || 'القسم العام',
      photoUrl: sampleAvatars[Math.floor(Math.random() * sampleAvatars.length)],
      phone: '',
      badgeNumber: String(Math.floor(1000 + Math.random() * 9000)),
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormData({
      name: emp.name,
      title: emp.title,
      department: emp.department,
      photoUrl: emp.photoUrl,
      phone: emp.phone || '',
      badgeNumber: emp.badgeNumber || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من حذف المنتسب "${name}"؟`)) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({ ...prev, photoUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('يرجى إدخال اسم المنتسب');
      return;
    }

    if (editingEmployee) {
      // update
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployee.id
            ? {
                ...emp,
                ...formData,
              }
            : emp
        )
      );
    } else {
      // create new
      const newEmp: Employee = {
        id: `emp-${Date.now()}`,
        name: formData.name,
        title: formData.title || 'منتسب',
        department: formData.department || 'القسم العام',
        photoUrl:
          formData.photoUrl ||
          sampleAvatars[0],
        phone: formData.phone,
        badgeNumber: formData.badgeNumber,
        joinDate: new Date().toISOString().split('T')[0],
      };
      setEmployees((prev) => [newEmp, ...prev]);
    }

    setIsModalOpen(false);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.title.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase()) ||
      (emp.badgeNumber && emp.badgeNumber.includes(search));

    const matchesDept = selectedDept === 'all' || emp.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 mb-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>سجل وإدارة المنتسبين</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {employees.length} منتسب
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            أضف وعدّل بيانات وصور المنتسبين لتتمكن من اختيارهم بسهولة في لوحة الشرف الشهرية
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetToDefault}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            title="استعادة البيانات الافتراضية التجريبية"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>استعادة الافتراضي</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all hover:shadow"
          >
            <UserPlus className="w-4 h-4" />
            <span>إضافة منتسب جديد</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 mb-6">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="البحث بالاسم، المسمى الوظيفي، أو الرقم الوظيفي..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
          />
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">تصفية حسب القسم:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <option value="all">جميع الأقسام ({employees.length})</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept} ({employees.filter((e) => e.department === dept).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Affiliates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className="bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-2xl p-4 transition-all hover:shadow-sm group flex flex-col justify-between"
          >
            <div className="flex items-start gap-3.5">
              <img
                src={emp.photoUrl}
                alt={emp.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 truncate text-base">{emp.name}</h3>
                </div>
                <p className="text-xs text-amber-800 font-medium truncate mt-0.5">
                  {emp.title}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <Building className="w-3 h-3 text-slate-400" />
                  <span className="truncate">{emp.department}</span>
                </div>
                {emp.badgeNumber && (
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    رقم الهوية: #{emp.badgeNumber}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions & Selection for current month */}
            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onSelectPerson1(emp.id)}
                  title="تعيين كالمنتسب الأول في اللوحة"
                  className="px-2.5 py-1 text-[11px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg transition-colors"
                >
                  تعيين كـ (1)
                </button>
                <button
                  onClick={() => onSelectPerson2(emp.id)}
                  title="تعيين كالمنتسب الثاني في اللوحة"
                  className="px-2.5 py-1 text-[11px] font-bold bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-lg transition-colors"
                >
                  تعيين كـ (2)
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(emp)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                  title="تعديل البيانات"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(emp.id, emp.name)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="حذف المنتسب"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
          <p className="text-slate-500 text-sm font-semibold">
            لا يوجد منتسبين يطابقون خيارات البحث.
          </p>
          <button
            onClick={handleOpenAdd}
            className="mt-3 px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold"
          >
            إضافة منتسب جديد الآن
          </button>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingEmployee ? 'تعديل بيانات المنتسب' : 'إضافة منتسب جديد'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 mt-4">
              {/* Photo Preview & Upload */}
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="relative mb-3">
                  <img
                    src={formData.photoUrl || sampleAvatars[0]}
                    alt="صورة المنتسب"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <label
                    htmlFor="avatar-file-upload"
                    className="absolute bottom-0 right-0 p-2 bg-amber-600 text-white rounded-full shadow-md cursor-pointer hover:bg-amber-700 transition-colors"
                    title="رفع صورة من الجهاز"
                  >
                    <Camera className="w-4 h-4" />
                    <input
                      id="avatar-file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="text-center">
                  <span className="text-xs font-semibold text-slate-700 block">
                    صورة المنتسب الشخصية
                  </span>
                  <span className="text-[11px] text-slate-400">
                    يمكنك رفع صورة من جهازك أو اختيار نموذج سريع أدناه
                  </span>
                </div>

                {/* Quick Avatar Presets */}
                <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 max-w-full">
                  {sampleAvatars.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, photoUrl: url })}
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all flex-shrink-0 ${
                        formData.photoUrl === url
                          ? 'border-amber-600 scale-110 shadow-sm'
                          : 'border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: حسن عبد الامير جودي"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Job Title & Department in two columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    المسمى الوظيفي
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: مسؤول شعبة الخدمات"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    القسم / الشعبة
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: قسم الصيانة الهندسية"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Badge Number & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الرقم الوظيفي / الهوية
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: 2104"
                    value={formData.badgeNumber}
                    onChange={(e) => setFormData({ ...formData, badgeNumber: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رقم الهاتف (اختياري)
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: 07801234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Submit / Cancel */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all"
                >
                  {editingEmployee ? 'حفظ التعديلات' : 'إضافة المنتسب'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

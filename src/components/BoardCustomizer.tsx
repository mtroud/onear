import React, { useState } from 'react';
import { BoardSettings, BoardTheme, FrameStyle } from '../types';
import {
  Palette,
  Type,
  Sliders,
  Image as ImageIcon,
  Check,
  ShieldCheck,
  PenTool,
  Sparkles,
  HelpCircle,
  Upload,
  Square,
  Maximize,
} from 'lucide-react';

interface BoardCustomizerProps {
  settings: BoardSettings;
  setSettings: React.Dispatch<React.SetStateAction<BoardSettings>>;
  useArabicNumerals: boolean;
  setUseArabicNumerals: (val: boolean) => void;
}

export const BoardCustomizer: React.FC<BoardCustomizerProps> = ({
  settings,
  setSettings,
  useArabicNumerals,
  setUseArabicNumerals,
}) => {
  const [activeTab, setActiveTab] = useState<'design' | 'text' | 'options'>('design');

  const badgeColorPresets = [
    { name: 'كحلي ملكي (الأصلي)', value: '#152e59' },
    { name: 'ذهبي أصيل', value: '#854d0e' },
    { name: 'زمردي مقدس', value: '#064e3b' },
    { name: 'عنابي فاخر', value: '#881337' },
    { name: 'أسود فحمي', value: '#1e293b' },
    { name: 'أزرق سماوي داكن', value: '#0369a1' },
  ];

  const handleCustomBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSettings((prev) => ({
            ...prev,
            theme: 'custom_bg',
            customBgUrl: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 mb-8">
      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-5">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-bold text-slate-900">تخصيص وتصميم اللوحة التقديرية</h2>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('design')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'design'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            التصميم والألوان
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'text'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            النصوص والشعارات
          </button>
          <button
            onClick={() => setActiveTab('options')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'options'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الأختام والتواقيع
          </button>
        </div>
      </div>

      {/* Tab 1: Design & Colors */}
      {activeTab === 'design' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Theme Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              نمط وخلفية اللوحة التقديرية (قبة الإمام الحسين عليه السلام والنقوش الإسلامية)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Hussain Dome & Corner Ornaments */}
              <div
                onClick={() => setSettings((prev) => ({ ...prev, theme: 'hussain_dome_corner' }))}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  settings.theme === 'hussain_dome_corner'
                    ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="h-16 rounded-lg bg-cover bg-center border border-amber-300/60 mb-2 overflow-hidden shadow-xs relative"
                  style={{ backgroundImage: `url('/backgrounds/hussain_corner.jpg')` }}
                >
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-white bg-black/50 px-2 py-0.5 rounded">
                      قبة الحسين (ع) وزخارف الأركان
                    </span>
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>قبة الإمام الحسين (ع) والأركان</span>
                  {settings.theme === 'hussain_dome_corner' && (
                    <span className="text-[10px] text-amber-700 font-bold bg-amber-200/70 px-1.5 py-0.5 rounded">المعتمد</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">قبة كربلاء ومئذنتها مع نقوش إسلامية في الزوايا</p>
              </div>

              {/* Karbala Golden Frame */}
              <div
                onClick={() => setSettings((prev) => ({ ...prev, theme: 'karbala_gold_frame' }))}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  settings.theme === 'karbala_gold_frame'
                    ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="h-16 rounded-lg bg-cover bg-center border border-amber-300/60 mb-2 overflow-hidden shadow-xs relative"
                  style={{ backgroundImage: `url('/backgrounds/karbala_frame.jpg')` }}
                >
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-white bg-black/50 px-2 py-0.5 rounded">
                      إطار إسلامي ذهبي كامل
                    </span>
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-900">القبة الشريفة مع إطار مذهب</div>
                <p className="text-[11px] text-slate-500 mt-0.5">إطار أرابيسك ملكي متكامل يحيط بكامل اللوحة</p>
              </div>

              {/* Shrine Classic Vector */}
              <div
                onClick={() => setSettings((prev) => ({ ...prev, theme: 'shrine_classic' }))}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  settings.theme === 'shrine_classic'
                    ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="h-16 rounded-lg bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300/60 mb-2 flex items-center justify-center text-xs font-bold text-amber-900">
                  🕌 رسم متجهي إسلامي ذهبي
                </div>
                <div className="text-xs font-bold text-slate-900">طراز كلاسيكي فيكتور</div>
                <p className="text-[11px] text-slate-500 mt-0.5">مع نقش مائي ناعم وزخارف متجهة نقية</p>
              </div>

              {/* Royal Gold */}
              <div
                onClick={() => setSettings((prev) => ({ ...prev, theme: 'royal_gold' }))}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  settings.theme === 'royal_gold'
                    ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="h-16 rounded-lg bg-gradient-to-r from-yellow-100 to-amber-300 border border-amber-400 mb-2 flex items-center justify-center text-xs font-bold text-amber-950">
                  👑 إطار ذهبي ملكي
                </div>
                <div className="text-xs font-bold text-slate-900">إطار ذهبي رسمي</div>
                <p className="text-[11px] text-slate-500 mt-0.5">زخارف حواف أنيقة متناسقة</p>
              </div>

              {/* Emerald Luxury */}
              <div
                onClick={() => setSettings((prev) => ({ ...prev, theme: 'emerald_luxury' }))}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  settings.theme === 'emerald_luxury'
                    ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="h-16 rounded-lg bg-gradient-to-r from-emerald-100 to-emerald-200 border border-emerald-300 mb-2 flex items-center justify-center text-xs font-bold text-emerald-950">
                  🌿 زمردي إسلامي
                </div>
                <div className="text-xs font-bold text-slate-900">أخضر مع ذهبي</div>
                <p className="text-[11px] text-slate-500 mt-0.5">طابع روحي هادئ ووقور</p>
              </div>

              {/* Custom Background Upload */}
              <div
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all relative ${
                  settings.theme === 'custom_bg'
                    ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <label htmlFor="custom-bg-input" className="cursor-pointer block h-full">
                  <div className="h-16 rounded-lg bg-slate-200 border border-slate-300 mb-2 flex items-center justify-center text-xs font-bold text-slate-700 gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>رفع صورة خاصة</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">خلفية مخصصة من جهازك</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {settings.customBgUrl ? 'تم رفع صورة مخصصة' : 'ارفع أي تصميم أو صورة أخرى'}
                  </p>
                  <input
                    id="custom-bg-input"
                    type="file"
                    accept="image/*"
                    onChange={handleCustomBgUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Frame Style Selection (نمط الإطار) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700">
                نمط وشكل الإطار (Border & Frame Style)
              </label>
              <span className="text-[11px] text-amber-800 font-semibold">
                اختر شكل البرواز والزوايا المحيطة باللوحة
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {/* 1. Ornate Gold */}
              <div
                onClick={() => setSettings((prev) => ({ ...prev, frameStyle: 'ornate_gold' }))}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  (settings.frameStyle || 'ornate_gold') === 'ornate_gold'
                    ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="h-10 border-2 border-amber-600/70 border-dashed rounded-lg bg-amber-100/50 flex items-center justify-center mb-2 relative overflow-hidden">
                  <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-amber-700 rounded-xs" />
                  <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-amber-700 rounded-xs" />
                  <div className="absolute bottom-0.5 left-0.5 w-2 h-2 bg-amber-700 rounded-xs" />
                  <div className="absolute bottom-0.5 right-0.5 w-2 h-2 bg-amber-700 rounded-xs" />
                  <span className="text-[10px] font-bold text-amber-900">⚜️ مزخرف</span>
                </div>
                <div className="text-xs font-bold text-slate-900">إطار ذهبي مزخرف</div>
                <p className="text-[10px] text-slate-500 mt-0.5">نقوش نباتية في الزوايا</p>
              </div>

              {/* 2. Simple Modern */}
              <div
                onClick={() => setSettings((prev) => ({ ...prev, frameStyle: 'simple_modern' }))}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  settings.frameStyle === 'simple_modern'
                    ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="h-10 border border-amber-800/50 rounded-lg bg-white flex items-center justify-center mb-2 relative">
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-amber-800" />
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-amber-800" />
                  <span className="text-[10px] font-bold text-slate-800">▫️ بسيط وناعم</span>
                </div>
                <div className="text-xs font-bold text-slate-900">إطار بسيط ناعم</div>
                <p className="text-[10px] text-slate-500 mt-0.5">خطوط عصرية هادئة</p>
              </div>

              {/* 3. Islamic Geometric */}
              <div
                onClick={() => setSettings((prev) => ({ ...prev, frameStyle: 'islamic_geometric' }))}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  settings.frameStyle === 'islamic_geometric'
                    ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="h-10 border-2 border-amber-700/80 rounded-lg bg-amber-50 flex items-center justify-center mb-2 relative">
                  <span className="text-xs text-amber-700">۞</span>
                  <span className="text-[10px] font-bold text-amber-900 mr-1">إسلامي هندسي</span>
                </div>
                <div className="text-xs font-bold text-slate-900">إطار إسلامي هندسي</div>
                <p className="text-[10px] text-slate-500 mt-0.5">نجوم إسلامية ثمانية</p>
              </div>

              {/* 4. Double Royal */}
              <div
                onClick={() => setSettings((prev) => ({ ...prev, frameStyle: 'double_royal' }))}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  settings.frameStyle === 'double_royal'
                    ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="h-10 border-[3px] border-amber-700 rounded-lg bg-amber-100/60 p-0.5 flex items-center justify-center mb-2 relative">
                  <div className="w-full h-full border border-amber-500 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-amber-950">👑 ملكي مزدوج</span>
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-900">إطار ملكي عريض</div>
                <p className="text-[10px] text-slate-500 mt-0.5">خط عريض وزوايا مدعمة</p>
              </div>

              {/* 5. None */}
              <div
                onClick={() => setSettings((prev) => ({ ...prev, frameStyle: 'none' }))}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  settings.frameStyle === 'none'
                    ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="h-10 border border-dashed border-slate-300 rounded-lg bg-slate-100 flex items-center justify-center mb-2">
                  <span className="text-[10px] font-bold text-slate-500">بدون إطار إضافي</span>
                </div>
                <div className="text-xs font-bold text-slate-900">بدون إطار إضافي</div>
                <p className="text-[10px] text-slate-500 mt-0.5">الاعتماد على الخلفية فقط</p>
              </div>
            </div>
          </div>

          {/* Badge Color Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              لون كبسولة وشريط الأسماء (Name Badges)
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {badgeColorPresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setSettings((prev) => ({ ...prev, badgeColor: preset.value }))}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                    settings.badgeColor === preset.value
                      ? 'border-amber-600 ring-2 ring-amber-500/30 shadow-xs'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/20"
                    style={{ backgroundColor: preset.value }}
                  />
                  <span>{preset.name}</span>
                </button>
              ))}

              {/* Custom Color Input */}
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full">
                <span className="text-xs text-slate-500 font-semibold">مخصص:</span>
                <input
                  type="color"
                  value={settings.badgeColor}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, badgeColor: e.target.value }))
                  }
                  className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Fine Tuning Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            {/* Shrine Dome Watermark Opacity */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                <span>شفافية قبة ومئذنة العتبة</span>
                <span>{Math.round(settings.domeOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.domeOpacity}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, domeOpacity: parseFloat(e.target.value) }))
                }
                className="w-full accent-amber-600"
              />
            </div>

            {/* Arabesque Filigree Opacity */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                <span>شفافية الزخارف الجانبية</span>
                <span>{Math.round(settings.filigreeOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.filigreeOpacity}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    filigreeOpacity: parseFloat(e.target.value),
                  }))
                }
                className="w-full accent-amber-600"
              />
            </div>

            {/* Photo Circular Frame Border Width */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                <span>سماكة إطار الصور الشخصية</span>
                <span>{settings.photoBorderWidth}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={settings.photoBorderWidth}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    photoBorderWidth: parseInt(e.target.value, 10),
                  }))
                }
                className="w-full accent-amber-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Text & Slogans */}
      {activeTab === 'text' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Organization / Header Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                اسم الجهة / المجمع (أعلى اللوحة)
              </label>
              <input
                type="text"
                value={settings.organizationName}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, organizationName: e.target.value }))
                }
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="مثال: مجمع سيد الشهداء"
              />
            </div>

            {/* Title Prefix */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                عنوان التكريم الرئيسي
              </label>
              <input
                type="text"
                value={settings.mainTitlePrefix}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, mainTitlePrefix: e.target.value }))
                }
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="مثال: المنتسبين المميزين لشهر"
              />
            </div>
          </div>

          {/* Subtitle / Honorary Motto */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              الشعار / العبارة التقديرية (تحت العنوان الرئيسي)
            </label>
            <input
              type="text"
              value={settings.subTitle}
              onChange={(e) => setSettings((prev) => ({ ...prev, subTitle: e.target.value }))}
              className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="مثال: خدمة الامام الحسين عليه السلام"
            />
          </div>

          {/* Arabic Numerals Toggle */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-slate-800 block">
                صيغة كتابة أرقام السنة
              </span>
              <span className="text-xs text-slate-500">
                اختر بين الأرقام المشرقية العربية (٢٠٢٦) أو الأرقام القياسية (2026)
              </span>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setUseArabicNumerals(true)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  useArabicNumerals
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ٢٠٢٦ م (عربي)
              </button>
              <button
                type="button"
                onClick={() => setUseArabicNumerals(false)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  !useArabicNumerals
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2026 م (إنجليزي)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Options, Stamp & Signatures */}
      {activeTab === 'options' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Show Titles Toggle */}
            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showTitles}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, showTitles: e.target.checked }))
                }
                className="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="text-sm font-bold text-slate-800 block">
                  إظهار المسمى الوظيفي تحت الاسم
                </span>
                <span className="text-xs text-slate-500">
                  عرض صفة كل شخص أسفل كبسولة الاسم في اللوحة
                </span>
              </div>
            </label>

            {/* Show Department Toggle */}
            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showDepartments}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, showDepartments: e.target.checked }))
                }
                className="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="text-sm font-bold text-slate-800 block">
                  إظهار القسم أو الشعبة
                </span>
                <span className="text-xs text-slate-500">
                  عرض قسم المنتسب لتحديد القسم الفائز بالتكريم
                </span>
              </div>
            </label>

            {/* Show Signatures */}
            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showSignatures}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, showSignatures: e.target.checked }))
                }
                className="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="text-sm font-bold text-slate-800 block">
                  إضافة خانات التوقيع والاعتماد
                </span>
                <span className="text-xs text-slate-500">
                  مفيدة عند طباعة اللوحة كشهادة أو وثيقة رسمية
                </span>
              </div>
            </label>

            {/* Show Stamp */}
            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showOfficialSeal}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, showOfficialSeal: e.target.checked }))
                }
                className="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="text-sm font-bold text-slate-800 block">
                  إضافة الختم الدائري الرسمي
                </span>
                <span className="text-xs text-slate-500">
                  ختم معتمد ومذهب أسفل اللوحة يعزز الطابع الرسمي
                </span>
              </div>
            </label>
          </div>

          {/* Signers Title Inputs if signatures enabled */}
          {settings.showSignatures && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  صفة الموقع الأول (اليمين)
                </label>
                <input
                  type="text"
                  value={settings.signer1Title}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, signer1Title: e.target.value }))
                  }
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  صفة الموقع الثاني (اليسار)
                </label>
                <input
                  type="text"
                  value={settings.signer2Title}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, signer2Title: e.target.value }))
                  }
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

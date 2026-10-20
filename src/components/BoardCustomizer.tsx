import React, { useState } from 'react';
import { BoardSettings, BoardTheme, FrameStyle, BoardPreset } from '../types';
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
  Star,
  Wand2,
  Sun,
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

  const applyPreset = (preset: BoardPreset) => {
    if (preset === 'star_radiant') {
      setSettings((prev) => ({
        ...prev,
        presetStyle: 'star_radiant',
        showStarAura: true,
        starAuraDensity: 'luxury',
        theme: 'hussain_dome_corner',
        frameStyle: 'ornate_gold',
        photoBorderColor: '#eab308',
        photoBorderWidth: 4,
        badgeColor: '#152e59',
      }));
    } else if (preset === 'islamic_ornate') {
      setSettings((prev) => ({
        ...prev,
        presetStyle: 'islamic_ornate',
        showStarAura: false,
        theme: 'hussain_dome_corner',
        frameStyle: 'islamic_geometric',
        photoBorderColor: '#c7a760',
        photoBorderWidth: 4,
        badgeColor: '#152e59',
      }));
    } else if (preset === 'formal_official') {
      setSettings((prev) => ({
        ...prev,
        presetStyle: 'formal_official',
        showStarAura: false,
        theme: 'karbala_gold_frame',
        frameStyle: 'double_royal',
        photoBorderColor: '#854d0e',
        photoBorderWidth: 4,
        badgeColor: '#1e293b',
      }));
    } else if (preset === 'modern_minimal') {
      setSettings((prev) => ({
        ...prev,
        presetStyle: 'modern_minimal',
        showStarAura: false,
        theme: 'shrine_classic',
        frameStyle: 'simple_modern',
        photoBorderColor: '#d97706',
        photoBorderWidth: 3,
        badgeColor: '#0369a1',
      }));
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
          {/* Quick Design Template / Presets */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Wand2 className="w-4 h-4 text-amber-600" />
                <span>أنماط وقوالب التصميم الجاهزة (تطبيق بنقرة واحدة)</span>
              </label>
              <span className="text-[11px] text-amber-800 font-semibold">
                اختر نمطاً متناسقاً يضبط الألوان والإطارات والزخارف بضغطة واحدة
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* 1. Star Style (نمط النجوم) */}
              <button
                type="button"
                onClick={() => applyPreset('star_radiant')}
                className={`p-3 rounded-xl border-2 text-right transition-all relative flex flex-col justify-between cursor-pointer ${
                  settings.showStarAura || settings.presetStyle === 'star_radiant'
                    ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-yellow-100/70 ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-amber-300 bg-white'
                }`}
              >
                <div className="absolute top-2 left-2 flex items-center gap-0.5 bg-amber-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>جديد</span>
                </div>
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center mb-2 shadow-xs">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">نمط النجوم الذهبية</div>
                  <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                    عناصر زخرفية وهالات متلألئة خلف صور المنتسبين
                  </p>
                </div>
                <div className="mt-2 pt-1 border-t border-amber-200/60 flex items-center justify-between text-[10px] text-amber-900 font-semibold">
                  <span>هالات ونجوم برّاقة</span>
                  {(settings.showStarAura || settings.presetStyle === 'star_radiant') && (
                    <Check className="w-3.5 h-3.5 text-amber-700 font-bold" />
                  )}
                </div>
              </button>

              {/* 2. Islamic Ornate */}
              <button
                type="button"
                onClick={() => applyPreset('islamic_ornate')}
                className={`p-3 rounded-xl border-2 text-right transition-all relative flex flex-col justify-between cursor-pointer ${
                  !settings.showStarAura && settings.presetStyle === 'islamic_ornate'
                    ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center mb-2 shadow-xs text-sm">
                    🕌
                  </div>
                  <div className="text-xs font-bold text-slate-900">نمط إسلامي زخرفي</div>
                  <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                    قبة الحسين (ع) وزخارف الأركان مع إطار هندسي
                  </p>
                </div>
                <div className="mt-2 pt-1 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-600 font-semibold">
                  <span>أرابيسك كربلائي</span>
                  {!settings.showStarAura && settings.presetStyle === 'islamic_ornate' && (
                    <Check className="w-3.5 h-3.5 text-amber-700 font-bold" />
                  )}
                </div>
              </button>

              {/* 3. Formal Official */}
              <button
                type="button"
                onClick={() => applyPreset('formal_official')}
                className={`p-3 rounded-xl border-2 text-right transition-all relative flex flex-col justify-between cursor-pointer ${
                  !settings.showStarAura && settings.presetStyle === 'formal_official'
                    ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center mb-2 shadow-xs text-sm">
                    🏛️
                  </div>
                  <div className="text-xs font-bold text-slate-900">نمط رسمي وقور</div>
                  <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                    إطار ملكي مزدوج مع خط رصين وأختام رسمية
                  </p>
                </div>
                <div className="mt-2 pt-1 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-600 font-semibold">
                  <span>طابع رسمي معتمد</span>
                  {!settings.showStarAura && settings.presetStyle === 'formal_official' && (
                    <Check className="w-3.5 h-3.5 text-amber-700 font-bold" />
                  )}
                </div>
              </button>

              {/* 4. Modern Minimal */}
              <button
                type="button"
                onClick={() => applyPreset('modern_minimal')}
                className={`p-3 rounded-xl border-2 text-right transition-all relative flex flex-col justify-between cursor-pointer ${
                  !settings.showStarAura && settings.presetStyle === 'modern_minimal'
                    ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-sky-700 text-white flex items-center justify-center mb-2 shadow-xs text-sm">
                    ✨
                  </div>
                  <div className="text-xs font-bold text-slate-900">نمط عصري بسيط</div>
                  <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                    خطوط نقية وهادئة بإطار عصري خفيف
                  </p>
                </div>
                <div className="mt-2 pt-1 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-600 font-semibold">
                  <span>بسيط وأنيق</span>
                  {!settings.showStarAura && settings.presetStyle === 'modern_minimal' && (
                    <Check className="w-3.5 h-3.5 text-amber-700 font-bold" />
                  )}
                </div>
              </button>
            </div>
          </div>

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

          {/* Dedicated Star Style (نمط النجوم) & Sparkling Elements Section */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
              settings.showStarAura || settings.presetStyle === 'star_radiant'
                ? 'bg-gradient-to-br from-amber-50/90 via-yellow-50/80 to-amber-100/60 border-amber-400 ring-2 ring-amber-400/30 shadow-sm'
                : 'bg-slate-50/80 border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/60">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-400 text-white flex items-center justify-center shadow-md shrink-0">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      نمط النجوم (عناصر زخرفية ذهبية متلألئة خلف صور المنتسبين)
                    </h3>
                    <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      جديد
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    يضيف هالات إشعاعية ذهبية، نجوماً رباعية وثمانية متلألئة، وبريقاً جذاباً يحيط بصور المكرمين كنجوم للمجمع
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    showStarAura: !prev.showStarAura,
                    presetStyle: !prev.showStarAura ? 'star_radiant' : prev.presetStyle,
                  }))
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-center cursor-pointer ${
                  settings.showStarAura || settings.presetStyle === 'star_radiant'
                    ? 'bg-amber-600 hover:bg-amber-700 text-white ring-2 ring-amber-400'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {settings.showStarAura || settings.presetStyle === 'star_radiant'
                    ? 'نمط النجوم مفعّل ✓'
                    : 'تفعيل نمط النجوم'}
                </span>
              </button>
            </div>

            {/* Star Density & Customization when Star Style is active */}
            {(settings.showStarAura || settings.presetStyle === 'star_radiant') && (
              <div className="mt-3.5 space-y-3 pt-1">
                <label className="block text-xs font-bold text-slate-800">
                  كثافة وبريق العناصر الزخرفية الذهبية:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Luxury */}
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, starAuraDensity: 'luxury' }))
                    }
                    className={`p-2.5 rounded-xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                      (settings.starAuraDensity || 'luxury') === 'luxury'
                        ? 'bg-white border-amber-600 ring-2 ring-amber-400/40 shadow-xs'
                        : 'bg-amber-100/50 hover:bg-white border-amber-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>🌟 فاخر ومكثف (الموصى به)</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        أشعة شمسية + نجوم إسلامية + نجوم متلألئة برّاقة
                      </p>
                    </div>
                    {(settings.starAuraDensity || 'luxury') === 'luxury' && (
                      <Check className="w-4 h-4 text-amber-600" />
                    )}
                  </button>

                  {/* Vibrant */}
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, starAuraDensity: 'vibrant' }))
                    }
                    className={`p-2.5 rounded-xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                      settings.starAuraDensity === 'vibrant'
                        ? 'bg-white border-amber-600 ring-2 ring-amber-400/40 shadow-xs'
                        : 'bg-amber-100/50 hover:bg-white border-amber-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>✨ حيوي متألق</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        نجوم برّاقة محيطة وذرات ذهبية متلألئة
                      </p>
                    </div>
                    {settings.starAuraDensity === 'vibrant' && (
                      <Check className="w-4 h-4 text-amber-600" />
                    )}
                  </button>

                  {/* Gentle */}
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, starAuraDensity: 'gentle' }))
                    }
                    className={`p-2.5 rounded-xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                      settings.starAuraDensity === 'gentle'
                        ? 'bg-white border-amber-600 ring-2 ring-amber-400/40 shadow-xs'
                        : 'bg-amber-100/50 hover:bg-white border-amber-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>🌙 هادئ ناعم</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        هالة ذهبية وأشعة رقيقة خفيفة
                      </p>
                    </div>
                    {settings.starAuraDensity === 'gentle' && (
                      <Check className="w-4 h-4 text-amber-600" />
                    )}
                  </button>
                </div>

                {/* Quick Photo Border Color when Stars are on */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-slate-700">لون إطار الصورة المتناسق مع النجوم:</span>
                  {[
                    { label: 'ذهبي متألق (موصى به)', color: '#eab308' },
                    { label: 'ذهبي أصيل', color: '#c7a760' },
                    { label: 'أبيض لؤلؤي', color: '#ffffff' },
                    { label: 'كحلي مذهب', color: '#152e59' },
                  ].map((item) => (
                    <button
                      key={item.color}
                      type="button"
                      onClick={() =>
                        setSettings((prev) => ({ ...prev, photoBorderColor: item.color }))
                      }
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                        settings.photoBorderColor === item.color
                          ? 'border-amber-600 bg-white ring-1 ring-amber-500 shadow-xs'
                          : 'border-amber-200/80 bg-white/60 hover:bg-white'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
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

            {/* Enable Animations Toggle */}
            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableAnimations !== false}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, enableAnimations: e.target.checked }))
                }
                className="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="text-sm font-bold text-slate-800 block">
                  تفعيل التأثيرات الحركية (Motion Animations)
                </span>
                <span className="text-xs text-slate-500">
                  تأثيرات سقوط وظهور تدريجي تفاعلية للصور والعناوين لزيادة جاذبية اللوحة
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

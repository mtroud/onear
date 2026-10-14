import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  QrCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Eye,
  Info,
  Sparkles,
  Globe,
  UploadCloud,
  CheckCircle2,
} from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  publicUrl: string;
  showQRCodeOnBoard: boolean;
  setShowQRCodeOnBoard: (val: boolean) => void;
  organizationName: string;
  monthName: string;
  year: number;
  onSwitchToPublicView: () => void;
  customWebsiteUrl?: string;
  setCustomWebsiteUrl: (url: string) => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  publicUrl,
  showQRCodeOnBoard,
  setShowQRCodeOnBoard,
  organizationName,
  monthName,
  year,
  onSwitchToPublicView,
  customWebsiteUrl = '',
  setCustomWebsiteUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [showNetlifyGuide, setShowNetlifyGuide] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Active URL to encode in QR Code: custom Netlify URL if entered, else dynamic publicUrl
  const effectivePublicUrl = customWebsiteUrl?.trim()
    ? (customWebsiteUrl.includes('?view=public')
        ? customWebsiteUrl.trim()
        : `${customWebsiteUrl.trim().replace(/\/$/, '')}?view=public`)
    : publicUrl;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(effectivePublicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQR = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 1000;
    canvas.height = 1000;

    img.onload = () => {
      if (!ctx) return;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1000, 1000);
      ctx.drawImage(img, 100, 100, 800, 800);

      // Add Arabic text below QR code
      ctx.font = 'bold 36px Cairo, sans-serif';
      ctx.fillStyle = '#152e59';
      ctx.textAlign = 'center';
      ctx.fillText(organizationName, 500, 940);

      const a = document.createElement('a');
      a.download = `باركود_لوحة_الشرف_${monthName}_${year}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                الباركود الإلكتروني لرؤية لوحة الشرف
              </h3>
              <p className="text-xs text-slate-500">
                عند قراءة الباركود بكاميرا الهاتف يحول الزائر مباشرة إلى الموقع ولوحة الشرف
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* QR Code Canvas Card */}
        <div className="my-5 flex flex-col items-center justify-center p-5 bg-gradient-to-b from-amber-50/60 to-slate-50 border-2 border-amber-500/20 rounded-2xl">
          <div
            ref={qrRef}
            className="bg-white p-4 rounded-2xl shadow-md border-2 border-amber-600/30 flex items-center justify-center"
          >
            <QRCodeSVG
              value={effectivePublicUrl}
              size={180}
              level="H"
              includeMargin={false}
              fgColor="#152e59"
              imageSettings={{
                src: '/backgrounds/hussain_corner.jpg',
                x: undefined,
                y: undefined,
                height: 36,
                width: 36,
                excavate: true,
              }}
            />
          </div>

          <p className="mt-3 text-xs font-bold text-slate-800 text-center">
            امسح الباركود بهاتفك لاختبار التحويل إلى صفحة لوحة الشرف
          </p>
          <span className="text-[11px] text-amber-800 font-semibold mt-0.5 text-center">
            الرابط المشفّر حالياً: <span className="font-mono underline text-slate-700">{effectivePublicUrl}</span>
          </span>
        </div>

        {/* Netlify Custom Domain Input */}
        <div className="mb-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>رابط الموقع المنشور على Netlify:</span>
            </label>
            <button
              onClick={() => setShowNetlifyGuide(!showNetlifyGuide)}
              className="text-[11px] font-bold text-amber-700 hover:text-amber-900 underline flex items-center gap-1"
            >
              <UploadCloud className="w-3 h-3" />
              <span>{showNetlifyGuide ? 'إخفاء دليل النشر' : 'كيف أنشر على Netlify؟'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="url"
              placeholder="مثال: https://almomayazon.netlify.app"
              value={customWebsiteUrl}
              onChange={(e) => setCustomWebsiteUrl(e.target.value)}
              className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {customWebsiteUrl && (
              <button
                onClick={() => setCustomWebsiteUrl('')}
                className="px-2.5 py-2 text-xs font-semibold text-slate-500 hover:text-red-600 bg-white border border-slate-200 rounded-xl"
                title="إعادة للرابط التلقائي"
              >
                مسح
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">
            عند وضع رابط موقعك المنشور على Netlify هنا، سيتحدث الباركود تلقائياً على كل اللوحات المطبوعة ليحول مباشرة إلى موقعك في Netlify!
          </p>
        </div>

        {/* Step-by-Step Netlify Guide Accordion */}
        {showNetlifyGuide && (
          <div className="mb-5 p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-xs space-y-2.5 animate-in fade-in">
            <div className="flex items-center gap-2 font-bold text-emerald-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>خطوات نشر الموقع على Netlify بدقيقة واحدة:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-700 pr-1 text-[11px] leading-relaxed">
              <li>
                <strong>جاهزية تامة:</strong> تم إعداد ملفات <code className="bg-emerald-100 text-emerald-900 px-1 rounded">netlify.toml</code> و <code className="bg-emerald-100 text-emerald-900 px-1 rounded">_redirects</code> تلقائياً لدعم SPA والصفحات دون أخطاء 404.
              </li>
              <li>
                <strong>النشر السريع (Drag & Drop):</strong> ادخل إلى موقع{' '}
                <a
                  href="https://app.netlify.com/drop"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 font-bold underline"
                >
                  app.netlify.com/drop
                </a>{' '}
                واسحب مجلد <code className="bg-emerald-100 text-emerald-900 px-1 rounded">dist</code> مباشرة ليتم النشر فوراً.
              </li>
              <li>
                <strong>أو عبر GitHub:</strong> اربط مستودع GitHub في Netlify واختر أمر البناء <code className="bg-emerald-100 text-emerald-900 px-1 rounded">npm run build</code> ومجلد النشر <code className="bg-emerald-100 text-emerald-900 px-1 rounded">dist</code>.
              </li>
              <li>
                <strong>تحديث الباركود:</strong> انسخ الرابط النهائي الذي يمنحك إياه Netlify والصقه في الخانة أعلاه ليتم تشفيره فوراً داخل الباركود.
              </li>
            </ol>
          </div>
        )}

        {/* Copy Current Link */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-700">رابط الباركود الفعّال حالياً:</span>
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1 text-[11px] font-bold ${
                copied ? 'text-emerald-600' : 'text-amber-800 hover:underline'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ بنجاح!' : 'نسخ الرابط'}</span>
            </button>
          </div>
          <div className="p-2 bg-slate-100 rounded-xl text-xs font-mono text-slate-700 truncate select-all">
            {effectivePublicUrl}
          </div>
        </div>

        {/* Toggle to embed QR code on the certificate board */}
        <div className="mb-5 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showQRCodeOnBoard}
              onChange={(e) => setShowQRCodeOnBoard(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                تضمين الباركود في زاوية اللوحة المطبوعة
              </span>
              <span className="text-[11px] text-slate-600">
                عند تفعيل هذا الخيار، سيظهر رمز QR في زاوية اللوحة الورقية المعلقة على الجدار، حتى يتمكن أي شخص من مسحه والتحويل مباشرة إلى موقعك.
              </span>
            </div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={handleDownloadQR}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-600" />
            <span>تحميل الباركود (PNG)</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onSwitchToPublicView();
            }}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>معاينة صفحة الزائر</span>
          </button>
        </div>
      </div>
    </div>
  );
};

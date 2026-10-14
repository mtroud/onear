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
}) => {
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
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
      // White background with gold border
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
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
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
                شارك الرابط أو اطبع الباركود ليتمكن أي شخص من رؤية لوحة التكريم
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
        <div className="my-6 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50/60 to-slate-50 border-2 border-amber-500/20 rounded-2xl">
          <div
            ref={qrRef}
            className="bg-white p-4 rounded-2xl shadow-md border-2 border-amber-600/30 flex items-center justify-center"
          >
            <QRCodeSVG
              value={publicUrl}
              size={190}
              level="H"
              includeMargin={false}
              fgColor="#152e59"
              imageSettings={{
                src: '/backgrounds/hussain_corner.jpg',
                x: undefined,
                y: undefined,
                height: 38,
                width: 38,
                excavate: true,
              }}
            />
          </div>

          <p className="mt-3 text-xs font-bold text-slate-700 text-center">
            امسح الباركود بكاميرا الهاتف لفتح لوحة الشرف الرقمية
          </p>
          <span className="text-[11px] text-amber-800 font-semibold mt-0.5">
            (تظهر للزائر لوحة الشرف فقط بدون لوحة التحكم أو الإعدادات)
          </span>
        </div>

        {/* Public URL Box */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            رابط لوحة الشرف العام للزوار:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={publicUrl}
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 select-all font-mono"
            />
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ الرابط'}</span>
            </button>
          </div>
        </div>

        {/* Toggle to embed QR code on the certificate board */}
        <div className="mb-6 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
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
                عند تفعيل هذا الخيار، سيظهر باركود أنيق ومصغر في أسفل اللوحة ليتمكن أي شخص يشاهد اللوحة الورقية المعلقة على الجدار من مسحه والتحقق منها إلكترونياً.
              </span>
            </div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={handleDownloadQR}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
          >
            <Download className="w-4 h-4 text-amber-600" />
            <span>تحميل الباركود كصورة (PNG)</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onSwitchToPublicView();
            }}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>معاينة صفحة الزائر الآن</span>
          </button>
        </div>
      </div>
    </div>
  );
};

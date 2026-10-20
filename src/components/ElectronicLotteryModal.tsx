import React, { useState, useEffect, useRef } from 'react';
import { Employee, Nomination } from '../types';
import {
  Trophy,
  Sparkles,
  Shuffle,
  Award,
  CheckCircle2,
  RefreshCw,
  Users,
  ShieldCheck,
  Calendar,
  X,
  Play,
  ArrowRight,
  Printer,
  Volume2,
  VolumeX,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toArabicNumerals } from '../data/defaultData';

interface ElectronicLotteryModalProps {
  isOpen: boolean;
  onClose: () => void;
  nominations: Nomination[];
  employees: Employee[];
  monthName: string;
  year: number;
  onApplyWinners: (person1Id: string, person2Id: string) => void;
}

export const ElectronicLotteryModal: React.FC<ElectronicLotteryModalProps> = ({
  isOpen,
  onClose,
  nominations,
  employees,
  monthName,
  year,
  onApplyWinners,
}) => {
  // Pool of nominated employees with supervisor info
  const candidatePool = nominations
    .map((nom) => {
      const emp = employees.find((e) => e.id === nom.employeeId);
      return emp ? { ...emp, nominatedBy: nom.nominatedBy, reason: nom.reason } : null;
    })
    .filter(Boolean) as (Employee & { nominatedBy: string; reason: string })[];

  // States
  const [phase, setPhase] = useState<'idle' | 'drawing_1' | 'won_1' | 'drawing_2' | 'completed'>('idle');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [winner1, setWinner1] = useState<(Employee & { nominatedBy: string; reason: string }) | null>(null);
  const [winner2, setWinner2] = useState<(Employee & { nominatedBy: string; reason: string }) | null>(null);
  const [drawTimestamp, setDrawTimestamp] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isPrintingReport, setIsPrintingReport] = useState<boolean>(false);

  const animTimerRef = useRef<number | null>(null);

  // Synthesized web audio fanfare & tick sounds
  const playTickSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440 + Math.random() * 200, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio not supported or blocked
    }
  };

  const playFanfareSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.08, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.4);
      });
    } catch {
      // Audio not supported or blocked
    }
  };

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setPhase('idle');
      setWinner1(null);
      setWinner2(null);
      setCurrentIndex(0);
      setDrawTimestamp('');
      setIsPrintingReport(false);
    }
  }, [isOpen]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (animTimerRef.current) clearInterval(animTimerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  // Trigger grand celebration confetti
  const fireGrandConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#d97706', '#10b981', '#152e59', '#fef08a'],
    });
    playFanfareSound();
  };

  // Start Draw for Winner 1
  const startDrawWinner1 = () => {
    if (candidatePool.length < 2) {
      alert('يجب وجود مرشحين اثنين على الأقل لإجراء القرعة الإلكترونية.');
      return;
    }

    setPhase('drawing_1');
    let speed = 70;
    let elapsed = 0;
    const duration = 2800; // 2.8 seconds shuffle

    const interval = window.setInterval(() => {
      elapsed += speed;
      setCurrentIndex((prev) => (prev + 1) % candidatePool.length);
      playTickSound();

      if (elapsed >= duration) {
        clearInterval(interval);
        // Select random winner 1
        const chosen = candidatePool[Math.floor(Math.random() * candidatePool.length)];
        setWinner1(chosen);
        setPhase('won_1');
        fireGrandConfetti();
      }
    }, speed);

    animTimerRef.current = interval;
  };

  // Start Draw for Winner 2 (from remaining pool)
  const startDrawWinner2 = () => {
    if (!winner1) return;

    const remainingPool = candidatePool.filter((c) => c.id !== winner1.id);
    if (remainingPool.length === 0) return;

    setPhase('drawing_2');
    let speed = 70;
    let elapsed = 0;
    const duration = 3000;

    const interval = window.setInterval(() => {
      elapsed += speed;
      setCurrentIndex((prev) => (prev + 1) % remainingPool.length);
      playTickSound();

      if (elapsed >= duration) {
        clearInterval(interval);
        // Pick random winner 2
        const chosen = remainingPool[Math.floor(Math.random() * remainingPool.length)];
        setWinner2(chosen);
        setPhase('completed');
        setDrawTimestamp(new Date().toLocaleString('ar-IQ'));
        fireGrandConfetti();
      }
    }, speed);

    animTimerRef.current = interval;
  };

  // Apply winners and close
  const handleApplyToBoard = () => {
    if (winner1 && winner2) {
      onApplyWinners(winner1.id, winner2.id);
      onClose();
      confetti({ particleCount: 70, spread: 65, origin: { y: 0.5 } });
    }
  };

  // Reset and redo draw
  const handleResetDraw = () => {
    setPhase('idle');
    setWinner1(null);
    setWinner2(null);
    setCurrentIndex(0);
    setDrawTimestamp('');
  };

  // Print Draw Minutes Report
  const handlePrintDrawReport = () => {
    window.print();
  };

  const currentDisplayCandidate = candidatePool[currentIndex] || candidatePool[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 my-auto text-slate-900 border border-amber-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 no-print">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center shadow-md">
              <Shuffle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900">
                  القرعة الإلكترونية لاختيار المكرمين
                </h3>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
                  شهر {monthName} {toArabicNumerals(year)} م
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                سحب إلكتروني عادل وشفاف بين مرشحي مسؤولي الأقسام لاختيار المنتسبين المميزين
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              title={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Candidate Pool Summary Banner */}
        <div className="my-4 p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-center justify-between text-xs no-print">
          <div className="flex items-center gap-2 text-amber-950 font-bold">
            <Users className="w-4 h-4 text-amber-700" />
            <span>إجمالي المرشحين المؤهلين للقرعة من مسؤولي الشعب:</span>
            <span className="bg-amber-600 text-white px-2.5 py-0.5 rounded-full font-mono text-xs">
              {candidatePool.length} مرشح
            </span>
          </div>

          <span className="text-[11px] text-amber-800 font-semibold hidden sm:inline">
            بإشراف إدارة مجمع سيد الشهداء (ع) الخدمي
          </span>
        </div>

        {/* Main Stage */}
        <div className="py-2">
          {/* 1. IDLE STATE: Ready to begin */}
          {phase === 'idle' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-white flex items-center justify-center mx-auto shadow-xl ring-8 ring-amber-100 animate-pulse">
                <Trophy className="w-10 h-10 text-slate-900" />
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-black text-slate-900">
                  جاهز لإجراء السحب الإلكتروني لشهر {monthName}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                  سيتم إجراء السحب لاختيار المكرم الأول ثم المكرم الثاني عشوائياً وبنزاهة تامة من قائمة ترشيحات مسؤولي الأقسام.
                </p>
              </div>

              {/* Candidates Mini Badges */}
              <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto py-2">
                {candidatePool.map((cand) => (
                  <span
                    key={cand.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200 shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>{cand.name}</span>
                    <span className="text-[10px] text-amber-800 font-bold">({cand.nominatedBy.replace('مسؤول شعبة ', '')})</span>
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <button
                  onClick={startDrawWinner1}
                  className="inline-flex items-center gap-2.5 px-9 py-3.5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-700 hover:to-amber-800 text-slate-950 font-black text-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>بدء السحب الإلكتروني الآن (المكرم الأول) 🎲</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. SHUFFLING ANIMATION FOR WINNER 1 OR 2 */}
          {(phase === 'drawing_1' || phase === 'drawing_2') && currentDisplayCandidate && (
            <div className="text-center py-6 space-y-4 animate-in fade-in">
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-950 text-xs font-black animate-pulse border border-amber-300">
                {phase === 'drawing_1' ? 'جاري السحب العشوائي للمكرم الأول...' : 'جاري السحب العشوائي للمكرم الثاني...'}
              </span>

              {/* Animated Slot Box */}
              <div className="w-52 h-52 sm:w-60 sm:h-60 mx-auto rounded-3xl overflow-hidden border-4 border-amber-500 shadow-2xl relative bg-slate-950 flex flex-col items-center justify-center p-4 transition-all ring-8 ring-amber-400/20">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl mb-2.5">
                  <img
                    src={currentDisplayCandidate.photoUrl}
                    alt={currentDisplayCandidate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-sm sm:text-base font-black text-white truncate max-w-full">
                  {currentDisplayCandidate.name}
                </h4>
                <span className="text-[11px] text-amber-300 font-semibold truncate max-w-full">
                  {currentDisplayCandidate.department}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 truncate max-w-full font-bold bg-white/10 px-2.5 py-0.5 rounded-full">
                  المرشِّح: {currentDisplayCandidate.nominatedBy}
                </span>

                {/* Shuffling Aura */}
                <div className="absolute inset-0 bg-amber-500/10 pointer-events-none animate-pulse" />
              </div>

              <p className="text-xs font-bold text-slate-600 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
                <span>القرعة جارية بسرعة فائقة بين مرشحي مسؤولي الشعب...</span>
              </p>
            </div>
          )}

          {/* 3. WINNER 1 REVEALED: Prompt for Winner 2 */}
          {phase === 'won_1' && winner1 && (
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-950 text-xs font-black shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>مبارك! تم سحب المكرم الأول بنجاح</span>
              </div>

              {/* Winner 1 Card */}
              <div className="max-w-md mx-auto p-5 bg-gradient-to-br from-amber-50 to-yellow-100/70 rounded-3xl border-2 border-amber-400 shadow-md flex items-center gap-4 text-right">
                <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-amber-600 shadow-lg shrink-0">
                  <img src={winner1.photoUrl} alt={winner1.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-200/90 px-2.5 py-0.5 rounded-full">
                    المكرم الأول لشهر {monthName}
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-1">{winner1.name}</h4>
                  <p className="text-xs font-semibold text-slate-600">
                    {winner1.title} • {winner1.department}
                  </p>
                  <p className="text-[11px] font-bold text-amber-900 mt-1">المرشِّح: {winner1.nominatedBy}</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={startDrawWinner2}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-sm font-black rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>متابعة السحب لاختيار المكرم الثاني 🎲</span>
                </button>
              </div>
            </div>
          )}

          {/* 4. BOTH WINNERS COMPLETED: Final Result */}
          {phase === 'completed' && winner1 && winner2 && (
            <div className="space-y-6 py-2 animate-in zoom-in-95">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-950 text-xs font-black shadow-xs">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>اكتملت نتائج القرعة الإلكترونية الرسمية بنجاح</span>
                </div>
                <h4 className="text-xl font-black text-slate-900">
                  الفائزان بتكريم شهر {monthName} {toArabicNumerals(year)} م
                </h4>
                {drawTimestamp && (
                  <p className="text-[11px] text-slate-500 font-mono">
                    تاريخ ووقت اعتماد القرعة: {drawTimestamp}
                  </p>
                )}
              </div>

              {/* Both Winners Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Winner 1 */}
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-400 shadow-sm flex flex-col items-center text-center">
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-200/90 px-3 py-0.5 rounded-full mb-2.5">
                    المكرم الأول
                  </span>
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-amber-600 shadow-md mb-2">
                    <img src={winner1.photoUrl} alt={winner1.name} className="w-full h-full object-cover" />
                  </div>
                  <h5 className="text-base font-black text-slate-900">{winner1.name}</h5>
                  <span className="text-xs font-semibold text-slate-600">{winner1.title}</span>
                  <span className="text-[11px] font-bold text-amber-900 bg-white/90 px-2.5 py-0.5 rounded mt-1">
                    {winner1.department}
                  </span>
                  <p className="text-[11px] text-slate-600 mt-2 font-medium">مرشح من قبل: {winner1.nominatedBy}</p>
                </div>

                {/* Winner 2 */}
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-400 shadow-sm flex flex-col items-center text-center">
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-200/90 px-3 py-0.5 rounded-full mb-2.5">
                    المكرم الثاني
                  </span>
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-amber-600 shadow-md mb-2">
                    <img src={winner2.photoUrl} alt={winner2.name} className="w-full h-full object-cover" />
                  </div>
                  <h5 className="text-base font-black text-slate-900">{winner2.name}</h5>
                  <span className="text-xs font-semibold text-slate-600">{winner2.title}</span>
                  <span className="text-[11px] font-bold text-amber-900 bg-white/90 px-2.5 py-0.5 rounded mt-1">
                    {winner2.department}
                  </span>
                  <p className="text-[11px] text-slate-600 mt-2 font-medium">مرشح من قبل: {winner2.nominatedBy}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetDraw}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>إعادة السحب</span>
                  </button>

                  <button
                    onClick={handlePrintDrawReport}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer border border-slate-300"
                    title="طباعة محضر السحب والقرعة الإلكترونية"
                  >
                    <Printer className="w-4 h-4 text-amber-700" />
                    <span>طباعة محضر القرعة</span>
                  </button>
                </div>

                <button
                  onClick={handleApplyToBoard}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>اعتماد الفائزين ونقلهما فوراً للوحة التكريم والطباعة</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 no-print">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>نظام قرعة رقمي مؤمّن وعشوائي بنسبة 100% تحت إشراف الإدارة</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

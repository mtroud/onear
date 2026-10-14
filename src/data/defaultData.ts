import { Employee, MonthlyHonorees, BoardSettings } from '../types';

export const ARABIC_MONTHS = [
  'كانون الثاني (يناير)',
  'شباط (فبراير)',
  'آذار (مارس)',
  'نيسان (أبريل)',
  'أيار (مايو)',
  'حزيران (يونيو)',
  'تموز (يوليو)',
  'آب (أغسطس)',
  'أيلول (سبتمبر)',
  'تشرين الأول (أكتوبر)',
  'تشرين الثاني (نوفمبر)',
  'كانون الأول (ديسمبر)',
];

export const MONTH_NAMES_SIMPLE = [
  'كانون الثاني',
  'شباط',
  'آذار',
  'نيسان',
  'أيار',
  'حزيران',
  'تموز',
  'آب',
  'أيلول',
  'تشرين الأول',
  'تشرين الثاني',
  'كانون الأول',
];

// Convert standard numbers to Arabic Indic numerals if needed
export const toArabicNumerals = (num: number | string): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/[0-9]/g, (d) => arabicDigits[parseInt(d, 10)]);
};

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'حسن عبد الامير جودي',
    title: 'مسؤول شعبة الخدمات الفنية',
    department: 'قسم الصيانة الهندسية',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    badgeNumber: '2104',
    phone: '07801234567',
    joinDate: '2019-03-15',
  },
  {
    id: 'emp-2',
    name: 'مصطفى جواد كاظم',
    title: 'مشرف وحدة التوثيق والإعلام',
    department: 'قسم العلاقات العامة',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    badgeNumber: '1982',
    phone: '07709876543',
    joinDate: '2020-07-01',
  },
  {
    id: 'emp-3',
    name: 'حيدر صباح الموسوي',
    title: 'مسؤول المتابعة والتنسيق',
    department: 'إدارة المجمع',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80',
    badgeNumber: '1450',
    phone: '07812348899',
    joinDate: '2018-01-10',
  },
  {
    id: 'emp-4',
    name: 'علي حسين البصري',
    title: 'فني كهرباء أقدم',
    department: 'قسم الصيانة والتشغيل',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
    badgeNumber: '2433',
    phone: '07823344556',
    joinDate: '2021-11-20',
  },
  {
    id: 'emp-5',
    name: 'كرار مهدي السعدي',
    title: 'مسؤول قسم الضيافة والخدمات',
    department: 'قسم الضيافة والاستقبال',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    badgeNumber: '3120',
    phone: '07715566778',
    joinDate: '2022-04-12',
  },
  {
    id: 'emp-6',
    name: 'عباس فاضل الخفاجي',
    title: 'مساعد إداري لشؤون المنتسبين',
    department: 'الموارد البشرية',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
    badgeNumber: '2988',
    phone: '07834455667',
    joinDate: '2023-02-01',
  },
];

export const DEFAULT_BOARD_SETTINGS: BoardSettings = {
  theme: 'hussain_dome_corner',
  frameStyle: 'ornate_gold',
  organizationName: 'مجمع سيد الشهداء',
  headerCalligraphy: 'مَجْمَع سَيّد الشُّهَداء',
  mainTitlePrefix: 'المنتسبين المميزين لشهر',
  subTitle: 'خدمة الامام الحسين عليه السلام',
  showTitles: false,
  showDepartments: false,
  showSignatures: false,
  signer1Title: 'مسؤول المجمع',
  signer2Title: 'رئيس قسم الموارد البشرية',
  showOfficialSeal: false,
  sealText: 'معتمد رسمياً',
  badgeColor: '#152e59', // Deep royal navy blue like original image
  badgeTextColor: '#ffffff',
  domeOpacity: 0.85,
  filigreeOpacity: 0.9,
  bgBrightness: 1.0,
  photoBorderColor: '#c7a760',
  photoBorderWidth: 4,
  showQRCode: false,
  enableAnimations: true,
  customWebsiteUrl: '',
  boardAspectRatio: 'a4_landscape',
};

export const INITIAL_MONTHLY_HONOREES: MonthlyHonorees[] = [
  {
    id: 'award-2026-08',
    year: 2026,
    monthIndex: 8, // September (0-based)
    monthName: 'أيلول',
    person1Id: 'emp-1', // حسن عبد الامير جودي
    person2Id: 'emp-2', // مصطفى جواد كاظم
    organizationName: 'مجمع سيد الشهداء',
    subTitle: 'خدمة الامام الحسين عليه السلام',
    slogan: 'تكريماً لجهودهم المتميزة وتفانيهم في أداء الواجب',
    photoOffset1: { x: 0, y: 0, zoom: 1 },
    photoOffset2: { x: 0, y: 0, zoom: 1 },
    createdAt: '2026-09-01T10:00:00.000Z',
  },
  {
    id: 'award-2026-07',
    year: 2026,
    monthIndex: 7, // August
    monthName: 'آب',
    person1Id: 'emp-3',
    person2Id: 'emp-4',
    organizationName: 'مجمع سيد الشهداء',
    subTitle: 'خدمة الامام الحسين عليه السلام',
    slogan: 'تقديراً لإخلاصهم وعطائهم المبارك',
    photoOffset1: { x: 0, y: 0, zoom: 1 },
    photoOffset2: { x: 0, y: 0, zoom: 1 },
    createdAt: '2026-08-01T10:00:00.000Z',
  },
];

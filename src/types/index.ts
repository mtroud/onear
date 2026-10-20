export interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  photoUrl: string;
  phone?: string;
  badgeNumber?: string;
  joinDate?: string;
}

export interface MonthlyHonorees {
  id: string;
  year: number;
  monthIndex: number; // 0 to 11
  monthName: string;
  person1Id: string;
  person2Id: string;
  // Overrides if needed
  customName1?: string;
  customTitle1?: string;
  customPhoto1?: string;
  photoOffset1?: { x: number; y: number; zoom: number };
  customName2?: string;
  customTitle2?: string;
  customPhoto2?: string;
  photoOffset2?: { x: number; y: number; zoom: number };
  organizationName: string;
  subTitle: string;
  slogan: string;
  notes?: string;
  createdAt: string;
}

export type BoardTheme =
  | 'hussain_dome_corner'
  | 'karbala_gold_frame'
  | 'shrine_classic'
  | 'royal_gold'
  | 'emerald_luxury'
  | 'custom_bg';

export type FrameStyle =
  | 'ornate_gold'
  | 'simple_modern'
  | 'islamic_geometric'
  | 'double_royal'
  | 'none';

export type BoardPreset =
  | 'islamic_ornate'
  | 'formal_official'
  | 'modern_minimal'
  | 'star_radiant';

export interface BoardSettings {
  theme: BoardTheme;
  frameStyle: FrameStyle;
  presetStyle?: BoardPreset;
  showStarAura: boolean;
  starAuraDensity?: 'gentle' | 'vibrant' | 'luxury';
  fontFamily: 'Amiri' | 'Cairo' | 'Tajawal' | 'Reem Kufi';
  organizationName: string;
  headerCalligraphy: string;
  mainTitlePrefix: string;
  subTitle: string;
  showTitles: boolean;
  showDepartments: boolean;
  showSignatures: boolean;
  signer1Title: string;
  signer2Title: string;
  showOfficialSeal: boolean;
  sealText: string;
  badgeColor: string;
  badgeTextColor: string;
  customBgUrl?: string;
  domeOpacity: number;
  filigreeOpacity: number;
  bgBrightness: number;
  photoBorderColor: string;
  photoBorderWidth: number;
  showQRCode: boolean;
  enableAnimations: boolean;
  customWebsiteUrl?: string;
  boardAspectRatio: 'a4_landscape' | 'a3_landscape' | 'social_16_9';
}

export interface Nomination {
  id: string;
  year: number;
  monthIndex: number;
  employeeId: string;
  nominatedBy: string;
  reason: string;
  votes: number;
  createdAt: string;
}


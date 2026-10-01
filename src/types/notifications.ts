export type NotificationCategory = 'merit_list' | 'deadline' | 'scholarship' | 'general_news';

export type NotificationChannel = 'email' | 'push' | 'in_app';

export interface NotificationAction {
  label: string;
  type: 'internal_tab' | 'external_url';
  target: string; // e.g. 'calculator', 'scholarships', 'directory', or an https URL
  params?: {
    universityId?: string;
    programId?: string;
    scholarshipId?: string;
  };
}

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string; // ISO string
  read: boolean;
  relatedEntityId?: string; // universityId, programId, scholarshipId
  relatedEntityType?: 'university' | 'program' | 'scholarship' | 'news';
  isConfirmedDateOnly?: boolean;
  channelsDispatched: NotificationChannel[];
  action?: NotificationAction;
  metadata?: {
    meritRound?: number;
    closingAggregate?: number;
    daysRemaining?: number;
    officialSourceUrl?: string;
  };
}

export interface NotificationPreferences {
  emailEnabled: boolean;
  emailAddress: string;
  pushEnabled: boolean; // Browser Web Push notifications
  generalNewsEnabled: boolean; // Separate toggle for non-bookmarked major news
  generalNewsMajorOnly: boolean;
  deadlineAlertWindows: {
    sevenDays: boolean;
    oneDay: boolean;
  };
  meritListsEnabled: boolean;
  scholarshipAlertsEnabled: boolean;
}

export interface MeritListRecord {
  id: string;
  universityId: string;
  universityShortName: string;
  programId: string;
  programName: string;
  listRound: number; // 1st, 2nd, 3rd, 4th merit list
  cycleYear: string;
  closingAggregate: number;
  publishDate: string; // YYYY-MM-DD
  feePaymentDeadline: string; // YYYY-MM-DD
  officialPortalUrl: string;
  notes: string;
}

export interface NewsAnnouncement {
  id: string;
  title: string;
  summary: string;
  sourceAuthority: string;
  datePublished: string;
  isMajorNotification: boolean; // Trigger notification if true
  externalUrl?: string;
  relatedField?: string;
}

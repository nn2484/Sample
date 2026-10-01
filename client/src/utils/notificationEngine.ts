import {
  AppNotification,
  NotificationPreferences,
  MeritListRecord,
  NewsAnnouncement
} from '../types/notifications';
import { Bookmark } from '../types';
import { INITIAL_MERIT_LISTS, INITIAL_NEWS_ANNOUNCEMENTS } from '../data/meritLists';
import { UNIVERSITIES } from '../data/universities';
import { SCHOLARSHIPS } from '../data/scholarships';
import { getSavedBookmarks } from './storage';

const NOTIFICATIONS_STORAGE_KEY = 'merit_ledger_notifications';
const PREFERENCES_STORAGE_KEY = 'merit_ledger_notification_preferences';
const PUBLISHED_MERIT_LISTS_KEY = 'merit_ledger_published_merit_lists';
const PUBLISHED_NEWS_KEY = 'merit_ledger_published_news';

export const DEFAULT_PREFERENCES: NotificationPreferences = {
  emailEnabled: true,
  emailAddress: 'student@example.pk',
  pushEnabled: false,
  generalNewsEnabled: true,
  generalNewsMajorOnly: true,
  deadlineAlertWindows: {
    sevenDays: true,
    oneDay: true
  },
  meritListsEnabled: true,
  scholarshipAlertsEnabled: true
};

export function getNotificationPreferences(): NotificationPreferences {
  try {
    const raw = localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (raw) return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_PREFERENCES;
}

export function saveNotificationPreferences(prefs: NotificationPreferences): void {
  localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(prefs));
}

export function getNotifications(): AppNotification[] {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
          .filter(n => n && typeof n === 'object' && n.id)
          .map(n => ({
            id: String(n.id),
            category: n.category || 'general_news',
            title: n.title || 'Official Notification',
            message: n.message || '',
            timestamp: n.timestamp && !isNaN(new Date(n.timestamp).getTime()) ? n.timestamp : new Date().toISOString(),
            read: Boolean(n.read),
            relatedEntityId: n.relatedEntityId,
            relatedEntityType: n.relatedEntityType,
            isConfirmedDateOnly: Boolean(n.isConfirmedDateOnly),
            channelsDispatched: Array.isArray(n.channelsDispatched) ? n.channelsDispatched : ['in_app'],
            action: n.action,
            metadata: n.metadata
          }));
      }
    }
  } catch (err) {
    console.warn('Could not parse notifications from storage, using initial defaults:', err);
  }
  // Initialize with initial contextual notifications if empty or unparseable
  const initial = generateInitialNotifications();
  saveNotifications(initial);
  return initial;
}

export function saveNotifications(notifications: AppNotification[]): void {
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
}

export function markNotificationAsRead(id: string): AppNotification[] {
  const current = getNotifications();
  const updated = current.map(n => (n.id === id ? { ...n, read: true } : n));
  saveNotifications(updated);
  return updated;
}

export function markAllNotificationsAsRead(): AppNotification[] {
  const current = getNotifications();
  const updated = current.map(n => ({ ...n, read: true }));
  saveNotifications(updated);
  return updated;
}

export function clearAllNotifications(): AppNotification[] {
  saveNotifications([]);
  return [];
}

export function deleteNotification(id: string): AppNotification[] {
  const current = getNotifications();
  const updated = current.filter(n => n.id !== id);
  saveNotifications(updated);
  return updated;
}

export function getPublishedMeritLists(): MeritListRecord[] {
  try {
    const raw = localStorage.getItem(PUBLISHED_MERIT_LISTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_MERIT_LISTS;
}

export function savePublishedMeritLists(lists: MeritListRecord[]): void {
  localStorage.setItem(PUBLISHED_MERIT_LISTS_KEY, JSON.stringify(lists));
}

export function getPublishedNews(): NewsAnnouncement[] {
  try {
    const raw = localStorage.getItem(PUBLISHED_NEWS_KEY);
    if (raw) {
      const stored = JSON.parse(raw);
      if (Array.isArray(stored)) {
        const validStored = stored.filter(n => n && typeof n === 'object' && n.id);
        const existingIds = new Set(validStored.map(n => n.id));
        const missing = INITIAL_NEWS_ANNOUNCEMENTS.filter(n => !existingIds.has(n.id));
        return [...validStored, ...missing];
      }
    }
  } catch {}
  return INITIAL_NEWS_ANNOUNCEMENTS;
}

export function savePublishedNews(news: NewsAnnouncement[]): void {
  localStorage.setItem(PUBLISHED_NEWS_KEY, JSON.stringify(news));
}

// Request Browser Push Notification permission
export async function requestPushPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    return false;
  }
  if (Notification.permission === 'granted') {
    return true;
  }
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
}

// Trigger browser native push if permitted & enabled
export function triggerSystemPush(title: string, body: string, actionUrl?: string) {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      const notif = new Notification(title, {
        body,
        icon: '/favicon.ico'
      });
      if (actionUrl) {
        notif.onclick = () => {
          window.focus();
          notif.close();
        };
      }
    } catch (e) {
      console.warn('Browser push notification could not be shown:', e);
    }
  }
}

// Generate realistic starter notifications based on initial followed bookmarks
function generateInitialNotifications(): AppNotification[] {
  return [
    {
      id: 'notif-init-merit-nust',
      category: 'merit_list',
      title: 'NUST published 2nd Selection List for BS Computer Science',
      message: 'Closing aggregate stands at 79.42%. Selected candidates must submit fee challan before August 18 to retain seat and qualify for upward upgrading in 3rd list.',
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
      read: false,
      relatedEntityId: 'nust',
      relatedEntityType: 'university',
      channelsDispatched: ['email', 'push', 'in_app'],
      action: {
        label: 'View Official Selection Portal',
        type: 'external_url',
        target: 'https://nust.edu.pk/admissions/undergraduate/selection-list',
        params: { universityId: 'nust', programId: 'nust-cs-se' }
      },
      metadata: {
        meritRound: 2,
        closingAggregate: 79.42,
        officialSourceUrl: 'https://nust.edu.pk'
      }
    },
    {
      id: 'notif-init-deadline-turkiye',
      category: 'deadline',
      title: 'Approaching Deadline: Türkiye Bursları Government Scholarship (7 Days Left)',
      message: 'Official confirmed closing deadline is February 20. Ensure your certified high school transcripts, passport scan, and letter of intent are uploaded to the TBBS portal.',
      timestamp: new Date(Date.now() - 3600000 * 18).toISOString(), // 18 hours ago
      read: false,
      relatedEntityId: 'turkiye-burslari-ug',
      relatedEntityType: 'scholarship',
      isConfirmedDateOnly: true,
      channelsDispatched: ['email', 'in_app'],
      action: {
        label: 'Open Scholarship Guide',
        type: 'internal_tab',
        target: 'scholarships',
        params: { scholarshipId: 'turkiye-burslari-ug' }
      },
      metadata: {
        daysRemaining: 7,
        officialSourceUrl: 'https://tbbs.turkiyeburslari.gov.tr'
      }
    },
    {
      id: 'notif-init-news-pmdc',
      category: 'general_news',
      title: 'Official Directive: PMDC Standardizes 200 MCQs National MDCAT Test Pattern',
      message: 'Pakistan Medical & Dental Council has issued verified syllabus weighting: Biology 68, Chemistry 54, Physics 54, English 18, Logic 6. MDCAT carries statutory 50% aggregate weight.',
      timestamp: new Date(Date.now() - 3600000 * 36).toISOString(), // 1.5 days ago
      read: true,
      channelsDispatched: ['in_app'],
      action: {
        label: 'View Medical Roadmaps',
        type: 'internal_tab',
        target: 'roadmaps'
      }
    }
  ];
}

// Check if a university, program, or scholarship is followed by user
export function isEntityFollowed(
  entityId: string,
  bookmarks: Bookmark[]
): boolean {
  return bookmarks.some(b => b.itemId === entityId);
}

// DISPATCH ENGINE: Admin or automated trigger of a new Merit List event
export function dispatchMeritListNotification(
  record: MeritListRecord,
  bookmarks: Bookmark[],
  preferences: NotificationPreferences
): AppNotification | null {
  if (!preferences.meritListsEnabled) return null;

  // Check if student follows this university or specific program
  const isFollowed =
    isEntityFollowed(record.universityId, bookmarks) ||
    isEntityFollowed(record.programId, bookmarks) ||
    bookmarks.length === 0; // If user has no bookmarks yet, allow demonstration of dispatch

  if (!isFollowed && bookmarks.length > 0) {
    // If student explicitly has bookmarks but not this one, don't over-notify unless subscribed
    return null;
  }

  const channels: ('email' | 'push' | 'in_app')[] = ['in_app'];
  if (preferences.emailEnabled) channels.push('email');
  if (preferences.pushEnabled) channels.push('push');

  const title = `${record.universityShortName} published ${record.listRound === 1 ? '1st' : record.listRound === 2 ? '2nd' : record.listRound === 3 ? '3rd' : `${record.listRound}th`} Merit List for ${record.programName}`;
  const message = `Closing aggregate cutoff is ${record.closingAggregate}%. Dues deposit deadline is ${record.feePaymentDeadline}. Selected applicants must submit original documents before cutoff.`;

  const newNotif: AppNotification = {
    id: `notif-ml-${Date.now()}`,
    category: 'merit_list',
    title,
    message,
    timestamp: new Date().toISOString(),
    read: false,
    relatedEntityId: record.universityId,
    relatedEntityType: 'university',
    channelsDispatched: channels,
    action: {
      label: 'Open Selection Portal',
      type: 'external_url',
      target: record.officialPortalUrl,
      params: {
        universityId: record.universityId,
        programId: record.programId
      }
    },
    metadata: {
      meritRound: record.listRound,
      closingAggregate: record.closingAggregate,
      officialSourceUrl: record.officialPortalUrl
    }
  };

  // Push to system
  if (preferences.pushEnabled) {
    triggerSystemPush(title, message, record.officialPortalUrl);
  }

  const current = getNotifications();
  const updated = [newNotif, ...current];
  saveNotifications(updated);

  return newNotif;
}

// DISPATCH ENGINE: Trigger a Deadline Reminder (Only for CONFIRMED dates!)
export function dispatchDeadlineReminder(
  item: {
    id: string;
    title: string;
    deadlineDisplay: string;
    isConfirmed: boolean;
    entityType: 'university' | 'scholarship' | 'program';
    entityId: string;
    officialUrl: string;
    daysWindow: 7 | 1;
  },
  bookmarks: Bookmark[],
  preferences: NotificationPreferences
): AppNotification | null {
  // CRITICAL ACCURACY RULE:
  // "Only send a deadline reminder for a date that's marked as confirmed (verified against an official source),
  // not an estimated date carried over from a previous year. Sending a confident-sounding reminder for a guessed
  // date is worse than sending no reminder at all."
  if (!item.isConfirmed) {
    console.warn(`Deadline reminder suppressed for ${item.title}: date is marked as estimated, not officially confirmed.`);
    return null;
  }

  if (item.daysWindow === 7 && !preferences.deadlineAlertWindows.sevenDays) return null;
  if (item.daysWindow === 1 && !preferences.deadlineAlertWindows.oneDay) return null;

  const isFollowed = isEntityFollowed(item.entityId, bookmarks) || bookmarks.length === 0;
  if (!isFollowed && bookmarks.length > 0) return null;

  const channels: ('email' | 'push' | 'in_app')[] = ['in_app'];
  if (preferences.emailEnabled) channels.push('email');
  if (preferences.pushEnabled) channels.push('push');

  const urgency = item.daysWindow === 1 ? '1 Day Left — Closes Tomorrow!' : '7 Days Remaining';
  const title = `Deadline Alert (${urgency}): ${item.title}`;
  const message = `Official confirmed closing deadline is ${item.deadlineDisplay}. Complete your fee voucher and document submissions before the online portal locks.`;

  const newNotif: AppNotification = {
    id: `notif-dl-${Date.now()}`,
    category: 'deadline',
    title,
    message,
    timestamp: new Date().toISOString(),
    read: false,
    relatedEntityId: item.entityId,
    relatedEntityType: item.entityType,
    isConfirmedDateOnly: true,
    channelsDispatched: channels,
    action: {
      label: item.entityType === 'scholarship' ? 'Open Scholarship Guide' : 'Open Admissions Portal',
      type: item.entityType === 'scholarship' ? 'internal_tab' : 'external_url',
      target: item.entityType === 'scholarship' ? 'scholarships' : item.officialUrl,
      params: item.entityType === 'scholarship' ? { scholarshipId: item.entityId } : { universityId: item.entityId }
    },
    metadata: {
      daysRemaining: item.daysWindow,
      officialSourceUrl: item.officialUrl
    }
  };

  if (preferences.pushEnabled) {
    triggerSystemPush(title, message, item.officialUrl);
  }

  const current = getNotifications();
  const updated = [newNotif, ...current];
  saveNotifications(updated);

  return newNotif;
}

// DISPATCH ENGINE: Broadcast a general official news announcement
export function dispatchGeneralNewsNotification(
  news: NewsAnnouncement,
  preferences: NotificationPreferences
): AppNotification | null {
  if (!preferences.generalNewsEnabled) return null;
  if (preferences.generalNewsMajorOnly && !news.isMajorNotification) {
    return null; // Suppressed non-major update to prevent notification noise
  }

  const channels: ('email' | 'push' | 'in_app')[] = ['in_app'];
  if (preferences.emailEnabled) channels.push('email');
  if (preferences.pushEnabled) channels.push('push');

  const title = `Official Bulletin: ${news.title}`;
  const message = `${news.summary} (Source: ${news.sourceAuthority})`;

  const newNotif: AppNotification = {
    id: `notif-news-${Date.now()}`,
    category: 'general_news',
    title,
    message,
    timestamp: new Date().toISOString(),
    read: false,
    relatedEntityId: news.id,
    relatedEntityType: 'news',
    channelsDispatched: channels,
    action: news.externalUrl
      ? {
          label: 'Read Official Notice',
          type: 'external_url',
          target: news.externalUrl
        }
      : undefined
  };

  if (preferences.pushEnabled) {
    triggerSystemPush(title, message, news.externalUrl);
  }

  const current = getNotifications();
  const updated = [newNotif, ...current];
  saveNotifications(updated);

  return newNotif;
}

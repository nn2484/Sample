import { Bookmark, UserProfile } from '../types';

const BOOKMARKS_KEY = 'merit_ledger_bookmarks';
const CHECKLIST_PROGRESS_KEY = 'merit_ledger_checklist_progress';
const USER_PROFILE_KEY = 'merit_ledger_profile';

export function getSavedBookmarks(): Bookmark[] {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveBookmark(bookmark: Bookmark): Bookmark[] {
  const current = getSavedBookmarks();
  const exists = current.some(b => b.itemId === bookmark.itemId && b.itemType === bookmark.itemType);
  let updated: Bookmark[];
  if (exists) {
    updated = current.filter(b => !(b.itemId === bookmark.itemId && b.itemType === bookmark.itemType));
  } else {
    updated = [...current, bookmark];
  }
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  return updated;
}

export function isItemBookmarked(itemId: string, itemType: string): boolean {
  const current = getSavedBookmarks();
  return current.some(b => b.itemId === itemId && b.itemType === itemType);
}

export function getChecklistProgress(universityId: string): string[] {
  try {
    const data = localStorage.getItem(`${CHECKLIST_PROGRESS_KEY}_${universityId}`);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleChecklistDoc(universityId: string, docId: string): string[] {
  const current = getChecklistProgress(universityId);
  let updated: string[];
  if (current.includes(docId)) {
    updated = current.filter(id => id !== docId);
  } else {
    updated = [...current, docId];
  }
  localStorage.setItem(`${CHECKLIST_PROGRESS_KEY}_${universityId}`, JSON.stringify(updated));
  return updated;
}

export function getSavedProfile(): UserProfile {
  try {
    const data = localStorage.getItem(USER_PROFILE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return {
    matricPercentage: null,
    intermediatePercentage: null,
    isPredictedInter: false,
    academicStream: 'fsc',
    fieldsOfInterest: ['Computer Science', 'Engineering'],
    preferredCity: 'All',
    canRelocate: true,
    budgetTier: 'public'
  };
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
}

export function clearProfile(): void {
  localStorage.removeItem(USER_PROFILE_KEY);
}

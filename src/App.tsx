/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { UniversityDirectory } from './components/UniversityDirectory';
import { MeritCalculator } from './components/MeritCalculator';
import { ScholarshipDatabase } from './components/ScholarshipDatabase';
import { DocumentChecklist } from './components/DocumentChecklist';
import { CareerRoadmaps } from './components/CareerRoadmaps';
import { Recommendations } from './components/Recommendations';
import { DeadlineTracker } from './components/DeadlineTracker';
import { ErrorBoundary } from './components/ErrorBoundary';
import { BookmarksModal } from './components/BookmarksModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { AdminNotificationPublisher } from './components/AdminNotificationPublisher';
import { EmailPreviewModal } from './components/EmailPreviewModal';
import { Footer } from './components/Footer';
import { Bookmark } from './types';
import { AppNotification } from './types/notifications';
import {
  getSavedBookmarks,
  saveBookmark,
  isItemBookmarked
} from './utils/storage';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearAllNotifications,
  deleteNotification,
  getNotificationPreferences
} from './utils/notificationEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('directory');

  // Parameters for inter-feature navigation
  const [selectedCalcUniId, setSelectedCalcUniId] = useState<string | undefined>('nust');
  const [selectedCalcProgId, setSelectedCalcProgId] = useState<string | undefined>(undefined);
  const [selectedChecklistUniId, setSelectedChecklistUniId] = useState<string | undefined>('nust');

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => getSavedBookmarks());
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState<AppNotification[]>(() => getNotifications());
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPublisherOpen, setIsPublisherOpen] = useState(false);
  const [previewEmailNotif, setPreviewEmailNotif] = useState<AppNotification | null>(null);

  useEffect(() => {
    if (activeTab === 'notifications') {
      setActiveTab('directory');
      setIsNotificationsOpen(true);
    }
  }, [activeTab]);

  const reloadNotifications = () => {
    setNotifications(getNotifications());
  };

  const handleMarkAsRead = (id: string) => {
    const updated = markNotificationAsRead(id);
    setNotifications(updated);
  };

  const handleMarkAllAsRead = () => {
    const updated = markAllNotificationsAsRead();
    setNotifications(updated);
  };

  const handleClearAll = () => {
    const updated = clearAllNotifications();
    setNotifications(updated);
  };

  const handleDeleteNotification = (id: string) => {
    const updated = deleteNotification(id);
    setNotifications(updated);
  };

  // Sync bookmarks with localStorage
  const handleToggleBookmark = (item: {
    id: string;
    itemType: 'university' | 'program' | 'scholarship';
    itemId: string;
    title: string;
    subtitle: string;
    deadlineDate?: string;
    deadlineStatus?: 'confirmed' | 'estimated';
    linkTarget?: string;
  }) => {
    const bookmark: Bookmark = {
      ...item,
      savedAt: new Date().toISOString()
    };
    const updated = saveBookmark(bookmark);
    setBookmarks(updated);
  };

  const handleRemoveBookmark = (itemId: string, itemType: string) => {
    const current = getSavedBookmarks();
    const updated = current.filter(b => !(b.itemId === itemId && b.itemType === itemType));
    localStorage.setItem('merit_ledger_bookmarks', JSON.stringify(updated));
    setBookmarks(updated);
  };

  // Cross-linking navigation helpers
  const navigateToCalculator = (uniId?: string, progId?: string) => {
    if (uniId) setSelectedCalcUniId(uniId);
    if (progId) setSelectedCalcProgId(progId);
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToChecklist = (uniId?: string) => {
    if (uniId) setSelectedChecklistUniId(uniId);
    setActiveTab('checklist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToScholarships = (schId?: string) => {
    setActiveTab('scholarships');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToRoadmaps = () => {
    setActiveTab('roadmaps');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToRecommendations = () => {
    setActiveTab('recommendations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const userEmail = getNotificationPreferences().emailAddress;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 text-slate-900">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={tab => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookmarkCount={bookmarks.length}
        openBookmarks={() => setIsBookmarksOpen(true)}
        unreadNotificationCount={unreadCount}
        openNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'directory' && (
          <UniversityDirectory
            onSelectForCalculator={navigateToCalculator}
            onSelectForChecklist={navigateToChecklist}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={(id, type) => isItemBookmarked(id, type)}
          />
        )}

        {activeTab === 'calculator' && (
          <MeritCalculator
            initialUniversityId={selectedCalcUniId}
            initialProgramId={selectedCalcProgId}
            onNavigateToChecklist={navigateToChecklist}
            onNavigateToRecommendations={navigateToRecommendations}
          />
        )}

        {activeTab === 'scholarships' && (
          <ScholarshipDatabase
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={(id, type) => isItemBookmarked(id, type)}
          />
        )}

        {activeTab === 'checklist' && (
          <DocumentChecklist
            initialUniversityId={selectedChecklistUniId}
            onNavigateToCalculator={navigateToCalculator}
          />
        )}

        {activeTab === 'roadmaps' && (
          <CareerRoadmaps
            onNavigateToCalculator={navigateToCalculator}
            onNavigateToChecklist={navigateToChecklist}
            onNavigateToScholarships={navigateToScholarships}
          />
        )}

        {activeTab === 'recommendations' && (
          <Recommendations
            onNavigateToCalculator={navigateToCalculator}
            onNavigateToScholarships={navigateToScholarships}
            onNavigateToRoadmaps={navigateToRoadmaps}
          />
        )}

        {activeTab === 'deadlines' && (
          <DeadlineTracker
            onSelectUniversity={navigateToCalculator}
            onSelectScholarship={navigateToScholarships}
          />
        )}
      </main>

      {/* Notification Center Modal */}
      <ErrorBoundary
        fallbackTitle="Notification Center Encountered an Issue"
        onReset={() => {
          localStorage.removeItem('merit_ledger_notifications');
          reloadNotifications();
          setIsNotificationsOpen(false);
        }}
      >
        <NotificationCenterModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearAll={handleClearAll}
          onDeleteNotification={handleDeleteNotification}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenPublisher={() => setIsPublisherOpen(true)}
          onPreviewEmail={notif => setPreviewEmailNotif(notif)}
          onNavigateTab={(tab, param) => {
            if (tab === 'calculator') navigateToCalculator(param);
            else if (tab === 'scholarships') navigateToScholarships(param);
            else if (tab === 'checklist') navigateToChecklist(param);
            else if (tab === 'roadmaps') navigateToRoadmaps();
            else setActiveTab(tab);
          }}
        />
      </ErrorBoundary>

      {/* Notification Preferences & Followed Items Modal */}
      <NotificationSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
        onOpenPublisher={() => setIsPublisherOpen(true)}
      />

      {/* Admin Event Trigger Console & Simulator */}
      <AdminNotificationPublisher
        isOpen={isPublisherOpen}
        onClose={() => setIsPublisherOpen(false)}
        bookmarks={bookmarks}
        onNotificationDispatched={reloadNotifications}
      />

      {/* Email Delivery Preview Modal */}
      <EmailPreviewModal
        notification={previewEmailNotif}
        onClose={() => setPreviewEmailNotif(null)}
        userEmail={userEmail}
      />

      {/* Bookmarks & Deadlines Drawer Modal */}
      <ErrorBoundary
        fallbackTitle="Saved Items Encountered an Issue"
        onReset={() => {
          setIsBookmarksOpen(false);
        }}
      >
        <BookmarksModal
          isOpen={isBookmarksOpen}
          onClose={() => setIsBookmarksOpen(false)}
          bookmarks={bookmarks}
          onRemoveBookmark={handleRemoveBookmark}
          onNavigateToCalculator={navigateToCalculator}
        />
      </ErrorBoundary>

      {/* Editorial Footer */}
      <Footer
        setActiveTab={tab => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

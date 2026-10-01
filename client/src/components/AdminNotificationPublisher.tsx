import React, { useState } from 'react';
import {
  MeritListRecord,
  NewsAnnouncement
} from '../types/notifications';
import { UNIVERSITIES } from '../data/universities';
import { SCHOLARSHIPS } from '../data/scholarships';
import { Bookmark } from '../types';
import {
  getNotificationPreferences,
  dispatchMeritListNotification,
  dispatchDeadlineReminder,
  dispatchGeneralNewsNotification,
  getPublishedMeritLists,
  savePublishedMeritLists,
  getPublishedNews,
  savePublishedNews
} from '../utils/notificationEngine';
import {
  X,
  Send,
  ShieldCheck,
  AlertTriangle,
  Building2,
  Calendar,
  Newspaper,
  CheckCircle2,
  Bell,
  Mail,
  Smartphone,
  Eye
} from 'lucide-react';

interface AdminNotificationPublisherProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onNotificationDispatched: () => void;
}

export const AdminNotificationPublisher: React.FC<AdminNotificationPublisherProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onNotificationDispatched
}) => {
  const [activeTab, setActiveTab] = useState<'merit_list' | 'deadline' | 'news'>('merit_list');
  const [dispatchResult, setDispatchResult] = useState<{
    success: boolean;
    title: string;
    channels: string[];
    suppressedReason?: string;
  } | null>(null);

  // Merit List Form State
  const [selectedUniId, setSelectedUniId] = useState<string>('nust');
  const selectedUni = UNIVERSITIES.find(u => u.id === selectedUniId) || UNIVERSITIES[0];
  const [selectedProgId, setSelectedProgId] = useState<string>(selectedUni.programs[0]?.id || '');
  const [listRound, setListRound] = useState<number>(2);
  const [closingAggregate, setClosingAggregate] = useState<string>('79.42');
  const [paymentDeadline, setPaymentDeadline] = useState<string>('2026-08-18');
  const [portalUrl, setPortalUrl] = useState<string>(selectedUni.officialWebsite);

  // Deadline Trigger Form State
  const [selectedDeadlineItemType, setSelectedDeadlineItemType] = useState<'university' | 'scholarship'>('university');
  const [selectedDeadlineTargetId, setSelectedDeadlineTargetId] = useState<string>('nust');
  const [deadlineDaysWindow, setDeadlineDaysWindow] = useState<7 | 1>(7);

  // News Form State
  const [newsTitle, setNewsTitle] = useState<string>('HEC Announces National HAT Test Schedule for Foreign Scholarships');
  const [newsSummary, setNewsSummary] = useState<string>('The Higher Education Commission has published registration slots for the Higher Education Aptitude Test (HAT) required for international scholarship nominations.');
  const [newsAuthority, setNewsAuthority] = useState<string>('Higher Education Commission of Pakistan (HEC)');
  const [newsIsMajor, setNewsIsMajor] = useState<boolean>(true);

  if (!isOpen) return null;

  const handlePublishMeritList = (e: React.FormEvent) => {
    e.preventDefault();
    const prog = selectedUni.programs.find(p => p.id === selectedProgId) || selectedUni.programs[0];
    const record: MeritListRecord = {
      id: `ml-${selectedUni.id}-${selectedProgId}-${listRound}-${Date.now()}`,
      universityId: selectedUni.id,
      universityShortName: selectedUni.shortName,
      programId: prog.id,
      programName: prog.name,
      listRound,
      cycleYear: '2026',
      closingAggregate: parseFloat(closingAggregate) || 75.0,
      publishDate: new Date().toISOString().split('T')[0],
      feePaymentDeadline: paymentDeadline,
      officialPortalUrl: portalUrl || selectedUni.officialWebsite,
      notes: `${listRound}th Merit List published. Fee deposit mandatory before ${paymentDeadline}.`
    };

    const published = getPublishedMeritLists();
    savePublishedMeritLists([record, ...published]);

    const prefs = getNotificationPreferences();
    const notif = dispatchMeritListNotification(record, bookmarks, prefs);

    if (notif) {
      setDispatchResult({
        success: true,
        title: notif.title,
        channels: notif.channelsDispatched
      });
      onNotificationDispatched();
    } else {
      setDispatchResult({
        success: false,
        title: 'Notification Suppressed',
        channels: [],
        suppressedReason: 'Student does not follow this item or Merit List alerts are toggled off in settings.'
      });
    }
  };

  const handleTriggerDeadline = (e: React.FormEvent) => {
    e.preventDefault();
    const prefs = getNotificationPreferences();

    let title = '';
    let deadlineDisplay = '';
    let isConfirmed = false;
    let officialUrl = '';
    let entityId = '';

    if (selectedDeadlineItemType === 'university') {
      const uni = UNIVERSITIES.find(u => u.id === selectedDeadlineTargetId) || UNIVERSITIES[0];
      entityId = uni.id;
      title = `${uni.shortName} Admission Application`;
      deadlineDisplay = uni.typicalTiming.applicationCloses;
      isConfirmed = uni.typicalTiming.status === 'confirmed';
      officialUrl = uni.officialWebsite;
    } else {
      const sch = SCHOLARSHIPS.find(s => s.id === selectedDeadlineTargetId) || SCHOLARSHIPS[0];
      entityId = sch.id;
      title = sch.name;
      deadlineDisplay = sch.deadlineDisplay;
      isConfirmed = sch.deadlineStatus === 'confirmed';
      officialUrl = sch.officialUrl;
    }

    if (!isConfirmed) {
      setDispatchResult({
        success: false,
        title: 'Dispatch Blocked by Accuracy Rule',
        channels: [],
        suppressedReason: 'Strict Accuracy Safeguard: This date is marked as "estimated" (historical pattern), NOT verified confirmed. Automated reminders are strictly restricted to confirmed dates to prevent misleading students.'
      });
      return;
    }

    const notif = dispatchDeadlineReminder(
      {
        id: `dl-${entityId}`,
        title,
        deadlineDisplay,
        isConfirmed,
        entityType: selectedDeadlineItemType,
        entityId,
        officialUrl,
        daysWindow: deadlineDaysWindow
      },
      bookmarks,
      prefs
    );

    if (notif) {
      setDispatchResult({
        success: true,
        title: notif.title,
        channels: notif.channelsDispatched
      });
      onNotificationDispatched();
    } else {
      setDispatchResult({
        success: false,
        title: 'Notification Filtered',
        channels: [],
        suppressedReason: 'Filtered by student preferences or student does not track this institution.'
      });
    }
  };

  const handlePublishNews = (e: React.FormEvent) => {
    e.preventDefault();
    const news: NewsAnnouncement = {
      id: `news-${Date.now()}`,
      title: newsTitle,
      summary: newsSummary,
      sourceAuthority: newsAuthority,
      datePublished: new Date().toISOString().split('T')[0],
      isMajorNotification: newsIsMajor
    };

    const currentNews = getPublishedNews();
    savePublishedNews([news, ...currentNews]);

    const prefs = getNotificationPreferences();
    const notif = dispatchGeneralNewsNotification(news, prefs);

    if (notif) {
      setDispatchResult({
        success: true,
        title: notif.title,
        channels: notif.channelsDispatched
      });
      onNotificationDispatched();
    } else {
      setDispatchResult({
        success: false,
        title: 'Broadcast Filtered',
        channels: [],
        suppressedReason: newsIsMajor
          ? 'General news is disabled in student preferences.'
          : 'Notice was not marked as Major Notification; silent bulletin only.'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-paper-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-paper-50 rounded-2xl border border-paper-200 shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-paper-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-navy-600" />
            <div>
              <h2 className="text-lg font-serif font-semibold text-paper-900">
                Official Event Trigger & Publisher
              </h2>
              <p className="text-xs text-paper-500">
                Simulate real administrative events and observe live notification dispatch.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-paper-400 hover:text-paper-700 rounded-lg hover:bg-paper-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-paper-200 bg-paper-50 px-6 pt-2">
          {[
            { id: 'merit_list', label: 'Publish Merit List', icon: Building2 },
            { id: 'deadline', label: 'Trigger Deadline Alert', icon: Calendar },
            { id: 'news', label: 'Post General News', icon: Newspaper }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setDispatchResult(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px ${
                  isActive
                    ? 'border-navy-600 text-navy-900 bg-paper-50 font-bold'
                    : 'border-transparent text-paper-600 hover:text-navy-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
          {/* Dispatch Feedback Alert */}
          {dispatchResult && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                dispatchResult.success
                  ? 'bg-navy-50 border-navy-200 text-navy-950'
                  : 'bg-gold-50 border-gold-200 text-gold-950'
              }`}
            >
              {dispatchResult.success ? (
                <CheckCircle2 className="w-5 h-5 text-navy-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-gold-800 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <span className="font-semibold block text-xs">{dispatchResult.title}</span>
                {dispatchResult.success ? (
                  <p className="text-[11px] leading-relaxed">
                    Successfully dispatched to user channels:{' '}
                    <strong className="capitalize">
                      {dispatchResult.channels.join(', ')}
                    </strong>
                    . Check your notification inbox or bell icon.
                  </p>
                ) : (
                  <p className="text-[11px] leading-relaxed">
                    {dispatchResult.suppressedReason}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Form 1: Merit List */}
          {activeTab === 'merit_list' && (
            <form onSubmit={handlePublishMeritList} className="space-y-4">
              <div className="bg-paper-50 p-3 rounded-lg border border-paper-200 text-[11px] text-paper-600 leading-relaxed">
                When an administrator posts a new merit list, students bookmarking this university or
                program automatically receive immediate notifications across Email and Push.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-paper-700 font-medium mb-1">
                    Select University
                  </label>
                  <select
                    value={selectedUniId}
                    onChange={e => {
                      setSelectedUniId(e.target.value);
                      const u = UNIVERSITIES.find(x => x.id === e.target.value);
                      if (u) {
                        setSelectedProgId(u.programs[0]?.id || '');
                        setPortalUrl(u.officialWebsite);
                      }
                    }}
                    className="w-full bg-paper-50 border border-paper-300 rounded-lg px-2.5 py-1.5 text-paper-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
                  >
                    {UNIVERSITIES.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.shortName} ({u.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-paper-700 font-medium mb-1">
                    Program
                  </label>
                  <select
                    value={selectedProgId}
                    onChange={e => setSelectedProgId(e.target.value)}
                    className="w-full bg-paper-50 border border-paper-300 rounded-lg px-2.5 py-1.5 text-paper-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
                  >
                    {selectedUni.programs.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-paper-700 font-medium mb-1">
                    List Round
                  </label>
                  <select
                    value={listRound}
                    onChange={e => setListRound(parseInt(e.target.value))}
                    className="w-full bg-paper-50 border border-paper-300 rounded-lg px-2.5 py-1.5 text-paper-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
                  >
                    <option value={1}>1st Merit List</option>
                    <option value={2}>2nd Merit List</option>
                    <option value={3}>3rd Merit List</option>
                    <option value={4}>Final Selection List</option>
                  </select>
                </div>

                <div>
                  <label className="block text-paper-700 font-medium mb-1">
                    Closing Cutoff %
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={closingAggregate}
                    onChange={e => setClosingAggregate(e.target.value)}
                    className="w-full bg-paper-50 border border-paper-300 rounded-lg px-2.5 py-1.5 font-mono text-paper-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
                  />
                </div>

                <div>
                  <label className="block text-paper-700 font-medium mb-1">
                    Fee Deadline
                  </label>
                  <input
                    type="date"
                    value={paymentDeadline}
                    onChange={e => setPaymentDeadline(e.target.value)}
                    className="w-full bg-paper-50 border border-paper-300 rounded-lg px-2.5 py-1.5 text-paper-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-paper-700 font-medium mb-1">
                  Official Result Portal URL
                </label>
                <input
                  type="url"
                  value={portalUrl}
                  onChange={e => setPortalUrl(e.target.value)}
                  className="w-full bg-paper-50 border border-paper-300 rounded-lg px-2.5 py-1.5 text-paper-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-navy-600 hover:bg-navy-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 text-xs shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Official Merit List & Dispatch Alerts</span>
              </button>
            </form>
          )}

          {/* Form 2: Deadline Reminders (Enforcing strict confirmation rule) */}
          {activeTab === 'deadline' && (
            <form onSubmit={handleTriggerDeadline} className="space-y-4">
              <div className="bg-gold-50/80 border border-gold-200 rounded-lg p-3 text-[11px] text-gold-950 space-y-1">
                <span className="font-semibold block flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-800" />
                  Accuracy Enforcement Rule
                </span>
                <p className="leading-relaxed">
                  The system will refuse to send automated deadline reminders for dates categorized
                  as "estimated". Test selecting both confirmed and estimated items to observe this
                  safeguard in action.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-paper-700 font-medium mb-1">
                    Item Category
                  </label>
                  <select
                    value={selectedDeadlineItemType}
                    onChange={e => {
                      const t = e.target.value as any;
                      setSelectedDeadlineItemType(t);
                      setSelectedDeadlineTargetId(
                        t === 'university' ? UNIVERSITIES[0].id : SCHOLARSHIPS[0].id
                      );
                    }}
                    className="w-full bg-paper-50 border border-paper-300 rounded-lg px-2.5 py-1.5 text-paper-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
                  >
                    <option value="university">University Application / Test Date</option>
                    <option value="scholarship">Scholarship Deadline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-paper-700 font-medium mb-1">
                    Select Target
                  </label>
                  <select
                    value={selectedDeadlineTargetId}
                    onChange={e => setSelectedDeadlineTargetId(e.target.value)}
                    className="w-full bg-paper-50 border border-paper-300 rounded-lg px-2.5 py-1.5 text-paper-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
                  >
                    {selectedDeadlineItemType === 'university'
                      ? UNIVERSITIES.map(u => (
                          <option key={u.id} value={u.id}>
                            {u.shortName} [{u.typicalTiming.status.toUpperCase()}]
                          </option>
                        ))
                      : SCHOLARSHIPS.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.name} [{s.deadlineStatus.toUpperCase()}]
                          </option>
                        ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-paper-700 font-medium mb-1">
                  Alert Window
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeadlineDaysWindow(7)}
                    className={`py-1.5 px-3 rounded-lg border text-center font-medium transition-colors ${
                      deadlineDaysWindow === 7
                        ? 'bg-navy-600 text-white border-navy-600'
                        : 'bg-paper-50 text-paper-700 border-paper-200 hover:border-paper-300'
                    }`}
                  >
                    7 Days Ahead Window
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeadlineDaysWindow(1)}
                    className={`py-1.5 px-3 rounded-lg border text-center font-medium transition-colors ${
                      deadlineDaysWindow === 1
                        ? 'bg-navy-600 text-white border-navy-600'
                        : 'bg-paper-50 text-paper-700 border-paper-200 hover:border-paper-300'
                    }`}
                  >
                    1 Day Ahead (Final Alert)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-navy-600 hover:bg-navy-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 text-xs shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Simulate Automated Deadline Alert</span>
              </button>
            </form>
          )}

          {/* Form 3: General News */}
          {activeTab === 'news' && (
            <form onSubmit={handlePublishNews} className="space-y-4">
              <div className="bg-paper-50 p-3 rounded-lg border border-paper-200 text-[11px] text-paper-600 leading-relaxed">
                General news items inform students of overarching developments (like nationwide testing
                regulations). Only items marked as <strong>Major Notification</strong> dispatch
                active alerts to respect student focus.
              </div>

              <div>
                <label className="block text-paper-700 font-medium mb-1">
                  Announcement Headline
                </label>
                <input
                  type="text"
                  value={newsTitle}
                  onChange={e => setNewsTitle(e.target.value)}
                  className="w-full bg-paper-50 border border-paper-300 rounded-lg px-2.5 py-1.5 text-paper-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
                />
              </div>

              <div>
                <label className="block text-paper-700 font-medium mb-1">
                  Source Authority
                </label>
                <input
                  type="text"
                  value={newsAuthority}
                  onChange={e => setNewsAuthority(e.target.value)}
                  className="w-full bg-paper-50 border border-paper-300 rounded-lg px-2.5 py-1.5 text-paper-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
                />
              </div>

              <div>
                <label className="block text-paper-700 font-medium mb-1">
                  Short Actionable Summary
                </label>
                <textarea
                  rows={3}
                  value={newsSummary}
                  onChange={e => setNewsSummary(e.target.value)}
                  className="w-full bg-paper-50 border border-paper-300 rounded-lg px-2.5 py-1.5 text-paper-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer p-2 bg-paper-100 rounded-lg">
                <input
                  type="checkbox"
                  checked={newsIsMajor}
                  onChange={e => setNewsIsMajor(e.target.checked)}
                  className="rounded text-navy-600 focus:ring-navy-600"
                />
                <span className="text-paper-900 font-medium">
                  Broadcast as High-Impact Major Notification (triggers push/email)
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-2 bg-navy-600 hover:bg-navy-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 text-xs shadow-xs"
              >
                <Newspaper className="w-3.5 h-3.5" />
                <span>Publish Bulletin & Dispatch Alert</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-paper-200 bg-paper-50 flex items-center justify-between text-xs text-paper-500">
          <span>Followed items active: {bookmarks.length}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-paper-200 hover:bg-paper-300 text-paper-800 rounded-md font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

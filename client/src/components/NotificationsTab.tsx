import React, { useState, useMemo } from 'react';
import {
  AppNotification,
  NotificationCategory,
  NewsAnnouncement
} from '../types/notifications';
import {
  Bell,
  Building2,
  Calendar,
  Award,
  Newspaper,
  ExternalLink,
  Mail,
  Smartphone,
  Trash2,
  Settings,
  Send,
  Eye,
  CheckCheck,
  ShieldCheck,
  X,
  Filter
} from 'lucide-react';
import { LatestNewsDropdown } from './LatestNewsDropdown';
import { getPublishedNews } from '../utils/notificationEngine';

interface NotificationsTabProps {
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onDeleteNotification: (id: string) => void;
  onOpenSettings: () => void;
  onOpenPublisher: () => void;
  onPreviewEmail: (notification: AppNotification) => void;
  onNavigateTab: (tab: string, param?: string) => void;
}

export const NotificationsTab: React.FC<NotificationsTabProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onDeleteNotification,
  onOpenSettings,
  onOpenPublisher,
  onPreviewEmail,
  onNavigateTab
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsAnnouncement | null>(null);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (unreadOnly && n.read) return false;
      if (activeCategory !== 'all' && n.category !== activeCategory) return false;
      return true;
    });
  }, [notifications, activeCategory, unreadOnly]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleActionClick = (notif: AppNotification) => {
    onMarkAsRead(notif.id);
    if (!notif.action) return;

    if (notif.action.type === 'external_url') {
      window.open(notif.action.target, '_blank', 'noopener,noreferrer');
    } else {
      onNavigateTab(notif.action.target, notif.action.params?.universityId || notif.action.params?.scholarshipId);
    }
  };

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'merit_list':
        return <Building2 className="w-4 h-4 text-navy-600" />;
      case 'deadline':
        return <Calendar className="w-4 h-4 text-gold-800" />;
      case 'scholarship':
        return <Award className="w-4 h-4 text-gold-600" />;
      case 'general_news':
      default:
        return <Newspaper className="w-4 h-4 text-paper-700" />;
    }
  };

  const getCategoryLabel = (category: NotificationCategory) => {
    switch (category) {
      case 'merit_list':
        return 'Merit List Release';
      case 'deadline':
        return 'Confirmed Deadline Alert';
      case 'scholarship':
        return 'Scholarship Update';
      case 'general_news':
      default:
        return 'Official News Bulletin';
    }
  };

  const formatTimestamp = (ts?: string) => {
    if (!ts) return '';
    try {
      const d = new Date(ts);
      if (isNaN(d.getTime())) return '';
      return `${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · ${d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } catch {
      return '';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Header section */}
      <div className="border-b border-paper-200 pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-navy-700 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Institutional Channels</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-paper-900 mt-1">
              Official Admissions Notification Feed
            </h1>
            <p className="text-sm text-paper-600 mt-1 max-w-2xl">
              Track closing merit aggregates, confirmed application deadlines, scholarship announcements, and official government advisories.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenSettings}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-paper-700 bg-paper-50 border border-paper-200 rounded-lg hover:bg-paper-50 transition-colors shadow-2xs"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Preferences</span>
            </button>
            <button
              onClick={onOpenPublisher}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-navy-600 hover:bg-navy-700 rounded-lg transition-colors shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Event Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Categories, Simple Drop Menu for Latest News, and Quick Actions */}
      <div className="bg-paper-50 border border-paper-200 rounded-xl p-3 sm:p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Categories + Drop Menu */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-paper-100 p-0.5 rounded-lg">
            {[
              { id: 'all', label: 'All Updates' },
              { id: 'merit_list', label: 'Merit Lists' },
              { id: 'deadline', label: 'Deadlines' },
              { id: 'scholarship', label: 'Scholarships' },
              { id: 'general_news', label: 'Official News' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedNews(null);
                }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-navy-600 text-white font-semibold shadow-2xs'
                    : 'text-paper-600 hover:text-paper-900 hover:bg-paper-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="h-5 w-px bg-paper-200 hidden sm:block" />

          {/* Simple Drop Menu that shows latest news */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-paper-500 hidden lg:inline">
              Quick Menu:
            </span>
            <LatestNewsDropdown
              buttonLabel="Latest News"
              onSelectNews={(news) => {
                setSelectedNews(news);
                setActiveCategory('general_news');
              }}
            />
          </div>
        </div>

        {/* Right side: Unread filter & Mark all read */}
        <div className="flex items-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-paper-100 text-xs">
          <label className="flex items-center gap-1.5 text-paper-600 cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={e => setUnreadOnly(e.target.checked)}
              className="rounded text-navy-600 focus:ring-navy-600"
            />
            <span>Unread only</span>
          </label>

          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-paper-600 hover:text-navy-900 inline-flex items-center gap-1 font-medium transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5 text-navy-600" />
              <span>Mark all read</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-paper-400 hover:text-rose-700 transition-colors text-[11px]"
            >
              Clear feed
            </button>
          )}
        </div>
      </div>

      {/* Selected Latest News Spotlight Card (if picked from drop menu) */}
      {selectedNews && (
        <div className="bg-navy-50/70 border border-navy-200 rounded-xl p-4 sm:p-5 relative shadow-xs animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => setSelectedNews(null)}
            className="absolute top-3.5 right-3.5 p-1 text-paper-400 hover:text-paper-700 rounded-md hover:bg-navy-100/60 transition-colors"
            title="Dismiss selection"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-navy-600 text-white font-semibold px-2 py-0.5 rounded text-[11px]">
              {selectedNews.sourceAuthority}
            </span>
            <span className="text-paper-500 font-medium">
              Published on {selectedNews.datePublished}
            </span>
            {selectedNews.isMajorNotification && (
              <span className="bg-gold-50 text-gold-900 border border-gold-200 px-2 py-0.5 rounded text-[11px] font-bold">
                High Priority Advisory
              </span>
            )}
            {selectedNews.relatedField && (
              <span className="bg-paper-50 border border-paper-200 text-paper-600 px-2 py-0.5 rounded text-[11px]">
                Field: {selectedNews.relatedField}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-serif font-bold text-paper-900 mt-2">
            {selectedNews.title}
          </h3>

          <p className="text-sm text-paper-700 mt-1.5 leading-relaxed">
            {selectedNews.summary}
          </p>

          <div className="mt-3 pt-2.5 border-t border-navy-200/80 flex items-center justify-between gap-2 text-xs">
            <span className="text-paper-500">
              Selected via Latest News drop menu
            </span>
            {selectedNews.externalUrl && (
              <a
                href={selectedNews.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold-300 hover:bg-gold-200 text-paper-950 font-bold border border-gold-400/40 rounded-lg text-xs transition-colors shadow-2xs"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-navy-900" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* When on the 'general_news' category tab, show secondary native drop menu selector */}
      {activeCategory === 'general_news' && !selectedNews && (
        <div className="bg-paper-50 border border-paper-200 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-navy-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-paper-900">
                Browse Official News Announcements
              </div>
              <p className="text-[11px] text-paper-500">
                Select an institutional announcement from the dropdown menu to inspect full details
              </p>
            </div>
          </div>
          <LatestNewsDropdown
            variant="select"
            buttonLabel="Select news bulletin"
            onSelectNews={(news) => setSelectedNews(news)}
          />
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-3.5">
        {filteredNotifications.length === 0 ? (
          <div className="bg-paper-50 border border-paper-200 rounded-2xl p-10 text-center space-y-3 shadow-2xs">
            <Bell className="w-10 h-10 text-paper-300 mx-auto" />
            <h3 className="text-sm font-semibold text-paper-700">No notifications in this view</h3>
            <p className="text-xs text-paper-500 max-w-md mx-auto leading-relaxed">
              Official notifications are generated automatically as admission merit lists release, when verified deadlines approach, or when major news bulletins are issued.
            </p>
            <div className="pt-2 flex justify-center gap-2">
              <button
                onClick={onOpenPublisher}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-paper-100 hover:bg-paper-200 text-paper-800 rounded-lg text-xs font-medium transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-navy-600" />
                <span>Simulate Admission Events</span>
              </button>
            </div>
          </div>
        ) : (
          filteredNotifications.map(notif => (
            <div
              key={notif.id}
              className={`border rounded-xl p-4 sm:p-5 transition-all relative space-y-2.5 ${
                notif.read
                  ? 'bg-paper-50 border-paper-200 hover:border-paper-300 shadow-2xs'
                  : 'bg-navy-50/50 border-navy-200 shadow-xs'
              }`}
            >
              {/* Notification Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="flex items-center gap-1.5 font-semibold text-paper-900">
                    {getCategoryIcon(notif.category)}
                    <span>{getCategoryLabel(notif.category)}</span>
                  </span>

                  <span aria-hidden="true" className="text-paper-300">
                    ·
                  </span>

                  {notif.timestamp && (
                    <span className="text-[11px] text-paper-500">
                      {formatTimestamp(notif.timestamp)}
                    </span>
                  )}

                  {/* Dispatched channels */}
                  <div className="flex items-center gap-1 text-[10px] text-paper-400 pl-1">
                    {(notif.channelsDispatched || []).includes('email') && (
                      <span title="Delivered via Email Digest">
                        <Mail className="w-3 h-3 text-paper-500" />
                      </span>
                    )}
                    {(notif.channelsDispatched || []).includes('push') && (
                      <span title="Delivered via Browser Push">
                        <Smartphone className="w-3 h-3 text-paper-500" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Dismiss button */}
                <button
                  onClick={() => onDeleteNotification(notif.id)}
                  className="text-paper-400 hover:text-rose-700 p-1 transition-colors"
                  title="Dismiss notification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Body */}
              <div className="space-y-1">
                <h4
                  className={`text-sm sm:text-base font-semibold ${
                    notif.read ? 'text-paper-900' : 'text-navy-950 font-bold'
                  }`}
                >
                  {notif.title}
                </h4>
                <p className="text-xs sm:text-sm text-paper-600 leading-relaxed">
                  {notif.message}
                </p>
              </div>

              {/* Footer actions */}
              <div className="pt-2.5 border-t border-paper-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  {notif.action && (
                    <button
                      onClick={() => handleActionClick(notif)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold-300 hover:bg-gold-200 text-paper-950 font-bold rounded-md border border-gold-400/40 transition-colors text-xs shadow-2xs"
                    >
                      <span>{notif.action.label}</span>
                      {notif.action.type === 'external_url' ? (
                        <ExternalLink className="w-3 h-3 text-navy-900" />
                      ) : null}
                    </button>
                  )}

                  {(notif.channelsDispatched || []).includes('email') && (
                    <button
                      onClick={() => onPreviewEmail(notif)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-paper-100 hover:bg-paper-200 text-paper-700 rounded-md font-medium transition-colors text-xs"
                      title="Preview student email version"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Email Preview</span>
                    </button>
                  )}
                </div>

                {!notif.read && (
                  <button
                    onClick={() => onMarkAsRead(notif.id)}
                    className="text-[11px] text-paper-500 hover:text-navy-900 transition-colors font-medium"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

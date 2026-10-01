import React, { useState, useMemo } from 'react';
import {
  AppNotification,
  NotificationCategory,
  NewsAnnouncement
} from '../types/notifications';
import {
  X,
  Bell,
  CheckCircle,
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
  CheckCheck
} from 'lucide-react';
import { LatestNewsDropdown } from './LatestNewsDropdown';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
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

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredNotifications = useMemo(() => {
    if (!Array.isArray(notifications)) return [];
    return notifications.filter(n => {
      if (!n || typeof n !== 'object') return false;
      if (unreadOnly && n.read) return false;
      if (activeCategory !== 'all' && n.category !== activeCategory) return false;
      return true;
    });
  }, [notifications, activeCategory, unreadOnly]);

  const unreadCount = Array.isArray(notifications)
    ? notifications.filter(n => n && !n.read).length
    : 0;

  if (!isOpen) return null;

  const handleActionClick = (notif: AppNotification) => {
    onMarkAsRead(notif.id);
    if (!notif.action) return;

    if (notif.action.type === 'external_url') {
      window.open(notif.action.target, '_blank', 'noopener,noreferrer');
    } else {
      onClose();
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
      return `${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · ${d.toLocaleDateString([], { month: 'short', day: 'numeric' })}`;
    } catch {
      return '';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-paper-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-100"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-paper-50 rounded-2xl border border-paper-200 shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-paper-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Bell className="w-5 h-5 text-navy-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gold-300 rounded-full" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-serif font-semibold text-paper-900">
                Admissions Notification Inbox
              </h2>
              <p className="text-xs text-paper-500">
                {unreadCount > 0
                  ? `${unreadCount} unread official update${unreadCount > 1 ? 's' : ''}`
                  : 'All caught up · Verified official announcements only'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="p-2 text-paper-500 hover:text-paper-900 hover:bg-paper-100 rounded-lg transition-colors"
              title="Notification Settings & Preferences"
              aria-label="Notification Preferences"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-paper-400 hover:text-paper-700 rounded-lg hover:bg-paper-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="px-6 py-2.5 bg-paper-50 border-b border-paper-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Categories & Drop Menu */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {[
                { id: 'all', label: 'All' },
                { id: 'merit_list', label: 'Merit Lists' },
                { id: 'deadline', label: 'Deadlines' },
                { id: 'scholarship', label: 'Scholarships' },
                { id: 'general_news', label: 'News' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedNews(null);
                  }}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-navy-600 text-white font-semibold shadow-xs'
                      : 'text-paper-600 hover:bg-paper-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-paper-300 hidden sm:block" />

            {/* Simple Drop Menu that shows latest news */}
            <LatestNewsDropdown
              buttonLabel="Latest News"
              onSelectNews={(news) => {
                setSelectedNews(news);
                setActiveCategory('general_news');
              }}
            />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1 text-[11px] text-paper-600 cursor-pointer">
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
                className="text-paper-500 hover:text-paper-900 inline-flex items-center gap-1 text-[11px] font-medium"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>
        </div>

        {/* Notification List & News Spotlight */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3.5">
          {/* Selected Latest News Spotlight Card */}
          {selectedNews && (
            <div className="bg-navy-50/70 border border-navy-200 rounded-xl p-3.5 sm:p-4 relative shadow-2xs animate-in fade-in duration-100 mb-2">
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-2.5 right-2.5 p-1 text-paper-400 hover:text-paper-700 rounded-md hover:bg-navy-100/60 transition-colors"
                title="Dismiss preview"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="bg-navy-600 text-white font-semibold px-2 py-0.5 rounded text-[10px]">
                  {selectedNews.sourceAuthority}
                </span>
                <span className="text-[11px] text-paper-500 font-medium">
                  {selectedNews.datePublished}
                </span>
                {selectedNews.isMajorNotification && (
                  <span className="bg-gold-50 text-gold-900 border border-gold-200 px-1.5 py-0.2 rounded text-[10px] font-bold">
                    Official Advisory
                  </span>
                )}
              </div>

              <h4 className="text-xs sm:text-sm font-serif font-bold text-paper-900 mt-1.5">
                {selectedNews.title}
              </h4>

              <p className="text-xs text-paper-600 mt-1 leading-relaxed">
                {selectedNews.summary}
              </p>

              <div className="mt-2.5 pt-2 border-t border-navy-200/70 flex items-center justify-between gap-2 text-xs">
                <span className="text-[11px] text-paper-500">
                  From Latest News Menu
                </span>
                {selectedNews.externalUrl && (
                  <a
                    href={selectedNews.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold-300 hover:bg-gold-200 text-paper-950 font-bold border border-gold-400/40 rounded text-xs shadow-xs"
                  >
                    <span>Read on Official Portal</span>
                    <ExternalLink className="w-3 h-3 text-navy-900" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Quick select dropdown when on News category tab */}
          {activeCategory === 'general_news' && !selectedNews && (
            <div className="bg-paper-50 border border-paper-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <Newspaper className="w-4 h-4 text-navy-600 shrink-0" />
                <span className="font-semibold text-paper-800">
                  Select Latest News:
                </span>
              </div>
              <LatestNewsDropdown
                variant="select"
                buttonLabel="Choose Announcement"
                onSelectNews={(news) => setSelectedNews(news)}
              />
            </div>
          )}
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Bell className="w-10 h-10 text-paper-300 mx-auto" />
              <div className="text-sm font-medium text-paper-700">No notifications in this view</div>
              <p className="text-xs text-paper-500 max-w-sm mx-auto">
                Notifications are generated automatically when a tracked university publishes a merit
                list, when confirmed deadlines approach, or when major news breaks.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenPublisher();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper-100 hover:bg-paper-200 text-paper-800 rounded-lg text-xs font-medium transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-navy-600" />
                  <span>Open Event Trigger Console</span>
                </button>
              </div>
            </div>
          ) : (
            filteredNotifications.map(notif => (
              <div
                key={notif.id}
                className={`border rounded-xl p-4 transition-all relative space-y-2.5 ${
                  notif.read
                    ? 'bg-paper-50 border-paper-200 hover:border-paper-300'
                    : 'bg-navy-50/50 border-navy-200 shadow-xs'
                }`}
              >
                {/* Notification Top bar */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-paper-900">
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

                    {/* Dispatched channel indicators */}
                    <div className="flex items-center gap-1 text-[10px] text-paper-400 pl-1">
                      {(notif.channelsDispatched || []).includes('email') && (
                        <span title="Dispatched via Email">
                          <Mail className="w-3 h-3 text-paper-500" />
                        </span>
                      )}
                      {(notif.channelsDispatched || []).includes('push') && (
                        <span title="Dispatched via Push">
                          <Bell className="w-3 h-3 text-paper-500" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dismiss / Delete button */}
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
                    className={`text-sm font-semibold ${
                      notif.read ? 'text-paper-900' : 'text-navy-950 font-bold'
                    }`}
                  >
                    {notif.title}
                  </h4>
                  <p className="text-xs text-paper-600 leading-relaxed">{notif.message}</p>
                </div>

                {/* Footer Actions */}
                <div className="pt-2 border-t border-paper-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    {notif.action && (
                      <button
                        onClick={() => handleActionClick(notif)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold-300 hover:bg-gold-200 text-paper-950 font-bold border border-gold-400/40 rounded-md transition-colors text-xs shadow-xs"
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
                        title="Preview email version"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Email View</span>
                      </button>
                    )}
                  </div>

                  {!notif.read && (
                    <button
                      onClick={() => onMarkAsRead(notif.id)}
                      className="text-[11px] text-paper-500 hover:text-navy-900 font-medium transition-colors"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 border-t border-paper-200 bg-paper-50 flex items-center justify-between text-xs text-paper-500">
          <button
            onClick={() => {
              onClose();
              onOpenPublisher();
            }}
            className="text-navy-600 hover:text-navy-900 font-semibold inline-flex items-center gap-1"
          >
            <Send className="w-3 h-3" />
            <span>Simulate / Publish Administrative Events</span>
          </button>

          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-paper-400 hover:text-rose-700 transition-colors text-[11px]"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

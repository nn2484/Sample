import React, { useState, useEffect } from 'react';
import {
  NotificationPreferences
} from '../types/notifications';
import { Bookmark } from '../types';
import {
  getNotificationPreferences,
  saveNotificationPreferences,
  requestPushPermission
} from '../utils/notificationEngine';
import {
  X,
  Mail,
  Bell,
  ShieldCheck,
  BookmarkCheck,
  Check,
  Trash2,
  AlertTriangle,
  Send,
  ExternalLink
} from 'lucide-react';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onRemoveBookmark: (itemId: string, itemType: string) => void;
  onOpenPublisher: () => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onOpenPublisher
}) => {
  const [prefs, setPrefs] = useState<NotificationPreferences>(() => getNotificationPreferences());
  const [emailInput, setEmailInput] = useState(prefs.emailAddress);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [pushStatus, setPushStatus] = useState<string>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPushStatus(Notification.permission);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (updated: NotificationPreferences) => {
    setPrefs(updated);
    saveNotificationPreferences(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleEmailBlur = () => {
    if (emailInput.trim() !== prefs.emailAddress) {
      handleSave({ ...prefs, emailAddress: emailInput.trim() });
    }
  };

  const handleTogglePush = async () => {
    if (!prefs.pushEnabled) {
      const granted = await requestPushPermission();
      if (granted) {
        setPushStatus('granted');
        handleSave({ ...prefs, pushEnabled: true });
      } else {
        setPushStatus('denied');
        handleSave({ ...prefs, pushEnabled: false });
      }
    } else {
      handleSave({ ...prefs, pushEnabled: false });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-paper-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-paper-50 rounded-2xl border border-paper-200 shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-paper-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-serif font-semibold text-paper-900">
              Notification Preferences
            </h2>
            <p className="text-xs text-paper-500">
              Control which updates you receive and on which channels. Zero spam guarantee.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-paper-400 hover:text-paper-700 rounded-lg hover:bg-paper-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-paper-700">
          {/* Calming Accuracy & Anti-Spam Pledge */}
          <div className="bg-navy-50/70 border border-navy-200 rounded-xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-navy-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-navy-950 block text-xs">
                Our Calm Admissions Pledge
              </span>
              <p className="text-navy-900 leading-relaxed text-[11px]">
                Every notification originates from a verified, official administrative notice.
                <strong> Deadline reminders are strictly restricted to confirmed dates</strong> — we
                never send automated alerts for estimated or guessed dates to ensure you never rely on
                faulty timing.
              </p>
            </div>
          </div>

          {/* Delivery Channels */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-paper-900 uppercase tracking-wider">
              1. Delivery Channels
            </h3>

            {/* Email Channel */}
            <div className="bg-paper-50 border border-paper-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-paper-600" />
                  <div>
                    <span className="font-semibold text-paper-900 block text-xs">
                      Email Notifications
                    </span>
                    <span className="text-paper-500 text-[11px]">
                      Receive merit list releases and 7-day/1-day deadline alerts in your inbox
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.emailEnabled}
                    onChange={e => handleSave({ ...prefs, emailEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-paper-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-paper-50 after:border-paper-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-navy-600"></div>
                </label>
              </div>

              {prefs.emailEnabled && (
                <div className="pt-2 border-t border-paper-200/70 space-y-1.5">
                  <label className="block text-[11px] font-medium text-paper-600">
                    Your Email Address for Alerts
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={e => setEmailInput(e.target.value)}
                      onBlur={handleEmailBlur}
                      placeholder="student@example.pk"
                      className="flex-1 bg-paper-50 border border-paper-300 rounded-lg px-3 py-1.5 text-xs text-paper-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
                    />
                    <button
                      onClick={handleEmailBlur}
                      className="px-3 py-1.5 bg-paper-100 hover:bg-paper-200 text-paper-700 rounded-lg text-xs font-medium transition-colors"
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Browser Push Channel */}
            <div className="bg-paper-50 border border-paper-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-navy-600" />
                <div>
                  <span className="font-semibold text-paper-900 block text-xs">
                    Browser Push Notifications
                  </span>
                  <span className="text-paper-500 text-[11px]">
                    Immediate alerts in your browser when a merit list for your tracked program drops
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTogglePush}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    prefs.pushEnabled
                      ? 'bg-navy-600 text-white shadow-xs'
                      : 'bg-paper-200 hover:bg-paper-300 text-paper-800'
                  }`}
                >
                  {prefs.pushEnabled ? 'Enabled' : 'Enable Push'}
                </button>
              </div>
            </div>
          </div>

          {/* Subscribed Content Toggles */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-paper-900 uppercase tracking-wider">
              2. Notification Subscriptions
            </h3>

            <div className="bg-paper-50 border border-paper-200 rounded-xl divide-y divide-paper-200">
              {/* Merit Lists */}
              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <span className="font-medium text-paper-900 block">Merit List Releases</span>
                  <span className="text-[11px] text-paper-500">
                    Notifies when 1st, 2nd, or 3rd selection lists are published for your tracked universities
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.meritListsEnabled}
                  onChange={e => handleSave({ ...prefs, meritListsEnabled: e.target.checked })}
                  className="rounded text-navy-600 focus:ring-navy-600"
                />
              </div>

              {/* Deadline reminders */}
              <div className="p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-paper-900 block">
                      Confirmed Deadline Reminders
                    </span>
                    <span className="text-[11px] text-paper-500">
                      Automated alerts prior to closing dates (only for verified official dates)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-1 pl-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prefs.deadlineAlertWindows.sevenDays}
                      onChange={e =>
                        handleSave({
                          ...prefs,
                          deadlineAlertWindows: {
                            ...prefs.deadlineAlertWindows,
                            sevenDays: e.target.checked
                          }
                        })
                      }
                      className="rounded text-navy-600 focus:ring-navy-600"
                    />
                    <span className="text-[11px] text-paper-700">7 Days Before</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prefs.deadlineAlertWindows.oneDay}
                      onChange={e =>
                        handleSave({
                          ...prefs,
                          deadlineAlertWindows: {
                            ...prefs.deadlineAlertWindows,
                            oneDay: e.target.checked
                          }
                        })
                      }
                      className="rounded text-navy-600 focus:ring-navy-600"
                    />
                    <span className="text-[11px] text-paper-700">1 Day Before (Final Warning)</span>
                  </label>
                </div>
              </div>

              {/* General News Subscription */}
              <div className="p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-paper-900 block">
                      General Academic News & Policy Bulletins
                    </span>
                    <span className="text-[11px] text-paper-500">
                      Major national updates (e.g., PMDC MDCAT schedule, HEC scholarship openings)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={prefs.generalNewsEnabled}
                    onChange={e => handleSave({ ...prefs, generalNewsEnabled: e.target.checked })}
                    className="rounded text-navy-600 focus:ring-navy-600"
                  />
                </div>

                {prefs.generalNewsEnabled && (
                  <div className="pl-2 pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={prefs.generalNewsMajorOnly}
                        onChange={e =>
                          handleSave({ ...prefs, generalNewsMajorOnly: e.target.checked })
                        }
                        className="rounded text-navy-600 focus:ring-navy-600"
                      />
                      <span className="text-[11px] text-paper-600">
                        Major high-impact announcements only (prevents minor updates)
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Followed Items List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-paper-900 uppercase tracking-wider">
                3. Your Followed Items ({bookmarks.length})
              </h3>
              <span className="text-[11px] text-paper-400">
                You automatically receive updates for these
              </span>
            </div>

            {bookmarks.length === 0 ? (
              <div className="p-4 bg-paper-50 rounded-xl border border-paper-200 text-paper-500 text-center space-y-1">
                <p>No universities or scholarships bookmarked yet.</p>
                <p className="text-[11px] text-paper-400">
                  Bookmark any institution from the Directory or Scholarship list to follow it automatically.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {bookmarks.map(b => (
                  <div
                    key={`${b.itemType}-${b.itemId}`}
                    className="p-2.5 bg-paper-50 border border-paper-200 rounded-lg flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-medium text-paper-900 block">{b.title}</span>
                      <span className="text-[11px] text-paper-500">
                        {b.subtitle} · Type: {b.itemType}
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveBookmark(b.itemId, b.itemType)}
                      className="p-1 text-paper-400 hover:text-rose-700 transition-colors"
                      title="Unfollow item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-paper-200 bg-paper-50 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              onClose();
              onOpenPublisher();
            }}
            className="text-navy-600 hover:text-navy-800 underline font-semibold"
          >
            Admin Event Dispatch Console & Tester
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-navy-600 text-white rounded-md font-semibold hover:bg-navy-700 transition-colors shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

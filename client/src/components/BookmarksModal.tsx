import React, { useState } from 'react';
import { Bookmark } from '../types';
import {
  X,
  Trash2,
  ExternalLink,
  Calendar,
  Bell,
  Check,
  BookmarkCheck,
  Building2,
  Award
} from 'lucide-react';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onRemoveBookmark: (id: string, type: string) => void;
  onNavigateToCalculator: (uniId: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onNavigateToCalculator
}) => {
  const [remindersEnabled, setRemindersEnabled] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleReminder = (itemId: string) => {
    setRemindersEnabled(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-paper-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-100"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-paper-50 rounded-2xl border border-paper-200 shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-paper-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-gold-400 fill-gold-300/20" />
            <h2 className="text-lg font-serif font-semibold text-paper-900">
              Saved Institutions & Deadlines ({bookmarks.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-paper-400 hover:text-paper-700 rounded-lg hover:bg-paper-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <BookmarkCheck className="w-10 h-10 text-paper-300 mx-auto" />
              <div className="text-sm font-medium text-paper-700">No saved items yet</div>
              <p className="text-xs text-paper-500 max-w-sm mx-auto">
                Bookmark universities, programs, and scholarships to compile your personal
                admissions tracking list with automated reminders.
              </p>
            </div>
          ) : (
            bookmarks.map(b => {
              const isRemindActive = remindersEnabled[b.itemId];
              return (
                <div
                  key={`${b.itemType}-${b.itemId}`}
                  className="bg-paper-50 border border-paper-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-paper-500">
                      <span className="capitalize font-semibold text-paper-800">
                        {b.itemType === 'university'
                          ? 'University'
                          : b.itemType === 'scholarship'
                          ? 'Scholarship'
                          : 'Program'}
                      </span>
                      {b.deadlineDate && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-paper-700">
                            Due: {b.deadlineDate}
                          </span>
                        </>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-paper-900">{b.title}</h4>
                    <p className="text-paper-500">{b.subtitle}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-paper-200">
                    {/* Reminder toggle */}
                    <button
                      onClick={() => toggleReminder(b.itemId)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md font-semibold transition-colors ${
                        isRemindActive
                          ? 'bg-gold-300 text-paper-950 border border-gold-400/40 shadow-xs'
                          : 'bg-paper-200 hover:bg-paper-300 text-paper-700'
                      }`}
                      title="Set reminder notification"
                    >
                      {isRemindActive ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-paper-950" />
                          <span>Reminding</span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-3.5 h-3.5 text-navy-600" />
                          <span>Set Alert</span>
                        </>
                      )}
                    </button>

                    {/* External Link */}
                    {b.linkTarget && (
                      <a
                        href={b.linkTarget}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-paper-500 hover:text-paper-800 rounded-md hover:bg-paper-200 transition-colors"
                        title="Open official website"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    {/* Delete */}
                    <button
                      onClick={() => onRemoveBookmark(b.itemId, b.itemType)}
                      className="p-1.5 text-paper-400 hover:text-rose-700 rounded-md hover:bg-rose-50 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-paper-200 bg-paper-50 flex items-center justify-between text-xs text-paper-500">
          <span>Saved locally on your browser</span>
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

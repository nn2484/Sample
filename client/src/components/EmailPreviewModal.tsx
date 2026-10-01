import React from 'react';
import { AppNotification } from '../types/notifications';
import { X, Mail, ExternalLink } from 'lucide-react';

interface EmailPreviewModalProps {
  notification: AppNotification | null;
  onClose: () => void;
  userEmail: string;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  notification,
  onClose,
  userEmail
}) => {
  if (!notification) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-paper-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-paper-50 rounded-2xl border border-paper-200 shadow-xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Email Client Header bar */}
        <div className="px-5 py-3.5 bg-paper-100 border-b border-paper-200 flex items-center justify-between text-xs text-paper-600">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-navy-600" />
            <span className="font-semibold text-paper-900">Simulated Email Delivery Preview</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-paper-400 hover:text-paper-700 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Envelope Metadata */}
        <div className="p-5 bg-paper-50 border-b border-paper-200 text-xs space-y-1">
          <div>
            <span className="text-paper-500 font-medium">From:</span>{' '}
            <span className="text-paper-900 font-medium">
              Merit Ledger Admissions Desk &lt;notifications@meritledger.pk&gt;
            </span>
          </div>
          <div>
            <span className="text-paper-500 font-medium">To:</span>{' '}
            <span className="text-paper-900 font-mono">{userEmail || 'student@example.pk'}</span>
          </div>
          <div>
            <span className="text-paper-500 font-medium">Subject:</span>{' '}
            <span className="font-semibold text-paper-900">{notification.title}</span>
          </div>
          <div>
            <span className="text-paper-500 font-medium">Date:</span>{' '}
            <span className="text-paper-700">
              {new Date(notification.timestamp).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Rendered Email Body in Authentic Calming Institutional Template */}
        <div className="p-6 overflow-y-auto flex-1 bg-paper-50 text-paper-800 space-y-5 text-sm">
          {/* Email Brand Letterhead */}
          <div className="pb-4 border-b border-paper-200 flex items-center justify-between">
            <span className="text-xl font-serif font-bold text-paper-900">
              Merit Ledger
            </span>
            <span className="text-[11px] uppercase tracking-wider text-navy-700 font-bold bg-navy-50 px-2 py-0.5 rounded border border-navy-200">
              Official Notification
            </span>
          </div>

          {/* Salutation & Message */}
          <div className="space-y-3">
            <p className="text-paper-700 text-xs font-medium">
              Dear Student,
            </p>
            <p className="text-paper-800 text-sm leading-relaxed font-serif">
              {notification.message}
            </p>
          </div>

          {/* Highlighting Card */}
          <div className="bg-paper-50 border border-paper-200 rounded-xl p-4 space-y-2 text-xs">
            <div className="font-semibold text-paper-900">Update Summary:</div>
            {notification.metadata?.meritRound && (
              <div className="text-paper-700">
                • <strong>Merit Selection Round:</strong> {notification.metadata.meritRound}th Selection List
              </div>
            )}
            {notification.metadata?.closingAggregate && (
              <div className="text-paper-700">
                • <strong>Closing Aggregate Cutoff:</strong>{' '}
                <span className="font-mono font-bold text-navy-700">
                  {notification.metadata.closingAggregate}%
                </span>
              </div>
            )}
            {notification.metadata?.daysRemaining && (
              <div className="text-paper-700">
                • <strong>Notice Window:</strong> {notification.metadata.daysRemaining} Days Until Confirmed Portal Lock
              </div>
            )}
            <div className="text-paper-500 text-[11px] pt-1">
              • Verified against official university / regulatory council publications.
            </div>
          </div>

          {/* Action Button */}
          {notification.action && (
            <div className="pt-2">
              <a
                href={notification.action.target}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gold-300 hover:bg-gold-200 text-paper-950 font-bold rounded-lg text-xs border border-gold-400/40 shadow-xs transition-colors"
              >
                <span>{notification.action.label}</span>
                <ExternalLink className="w-3.5 h-3.5 text-navy-900" />
              </a>
            </div>
          )}

          {/* Email Footer with Calm Trust Notice */}
          <div className="pt-6 border-t border-paper-200 text-[11px] text-paper-500 space-y-1.5 leading-relaxed">
            <p>
              You received this official advisory because you follow this institution on Merit Ledger.
              We adhere to strict zero-spam guidelines and only send notifications for confirmed
              dates and verified merit lists.
            </p>
            <p>
              To adjust your notifications or unfollow this program, update your preferences in the
              Merit Ledger notification center.
            </p>
          </div>
        </div>

        {/* Modal close bar */}
        <div className="px-5 py-3 bg-paper-50 border-t border-paper-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-navy-600 text-white rounded-md text-xs font-semibold hover:bg-navy-700 transition-colors shadow-xs"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { getAllUnifiedDeadlines, TimelineEvent, downloadIcsFile } from '../utils/deadlines';
import {
  Calendar,
  Clock,
  Download,
  Filter,
  Search,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Bell,
  Check
} from 'lucide-react';

interface DeadlineTrackerProps {
  onSelectUniversity: (uniId: string) => void;
  onSelectScholarship: (schId: string) => void;
}

export const DeadlineTracker: React.FC<DeadlineTrackerProps> = ({
  onSelectUniversity,
  onSelectScholarship
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [reminderSimulatedId, setReminderSimulatedId] = useState<string | null>(null);

  const allEvents = useMemo(() => getAllUnifiedDeadlines(), []);

  const filteredEvents = useMemo(() => {
    return allEvents.filter(ev => {
      // Category filter
      if (selectedCategory === 'tests' && ev.sourceType !== 'university_test') return false;
      if (selectedCategory === 'applications' && ev.sourceType !== 'university_app') return false;
      if (selectedCategory === 'scholarships' && ev.sourceType !== 'scholarship') return false;

      // Search filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = ev.title.toLowerCase().includes(q);
        const matchesOrg = ev.organizer.toLowerCase().includes(q);
        const matchesDetails = ev.details.toLowerCase().includes(q);
        if (!matchesTitle && !matchesOrg && !matchesDetails) return false;
      }

      return true;
    });
  }, [allEvents, selectedCategory, searchQuery]);

  const handleSimulateReminder = (eventId: string) => {
    setReminderSimulatedId(eventId);
    setTimeout(() => {
      setReminderSimulatedId(null);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-widest text-gold-600 font-bold">
          Comprehensive Admissions Calendar
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-medium text-paper-900 tracking-tight mt-1">
          Application & Entrance Test Deadline Tracker
        </h1>
        <p className="mt-2 text-base text-paper-600 max-w-3xl">
          Unified chronological timeline combining university admission windows, entrance
          examinations (NET, ECAT, MDCAT, NU), and government scholarship cycles.
        </p>
      </div>

      {/* Date Status Disclaimer Banner */}
      <div className="bg-paper-50 border border-paper-200 rounded-xl p-4 text-xs text-paper-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-navy-600 shrink-0" />
          <span>
            <strong className="text-paper-900 font-medium">Confirmed Dates</strong> are verified
            against published 2026 notifications.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-gold-700 shrink-0" />
          <span>
            <strong className="text-paper-900 font-medium">Estimated Dates</strong> reflect typical
            historical cycle timing.
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-paper-50 border border-paper-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-paper-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search deadlines by university, test, or scholarship..."
              className="w-full pl-10 pr-4 py-2.5 bg-paper-50 border border-paper-300 rounded-lg text-sm text-paper-900 focus:outline-none focus:ring-2 focus:ring-navy-600/40 focus:border-navy-600"
            />
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-1 p-1 bg-paper-100 rounded-lg shrink-0">
            {[
              { id: 'all', label: 'All Dates' },
              { id: 'tests', label: 'Entry Tests' },
              { id: 'applications', label: 'Application Windows' },
              { id: 'scholarships', label: 'Scholarships' }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === c.id
                    ? 'bg-navy-600 text-white shadow-xs font-semibold'
                    : 'text-paper-600 hover:text-navy-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-paper-500 pt-1">
          <span>
            Showing <span className="font-semibold text-paper-800">{filteredEvents.length}</span>{' '}
            chronological milestones
          </span>
          <span className="italic">Click ".ics" on any milestone to add to your phone calendar</span>
        </div>
      </div>

      {/* Chronological Deadlines Timeline */}
      <div className="space-y-3.5">
        {filteredEvents.map(event => {
          const isConfirmed = event.status === 'confirmed';
          const isReminded = reminderSimulatedId === event.id;

          return (
            <div
              key={event.id}
              className="bg-paper-50 border border-paper-200 rounded-xl p-4 sm:p-5 shadow-xs hover:border-navy-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                {/* Status and Category */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-paper-700">{event.category}</span>
                  <span aria-hidden="true" className="text-paper-300">
                    ·
                  </span>
                  <span
                    className={`font-semibold ${
                      isConfirmed ? 'text-navy-600' : 'text-paper-500'
                    }`}
                  >
                    {isConfirmed ? 'Confirmed Date' : 'Estimated Annual Timing'}
                  </span>
                  <span aria-hidden="true" className="text-paper-300">
                    ·
                  </span>
                  <span className="text-paper-500">{event.organizer}</span>
                </div>

                {/* Event Title */}
                <h3 className="text-base sm:text-lg font-serif font-semibold text-paper-900">
                  {event.title}
                </h3>

                {/* Details snippet */}
                <p className="text-xs text-paper-600 line-clamp-1">{event.details}</p>
              </div>

              {/* Timing Display & Actions */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-paper-100">
                <div className="text-left md:text-right">
                  <div className="font-mono text-xs sm:text-sm font-semibold text-paper-900">
                    {event.dateStr}
                  </div>
                  <div className="text-[11px] text-paper-400">2026 Cycle</div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Download ICS calendar event */}
                  <button
                    onClick={() => downloadIcsFile(event)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-paper-100 hover:bg-paper-200 text-paper-700 rounded-md text-xs font-medium transition-colors"
                    title="Export to Apple / Google / Outlook Calendar (.ics)"
                  >
                    <Download className="w-3.5 h-3.5 text-navy-600" />
                    <span>.ics</span>
                  </button>

                  {/* Reminder trigger */}
                  <button
                    onClick={() => handleSimulateReminder(event.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-paper-100 hover:bg-paper-200 text-paper-700 rounded-md text-xs font-medium transition-colors"
                    title="Schedule personal reminder (7 days & 1 day before)"
                  >
                    {isReminded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-gold-600 font-bold" />
                        <span className="text-gold-700 font-bold">Reminder set</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5 text-navy-600" />
                        <span>Remind</span>
                      </>
                    )}
                  </button>

                  {/* Source link */}
                  <a
                    href={event.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-paper-400 hover:text-paper-700 rounded-md hover:bg-paper-100 transition-colors"
                    title="Open official site"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

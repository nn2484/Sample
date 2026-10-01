import React, { useState, useRef, useEffect } from 'react';
import { Newspaper, ChevronDown, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { NewsAnnouncement } from '../types/notifications';
import { getPublishedNews } from '../utils/notificationEngine';

interface LatestNewsDropdownProps {
  onSelectNews?: (news: NewsAnnouncement) => void;
  className?: string;
  buttonLabel?: string;
  variant?: 'button' | 'select' | 'compact';
}

export const LatestNewsDropdown: React.FC<LatestNewsDropdownProps> = ({
  onSelectNews,
  className = '',
  buttonLabel = 'Latest News',
  variant = 'button'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newsList, setNewsList] = useState<NewsAnnouncement[]>(() => getPublishedNews());
  const [selectedNewsId, setSelectedNewsId] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh news list on mount
    setNewsList(getPublishedNews());
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (news: NewsAnnouncement) => {
    setSelectedNewsId(news.id);
    if (onSelectNews) {
      onSelectNews(news);
    }
    setIsOpen(false);
  };

  // If select variant requested (native simple select element)
  if (variant === 'select') {
    return (
      <div className={`relative inline-block ${className}`}>
        <label htmlFor="latest-news-select" className="sr-only">
          Select Latest News
        </label>
        <div className="relative flex items-center">
          <Newspaper className="w-3.5 h-3.5 text-paper-500 absolute left-2.5 pointer-events-none" />
          <select
            id="latest-news-select"
            value={selectedNewsId}
            onChange={(e) => {
              const item = newsList.find(n => n.id === e.target.value);
              if (item) {
                handleItemClick(item);
              }
            }}
            className="pl-8 pr-7 py-1.5 text-xs bg-paper-50 text-paper-800 border border-paper-200 rounded-lg shadow-2xs font-medium focus:ring-1 focus:ring-navy-600 focus:border-navy-600 cursor-pointer appearance-none"
          >
            <option value="">{buttonLabel} (Select announcement)...</option>
            {newsList.map(news => (
              <option key={news.id} value={news.id}>
                [{news.sourceAuthority}] {news.title}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-paper-400 absolute right-2 pointer-events-none" />
        </div>
      </div>
    );
  }

  // Interactive drop menu button with styled floating menu
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-navy-50/90 text-navy-900 border border-navy-200 hover:bg-navy-100 transition-colors shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-navy-600/30"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Newspaper className="w-3.5 h-3.5 text-navy-700 shrink-0" />
        <span>{buttonLabel}</span>
        <span className="bg-gold-300 text-paper-950 text-[10px] px-1.5 py-0.5 rounded-full font-bold tabular-nums">
          {newsList.length}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-navy-700 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-1.5 w-80 sm:w-96 rounded-xl shadow-xl bg-paper-50 border border-paper-200 ring-1 ring-black/5 z-50 divide-y divide-paper-100 overflow-hidden">
          {/* Header */}
          <div className="px-3.5 py-2.5 bg-paper-50 border-b border-paper-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-paper-900">
              <ShieldCheck className="w-4 h-4 text-navy-600" />
              <span>Latest Official Admissions News</span>
            </div>
            <span className="text-[10px] font-medium text-paper-600 bg-paper-200/70 px-2 py-0.5 rounded">
              Verified
            </span>
          </div>

          {/* News List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-paper-100">
            {newsList.length === 0 ? (
              <div className="p-4 text-center text-xs text-paper-500">
                No news announcements available at this time.
              </div>
            ) : (
              newsList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="p-3 hover:bg-navy-50/50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-navy-700">
                      <span className="bg-navy-100/80 px-1.5 py-0.5 rounded font-semibold">
                        {item.sourceAuthority}
                      </span>
                      {item.isMajorNotification && (
                        <span className="bg-gold-50 text-gold-900 border border-gold-200 px-1.5 py-0.5 rounded font-bold">
                          Major
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-paper-400 whitespace-nowrap flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {item.datePublished}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-paper-900 group-hover:text-navy-900 mt-1.5 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-paper-600 line-clamp-2 mt-1 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-paper-100 text-[10px]">
                    <span className="text-paper-500 font-medium">
                      {item.relatedField || 'Admissions'}
                    </span>
                    {item.externalUrl && (
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-navy-600 hover:text-navy-800 font-semibold inline-flex items-center gap-1 hover:underline"
                      >
                        Official Source
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="px-3.5 py-2 bg-paper-50 flex items-center justify-between text-[11px] text-paper-500">
            <span>Directives verified from PMDC, HEC & universities</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-navy-600 hover:text-navy-800 font-semibold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

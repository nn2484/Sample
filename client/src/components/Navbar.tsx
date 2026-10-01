import React from 'react';
import { Bookmark, Sparkles, Menu, X, Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookmarkCount: number;
  openBookmarks: () => void;
  unreadNotificationCount: number;
  openNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookmarkCount,
  openBookmarks,
  unreadNotificationCount,
  openNotifications
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { id: 'calculator', label: 'Calculator' },
    { id: 'directory', label: 'Universities' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'checklist', label: 'Checklist' },
    { id: 'roadmaps', label: 'Roadmaps' },
    { id: 'deadlines', label: 'Deadlines' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper-50/95 backdrop-blur-md border-b border-paper-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          {/* Zone 1: Wordmark with Blue accent & Yellow subline */}
          <button
            onClick={() => {
              setActiveTab('directory');
              setMobileMenuOpen(false);
            }}
            className="group flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 rounded-lg py-1 shrink-0"
            aria-label="Merit Ledger Home"
          >
            <span className="w-1.5 sm:w-2 h-5 sm:h-6 bg-navy-600 rounded-full inline-block group-hover:scale-y-110 transition-transform shadow-xs" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-serif font-bold tracking-tight text-paper-900 leading-none group-hover:text-navy-900 transition-colors">
                Merit Ledger
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-600 font-bold hidden xs:block sm:block leading-none mt-0.5">
                Pakistan Admissions
              </span>
            </div>
          </button>

          {/* Zone 2: Desktop clean text navigation links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-paper-600">
            {navLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-navy-900 font-bold'
                      : 'hover:text-navy-600 text-paper-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary actions & quick tools */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
            {/* Smart Match action (Yellow CTA with Blue icon) */}
            <button
              onClick={() => {
                setActiveTab('recommendations');
                setMobileMenuOpen(false);
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap shadow-xs ${
                activeTab === 'recommendations'
                  ? 'bg-gold-300 text-paper-950 ring-2 ring-gold-400/50 shadow-sm'
                  : 'bg-gold-300 hover:bg-gold-200 text-paper-950 border border-gold-400/30'
              }`}
              title="Personalized Program Matchmaker"
            >
              <Sparkles className="w-3.5 h-3.5 text-navy-900 fill-navy-900/20" />
              <span className="hidden sm:inline text-white dark:text-paper-950">Smart Match</span>
              <span className="sm:hidden">Match</span>
            </button>

            {/* Appearance toggle */}
            <button
              onClick={() => toggleTheme?.()}
              className="relative p-1.5 sm:p-2 text-paper-600 hover:text-navy-900 hover:bg-navy-50 rounded-lg transition-colors"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> : <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
            </button>

            {/* Notification Bell */}
            <button
              onClick={openNotifications}
              className="relative p-1.5 sm:p-2 text-paper-600 hover:text-navy-900 hover:bg-navy-50 rounded-lg transition-colors"
              title="Official Admissions Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 bg-navy-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Bookmarks */}
            <button
              onClick={openBookmarks}
              className="relative p-1.5 sm:p-2 text-paper-600 hover:text-navy-900 hover:bg-navy-50 rounded-lg transition-colors"
              title="Saved Items & Followed Institutions"
              aria-label="Saved items"
            >
              <Bookmark className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 bg-gold-300 text-paper-950 border border-gold-400/40 text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 text-paper-700 hover:text-navy-900 rounded-lg hover:bg-navy-50 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu-panel md:hidden border-t border-paper-200 bg-paper-50/98 backdrop-blur-md px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-paper-400 font-semibold px-3 block mb-1">
              Navigation
            </span>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === link.id
                    ? 'bg-navy-600 text-white font-semibold shadow-xs'
                    : 'text-paper-700 hover:bg-navy-50 hover:text-navy-900'
                }`}
              >
                <span>{link.label}</span>
                {activeTab === link.id && (
                  <span className="w-1.5 h-1.5 bg-gold-200 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-paper-200 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-paper-400 font-semibold px-3 block mb-1">
              Tools & Tracking
            </span>
            <button
              onClick={() => {
                setActiveTab('recommendations');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'recommendations'
                  ? 'bg-gold-300 text-paper-950 font-bold'
                  : 'text-paper-900 bg-gold-50 hover:bg-gold-50 border border-gold-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-navy-700" />
                Personalized Matchmaker
              </span>
              <span className="text-[10px] font-mono font-bold bg-gold-300 text-paper-950 px-1.5 py-0.5 rounded border border-gold-400/40">
                AI MATCH
              </span>
            </button>
            <button
              onClick={() => {
                openNotifications();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full text-left px-3 py-2 text-sm font-medium text-paper-700 hover:bg-navy-50 hover:text-navy-900 rounded-lg transition-colors"
            >
              <span className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-navy-600" />
                Notifications
              </span>
              {unreadNotificationCount > 0 ? (
                <span className="text-xs font-semibold bg-navy-600 text-white px-2 py-0.5 rounded-full">
                  {unreadNotificationCount} new
                </span>
              ) : (
                <span className="text-xs text-paper-400">All caught up</span>
              )}
            </button>
            <button
              onClick={() => {
                openBookmarks();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full text-left px-3 py-2 text-sm font-medium text-paper-700 hover:bg-navy-50 hover:text-navy-900 rounded-lg transition-colors"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-navy-600" />
                Saved Items
              </span>
              <span className="text-xs font-semibold bg-gold-50 text-gold-900 border border-gold-200 px-2 py-0.5 rounded-full">
                {bookmarkCount}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

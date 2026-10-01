import { UNIVERSITIES } from '../data/universities';
import { SCHOLARSHIPS } from '../data/scholarships';

export interface TimelineEvent {
  id: string;
  sourceType: 'university_app' | 'university_test' | 'scholarship';
  title: string;
  organizer: string;
  dateStr: string; // YYYY-MM-DD or display
  targetDate: Date;
  status: 'confirmed' | 'estimated';
  category: string;
  field?: string;
  actionUrl: string;
  referenceId: string;
  details: string;
}

// Helper to convert estimated cycle strings or YYYY-MM-DD to approximate Date objects for chronological ordering
function parseEventDate(rawDateStr: string, fallbackMonth: number, fallbackDay: number): Date {
  // If format is YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(rawDateStr)) {
    const d = new Date(rawDateStr);
    if (!isNaN(d.getTime())) return d;
  }
  const now = new Date();
  const year = now.getFullYear();
  return new Date(year, fallbackMonth - 1, fallbackDay);
}

export function getAllUnifiedDeadlines(): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  // Extract from Universities
  UNIVERSITIES.forEach(uni => {
    // Application Deadline Event
    const closeTiming = uni.typicalTiming.applicationCloses;
    const estMonth = closeTiming.toLowerCase().includes('july') ? 7 :
                     closeTiming.toLowerCase().includes('august') ? 8 :
                     closeTiming.toLowerCase().includes('june') ? 6 :
                     closeTiming.toLowerCase().includes('march') ? 3 :
                     closeTiming.toLowerCase().includes('october') ? 10 :
                     closeTiming.toLowerCase().includes('january') ? 1 : 7;
    
    events.push({
      id: `app-${uni.id}`,
      sourceType: 'university_app',
      title: `${uni.shortName} Admission Application Deadline`,
      organizer: uni.name,
      dateStr: uni.typicalTiming.applicationCloses,
      targetDate: new Date(2026, estMonth - 1, 15),
      status: uni.typicalTiming.status,
      category: 'Admission Window',
      field: uni.programs[0]?.field || 'Various',
      actionUrl: uni.officialWebsite,
      referenceId: uni.id,
      details: uni.typicalTiming.notes
    });

    // Test Date Event
    if (uni.typicalTiming.testDates && !uni.typicalTiming.testDates.toLowerCase().includes('no entry test')) {
      const testTiming = uni.typicalTiming.testDates;
      const testMonth = testTiming.toLowerCase().includes('july') ? 7 :
                        testTiming.toLowerCase().includes('august') ? 8 :
                        testTiming.toLowerCase().includes('march') ? 3 :
                        testTiming.toLowerCase().includes('december') ? 12 :
                        testTiming.toLowerCase().includes('february') ? 2 : 7;

      events.push({
        id: `test-${uni.id}`,
        sourceType: 'university_test',
        title: `${uni.shortName} Entrance / Aptitude Examination`,
        organizer: uni.name,
        dateStr: uni.typicalTiming.testDates,
        targetDate: new Date(2026, testMonth - 1, 20),
        status: uni.typicalTiming.status,
        category: 'Entry Test',
        field: uni.programs[0]?.field || 'Various',
        actionUrl: uni.officialWebsite,
        referenceId: uni.id,
        details: `Conducted at designated centers: ${uni.typicalTiming.testDates}`
      });
    }
  });

  // Extract from Scholarships
  SCHOLARSHIPS.forEach(sch => {
    const targetDate = parseEventDate(sch.deadline, 8, 1);
    events.push({
      id: `sch-${sch.id}`,
      sourceType: 'scholarship',
      title: sch.name,
      organizer: sch.provider,
      dateStr: sch.deadlineDisplay,
      targetDate: targetDate,
      status: sch.deadlineStatus,
      category: 'Scholarship Deadline',
      actionUrl: sch.officialUrl,
      referenceId: sch.id,
      details: sch.summary
    });
  });

  // Sort chronological
  return events.sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());
}

// Generate standard .ics file content for calendar download
export function generateIcsCalendar(event: TimelineEvent): string {
  const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
  const d = event.targetDate;
  const startStr = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T090000Z`;
  const endStr = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T110000Z`;
  const now = new Date();
  const timeStamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}T${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}Z`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Merit Ledger//Pakistan Admissions Tracker//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}@meritledger.app`,
    `DTSTAMP:${timeStamp}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.details.replace(/\n/g, ' ')} | Organizer: ${event.organizer} | Status: ${event.status.toUpperCase()}`,
    `URL:${event.actionUrl}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

export function downloadIcsFile(event: TimelineEvent) {
  const icsData = generateIcsCalendar(event);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.id}_reminder.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

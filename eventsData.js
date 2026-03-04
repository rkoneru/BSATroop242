// Events data - Update this whenever you add events to Google Calendar
// Keep this in sync with: https://calendar.google.com/calendar/r?cid=k11l4b9od26qdlquf6fth7stbg%40group.calendar.google.com

export const EVENTS = [
    {
        date: 'Mar 10',
        day: 'Tuesday',
        time: '7:00 PM',
        title: 'Troop Meeting',
        location: 'Charter Org',
        type: 'Meeting',
        icon: '📅'
    },
    {
        date: 'Mar 19-22',
        day: 'Weekend',
        time: 'All Day',
        title: 'Spring Campout',
        location: 'Keys',
        type: 'Campout',
        icon: '⛺',
        featured: true
    },
    {
        date: 'Apr 5',
        day: 'Saturday',
        time: '7:30 PM',
        title: 'Board of Review',
        location: 'Charter Org',
        type: 'Advancement',
        icon: '🎖️'
    }
    // Add more events here as they're created in Google Calendar
    // Format: { date: 'MMM DD', day: 'Day Name', time: 'HH:MM AM/PM', title: 'Event Title', location: 'Location', type: 'Meeting|Campout|Advancement|Activity', icon: 'emoji', featured: true/false (optional) }
];

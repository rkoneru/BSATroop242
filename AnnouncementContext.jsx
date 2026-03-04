import { createContext, useState, useContext } from 'react';

const AnnouncementContext = createContext();

export const AnnouncementProvider = ({ children }) => {
    const [adminAnnouncements, setAdminAnnouncements] = useState([
        {
            id: 1,
            type: 'success',
            title: 'Spring Campout Confirmed!',
            message: 'Mark your calendars! Spring campout is scheduled for April 12-14 at Camp Ocala. Sign up now in the events section.',
            icon: '⛺',
            date: '2025-03-01'
        },
        {
            id: 2,
            type: 'info',
            title: 'New Merit Badge Classes',
            message: 'Starting this month: Cooking, Wilderness Survival, and Photography merit badge classes. Check the calendar for dates.',
            icon: '🎖️',
            date: '2025-03-02'
        },
        {
            id: 3,
            type: 'warning',
            title: 'Uniform Inspection Night',
            message: 'Next Tuesday is uniform inspection night. Make sure your uniform is clean and proper for rank advancement reviews.',
            icon: '👕',
            date: '2025-03-03'
        }
    ]);

    const addAnnouncement = (announcement) => {
        const newAnnouncement = {
            id: Math.max(...adminAnnouncements.map(a => a.id), 0) + 1,
            ...announcement,
            date: announcement.date || new Date().toISOString().split('T')[0]
        };
        setAdminAnnouncements([newAnnouncement, ...adminAnnouncements]);
        return newAnnouncement;
    };

    const deleteAnnouncement = (id) => {
        setAdminAnnouncements(adminAnnouncements.filter(a => a.id !== id));
    };

    const updateAnnouncement = (id, updates) => {
        setAdminAnnouncements(adminAnnouncements.map(a => a.id === id ? { ...a, ...updates } : a));
    };

    return (
        <AnnouncementContext.Provider value={{
            announcements: adminAnnouncements,
            addAnnouncement,
            deleteAnnouncement,
            updateAnnouncement
        }}>
            {children}
        </AnnouncementContext.Provider>
    );
};

export const useAnnouncements = () => {
    const context = useContext(AnnouncementContext);
    if (!context) {
        throw new Error('useAnnouncements must be used within AnnouncementProvider');
    }
    return context;
};

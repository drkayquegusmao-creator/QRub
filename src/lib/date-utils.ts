/**
 * Utility to safely parse dates for Safari and other browsers.
 * Safari often fails to parse formats like "YYYY-MM-DD HH:mm:ss" (common in Postgres/Supabase).
 * This utility ensures the space is replaced with 'T' before parsing.
 */
export const safeParseDate = (dateStr: string | null | undefined | Date): Date => {
    if (!dateStr) return new Date();
    if (dateStr instanceof Date) return dateStr;

    // Replace space between date and time with 'T' for Safari compatibility
    // Also handle cases where there might be multiple spaces
    const normalized = typeof dateStr === 'string'
        ? dateStr.trim().replace(/(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})/, '$1T$2')
        : dateStr;

    const date = new Date(normalized);

    // Fallback if parsing results in Invalid Date
    if (isNaN(date.getTime())) {
        console.warn('[DateUtils] Invalid date encountered:', dateStr);
        return new Date();
    }

    return date;
};

/**
 * Format date for display in a way that is consistent.
 */
export const formatDate = (dateStr: string | Date, options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }) => {
    const date = safeParseDate(dateStr);
    return date.toLocaleDateString('pt-BR', options);
};

export const formatTime = (dateStr: string | Date, options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }) => {
    const date = safeParseDate(dateStr);
    return date.toLocaleTimeString('pt-BR', options);
};

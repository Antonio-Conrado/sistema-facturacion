export function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('es-Es', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return formatter.format(date);
}

export function getYear(isoString: string): string {
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('es-Es', {
        year: 'numeric',
        timeZone: 'UTC',
    });
    return formatter.format(date);
}

export function getMonth(isoString: string): string {
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('es-Es', {
        month: 'short',
        timeZone: 'UTC',
    });
    return formatter.format(date);
}

export function getDay(isoString: string): string {
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('es-Es', {
        day: '2-digit',
        month: 'short',
        timeZone: 'UTC',
    });
    return formatter.format(date);
}

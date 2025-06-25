export default function validateDate(value: string) {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
        selectedDate <= today ||
        'La fecha debe ser válida. No debe ser superior a la fecha actual'
    );
}

export function getLocalDateString() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    now.setMinutes(now.getMinutes() - offset);
    return now.toISOString().split('T')[0];
}

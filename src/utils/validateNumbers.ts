export default function validateNumber(value: number, name: string) {
    const regex = /^-?\d+(\.\d+)?$/;
    if (!regex.test(String(value))) {
        return `El ${name} debe contener solo números válidos`;
    }

    if (value < 0) return `El ${name} debe ser positivo`;
    if (name !== 'descuento') {
        if (value === 0) return `El ${name} no puede ser un número 0`;
    }

    return true;
}

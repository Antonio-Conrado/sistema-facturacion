import { RegisterPurchaseForm } from '@/types/zustandTypes';

export function isValidateTransaction(purchase: RegisterPurchaseForm): boolean {
    if (purchase.detailsPurchases.length === 0) return false;

    const ignoreFields = ['discount', 'date'];

    for (const [key, value] of Object.entries(purchase)) {
        if (ignoreFields.includes(key)) continue;

        if (Array.isArray(value) && value.length === 0) return false;

        if (typeof value === 'number' && value === 0) return false;

        if (typeof value === 'string') return false;
    }
    return true;
}

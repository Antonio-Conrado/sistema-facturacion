import { DataType } from '@/types/index';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';

type ReadOnlyInputProps<T> = {
    title: string;
    name: string;
    value: T;
    dataType: DataType;
    isWithPercentage?: boolean;
    statusText?: string;
};

export default function ReadOnlyInput<T>({
    title,
    name,
    value,
    dataType,
    isWithPercentage,
    statusText,
}: ReadOnlyInputProps<T>) {
    let formattedValue;

    if (dataType === 'currency') {
        formattedValue = isWithPercentage
            ? `${value} %`
            : formatCurrency(+value);
    } else if (dataType === 'date') {
        formattedValue = formatDate(String(value));
    } else if (dataType === 'status') {
        formattedValue = statusText ?? '';
    } else {
        formattedValue = String(value);
    }

    return (
        <>
            <div className="flex flex-col gap-1 md:flex-row items-start md:items-center md:gap-3 text-gray-800">
                <label htmlFor={name} className="w-24  font-semibold">
                    {title}:
                </label>
                <div className="flex flex-col w-full">
                    <input
                        type="text"
                        className={`border rounded-md p-2 w-full ${
                            dataType === 'status'
                                ? value === true
                                    ? 'bg-green-700 text-white'
                                    : 'bg-red-700 text-white'
                                : ''
                        }`}
                        id={name}
                        readOnly={true}
                        defaultValue={String(formattedValue)}
                    />
                </div>
            </div>
        </>
    );
}

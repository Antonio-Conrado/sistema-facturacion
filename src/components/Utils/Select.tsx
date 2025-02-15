import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Path } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

type Option = {
    value: number;
    label: string;
};

type SelectProps<T extends FieldValues> = {
    title: string;
    name: Path<T>;
    msg?: string;
    options: Option[];
    isReadOnly: boolean;
    register: UseFormRegister<T>;
    errors?: FieldErrors<T>;
};

export default function Select<T extends FieldValues>({
    title,
    name,
    msg = '',
    options,
    isReadOnly,
    errors = {},
    register,
}: SelectProps<T>) {
    return (
        <div className="flex flex-col gap-1 md:flex-row items-start md:items-center md:gap-3 text-gray-800">
            <label htmlFor={String(name)} className="w-24 font-semibold">
                {title}:
            </label>
            <div className="flex flex-col w-full">
                <select
                    id={String(name)}
                    className={`border rounded-md p-2 w-full ${
                        errors?.[name] ? 'border-red-500' : ''
                    }`}
                    {...register(name, {
                        required: msg,
                    })}
                    disabled={isReadOnly}
                >
                    <option value="">Seleccione una opción</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {errors?.[name]?.message && (
                    <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
                )}
            </div>
        </div>
    );
}

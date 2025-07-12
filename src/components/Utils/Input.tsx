import {
    FieldErrors,
    FieldValues,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';
import { Path } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

// Define a type for the component props, where the 'T' represents the form data shape.
type InputProps<T extends FieldValues> = {
    title: string;
    name: Path<T>; // 'name' must match a key in the form data object
    msg?: string;
    type: string;
    max?: string;
    value?: string | number;
    isPercentage?: boolean;
    isReadOnly: boolean;
    validate?: RegisterOptions<T>;
    register: UseFormRegister<T>; // 'register' is typed based on the form data shape
    errors?: FieldErrors<T>; // 'errors' is typed based on the form data shape
};

export default function Input<T extends FieldValues>({
    title,
    name,
    msg = '',
    type,
    max,
    value,
    isPercentage,
    isReadOnly,
    validate,
    errors = {},
    register,
}: InputProps<T>) {
    return (
        <div className="flex flex-col gap-1  items-start md:gap-3 text-gray-800">
            <label htmlFor={String(name)} className=" font-semibold">
                {title}
            </label>
            <div className="flex w-full">
                <input
                    type={type}
                    className={`border rounded-md p-2 w-full ${
                        errors?.[name] ? 'border-red-500' : ''
                    }`}
                    min={type === 'number' ? 1 : ''}
                    max={max}
                    id={String(name)}
                    readOnly={isReadOnly}
                    defaultValue={value}
                    placeholder={`Ingresa ${title.toLowerCase()}`}
                    {...register(name, {
                        required: msg,
                        ...validate,
                    })}
                />
                {isPercentage && <span className="p-2">%</span>}
            </div>

            {errors?.[name]?.message && (
                <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
            )}
        </div>
    );
}

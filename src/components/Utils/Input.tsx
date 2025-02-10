import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Path } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

// Define a type for the component props, where the 'T' represents the form data shape.
type InputProps<T extends FieldValues> = {
    title: string;
    name: Path<T>; // 'name' must match a key in the form data object
    msg?: string;
    isReadOnly: boolean;
    register: UseFormRegister<T>; // 'register' is typed based on the form data shape
    errors?: FieldErrors<T>; // 'errors' is typed based on the form data shape
};

// The component works with the form data type passed in as 'T'
export default function Input<T extends FieldValues>({
    title,
    name,
    msg = '',
    isReadOnly,
    errors = {},
    register,
}: InputProps<T>) {
    return (
        <div className="flex flex-row items-center gap-3 text-gray-800">
            <label htmlFor={String(name)} className="w-24">
                {title}:
            </label>
            <div className="flex flex-col w-full">
                <input
                    type="text"
                    className={`border rounded-md p-2 w-full ${
                        errors?.[name] ? 'border-red-500' : ''
                    }`}
                    id={String(name)}
                    readOnly={isReadOnly}
                    placeholder={`Enter ${title.toLowerCase()}`}
                    {...register(name, {
                        required: msg,
                    })}
                />
                {errors?.[name]?.message && (
                    <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
                )}
            </div>
        </div>
    );
}

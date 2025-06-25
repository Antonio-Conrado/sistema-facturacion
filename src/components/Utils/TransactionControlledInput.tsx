import {
    Controller,
    Control,
    FieldValues,
    Path,
    PathValue,
    RegisterOptions,
} from 'react-hook-form';
import ToolTipComponent from './ToolTipComponent';

type TransactionControlledInputProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    defaultValue: PathValue<T, Path<T>>;
    rules?: RegisterOptions<T, Path<T>>;
    min?: number;
    max?: number;
    step?: number;
    type?: 'number' | 'text';
    readOnly?: boolean;
    className?: string;
    onValueChange?: (value: number) => void;
};

export default function TransactionControlledInput<T extends FieldValues>({
    name,
    control,
    defaultValue,
    rules,
    min = 0,
    max,
    step,
    type = 'number',
    readOnly = false,
    className = '',
    onValueChange,
}: TransactionControlledInputProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field, fieldState }) => (
                <ToolTipComponent
                    msg={fieldState.error?.message}
                    isError={!!fieldState.error}
                >
                    <input
                        type={type}
                        min={min}
                        max={max}
                        step={step}
                        readOnly={readOnly}
                        className={`input w-full pr-6 ${
                            fieldState.error
                                ? 'border-red-500'
                                : 'border-gray-300'
                        } ${className}`}
                        value={field.value}
                        onChange={(e) => {
                            const value = +e.target.value;
                            field.onChange(value);
                            onValueChange?.(value);
                        }}
                    />
                </ToolTipComponent>
            )}
        />
    );
}

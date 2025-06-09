import { FieldValues, Controller, Control, Path } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

type Option = {
    value: number;
    label: string;
};

type SelectAutocompleteProps<T extends FieldValues> = {
    title: string;
    name: Path<T>;
    msg?: string;
    options: Option[];
    isReadOnly: boolean;
    control: Control<T>;
};

export default function SelectAutocomplete<T extends FieldValues>({
    title,
    name,
    msg = '',
    options,
    isReadOnly,
    control,
}: SelectAutocompleteProps<T>) {
    return (
        <div className="flex flex-col gap-1 md:flex-row items-start md:items-center md:gap-3 text-gray-800">
            <label htmlFor={name} className="w-24 font-semibold">
                {title}:
            </label>
            <div className="flex flex-col w-full">
                <Controller
                    name={name}
                    control={control}
                    rules={{
                        required: msg || false,
                        validate: msg ? (value) => value !== 0 || msg : {},
                    }}
                    render={({ field, fieldState }) => (
                        <Autocomplete
                            disablePortal
                            options={options}
                            onChange={(e, data) =>
                                field.onChange(data?.value ?? null)
                            }
                            disabled={isReadOnly}
                            value={
                                options.find(
                                    (option) => option.value === field.value,
                                ) || null
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label=""
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                            noOptionsText="No encontrado"
                            slotProps={{
                                popper: {
                                    className: 'max-h-[180px] overflow-y-auto',
                                },
                            }}
                            sx={{
                                '& .MuiInputBase-root': {
                                    padding: 0.3,
                                },
                                '& .MuiFormLabel-root': {
                                    color: '#1f2937',
                                },
                                '& .MuiFormHelperText-root.Mui-error': {
                                    color: '#ef4444',
                                    margin: 0,
                                    fontSize: '16px',
                                    fontFamily: 'ui-sans-serif',
                                },
                            }}
                        />
                    )}
                />
            </div>
        </div>
    );
}

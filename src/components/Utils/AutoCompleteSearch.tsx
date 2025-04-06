import { Autocomplete, TextField } from '@mui/material';

type Option<T> = {
    value: T;
    label: string;
};

type AutoCompleteSearchProps<T> = {
    options: Option<T>[];
    onChange: (value: T | null) => void;
    value: T | null;
    title: string;
};

export default function AutoCompleteSearch<T>({
    options,
    onChange,
    value,
    title,
}: AutoCompleteSearchProps<T>) {
    return (
        <div className="flex flex-col gap-1 md:flex-row items-start md:items-center md:gap-3 text-gray-800">
            <Autocomplete
                disablePortal
                options={options}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                    <li {...props} key={Number(option.value)}>
                        {option.label}
                    </li>
                )}
                onChange={(_, newValue) =>
                    onChange(newValue ? newValue.value : null)
                }
                value={options.find((option) => option.value === value) || null}
                renderInput={(params) => (
                    <TextField {...params} label={title} />
                )}
                noOptionsText="No encontrado"
                className="w-40"
                sx={{
                    '& .MuiInputBase-root': { padding: 0.3 },
                    '& .MuiFormLabel-root': { color: '#1f2937' },
                }}
            />
        </div>
    );
}

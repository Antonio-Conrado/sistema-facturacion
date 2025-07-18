import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react';

type SelectDateProps = {
    date: string;
    setDate: React.Dispatch<
        React.SetStateAction<'total' | 'byMonth' | 'byDay' | 'byYear'>
    >;
};
export default function SelectDate({ date, setDate }: SelectDateProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        setDate(e.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Fecha</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={date}
                    label="Fecha"
                    onChange={handleChange}
                >
                    <MenuItem value={'byDay'}>Día</MenuItem>
                    <MenuItem value={'byMonth'}>Mes</MenuItem>
                    <MenuItem value={'byYear'}>Año</MenuItem>
                    <MenuItem value={'total'}>Total</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

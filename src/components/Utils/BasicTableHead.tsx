import { TableCell, TableRow } from '@mui/material';
import TableHead from '@mui/material/TableHead';

export default function BasicTableHead({ list }: { list: string[] }) {
    return (
        <>
            <TableHead>
                <TableRow
                    className="bg-cyan-800"
                    sx={{
                        '& .MuiTableCell-root': { color: '#fff' },
                    }}
                >
                    {list.length > 0 && (
                        <>
                            {list.map((item, index) => (
                                <TableCell key={index} align="center">
                                    {item}
                                </TableCell>
                            ))}
                        </>
                    )}
                </TableRow>
            </TableHead>
        </>
    );
}

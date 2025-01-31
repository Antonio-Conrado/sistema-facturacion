import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner() {
    return (
        <Box className='flex justify-center pt-2'>
            <CircularProgress />
        </Box>
    );
}
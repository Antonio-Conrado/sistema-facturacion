import { getBusinessDataAPI } from '@/api/businessData/businessData';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

export default function BusinesDataSideBar() {
    const { data } = useQuery({
        queryKey: ['businessData'],
        queryFn: getBusinessDataAPI,
    });

    if (data)
        return (
            <Box className="mb-5">
                <img
                    src={data?.image ?? '/logo.png'}
                    alt="image"
                    className="h-20 w-full my-2"
                />
                <p className="text-white text-center text-2xl">{data.name}</p>
            </Box>
        );
}

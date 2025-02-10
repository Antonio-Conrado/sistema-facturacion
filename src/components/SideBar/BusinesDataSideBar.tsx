import { BusinessData } from '@/types/index';
import { Box } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

export default function BusinesDataSideBar() {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<BusinessData>(['businessData']);

    if (!data) {
        return (
            <p className="text-white">Información del negocio no encontrada.</p>
        );
    }
    return (
        <Box className="mb-5 flex flex-col items-center justify-center">
            <img
                src={data?.image ?? '/logo.png'}
                alt="image"
                className="h-20 w-fit my-2 rounded-full"
            />
            <p className="text-center text-2xl text-white">{data.name}</p>
        </Box>
    );
}

import { DoNotDisturb } from '@mui/icons-material';

export default function DataNotFound() {
    return (
        <div className="flex justify-center items-center gap-3 min-h-[80%]">
            <DoNotDisturb sx={{ fontSize: '20px' }} />
            <p className="text-center text-gray-800 text-3xl">
                La información no está disponible. Intenta nuevamente o más
                tarde!
            </p>
        </div>
    );
}

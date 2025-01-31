import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { Link } from 'react-router-dom';
export default function Views404() {
    return (
        <div className="min-h-screen px-5 md:px-0 flex flex-col justify-center items-center">
            <NotInterestedIcon
                fontSize='large'
                className='text-zinc-700'
            />
            <h1 className="text-xl text-gray-600 text-center pb-10">Página no encontrada</h1>
            <Link
                to={'/ventas'}
                className='bg-amber-700 hover:bg-amber-600 text-white p-3 rounded-lg w-1/4 text-center'
            >
                Ventas
            </Link>
        </div>
    );
}
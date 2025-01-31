import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { Link } from 'react-router-dom';
export default function Views401() {
    return (
        <div className="min-h-screen px-5 md:px-0 flex flex-col justify-center items-center">
            <NotInterestedIcon
                fontSize='large'
                className='text-red-600'
            />
            <h1 className="text-xl text-gray-600 text-center pb-10">No tiene el rol correspondiente para ver la información</h1>
            <Link
                to={'/ventas'}
                className='bg-amber-700 hover:bg-amber-600 text-white p-3 rounded-lg w-1/4 text-center'
            >
                Ventas
            </Link>
        </div>
    );
}
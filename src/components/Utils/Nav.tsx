import { Menu } from '@mui/icons-material';
import UserIcon from './UserIcon';

type NavProps = {
    toggleSidebar: () => void;
    isLargeScreen: boolean;
};

export default function Nav({ toggleSidebar, isLargeScreen }: NavProps) {
    return (
        <nav
            className={`fixed z-50 w-full top-2 h-20 flex px-5 items-center shadow-lg bg-neutral-50 rounded-xl md:pr-64 lg:pr-80 ${
                isLargeScreen ? 'justify-end' : 'justify-between'
            }`}
        >
            <button
                onClick={toggleSidebar}
                className={`${isLargeScreen ? 'hidden' : 'block'}`}
            >
                <Menu />
            </button>

            <UserIcon />
        </nav>
    );
}

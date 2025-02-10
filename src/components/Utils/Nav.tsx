import { Menu } from '@mui/icons-material';
import UserIcon from './UserIcon';

type NavProps = {
    toggleSidebar: () => void;
    isLargeScreen: boolean;
};

export default function Nav({ toggleSidebar, isLargeScreen }: NavProps) {
    return (
        <nav
            className={`fixed z-50 w-[calc(100%-16px)] lg:w-[calc(100%-253px)] top-2 h-20 flex px-5 items-center shadow-lg bg-neutral-50 rounded-xl ${
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

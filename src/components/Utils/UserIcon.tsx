import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/index';

export default function UserIcon() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const queryClient = useQueryClient();
    const handleCloseSession = () => {
        localStorage.removeItem('token');
        queryClient.invalidateQueries({ queryKey: ['userAuth'] });
        queryClient.invalidateQueries({ queryKey: ['user'] });
    };

    //Fetch the user data from the cache
    const data = queryClient.getQueryData<User>(['user']);
    if (data)
        return (
            <div className="flex items-center">
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className="flex items-center"
                >
                    <p className="capitalize text-gray-800 px-2">
                        {data.name} {data.surname}
                    </p>
                    <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={data.image ?? '/img/user.svg'}
                        alt="User"
                    />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem>
                        <p className="font-bold text-sm">
                            Rol: {''}
                            <span className="font-normal capitalize">
                                {data.roles.name}
                            </span>
                        </p>
                    </MenuItem>
                    <MenuItem onClick={handleCloseSession}>
                        <p className="text-red-500 text-sm">Cerrar Sesión</p>
                    </MenuItem>
                </Menu>
            </div>
        );
}

import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { links } from '@/data/index';
import { Link, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/index';

export default function LinksSideBar() {
    const [open, setOpen] = useState<string | null>(null);
    const location = useLocation();
    const queryClient = useQueryClient();
    const userRol: User | undefined = queryClient.getQueryData(['user']); // Get user role from cache

    // Handle submenu toggle
    const handleClick = (name: string) => {
        setOpen(open === name ? null : name);
    };

    // Check if the user has access to a link based on roles
    const hasAccess = (linkRoles: string[]): boolean => {
        return linkRoles.some((role) => userRol?.roles?.name?.includes(role));
    };

    // Highlight active link
    const getActiveClass = (path: string) =>
        location.pathname === path ? 'bg-purple-500 rounded-r-xl' : '';

    // Auto-open submenu if a sublink is active
    useEffect(() => {
        links.forEach((link) => {
            if (
                link.links?.some(
                    (subLink) => location.pathname === subLink.path,
                )
            ) {
                setOpen(link.name);
            }
        });
    }, [location.pathname]);

    return (
        <List>
            {links.map((link) => {
                if (link.rol && !hasAccess(link.rol)) return null; // Hide links without permission

                return (
                    <div key={link.name}>
                        {/* Main navigation link */}
                        <ListItem
                            disablePadding
                            className={getActiveClass(link.path)}
                        >
                            <ListItemButton
                                component={link.links ? 'button' : Link}
                                to={link.links ? undefined : link.path}
                                onClick={
                                    link.links
                                        ? () => handleClick(link.name)
                                        : undefined
                                }
                            >
                                <ListItemIcon>
                                    <link.icon className="text-white" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={link.name}
                                    className="text-white p-4"
                                />
                                {link.links &&
                                    (open === link.name ? (
                                        <ExpandLess className="text-white" />
                                    ) : (
                                        <ExpandMore className="text-white" />
                                    ))}
                            </ListItemButton>
                        </ListItem>

                        {/* Submenu links */}
                        {link.links && (
                            <Collapse in={open === link.name} timeout="auto">
                                <List component="div">
                                    {link.links.map((subLink) => {
                                        if (
                                            subLink.rol &&
                                            !hasAccess(subLink.rol)
                                        )
                                            return null;

                                        return (
                                            <ListItem
                                                key={subLink.name}
                                                disablePadding
                                                className={getActiveClass(
                                                    subLink.path,
                                                )}
                                            >
                                                <ListItemButton
                                                    component={Link}
                                                    to={subLink.path}
                                                    sx={{ pl: 4 }}
                                                >
                                                    <ListItemIcon>
                                                        <subLink.icon className="text-white" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={subLink.name}
                                                        className="text-white"
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Collapse>
                        )}
                    </div>
                );
            })}
        </List>
    );
}

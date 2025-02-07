import { Drawer, Box, Divider, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import LinksSideBar from './LinksSideBar';
import BusinesDataSideBar from './BusinesDataSideBar';

type SideBarProps = {
    isOpenSideBar: boolean;
    isLargeScreen: boolean;
    setIsOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SideBar({
    isOpenSideBar,
    isLargeScreen,
    setIsOpenSideBar,
}: SideBarProps) {
    return (
        <Drawer
            open={isOpenSideBar}
            onClose={() => setIsOpenSideBar(false)}
            anchor="left"
            variant={isLargeScreen ? 'permanent' : 'temporary'}
            sx={{
                '& .MuiDrawer-paper': {
                    background: 'linear-gradient(195deg, #42424A, #191919)',
                    border: 0,
                    width: 230,
                    display: 'flex',
                    height: '98.5%',
                    margin: '5px 0 5px 5px',
                    transition:
                        'width 0.3s ease-in-out, height 0.3s ease-in-out',
                    borderRadius: '16px',
                },
            }}
        >
            <Box>
                <Box className="flex justify-center">
                    <BusinesDataSideBar />
                    {/* Button to close the sidebar (only on mobile) */}
                    {!isLargeScreen && (
                        <div className="absolute right-2">
                            <IconButton
                                onClick={() => setIsOpenSideBar(false)} // Closes the sidebar when the button is clicked
                            >
                                <Close className="text-white" />
                            </IconButton>
                        </div>
                    )}
                </Box>
                <LinksSideBar />
                <Divider />
            </Box>
        </Drawer>
    );
}

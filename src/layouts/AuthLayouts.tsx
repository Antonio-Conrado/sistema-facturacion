import { Outlet } from "react-router-dom";

export default function AuthLayouts() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-800 to-zinc-800 flex items-center justify-center px-5 md:px-0">
            <Outlet />
        </div>
    );
}
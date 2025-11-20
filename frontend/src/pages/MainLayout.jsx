import { NavLink, Outlet } from "react-router";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-amber-50 font-serif">
            <header className="flex justify-between items-center bg-white border-b-2 border-gray-800 shadow-sm px-8 py-4">
                <NavLink 
                    to={'/'}
                    className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors tracking-tight no-underline"
                >
                    Home
                </NavLink>
                <NavLink 
                    to={'/login'}
                    className="text-lg text-gray-700 hover:text-gray-900 font-semibold no-underline border-b-2 border-transparent hover:border-gray-800 transition-all"
                >
                    Login
                </NavLink>
                <NavLink 
                    to={'/profile'}
                    className="text-lg text-gray-700 hover:text-gray-900 font-semibold no-underline border-b-2 border-transparent hover:border-gray-800 transition-all"
                >
                    Profile
                </NavLink>
                <NavLink 
                    to={'/register'}
                    className="text-lg text-gray-700 hover:text-gray-900 font-semibold no-underline border-b-2 border-transparent hover:border-gray-800 transition-all"
                >
                    Register
                </NavLink>
            </header>

            <main className="min-h-screen">
                <Outlet />
            </main>

            <footer className="bg-white border-t-2 border-gray-800 px-8 py-6">
                <div className="text-center text-gray-700">
                    <p className="text-sm italic">Новостная платформа в стиле классических газет</p>
                    <p className="text-xs mt-4 text-gray-600">© 2025 Все права защищены</p>
                </div>
            </footer>
        </div>
    )
}
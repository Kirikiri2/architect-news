import { NavLink, Outlet } from "react-router";
export default function MainLayout() {

    return (
                <div>
                    <header className="flex justify-between items-center">
                        <div>Hello</div>
                    </header>


                    <main>
                        <Outlet />
                    </main>

                    <footer>

                    </footer>
                </div>

    )
}

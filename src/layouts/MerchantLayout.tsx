import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "components/NavigationBar";
import MerchantSidebar from "components/SidebarComponent";

export default function MerchantLayout() {
	const [open, setOpen] = useState(true);

	useEffect(() => {
		window.addEventListener("resize", () => (window.innerWidth < 1200 ? setOpen(false) : setOpen(true)));

		return () => {
			window.removeEventListener("resize", () => (window.innerWidth < 1200 ? setOpen(false) : setOpen(true)));
		};
	}, []);

	// const { userRole } = useAppSelector((state) => state.auth);
	const userRole = "Merchant";

	return (
		<div className="flex h-screen w-full font-circular-std overflow-hidden">
			<MerchantSidebar open={open} onClose={() => setOpen(false)} userRole={userRole} />
			<div className="w-full bg-backgroundColor dark:!bg-navy-900 overflow-y-scroll xl:ml-[20vw]">
				<main className={`flex-none transition-all md:p-2 `}>
					<div className="">
						<Navbar onOpenSidenav={() => setOpen(true)} />
						<div className="md:p-2 mx-auto mb-auto  min-h-[93vh] ">
							<Outlet />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

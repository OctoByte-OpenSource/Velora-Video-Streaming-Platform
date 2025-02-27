import DashBoard from "@/pages/DashBoard";
import { Sidebar, Navbar } from "../../AppComponents/Navigation";

const appLayout = () => {
	return (
		<div className='flex h-screen bg-white'>
			<Sidebar />
			<div className='flex-1 flex flex-col ml-20 transition-all duration-300'>
				<Navbar />
				<div className='flex-1 overflow-y-auto ml-5 pt-5'>
					<DashBoard />
				</div>
			</div>
		</div>
	);
};

export default appLayout;

const AppLayout = () => (WrapperComponent) => {
	// eslint-disable-next-line react/display-name
	return (props) => {
		return (
			<div className='flex h-screen overflow-y-scroll bg-white'>
				<Sidebar />
				<div className='flex-1 flex flex-col'>
					<Navbar />
					<div className='flex-1 h-screen p-1'>
						<WrapperComponent {...props} />
					</div>
				</div>
			</div>
		);
	};
};
export { AppLayout };

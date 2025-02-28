import { Sidebar, Navbar } from "../Navigation";

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

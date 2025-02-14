import { useState } from "react";
import MinimalButton from "./Utility/Button";
import { Home, Video, Heart, Settings, Search } from "lucide-react";

const Navbar = () => {
	const handleClick = () => {
		localStorage.clear();
	};
	return (
		<div className='h-20 bg-white border-b p-8 flex items-center justify-between'>
			<div className='relative'>
				<Search
					className='absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500'
					size={20}
				/>
				<input
					type='text'
					placeholder='Search'
					className='bg-gray-50 rounded-lg pl-10 pr-4 py-2 w-64 text-gray-700 
                   border border-gray-200 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-transparent'
				/>
			</div>

			<MinimalButton onClick={handleClick}>Logout</MinimalButton>

			<div className='flex items-center space-x-4'>
				<span className='text-gray-700'>Rhishikesh</span>
				<div className='w-8 h-8 bg-gray-200 rounded-full'></div>
			</div>
		</div>
	);
};

const Sidebar = () => {
	const [activeItem, setActiveItem] = useState("home");
	const [isHovered, setIsHovered] = useState(false);

	const navItems = [
		{ id: "home", icon: Home, label: "Home" },
		{ id: "videos", icon: Video, label: "Videos" },
		{ id: "favorites", icon: Heart, label: "Favorites" },
		{ id: "settings", icon: Settings, label: "Settings" },
	];

	return (
		<div
			className={`bg-white border-r transition-all duration-300 ease-in-out relative
                ${isHovered ? "w-48" : "w-20"}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<div className='absolute top-4 left-4'>
				<div
					className='w-8 h-8 bg-blue-600 rounded-lg flex items-center 
                     justify-center text-white font-bold'>
					V
				</div>
			</div>

			<div className='pt-16 px-4 flex flex-col items-center'>
				<nav className='flex flex-col space-y-4 w-full'>
					{navItems.map((item) => {
						const Icon = item.icon;
						return (
							<button
								key={item.id}
								className={`pl-3 pt-3 pb-3 pr-5 rounded-lg transition-all duration-300 w-full flex items-center ${
									activeItem === item.id ? "bg-blue-50" : "hover:bg-blue-50"
								}`}
								onClick={() => setActiveItem(item.id)}>
								<div className='flex items-center justify-center min-w-[24px]'>
									<Icon
										size={20}
										className={`text-blue-500 ${
											activeItem === item.id ? "text-blue-600" : ""
										}`}
									/>
								</div>
								<span
									className={`ml-2 transition-all duration-300
                                    ${
																			isHovered
																				? "opacity-100 translate-x-0"
																				: "opacity-0 -translate-x-4 absolute"
																		}`}>
									{item.label}
								</span>
							</button>
						);
					})}
				</nav>
			</div>
		</div>
	);
};

export { Navbar, Sidebar };

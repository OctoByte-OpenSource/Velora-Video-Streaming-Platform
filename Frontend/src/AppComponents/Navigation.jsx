import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Utility/Button";
import { Link } from "react-router-dom";
import { Home, Video, Heart, Settings, Search } from "lucide-react";
import Avatar from "./Utility/Avatar";

const Navbar = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const { username } = useSelector((state) => state.auth.user);
	const url = useSelector((state) => state.auth.user.profileImage);
	console.log("url", url);
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
					className='bg-gray-50 rounded-lg pl-10 py-2 w-96 text-gray-700
							border border-gray-200 focus:outline-none focus:ring-2
							focus:ring-blue-500 focus:border-transparent'
				/>
			</div>
			{isAuthenticated ? (
				<>
					<div className='flex items-center space-x-5'>
						<Button onClick={handleClick}>+ Create Watch Party</Button>
						<span className='text-gray-700 font-medium'>{username}</span>
						<Avatar src={url} size='40px' withDropdown={true} />
					</div>
				</>
			) : (
				<div className='flex space-x-4'>
					<Button>
						<Link to='/login'>Login</Link>
					</Button>
					<Button>
						<Link to='/register'>Register</Link>
					</Button>
				</div>
			)}
		</div>
	);
};

// const Sidebar = () => {
// 	const [activeItem, setActiveItem] = useState("home");
// 	const [isHovered, setIsHovered] = useState(false);

// 	const navItems = [
// 		{ id: "home", icon: Home, label: "Home" },
// 		{ id: "videos", icon: Video, label: "Videos" },
// 		{ id: "favorites", icon: Heart, label: "Favorites" },
// 		{ id: "settings", icon: Settings, label: "Settings" },
// 	];

// 	return (
// 		<div
// 			className={`bg-white border-r transition-all duration-300 ease-in-out relative
//                 ${isHovered ? "w-48" : "w-20"}`}
// 			onMouseEnter={() => setIsHovered(true)}
// 			onMouseLeave={() => setIsHovered(false)}>
// 			<div className='absolute top-4 left-4'>
// 				<div
// 					className='w-8 h-8 bg-blue-600 rounded-lg flex items-center
//                      justify-center text-white font-bold'>
// 					V
// 				</div>
// 			</div>

// 			<div className='pt-16 px-4 flex flex-col items-center'>
// 				<nav className='flex flex-col space-y-4 w-full'>
// 					{navItems.map((item) => {
// 						const Icon = item.icon;
// 						return (
// 							<button
// 								key={item.id}
// 								className={`pl-3 pt-3 pb-3 pr-5 rounded-lg transition-all duration-300 w-full flex items-center ${
// 									activeItem === item.id ? "bg-blue-50" : "hover:bg-blue-50"
// 								}`}
// 								onClick={() => setActiveItem(item.id)}>
// 								<div className='flex items-center justify-center min-w-[24px]'>
// 									<Icon
// 										size={20}
// 										className={`text-blue-500 ${
// 											activeItem === item.id ? "text-blue-600" : ""
// 										}`}
// 									/>
// 								</div>
// 								<span
// 									className={`ml-2 transition-all duration-300
//                                     ${
// 																			isHovered
// 																				? "opacity-100 translate-x-0"
// 																				: "opacity-0 -translate-x-4 absolute"
// 																		}`}>
// 									{item.label}
// 								</span>
// 							</button>
// 						);
// 					})}
// 				</nav>
// 			</div>
// 		</div>
// 	);
// };

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
			className={`fixed left-0 top-0 h-full bg-white border-r shadow-lg z-50 transition-all duration-300 ease-in-out 
				${isHovered ? "w-48" : "w-20"}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			{/* Sidebar Logo */}
			<div className='absolute top-4 left-4'>
				<div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold'>
					V
				</div>
			</div>

			{/* Navigation Items */}
			<div className='pt-16 px-4 flex flex-col items-center'>
				<nav className='flex flex-col space-y-4 w-full'>
					{navItems.map((item) => {
						const Icon = item.icon;
						return (
							<button
								key={item.id}
								className={`pl-3 pt-3 pb-3 pr-5 rounded-lg transition-all duration-300 w-full flex items-center 
									${activeItem === item.id ? "bg-blue-50" : "hover:bg-blue-50"}`}
								onClick={() => setActiveItem(item.id)}>
								{/* Icon */}
								<div className='flex items-center justify-center min-w-[24px]'>
									<Icon
										size={20}
										className={`text-blue-500 ${
											activeItem === item.id ? "text-blue-600" : ""
										}`}
									/>
								</div>

								{/* Text - Shows only when hovered */}
								<span
									className={`ml-2 transition-all duration-300 ${
										isHovered ? "opacity-100" : "opacity-0 absolute"
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

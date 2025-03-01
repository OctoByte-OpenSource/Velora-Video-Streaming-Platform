import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Utility/Button";
import { Link, NavLink } from "react-router-dom";
import {
	Home,
	Video,
	Edit,
	Heart,
	Settings,
	Search,
	GroupIcon,
	Upload,
} from "lucide-react";
import Avatar from "./Utility/Avatar";

const Navbar = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const { username } = useSelector((state) => state.auth.user);
	const url = useSelector((state) => state.auth.user.profileImage);

	const handleClick = () => {
		localStorage.clear();
	};

	return (
		<div className='h-16 bg-white border-b px-4 md:px-6 flex items-center justify-between w-full'>
			{/* Search Bar */}
			<div className='relative flex-1 max-w-[400px]'>
				<Search
					className='absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500'
					size={20}
				/>
				<input
					type='text'
					placeholder='Search'
					className='w-full bg-gray-100 rounded-lg pl-10 py-2 text-gray-700 border focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>

			{/* User Profile Section */}
			{isAuthenticated ? (
				<div className='flex items-center space-x-5'>
					<Button
						onClick={handleClick}
						className='bg-blue-500 text-white px-4 py-2 rounded-md'>
						+ Join Watch Party
					</Button>
					<span className='text-gray-700 font-medium'>{username}</span>
					<Avatar src={url} size='40px' withDropdown={true} />
				</div>
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
	const [isExpanded, setIsExpanded] = useState(false);

	const videoId = "67be13d030b2b3655f4f5759";

	const navItems = [
		{ id: "home", icon: Home, label: "Home", path: "/" },
		{ id: "upload", icon: Upload, label: "Upload", path: "/uploadVideo" },
		{
			id: "edit video",
			icon: Edit,
			label: "Edit",
			path: `/editVideo/${videoId}`,
		},
		{
			id: "find channel",
			icon: GroupIcon,
			label: "Find Users",
			path: "/user/search",
		},
		{ id: "settings", icon: Settings, label: "Settings", path: "/dashboard" },
	];

	return (
		<div className='flex h-screen'>
			{/* Sidebar */}
			<div
				className={`bg-white border-r shadow-md transition-all duration-300 ease-in-out flex flex-col 
					${isExpanded ? "w-56" : "w-20"} min-h-screen`}
				onMouseEnter={() => setIsExpanded(true)}
				onMouseLeave={() => setIsExpanded(false)}>
				{/* Sidebar Logo */}
				<div className='flex justify-center py-5'>
					<div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold'>
						V
					</div>
				</div>

				{/* Navigation Items */}
				<nav className='flex flex-col px-3 space-y-2'>
					{navItems.map((item) => {
						const Icon = item.icon;
						return (
							<NavLink
								key={item.id}
								to={item.path}
								className={`flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-300 
									${activeItem === item.id ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
								onClick={() => setActiveItem(item.id)}>
								{/* Icon */}
								<Icon size={22} className='text-blue-500' />
								{/* Label - Only visible when expanded */}
								<span
									className={`transition-opacity duration-200 ${
										isExpanded ? "opacity-100" : "opacity-0 hidden"
									}`}>
									{item.label}
								</span>
							</NavLink>
						);
					})}
				</nav>
			</div>
		</div>
	);
};

export { Navbar, Sidebar };

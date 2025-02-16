import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import ProfileImage from "./ProfileImage";

const NavBar = () => {
	// const profileImage = useSelector((state) => state.auth.user.profileImage);
	const isAuthenticated = true;

	const handleClick = () => {
		localStorage.clear();
	};

	return (
		<div className='w-full flex justify-evenly bg-transparent pt-2 pb-1'>
			<h1 className='text-gray-900 text-balance mt-1 dark:text-white font-bold text-5xl md:text-6xl xl:text-4xl'>
				<span className='text-primary dark:text-white'>Velora</span>
			</h1>
			<Input
				className='w-[40%] mt-3 border-collapse shadow-lg bg-white text-black '
				placeholder='Search....'></Input>
			<div className='flex gap-4 mt-3'>
				{isAuthenticated ? (
					<>
						<ProfileImage></ProfileImage>

						<button
							onClick={handleClick}
							className='text-white font-bold bg-black hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-4 py-1 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
							Logout
						</button>
					</>
				) : (
					<>
						<button
							type='button'
							className='text-white font-bold bg-black hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-4 py-1 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
							<Link to='/login'>Login</Link>
						</button>
						<button
							type='button'
							className='text-white font-bold bg-black hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-4 py-1 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
							<Link to='/register'>Register</Link>
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default NavBar;

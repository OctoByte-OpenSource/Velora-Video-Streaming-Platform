// import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import ProfileImage from "./ProfileImage";

const NavBar = () => {
	// const profileImage = useSelector((state) => state.auth.user.profileImage);
	const isAuthenticated = false;

	const handleClick = () => {
		localStorage.clear();
	};

	return (
		<div className='w-full flex justify-between bg-transparent pt-2 pb-1 pl-[6rem] pr-[10rem]'>
			<h1 className='text-gray-900 text-balance mt-2 dark:text-white font-bold text-5xl md:text-6xl xl:text-4xl'>
				<span className='text-primary dark:text-white'>Velora</span>
			</h1>
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
							className='text-white font-bold bg-black hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm py-3 px-[2rem] text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
							<Link to='/login'>Login</Link>
						</button>
						<button
							type='button'
							className='text-white font-bold bg-black hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-6 py-1 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
							<Link to='/register'>Register</Link>
						</button>
					</>
				)}
			</div>
		</div>
	);

	
	
};

export default NavBar;

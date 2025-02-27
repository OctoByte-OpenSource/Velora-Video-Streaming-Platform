import NavBar from "@/AppComponents/NavBar"
import { NavLink } from "react-router-dom"

const Homepage = () => {
  return (
    // Hero Section
    <div className="bg-gradient-to-r from-cyan-400 to-indigo-600">
        <NavBar/>

        <div className="relative h-[100vh]" id="home">
            
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
            </div>
            <div className="relative pt-36 ml-auto">
                <div className="lg:w-2/3 text-center mx-auto">
                    <h1 className="text-gray-900 text-balance dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Come join in for an exciting <span className="text-primary dark:text-white">streaming experience.</span></h1>
                    <p className="mt-8 text-gray-700 dark:text-gray-300">Odio incidunt nam itaque sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!</p>
                    <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                        <NavLink
                          to='/register'
                          className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                        >
                          <span className="relative text-base font-semibold text-white"
                            >Get started</span
                          >
                        </NavLink>
                        <a
                          href="#"
                          className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                        >
                          <span
                            className="relative text-base font-semibold text-primary dark:text-white"
                            >Learn more</span
                          >
                        </a>
                    </div>
                    <div className="hidden mt-[12%] sm:flex justify-around">
                        <div className="text-left">
                            <h6 className="text-3xl font-semibold text-black dark:text-white">Most stunning</h6>
                            
                        </div>
                        <div className="text-left">
                            <h6 className="text-3xl font-semibold text-black dark:text-white">The fastest on the market</h6>
                            
                        </div>
                        <div className="text-left">
                            <h6 className="text-3xl font-semibold text-black dark:text-white">The most loved</h6>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    
  )
}

export default Homepage

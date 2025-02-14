import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import ProfileImage from "./ProfileImage"


const NavBar = () => {

  // const profileImage = useSelector((state) => state.auth.user.profileImage);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleClick = () => {
    localStorage.clear();
  }

  return (
    <div className='w-full flex justify-evenly bg-black pt-2 pb-1'>
      <img className="w-[100px]" src="https://betanews.com/wp-content/uploads/2017/08/new-youtube-logo.jpg"></img>
      <Input className="w-[40%] mt-3 text-white " placeholder = "Search...."></Input>
      <div className='flex gap-4 mt-3'>
        {
            isAuthenticated ? 
              <>
                <ProfileImage></ProfileImage>
                <Button onClick={handleClick} className="">Logout</Button>
              </>
             : 
              <>
                <Button className=""><Link to="/login">Login</Link></Button>
                <Button className=""><Link to="/register">Register</Link></Button>
              </>
        }
      </div>
    </div>
  )
}

export default NavBar

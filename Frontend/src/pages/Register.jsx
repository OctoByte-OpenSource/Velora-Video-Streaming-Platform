import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useRegisterUserMutation } from "@/redux/api/authSlice"
import { EyeOff,Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReactLoading from 'react-loading';


function Register() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  
  const handlePassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true)
  }

  const handleConfirmPassword = () => {
    showConfirmPassword ? setshowConfirmPassword(false) : setshowConfirmPassword(true)
  }

  const [registerUser, {isLoading}] = useRegisterUserMutation();

  const [formData, setFormData] = useState({
    username:"", 
    email: "",
    bio: "",
    password: "",
    confirmPassword: "",
  })
  
  const [profileImage, setProfileImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append("username", formData.username);
    userData.append("email", formData.email);
    userData.append("bio", formData.bio);
    userData.append("password", formData.password);
    userData.append("profileImage",profileImage);
    try{
       if(formData.password === formData.confirmPassword){
        const response = await registerUser(userData)
        // console.log(isSuccess)
        response.data.success ? (
            toast.success("Registration Completed Successfully"),
            navigate('/login')
        ) : (
            toast.error("Registration Failed...Please try after some time")
        )
  
       }else {
        alert("Password and Confirm Password doesn't match")
       }
       
      
    }catch(e){
      console.log(e)
    }
  }

  const handleChange = (e) => {
      const {name, value} = e.target
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
      
      
  }

  const handleFileChange = (e) => {
    setProfileImg(e.target.files[0])
  }

  return (
    
  <section className="bg-gradient-to-r from-cyan-400 to-indigo-600">
    {
      isLoading ? <ReactLoading className="mx-auto pt-[12%]" type="bars" color="black" height="100vh" width="375px" /> : (

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your UserName</label>
                        <input
                        name="username" value={formData.userName} placeholder = "Enter UserName " onChange = {handleChange}
                        type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input
                        name="email" value={formData.email} placeholder = "Enter Email " onChange = {handleChange}
                        type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Bio</label>
                        <textarea
                        rows={3}
                        name="bio" value={formData.bio} placeholder = "Enter Bio " onChange = {handleChange}
                        type="text" id="bio" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input 
                        name="password" value={formData.password} placeholder = "Enter Password " onChange = {handleChange}
                        type= {showPassword ? "text" : "password"} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                        
                        />
                        <span>
                        {
                              showPassword ? (
                                <Eye onClick={handlePassword} className="absolute top-[55%] left-[90%]"/>
                              ) : (
                                <EyeOff onClick={handlePassword} className="absolute top-[55%] left-[90%]"/>
                              )
                        }
                        </span>
                        
                    </div>
                    <div className="relative"> 
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input
                        name="confirmPassword" value={formData.confirmPassword} placeholder = "Confirm Password " onChange = {handleChange}
                        type={showConfirmPassword ? "text" : "password"} id="confirm-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        <span>
                          {
                                showConfirmPassword ? (
                                  <Eye onClick={handleConfirmPassword} className="absolute top-[55%] left-[90%]"/>
                                ) : (
                                  <EyeOff onClick={handleConfirmPassword} className="absolute top-[55%] left-[90%]"/>
                                )
                          }
                          </span>
                  
                    </div>

                    <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Profile Picture</label>
                          <input 
                          name="profileImage"
                          onChange={handleFileChange}
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                        </div>
                        <div className="ml-3 text-sm">
                          <label className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <NavLink to='/login'>Login here</NavLink>
                    </p>
                </form>
            </div>
        </div>
    </div>

      )
    }
    
  </section>
      

    
  )
}

export default Register

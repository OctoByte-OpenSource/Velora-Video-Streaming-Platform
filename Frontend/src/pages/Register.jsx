import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { registerUser } from "@/api/auth"


function Register() {

  const [formData, setFormData] = useState({
    userName:"", 
    email: "",
    password: "",
    confirmPassword: "",
  })
  
  const [profileImg, setProfileImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append("userdetails", formData);
    userData.append("profileImg", profileImg);

    const response = await registerUser(userData);
    console.log(response.data);

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
    <div className="flex justify-center items-center">
    
          <form onSubmit={handleSubmit} className="w-[40%] mt-10 flex flex-col justify-center items-center">
            <Label className = "content-start" >Username: </Label>
            < Input className="mt-2" type="text" name="userName" value={formData.userName} placeholder = "Enter UserName: " onChange = {handleChange}></Input><br/><br/>

            <Label>Email: </Label>
            < Input className="mt-2" type="email" name="email" value={formData.email} placeholder = "Enter Email: " onChange = {handleChange}></Input><br/><br/>

            <Label>Password: </Label>
            < Input className="mt-2" type="password" name="password" value={formData.password} placeholder = "Enter Password: " onChange = {handleChange}></Input><br/><br/>

            <Label>Confirm Password: </Label>
            < Input className="mt-2" type="text" name="confirmPassword" value={formData.confirmPassword} placeholder = "Confirm Password: " onChange = {handleChange}></Input><br/><br/>

            <Label>Profile Image: </Label>
            < Input className="mt-2" type="file" onChange={handleFileChange}></Input><br/><br/>

            <Button>Submit</Button>
          </form>
          
    </div>
  )
}

export default Register

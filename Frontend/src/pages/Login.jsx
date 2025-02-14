import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { loginUser } from "@/api/auth"

const Login = () => {

  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target
    setLoginUserData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = loginUser(loginUserData);
    console.log(response);
  }

  return (
    <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-[40%] mt-10 flex flex-col justify-center items-center">
            <Label>Email: </Label>
            < Input className="mt-2" type="email" placeholder = "Enter Email: " name="email" value={loginUserData.email} onChange={handleChange}></Input><br/><br/>
            
            <Label>Password: </Label>
            < Input className="mt-2" type="password" placeholder = "Enter Password: " name="password" value={loginUserData.password} onChange={handleChange}></Input><br/><br/>

            <Button>Submit</Button>
        </form>
    </div>
  )
}

export default Login

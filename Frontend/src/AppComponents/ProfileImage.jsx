// import { useSelector } from "react-redux"


const ProfileImage = () => {

        // const user = useSelector((state) => state.auth.user)
        // const profileImage = user.profileImage;
        const tempProfleImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D";
    
        return (
        <div>
            <img className="mt-0 w-[50px] h-[50px] rounded-full" src={tempProfleImage} alt="profileImage" />
        </div>
        )
}

export default ProfileImage;

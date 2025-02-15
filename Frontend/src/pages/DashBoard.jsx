
import Card from "@/AppComponents/Card"
import NavBar from "@/AppComponents/NavBar"
import { data } from "@/data/data"

const DashBoard = () => {
  return (
    <div >
      <NavBar></NavBar>
      <div className="grid grid-cols-4 gap-10 ml-2 mr-6 pl-3 mt-6 bg-white">
      {
        data?.map((video) => (
              // console.log("Hello", video.thumbnail)
            <Card key={video.id} thumbnail={video.thumbnail} description={video.description} channel_name= {video.channel_name}></Card>
        ))
      }
      </div>
    </div>
  )
}

export default DashBoard

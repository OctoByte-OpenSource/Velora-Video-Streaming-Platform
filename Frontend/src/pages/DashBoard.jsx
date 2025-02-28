import Card from "@/AppComponents/Card";
// import NavBar from "@/AppComponents/NavBar";
import { data } from "@/data/data";

const DashBoard = () => {
  return (
    <div className="grid h-screen grid-cols-3 gap-10 pl-2 pr-10 pt-2 pb-2">
      {data?.map((video) => (
        // console.log("Hello", video.thumbnail)
        <Card
          key={video.id}
          thumbnail={video.thumbnail}
          description={video.description}
          channel_name={video.channel_name}
        ></Card>
      ))}
    </div>
  );
};

export default DashBoard;

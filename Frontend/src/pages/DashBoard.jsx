import { useState, useEffect } from "react";
import Card from "@/AppComponents/Card";
import { useGetAllVideosQuery } from "@/redux/api/videoApiSlice";
import { AppLayout } from "@/AppComponents/Layout/AppLayout";
import { Navbar } from "@/AppComponents/Navigation";

const DashBoard = () => {
  const [videos, setVideos] = useState([]);
  const { data, error, isLoading } = useGetAllVideosQuery({
    page: 1,
    limit: 30,
  });

  useEffect(() => {
    if (data?.data) {
      setVideos(data.data); // Storing the array inside state
    }
  }, [data]);

  console.log(data);

  if (isLoading) return <p>Loading videos...</p>;
  if (error) return <p>Error fetching videos: {error.message}</p>;

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 py-3  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => {
          const {
            thumbnail,
            title,
            description,
            createdAt,
            likes,
            uploader,
            views,
            _id,
          } = video;
          return (
            <Card
              key={video._id} // Use _id instead of id if needed
              thumbnail={thumbnail}
              description={description}
              title={title}
              channel_name={uploader?.username}
              likes={likes.length || 0}
              views={views.length || 0}
              time={createdAt}
              _id={_id}
            />
          );
        })}
      </div>
    </>
  );
};

export default AppLayout()(DashBoard);

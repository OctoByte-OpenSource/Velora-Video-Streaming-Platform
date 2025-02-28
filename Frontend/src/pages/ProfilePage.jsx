import { AppLayout } from "@/AppComponents/Layout/AppLayout";
import Avatar from "@/AppComponents/Utility/Avatar";
import DashBoard from "./DashBoard";
import ProfileVideoCards from "@/AppComponents/Video/ProfileVideoCards";
import {
  useGetUserInfoQuery,
  useSubscribeChannelMutation,
} from "@/redux/api/userApiSlice";
import { useParams } from "react-router-dom";
import { useGetAllVideosQuery } from "@/redux/api/videoApiSlice";

const ProfilePage = () => {
  const userId = useParams().id;
  const { data, isLoading, isError, error, refetch } =
    useGetUserInfoQuery(userId);

  console.log("userId", data);

  return (
    <div>
      {isLoading ? (
        <p>loadConfigFromFile.....</p>
      ) : (
        <div className=" w-full h-full grid py-5 px-10 items-center justify-center">
          <div className="  h-full min-w-[75vw] flex flex-col  gap-3 ">
            <div className=" bg-blue-800 px-5  rounded-xl text-white ">
              <div className=" flex p-10  items-center sm:gap-5  max-sm:flex-col ">
                <div className=" w-52">
                  <Avatar
                    src={
                      data.user.profileImage ||
                      "https://cdn.dribbble.com/users/5534/screenshots/14230133/profile_4x.jpg"
                    }
                    size="180px"
                  />
                </div>
                <div className=" flex items-start w-full  max-sm:flex-col-reverse justify-between">
                  <div className=" flex flex-col gap-2  font-medium max-md:text-sm max-sm:text-sm">
                    <div className=" flex flex-col ">
                      <p className=" text-black text-sm m-0 ">Username</p>
                      <p>{data?.user.username}</p>
                    </div>
                    <div className=" flex flex-col ">
                      <p className=" text-black text-sm">Email</p>
                      <p>{data?.user.email}</p>
                    </div>
                    <div className=" flex flex-col ">
                      <p className=" text-black text-sm">Bio</p>
                      <p>{data?.user.bio}</p>
                    </div>

                    <div className="flex gap-5 items-center justify-center ">
                      <div className="">
                        <p className=" text-black">Subscribers</p>
                        <p className=" text-center">
                          {data.user.subcribers.length}
                        </p>
                      </div>
                      <div>
                        <p className=" text-black">views</p>
                        <p className=" text-center">{data.totalViews}</p>
                      </div>
                      <div>
                        <p className=" text-black">Likes</p>
                        <p className=" text-center">{data.totalLikes}</p>
                      </div>
                    </div>
                  </div>
                  <div className=" p-10 flex flex-col gap-5">
                    <button className=" px-2 py-1 bg-blue-400 rounded-lg">
                      Edit profile
                    </button>
                    <SubscribeToTheChannelBtn
                      id={data.user._id}
                      refetch={refetch}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" bg-red-700 rounded-xl  ">
              <ProfileVideoCards videos={data.user.videos} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const ProfilePageWrapped = AppLayout()(ProfilePage);

export default ProfilePageWrapped;

export const SubscribeToTheChannelBtn = ({ id, refetch }) => {
  const [subscribeChannelFn] = useSubscribeChannelMutation();

  const subscribeToTheChannel = async () => {
    await subscribeChannelFn(id);
    if (refetch) refetch();
  };

  return (
    <button
      className=" px-2 py-1 bg-red-700 rounded-lg"
      onClick={() => {
        subscribeToTheChannel();
      }}
    >
      <p>Subscribe</p>
    </button>
  );
};

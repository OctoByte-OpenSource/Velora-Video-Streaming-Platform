import { AppLayout } from "@/AppComponents/Layout/AppLayout";
import { Navbar } from "@/AppComponents/Navigation";
import ChannelCard from "@/AppComponents/Video/ChannelCard";
import {
  useGetAllUsersInfoQuery,
  useGetUserInfoQuery,
} from "@/redux/api/userApiSlice";
import { Search } from "lucide-react";

import React, { useState } from "react";
import { useSelector } from "react-redux";

const SearchChannel = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, isError, error, refetch } =
    useGetAllUsersInfoQuery(searchValue);

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className=" grid w-full h-full justify-center items-center  ">
          <div className="  h-full w-[75vw] flex flex-col  gap-3 p-3 ">
            <div>
              <div className="h-20 bg-white border-b p-8 flex items-center justify-between">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"
                    size={20}
                  />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search"
                    className="bg-gray-50 rounded-lg pl-10 py-2 w-96 text-gray-700
                          border border-gray-200 focus:outline-none focus:ring-2
                          focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className=" text-center p-4">Top Channels</p>
              <div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.users.map((channel, i) => (
                  <ChannelCard key={i} channel={channel} refetch={refetch} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppLayout()(SearchChannel);

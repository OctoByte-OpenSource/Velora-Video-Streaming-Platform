import ProfileImage from '../ProfileImage'

const VideoDetails = () => {
  return (
    <div className="w-[50%] flex flex-col ml-20 mt-5 gap-3">
        {/* bottom left section */}
        <div className="flex justify-between">
        <div className="flex">
            <ProfileImage></ProfileImage>
            <p className="m-4 font-bold">{"Catherine Lopes"}</p>
        </div>

        <div className="flex gap-3">
            <button className="bg-black h-10 hover:bg-red-500 text-white font-bold px-2 rounded-md">Share</button>
            <button className="bg-black h-10 hover:bg-red-500 text-white font-bold px-4 rounded-md">Like</button>
        </div>
        </div>

        <div className="a">
            <p className="font-bold mt-1 text-2xl">Design exploration for detail page or video player page. Happy to hear your feedback, Thanks. We are available for a new project</p>
            <p className="mt-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas delectus rerum aut inventore nulla deserunt praesentium atque non quae asperiores qui, laudantium nesciunt blanditiis, molestias id, dolores eius eaque quasi ullam natus obcaecati in culpa labore. In voluptatem, qui officiis repellat temporibus repellendus sed voluptatibus numquam aperiam, corporis recusandae ad unde ullam delectus fugiat consectetur ea autem eligendi! Dolor deserunt tempore atque earum, nostrum iusto?</p>

        </div>
  </div>
  )
}

export default VideoDetails
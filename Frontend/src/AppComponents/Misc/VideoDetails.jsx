import { useState } from "react";

const VideoDetails = () => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="w-[90%] mx-auto mt-4">
      <p className="font-bold text-2xl">
        Samay Raina Video
      </p>
      <button
        className="text-blue-500 mt-2"
        onClick={() => setShowDescription(!showDescription)}
      >
        {showDescription ? "Hide Description" : "Show Description"}
      </button>
      {showDescription && (
        <p className="mt-3 text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
          delectus rerum aut inventore nulla deserunt praesentium atque non
          quae asperiores qui, laudantium nesciunt blanditiis, molestias id,
          dolores eius eaque quasi ullam natus obcaecati in culpa labore.
        </p>
      )}
    </div>
  );
};

export default VideoDetails;
// import React from 'react'

import NavBar from "@/AppComponents/NavBar"
import { useState } from "react"

const UploadVideo = () => {

  const [formData, setFormData] = useState({
    videoTitle: '',
    videoDescription: '',
  })

  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0])
  }

  const VideoChange = (e) => [
    setVideo(e.target.files[0])
  ]

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoData = new FormData();
    videoData.append('thumbnail', thumbnail)
    videoData.append('video', video)

    console.log(videoData)
  }

  return (
    
    <div className="">
      <NavBar className="bg-white"></NavBar>
      <div className="bg-white mt-4 absolute w-[100%] top-20 h-auto px-6 py-10 rounded-md flex flex-col justify-center items-center mx-auto">
      <h1 className="text-gray-900 text-balance dark:text-white font-bold text-3xl md:text-4xl xl:text-4xl mb-5 self-center relative"><span className="text-primary dark:text-white">Upload Video</span></h1>
        <form onSubmit={handleSubmit} className="h-[80%] flex justify-center items-center flex-col w-[70%] flex-grow ">
        <div className="mb-5 w-[80%] flex flex-col flex-grow">
            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video Title</label>
            <input onChange = {handleChange} value={formData.videoTitle} name="videoTitle" type="text" id="title" className="w-[100%] shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="name@flowbite.com" required />
        </div>
        
        <div className=" w-[80%]">
          <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video Description</label>
          <textarea onChange={handleChange} value={formData.videoDescription} id="text" name="videoDescription" rows="4" className="w-[100%] block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </div>

        <div className="mt-4 flex flex-col h-[200px] w-[80%]">
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thumbnail Upload</label>
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleThumbnailChange} />
              </label>
          </div> 

          <div className="mt-4 flex flex-col h-[200px] w-[80%]">
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Upload</label>
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={VideoChange} />
              </label>
          </div> 
        
        <button type="submit" className="text-white w-[80%] mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload Video</button>
        </form>
    </div>
    </div>
  )
}

export default UploadVideo
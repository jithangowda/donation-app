"use client";
import Image from "next/image.js"; // Importing Image component from Next.js
import React, { useState } from "react";
import { CloudUpload } from "lucide-react"; // Import CloudUpload icon from Lucide React

// Component for uploading and displaying images
function FileUpload({ setImages, imageList }) {
  const [imagePreview, setImagePreview] = useState([]); // State for previewing uploaded images

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const files = event.target.files;
    console.log(files);
    setImages(files); // Set the uploaded images using prop function
    // Create preview URLs for each uploaded file
    const preview = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagePreview(preview); // Update image preview state with URLs
  };

  return (
    <div>
      {/* File upload dropzone */}
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
        >
          <div className="flex flex-col items-center justify-center pt-5 mt-10 pb-6">
            {/* CloudUpload icon */}

            <CloudUpload
              size={48}
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          {/* Hidden file input for selecting files */}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={handleFileUpload}
            accept="image/png, image/jpg, image/jpeg, image/gif"
          />
        </label>
      </div>

      {/* Image previews of uploaded files */}
      <div className="gap-3 mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
        {imagePreview.map((image, index) => (
          <div key={index}>
            <Image
              src={image}
              width={100}
              height={100}
              alt={index}
              className="rounded-xl object-cover h-[100px] w-[100px] border-2 broder-black"
            />
          </div>
        ))}
      </div>

      {/* Display existing imageList if provided */}
      {imageList && (
        <div className="gap-3 mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
          {imageList.map((image, index) => (
            <div key={index}>
              <Image
                src={image?.url}
                width={100}
                height={100}
                alt={index}
                className="rounded-xl object-cover h-[100px] w-[100px] border-2 broder-black"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;

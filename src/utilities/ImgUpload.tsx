"use client"

import { useState } from 'react';
import { UploadButton, UploadDropzone } from './uploadthing'
import Image from 'next/image';
import { UploadFileResponse } from 'uploadthing/client';

// const ImgUpload = ({ onChange, value }) => {
  const ImgUpload = () => {
  const [imgUrl, setImgUrl] = useState<string>('');

  // const onUpdateFile = (newFiles: UploadFileResponse[]) => {
  //   onChange([...value, ...newFiles]);
  // };

  return (
    <div>
      <UploadDropzone endpoint='imageUploader'
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          // alert("Upload Completed");
          setImgUrl(res[0].url)
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />


      {imgUrl.length ?
        <div>
          <h3>Image Preview</h3>
          <Image src={imgUrl} alt="Preview" width={250} height={250} />
        </div> : null}
    </div>
  )
}

export default ImgUpload




// import axios from "axios";
// import React, { FormEvent, useRef, useState } from "react";

// const ImgUpload = ({value,onChange}) => {
//   const ref = useRef<HTMLInputElement>(null);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // 2. get reference to the input element
//     const input = ref.current!;

//     // 3. build form data
//     const formData = new FormData();
//     for (const file of Array.from(input.files ?? [])) {
//       formData.append(file.name, file);
//     }

//     // 4. use axios to send the FormData
//     onChange(formData);
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input type="file" name="files" ref={ref} multiple />
//         <button
//           type="submit"
//           className="px-2 py-1 rounded-md bg-violet-50 text-violet-500"
//         >
//           Upload
//         </button>
//       </form>
//     </>
//   );
// };

// export default ImgUpload
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
          // console.log("Files: ", res);
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
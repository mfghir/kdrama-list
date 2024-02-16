"use client"

// import { useState } from 'react';
// import { UploadButton, UploadDropzone } from './uploadthing'
// import Image from 'next/image';
// import { UploadFileResponse } from 'uploadthing/client';
// import { useToast } from '@/components/ui/use-toast';

// // const ImgUpload = ({ onChange, value }) => {
// const ImgUpload = ({ onChange, onRemove, value }: any) => {
//   // const [imgUrl, setImgUrl] = useState<string>('');
//   const { toast } = useToast();


//   // const onUpdateFile = (newFiles: UploadFileResponse[]) => {
//   //   onChange([...value, ...newFiles]);
//   // };

//   console.log("test value", value);

//   return (
//     <div>
//       <UploadDropzone endpoint='imageUploader'
//         onClientUploadComplete={(res) => {
//           console.log("Files: ", res);
//           onChange(res[0].url)
//           alert("Upload Completed");

//         }}

//         onUploadError={(error: Error) => {
//           alert(`ERROR! ${error.message}`);
//           toast({
//             title: "Error",
//             variant: "destructive",
//             description: `${error.message}`,
//           });
        
//         }}
//       />


//       {value.length ?
//         <div>
//           <h3>Image Preview</h3>
//           <Image src={value.src} alt="Preview" width={250} height={250} />
//         </div> : null}
//     </div>
//   )
// }

// export default ImgUpload




// // import axios from "axios";
// // import React, { FormEvent, useRef, useState } from "react";

// // const ImgUpload = ({value,onChange}) => {
// //   const ref = useRef<HTMLInputElement>(null);

// //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();

// //     // 2. get reference to the input element
// //     const input = ref.current!;

// //     // 3. build form data
// //     const formData = new FormData();
// //     for (const file of Array.from(input.files ?? [])) {
// //       formData.append(file.name, file);
// //     }

// //     // 4. use axios to send the FormData
// //     onChange(formData);
// //   };
// //   return (
// //     <>
// //       <form onSubmit={handleSubmit}>
// //         <input type="file" name="files" ref={ref} multiple />
// //         <button
// //           type="submit"
// //           className="px-2 py-1 rounded-md bg-violet-50 text-violet-500"
// //         >
// //           Upload
// //         </button>
// //       </form>
// //     </>
// //   );
// // };

// // export default ImgUpload















import Image from "next/image";



 const imageKitLoader = ({ src, width, quality }) => {
  if(src[0] === "/") src = src.slice(1);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(",");
  var urlEndpoint = "https://ik.imagekit.io/tymxpun8x";
  if(urlEndpoint[urlEndpoint.length-1] === "/") urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}?tr=${paramsString}`
}

export const MyImage = ({ onChange, onRemove, value }: any) => {
  return (
    <Image
      loader={imageKitLoader}
      // src={value.src}
      src="default-image.jpg"
      alt="Sample image"
      width={200}
      height={200}
    />
  );
};
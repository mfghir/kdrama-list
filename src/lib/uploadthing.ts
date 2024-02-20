"use server"

import { UTApi } from "uploadthing/server";
 
 const utapi = new UTApi();

export const onDeleteFile =async (imgDelete,imgUrl) => {
    
    await utapi.deleteFiles(imgDelete)
    imgUrl = ""
    // onRemove(imgDelete);
  };
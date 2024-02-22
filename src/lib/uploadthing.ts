"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const onDeleteFile = async (imgDelete: string | string[]) => {
  await utapi.deleteFiles(imgDelete);
  // imgUrl = ""
  // onRemove(imgDelete);
};

// export const getFile =async (imgUrl:string) => {

//    await utapi.getFileUrls(imgUrl);
//   // const oneUrl = await utapi.getFileUrls(imgUrl);
//   // console.log('oneUrl',oneUrl);
// }

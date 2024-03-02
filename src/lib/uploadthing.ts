"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const onDeleteFile = async (imgDelete: string | string[]) => {
  await utapi.deleteFiles(imgDelete);
};

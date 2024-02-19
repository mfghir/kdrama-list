"use client";

import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
// import { UploadDropzone } from "./uploadthing";
import { UploadDropzone } from "@uploadthing/react";
import { UploadFileResponse } from "uploadthing/client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { IMG_MAX_LIMIT } from "@/components/dashboard/TabUserAdd";


interface ImageUploadProps {
  onChange?: any;
  onRemove: (value: UploadFileResponse[]) => void;
  value: UploadFileResponse[];
}

export default function FileUpload({
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  const { toast } = useToast();

  // console.log("value",value);

  const onDeleteFile = (key: string) => {
    const files = value;
    let filteredFiles = files.filter((item: any) => item.key !== key);
    onRemove(filteredFiles);
  };

  const onUpdateFile = (newFiles: any) => {
    // console.log("value",value);
    const fileUrl = newFiles.map((file: { url: any; }) =>  file.url )
    console.log("File URLe=============>>>>" ,fileUrl)
    console.log("newFiles =======>>>>>",newFiles);
    console.log("value =========>>>>",value);

    onChange([...value, ...newFiles]);
    // onChange(fileUrl);
  };

  // console.log("value onUpdateFile=============:",value);

  return (
    <>
      <div>
        <div className="mb-4 flex items-center gap-4">
          {!!value.length &&
            value?.map((item) => (
              <div
                key={item.key}
                className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
              >
                <div className="z-10 absolute top-2 right-2">
                  <Button
                    type="button"
                    onClick={() => onDeleteFile(item.key)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <Image
                    fill
                    className="object-cover"
                    alt="Image"
                    src={item.url || ""}
                    // src={item.url || item.fileUrl}
                  />
                </div>
              </div>
            ))}
        </div>

        <div>
          {/* {value.length < IMG_MAX_LIMIT && ( */}
            <UploadDropzone<OurFileRouter>
              className="dark:bg-zinc-800 py-2 ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
              endpoint="imageUploader"
              config={{ mode: "auto" }}
              content={{
                allowedContent({ isUploading }) {
                  if (isUploading)
                    return (
                      <p className="mt-2 text-sm text-slate-400 animate-pulse">
                        Img Uploading...
                      </p>
                    );
                },
              }}

              onClientUploadComplete={(res) => {
                // const data: UploadFileResponse[] | undefined = res;
                const data: UploadFileResponse[]  = res;

                const fileUrl = res.map((file) =>  file.url )
                
                // console.log(`File URL: ${fileUrl}`)
                // console.log("Files: ", res);
                // console.log("data: ", );

                if (data) onUpdateFile(data);
              }}
              onUploadError={(error: Error) => {
                console.log("error upload ===>",error.message);
                // toast({
                //   title: "Error",
                //   variant: "destructive",
                //   description: error.message,
                // });
              }}
              onUploadBegin={() => { }}
            />
          {/*  )} */}
        </div>

      </div>
    </>
  );
}
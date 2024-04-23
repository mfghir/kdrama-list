"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

import { UploadDropzone } from "@uploadthing/react";
import { UploadFileResponse } from "uploadthing/client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { onDeleteFile } from "@/lib/uploadthing";


//  @ts-ignore 
interface ImageUploadProps {
  onChange?: any;
  //  @ts-ignore 
  onRemove: (value: UploadFileResponse[]) => void;
  //  @ts-ignore 
  value: UploadFileResponse[];
}

export default function FileUpload({
  onChange,
  onRemove,
  value,
  // }: any) {
}: ImageUploadProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [imgUrl, setImgUrl] = useState('');
  const [imgDelete, setImgDelete] = useState('');

  const deleteHandler = async (url: any) => {
    try {
      await onDeleteFile(imgDelete);
      onRemove(url);

      // Remove the image URL from local storage
      localStorage.removeItem('imgUrl');
      setImgUrl('');
      setImgDelete('')

    } catch (error) {
      console.log(error);
      // toast({
      //   title: "Error",
      //   variant: "destructive",
      //   description: error.message,
      // });
    }
  };





  const onUpdateFile = (newFiles: any) => {
    const fileUrl = newFiles?.map((file: { url: any; }) => file.url)
    value = fileUrl[0]

    setImgUrl(fileUrl[0]);
    setImgDelete(newFiles[0].key)

    onChange(value);
    // onChange({value:fileUrl[0]});
    // onChange([...value, fileUrl[0]]);

    // Save the image URL in local storage
    localStorage.setItem('imgUrl', fileUrl[0]);
  };

  useEffect(() => {
    // Get the image URL from local storage
    const storedImgUrl = localStorage.getItem('imgUrl');

    // Set it as the initial state of the imgUrl variable
    if (storedImgUrl) setImgUrl(storedImgUrl);
  }, [imgUrl]);

  return (
    <>
      <div className="w-[90%] md:w-full md:h-full">
        <div className="mb-4 flex items-center gap-4 ">
          {imgUrl ?
            <div className="relative  rounded-md overflow-hidden">
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={deleteHandler}
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
                  src={imgUrl || ""}
                />
              </div>
            </div>
            : null
          }
        </div>

        <>
          {/* @ts-ignore  */}
          <UploadDropzone<OurFileRouter>
            className=" dark:bg-zinc-800 py-2 ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
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
              const data: UploadFileResponse[] | undefined = res;
              if (data) onUpdateFile(data);
            }}
            onUploadError={(error: Error) => {
              console.log("error upload ===>", error.message);
              toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
              });
            }}
            onUploadBegin={() => { }}
          />
        </>
      </div>
    </>
  );
}
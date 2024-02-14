"use client";

import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { UploadDropzone } from "./uploadthing";
import { UploadFileResponse } from "uploadthing/client";


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
  // console.log("newFiles",newFiles);

    onChange([...value, ...newFiles]);
  };
  return (
    <>
      <div>
        <div className="mb-4 flex items-center gap-4">
        {!!value?.length ?
          value?.map((item:any) => (
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
                  // src={item.fileUrl || ""}
                  src={item.url || ""}
                />
              </div>
            </div>
          ))
          :"nothing"
        }
        </div>

        <div>
          <UploadDropzone
            className="dark:bg-zinc-800 py-2 ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
            endpoint="imageUploader"
            config={{ mode: "auto" }}
            content={{
              allowedContent({ isUploading }) {
                if (isUploading)
                  return (
                    <>
                      <p className="mt-2 text-sm text-slate-400 animate-pulse">
                        Img Uploading...
                      </p>
                    </>
                  );
              },
            }}
            onClientUploadComplete={(res: any) => {
              const data = res;
              if (data) { onUpdateFile(data); }
            }}
            onUploadError={(error: Error) => {
              toast({
                title: "Error",
                variant: "destructive",
                description: error.message,
              });
            }}
            onUploadBegin={() => {
              // Do something once upload begins
            }}
          />
        </div>
      </div>
    </>
  );
}
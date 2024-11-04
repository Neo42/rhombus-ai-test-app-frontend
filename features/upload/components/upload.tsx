"use client";

import * as React from "react";

import { useDropzone } from "react-dropzone";

import { CloudUploadIcon } from "lucide-react";
import { useStore } from "zustand";

import { Input } from "@/components/ui/input";
import {
  UploadedFile,
  useUploadedFile,
} from "@/features/upload/hooks/useUploadedFile";

const Upload = () => {
  const { uploadedFile, setUploadedFile } = useStore(useUploadedFile);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setUploadedFile(file as unknown as UploadedFile);
    },
    [setUploadedFile],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
        ".xls",
      ],
    },
  });

  return (
    <div className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:cursor-pointer hover:bg-accent">
      <div {...getRootProps()}>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <CloudUploadIcon size={20} />
            <p className="text-sm text-muted-foreground">
              {uploadedFile ? uploadedFile.name : "Upload your file"}
            </p>
          </div>
          <Input {...getInputProps()} />
        </div>
      </div>
    </div>
  );
};

export default Upload;

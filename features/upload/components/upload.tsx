"use client";

import * as React from "react";

import { useDropzone } from "react-dropzone";

import { CloudUploadIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useFile } from "@/features/upload/hooks/useFile";
import { useUpload } from "@/features/upload/hooks/useUpload";

const Upload = () => {
  const { file, setFile } = useFile();
  const { isPending, isError, error } = useUpload();

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setFile(file);
    },
    [setFile],
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
    <div
      {...getRootProps()}
      className="flex h-full w-full items-center justify-center rounded-lg"
    >
      <div className="flex flex-col items-center justify-center">
        <CloudUploadIcon size={20} />
        <p className="text-sm text-muted-foreground">
          {file ? file.name : "Click or drag and drop your file here"}
        </p>
        {isPending && (
          <p className="text-sm text-muted-foreground">Uploading...</p>
        )}
        {isError && (
          <p className="text-sm text-destructive">
            {error.detail || "Upload failed"}
          </p>
        )}
      </div>
      <Input {...getInputProps()} />
    </div>
  );
};

export default Upload;

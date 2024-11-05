"use client";

import * as React from "react";

import { useDropzone } from "react-dropzone";

import { CloudUploadIcon } from "lucide-react";
import { useStore } from "zustand";

import { Input } from "@/components/ui/input";
import { useFile } from "@/features/upload/hooks/useFile";
import { useUpload } from "@/features/upload/hooks/useUpload";

const Upload = () => {
  const { file, setFile } = useStore(useFile);
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
      className="flex h-full w-full items-center justify-center rounded-lg transition-colors"
    >
      <div className="flex flex-col items-center justify-center">
        <CloudUploadIcon size={20} />
        <p className="text-sm text-muted-foreground">
          {file ? file.name : "Upload your file"}
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

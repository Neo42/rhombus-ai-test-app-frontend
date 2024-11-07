"use client";

import * as React from "react";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { DataTable } from "@/features/inference/components/data-table";
import { UploadDropzone } from "@/features/inference/components/upload-dropzone";
import { useFile } from "@/features/inference/hooks/use-file";
import { useFileData } from "@/features/inference/hooks/use-file-data";
import { useToggleDialog } from "@/features/inference/hooks/use-toggle-dialog";
import { useUpload } from "@/features/inference/hooks/use-upload";

export default function Home() {
  const { file, removeFile } = useFile();
  const { isUploadDialogOpen, setIsUploadDialogOpen } = useToggleDialog();
  const { mutate: uploadFile } = useUpload();
  const { data: fileData, isLoading } = useFileData();
  const [hasNotified, setHasNotified] = React.useState(false);

  const handleUpload = () => {
    if (file) uploadFile(file);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) removeFile();
    setIsUploadDialogOpen(open);
  };

  if (fileData?.processing_status === "INFERENCE_FAILED" && !hasNotified) {
    toast.error(`Processing failed: ${fileData.error_message}`);
    setHasNotified(true);
  }
  if (fileData?.processing_status === "INFERRED" && !hasNotified) {
    toast.success(`Inference for ${fileData.original_filename} completed.`);
    setHasNotified(true);
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center px-20">
      {isLoading ||
      fileData?.processing_status === "INFERRING" ||
      fileData?.processing_status === "UPLOADING" ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <p>Processing your file...</p>
            <Loader2 className="animate-spin" size={16} />
          </div>
          <p className="text-sm text-muted-foreground">
            This may take 30 seconds or more for a very large file.
          </p>
        </div>
      ) : null}

      {fileData === undefined ? (
        <Card>
          <CardHeader>
            <CardTitle>Infer.io</CardTitle>
            <CardDescription>
              Infer your spreadsheet data types with ease
            </CardDescription>
            <CardContent className="flex justify-center py-0 pt-2">
              <Dialog open={isUploadDialogOpen} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                  <Button className="rounded-full shadow" variant="outline">
                    Try it out
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px]">
                  <DialogHeader>
                    <DialogTitle>Upload your files</DialogTitle>
                    <DialogDescription>
                      Upload a CSV or Excel file to start inference.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex h-32 w-full rounded-lg border-2 border-dashed border-border transition-colors hover:cursor-pointer hover:bg-accent">
                    <UploadDropzone />
                  </div>
                  <DialogFooter className="space-x-3">
                    {file && (
                      <Button variant="outline" onClick={() => removeFile()}>
                        Delete
                      </Button>
                    )}
                    <Button onClick={handleUpload} disabled={!file}>
                      Upload and Infer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </CardHeader>
        </Card>
      ) : null}

      {fileData?.processing_status === "INFERRED" ? <DataTable /> : null}
    </div>
  );
}

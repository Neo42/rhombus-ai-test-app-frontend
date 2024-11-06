"use client";

import { Loader2 } from "lucide-react";

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
import { UploadDropzone } from "@/features/inference/components/upload-dropzone";
import { useFile } from "@/features/inference/hooks/use-file";
import { useFileData } from "@/features/inference/hooks/use-file-data";
import { useToggleDialog } from "@/features/inference/hooks/use-toggle-dialog";
import { useUpload } from "@/features/inference/hooks/use-upload";

export default function Home() {
  const { file, removeFile } = useFile();
  const { open, setOpen } = useToggleDialog();
  const { mutate: uploadFile } = useUpload();
  const { data: fileData, isLoading } = useFileData();

  const handleUpload = () => {
    if (file) uploadFile(file);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) removeFile();
    console.log(open);
    setOpen(open);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {isLoading || fileData?.processing_status === "INFERRING" ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <p>Processing your file...</p>
            <Loader2 className="animate-spin" size={16} />
          </div>
          <p className="text-sm text-muted-foreground">
            This would take up to 30 seconds for a very large file.
          </p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Infer.io</CardTitle>
            <CardDescription>
              Infer your spreadsheet data types with ease
            </CardDescription>
            <CardContent className="flex justify-center py-0 pt-2">
              <Dialog open={open} onOpenChange={handleOpenChange}>
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
      )}
    </div>
  );
}

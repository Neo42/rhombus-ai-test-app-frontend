"use client";

import { useStore } from "zustand";

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
import Upload from "@/features/upload/components/upload";
import { useUploadedFile } from "@/features/upload/hooks/useUploadedFile";

export default function Home() {
  const { uploadedFile } = useStore(useUploadedFile);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Infer.io</CardTitle>
          <CardDescription>
            Infer your spreadsheet data types in one-click.
          </CardDescription>
          <CardContent className="flex justify-center pb-4 pt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full shadow" variant="outline">
                  Upload File
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload your files</DialogTitle>
                  <DialogDescription>
                    Upload a CSV or Excel file to start inference.
                  </DialogDescription>
                </DialogHeader>
                <Upload />
                {uploadedFile && (
                  <DialogFooter className="sm:justify-center">
                    <Button>Continue</Button>
                  </DialogFooter>
                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}

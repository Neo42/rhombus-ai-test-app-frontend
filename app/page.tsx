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
  const { uploadedFile, setUploadedFile } = useStore(useUploadedFile);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Infer.io</CardTitle>
          <CardDescription>
            Infer your spreadsheet data types in one-click.
          </CardDescription>
          <CardContent className="flex justify-center py-0 pt-2">
            <Dialog>
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
                <div className="flex h-32 w-full rounded-lg border-2 border-dashed border-border hover:cursor-pointer hover:bg-accent">
                  <Upload />
                </div>
                <DialogFooter className="space-x-3">
                  {uploadedFile && (
                    <Button
                      variant="outline"
                      onClick={() => setUploadedFile(null)}
                    >
                      Delete
                    </Button>
                  )}
                  <Button disabled={!uploadedFile}>Upload and Infer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}

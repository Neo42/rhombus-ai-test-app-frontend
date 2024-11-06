import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomType } from "@/features/inference/hooks/use-custom-type";
import { useFile } from "@/features/inference/hooks/use-file";
import { useToggleDialog } from "@/features/inference/hooks/use-toggle-dialog";
import { useUpdateCustomType } from "@/features/inference/hooks/use-update-custom-type";

interface CustomDataTypeDialogProps {
  children: React.ReactNode;
}

export function CustomDataTypeDialog({ children }: CustomDataTypeDialogProps) {
  const { customType, setCustomType, columnName } = useCustomType();
  const { mutate: updateCustomType } = useUpdateCustomType();
  const { fileId } = useFile();
  const { isCustomTypeDialogOpen, setIsCustomTypeDialogOpen } =
    useToggleDialog();

  const handleUpdateCustomType = async () => {
    if (fileId) {
      updateCustomType({ fileId, columnName, customType });
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) setCustomType("");
    setIsCustomTypeDialogOpen(open);
  };

  return (
    <Dialog open={isCustomTypeDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Edit Column Type</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Column Type
            </Label>
            <Input
              id="name"
              value={customType}
              className="col-span-3"
              onChange={(e) => setCustomType(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsCustomTypeDialogOpen(false);
              setCustomType("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateCustomType}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

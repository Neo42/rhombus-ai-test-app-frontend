import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { z, ZodError } from "zod";

import {
  updateColumnType,
  DataTypeOverrideRequest,
  DataTypeOverrideResponse,
} from "@/features/inference/api/update-column-type";
import { useCustomType } from "@/features/inference/hooks/use-custom-type";
import { useFile } from "@/features/inference/hooks/use-file";
import { useToggleDialog } from "@/features/inference/hooks/use-toggle-dialog";
import type { APIError } from "@/lib/api-client";
import { handleApiError } from "@/lib/error-handler";

const customTypeSchema = z.object({
  customType: z
    .string()
    .min(1, "Custom type must be provided")
    .regex(/^[a-zA-Z]/, "Custom type must start with a letter"),
});

export const useUpdateCustomType = () => {
  const { setIsCustomTypeDialogOpen } = useToggleDialog();
  const { setCustomType } = useCustomType();
  const queryClient = useQueryClient();
  const { fileId } = useFile();

  return useMutation<
    DataTypeOverrideResponse,
    APIError | ZodError,
    DataTypeOverrideRequest
  >({
    mutationFn: async (data) => {
      try {
        await customTypeSchema.parseAsync({ customType: data.customType });
        return await updateColumnType(data);
      } catch (error) {
        if (error instanceof ZodError) {
          throw error;
        }
        return handleApiError(error);
      }
    },
    onError: (error) => {
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.detail);
      }
    },
    onSuccess: ({ column_name: columnName, custom_type: customType }) => {
      setIsCustomTypeDialogOpen(false);
      setCustomType("");
      toast.success(
        `Data type for "${columnName}" updated to "${customType}" successfully.`,
      );
      queryClient.invalidateQueries({ queryKey: ["file", fileId] });
    },
  });
};

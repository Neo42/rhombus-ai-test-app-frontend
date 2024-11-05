import { HTTPError, TimeoutError } from "ky";

import type { APIError } from "@/lib/api-client";

export async function handleApiError(error: unknown): Promise<never> {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    throw {
      detail:
        "Unable to connect to server. Please check your internet connection.",
      code: "CONNECTION_ERROR",
    } as APIError;
  }

  if (error instanceof HTTPError) {
    const errorData = await error.response.json();
    throw {
      detail: errorData.detail || error.message,
      code: errorData.code || error.response.status.toString(),
    } as APIError;
  }

  if (error instanceof TimeoutError) {
    throw {
      detail: "Request timed out",
      code: "TIMEOUT_ERROR",
    } as APIError;
  }

  if (error instanceof Error) {
    throw {
      detail: error.message,
      code: "UNKNOWN_ERROR",
    } as APIError;
  }

  throw {
    detail: "An unexpected error occurred",
    code: "UNKNOWN_ERROR",
  } as APIError;
}

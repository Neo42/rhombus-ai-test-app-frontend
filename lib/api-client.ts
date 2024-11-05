import ky from "ky";

export interface APIError {
  detail: string;
  code: string;
}

export const apiClient = ky.create({
  prefixUrl: "http://localhost:8000/api",
  credentials: "include",
  mode: "cors",
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          const error = (await response.json()) as APIError;
          throw {
            detail: error.detail || response.statusText,
            code: error.code || response.status.toString(),
          } as APIError;
        }
        return response;
      },
    ],
  },
  retry: {
    limit: 3,
    methods: ["get", "post", "patch"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  timeout: 30000,
});

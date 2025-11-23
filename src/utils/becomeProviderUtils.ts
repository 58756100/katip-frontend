// src/utils/becomeProviderUtils.ts
import axios, { AxiosError } from "axios";

export interface BecomeProviderPayload {
  displayName: string;
  serviceCategory: string;
  bio?: string;
}

export async function submitBecomeProvider(payload: BecomeProviderPayload) {
  try {
    const res = await axios.post(
      "/api/become-provider",
      payload,
      {
        withCredentials: true, // ensure cookies cross domains
        validateStatus: () => true // allow manual control of response validation
      }
    );

    // Handle backend errors cleanly
    if (res.status < 200 || res.status >= 300) {
      console.error("submitBecomeProvider ERROR RESPONSE:", {
        status: res.status,
        data: res.data,
        headers: res.headers,
      });

      throw new Error(res.data?.message || "Failed to become provider");
    }

    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    console.error("submitBecomeProvider AXIOS ERROR:", {
      message: error.message,
      name: error.name,
      code: error.code,
      config: error.config,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      stack: error.stack,
    });

    throw new Error(
     
      error.message ||
      "Unexpected error"
    );
  }
}

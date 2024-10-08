"use server";

import axios from "axios";
import dotenv from "dotenv";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

dotenv.config();

axios.defaults.baseURL =
  process.env.BACKEND_PRIVATE_HOST || "http://localhost:3000";

export async function redirectProxy() {
  revalidatePath("/");
}

export async function logout() {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    await axios.post(
      "/auth/logout",
      {},
      {
        headers: {
          Cookie: cookie,
        },
      }
    );
    revalidatePath("/");
  } catch (error) {
    // console.error(error);
    console.log("Failed to logout");
  }
}

export async function getCurrentUser() {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    const response = await axios.get("/auth/status", {
      headers: {
        Cookie: cookie,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    console.log("Failed to retrieve current user");
    return null;
  }
}

export async function getAllUsers(): Promise<User[] | null> {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    const response = await axios.get("/users", {
      headers: {
        Cookie: cookie,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    console.log("Failed to retrieve users");
    return null;
  }
}

export async function createUser(user: User) {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    console.log(user);
    const response = await axios.post(`/users`, user, {
      headers: {
        Cookie: cookie,
      },
    });
    // console.log(response.data);
    revalidatePath("/");
    return response.data;
  } catch (error) {
    // console.error(error);
    console.log("Failed to create user");
    return null;
  }
}

export async function updateUser(userId: string, user: User) {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    console.log(user);
    console.log(userId);
    const response = await axios.put(`/users/${userId}`, user, {
      headers: {
        Cookie: cookie,
      },
    });
    console.log(response.data);
    revalidatePath("/");
  } catch (error) {
    // console.error(error);
    console.log("Failed to update user");
    return null;
  }
}

export async function deleteUser(userId: string) {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    await axios.delete(`/users/${userId}`, {
      headers: {
        Cookie: cookie,
      },
    });
    revalidatePath("/");
  } catch (error) {
    // console.error(error);
    console.log("Failed to delete user");
  }
}

export async function getUserAudio() {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    const response = await axios.get("/audio", {
      headers: {
        Cookie: cookie,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    console.log("Failed to get user audio");
    return null;
  }
}

export async function deleteAudio(audioId: string) {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  console.log(`Deleting audio with id: ${audioId}`);
  try {
    await axios.delete(`/audio/${audioId}`, {
      headers: {
        Cookie: cookie,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log("Failed to delete audio");
  }
}

export async function uploadAudio(formData: FormData) {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    const response = await axios.post("/audio", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Cookie: cookie,
      },
      withCredentials: true,
    });
    console.log("Uploaded file successful:", response.data);
    revalidatePath("/");
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

export async function streamAudio(audioId: string) {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    const response = await axios.get(`/audio/${audioId}/stream`, {
      headers: {
        Cookie: cookie,
      },
      responseType: "blob",
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to stream audio:", error);
    return null;
  }
}

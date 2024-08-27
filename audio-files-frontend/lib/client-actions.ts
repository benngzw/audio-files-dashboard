import axios from "axios";

export async function loginClient(
  username: string,
  password: string,
  backendHost: string
) {
  try {
    console.log(`Posting to ${backendHost}/auth/login`);
    const response = await axios.post(
      `${backendHost}/auth/login`,
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

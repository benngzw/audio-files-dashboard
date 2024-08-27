import axios from "axios";

export async function loginClient(username: string, password: string) {
  try {
    await axios.post(
      "http://localhost:3000/auth/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    console.log("logged in on client");
  } catch (error) {
    console.error(error);
  }
}

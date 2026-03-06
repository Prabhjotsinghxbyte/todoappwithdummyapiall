import type { ILogin } from "@/assets/Types";
import axios from "axios";

export const apiUrl = "https://dummyjson.com/";

const userLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<ILogin> => {
  const data = await axios.post(
    `${apiUrl}user/login`,
    { username: username, password: password },
    { headers: { "Content-Type": "application/json" } },
  );
  return data.data;
};

const GetUserDetails = async (
  accessToken: string | null,
  refreshToken: string | null,
) => {
  if (accessToken !== "undefined" || refreshToken !== "undefined") {
    try {
      const data = await axios.get(`${apiUrl}auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("usingAccessToken", data);
      return data.data;
    } catch (error) {
      console.log("data not fetch", error);
    }
  }
};

const GetUserTodos = async (userId: number) => {
  if (userId === null) {
    throw new Error("Invalid userId");
  }
  const data = await fetch(`${apiUrl}users/${userId}/todos`).then((res) =>
    res.json(),
  );

  return data;
};

export { GetUserDetails, GetUserTodos, userLogin };

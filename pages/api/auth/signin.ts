import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import underscorize from "../../../utils/underscorize";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>>
) {
  try {
    const loginApi = `${process.env.API_URL}/auth/login`;
    const userApi = `${process.env.API_URL}/auth/user`;

    // Simplifies API to front end variable naming conventions
    const underscoredData = underscorize(req.body.body);

    const loginRes = await axios.post(loginApi as string, underscoredData);
    if (loginRes.data) {
      const loginData = loginRes.data;
      const token = loginData.token;

      // Fetch the user with the new token 
      const userRes = await axios.get(userApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (userRes?.data?.user) {
        res.status(200).send({
          user: userRes.data.user,
          token,
        });
      } else {
        throw new Error("Could not sign in")
      }
    }
  } catch (e: any) {
    const defaultMessage = "Something went wrong, try again in a little while";
    const errorMessage = e?.response?.data?.message;
    res.status(500).send({ message: errorMessage || defaultMessage});
  }
}

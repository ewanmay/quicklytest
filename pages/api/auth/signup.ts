// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import underscorize from "../../../utils/underscorize";

interface ApiDataI {
  token?: string;
  user?: Record<string, string>;
  message?: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiDataI>
) {
  const api = `${process.env.API_URL}/auth/signup`;
  const underscoredData = underscorize(req.body.body);

  try {
    const apiRes = await axios.post(api as string, {
      ...underscoredData,
      // TODO: Add this field to signup process
      company: { name: "default" },
    });

    if (apiRes.data) {
      res.status(200).send(apiRes.data);
    } else {
      res.status(500);
    }
  } catch (e: any) {
    const defaultMessage = "Something went wrong, try again in a little while";
    const errorMessage = e?.response?.data?.message;
    res.status(500).send({ message: errorMessage || defaultMessage });
  }
}

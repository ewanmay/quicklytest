import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import underscorize from "../../../utils/underscorize";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>>
) {
  try {
    const api = `${process.env.API_URL}/auth/login`;
    const underscoredData = underscorize(req.body.body);

    const apiRes = await axios.post(api as string, underscoredData);
    if (apiRes.data) {
      res.status(200).send(apiRes.data);
    } else {
      res.status(500);
    }
    console.log(apiRes);
  } catch (e) {
    res.status(500);
  }
}

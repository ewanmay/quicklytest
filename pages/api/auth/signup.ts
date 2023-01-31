// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import underscorize from "../../../utils/underscorize";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const api = `${process.env.API_URL}/auth/signup`;
  const underscoredData = underscorize(req.body.body);

  try {
    const apiRes = await axios.post(api as string, {
      ...underscoredData,
      // This should be programmed in, but ignore it for now
      company: { name: "test" },
    });

    if (apiRes.data) {
      res.status(200).send(apiRes.data);
    } else {
      res.status(500);
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}

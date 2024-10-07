import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  const authorization = req.headers.get('authorization');

  const apiHost = process.env.API_HOST;
  const apiPath = '/v1alpha2/mentors/programs';

  try {
    const res = await axios.get(apiHost + apiPath, {
      headers: {
        Authorization: 'Bearer ' + authorization,
        "Content-Type": 'application/json',
      }
    });

    const { status, data, headers } = res;
    return NextResponse.json(data, { status, headers });
  } catch (error) {
    const { status, data } = error.response;
    return NextResponse.json(data, { status });
  }
}
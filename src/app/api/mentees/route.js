import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, params) {
  const authorization = req.headers?.get('authorization');
  const url = new URL(req.url);
  const programId = url.searchParams.get('programId');

  const apiHost = process.env.API_HOST;
  const apiPath = `/v1alpha1/mentors/me/mentees?program_id=${programId}&offset=0&limit=50`;

  try {
    const res = await axios.get(apiHost + apiPath, {
      headers: {
        Authorization: 'Bearer ' + authorization,
        "Content-Type": 'application/json',
      }
    })
    const { status, data, headers } = res;
    return NextResponse.json(data, { status, headers });
  } catch (error) {
    const { status, data } = error.response;
    return NextResponse.json(data, { status });
  }
}
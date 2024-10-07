import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const reqBody = await req.json();
  
  const apiHost = process.env.API_HOST;
  const apiPath = "/v1alpha1/mentors/login";

  try {
    const res = await axios.post(apiHost + apiPath, reqBody, {
      headers: {"Content-Type": 'application/json'}
    });

    const { status, data, headers } = res;
    return NextResponse.json(data, { status, headers });
  } catch(error) {
    const { status, data } = error.response;
    return NextResponse.json(data, { status });
  }
}
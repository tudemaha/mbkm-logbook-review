import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  const authorization = req.headers?.get('authorization');
  const url = new URL(req.url);
  const penawaranId = url.searchParams.get('penawaranId');

  const apiHost = process.env.API_HOST;
  const apiPath = `/studi/monthly-reports?id_reg_penawaran=${penawaranId}`;

  try {
    const res = await axios.get(apiHost + apiPath, {
      headers: {
        Authorization: 'Bearer ' + authorization,
        "Content-Type": 'application/json',
      }
    })
    const { status, data } = res;
    return NextResponse.json(data, { status });
  } catch (error) {
    const { status, data } = error.response;
    return NextResponse.json(data, { status });
  }
}
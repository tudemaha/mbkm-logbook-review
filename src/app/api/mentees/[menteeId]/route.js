import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const authorization = req.headers?.get('authorization');
  const url = new URL(req.url);
  const activityId = url.searchParams.get('activityId');
  const { menteeId } = params ;

  const apiHost = process.env.API_HOST;
  const apiPath = `/v1alpha2/mentors/activity/${activityId}/mentees/${menteeId}`;

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
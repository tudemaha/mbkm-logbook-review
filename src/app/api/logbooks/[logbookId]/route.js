import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const authorization = req.headers?.get('authorization');
  const { logbookId } = params;

  const apiHost = process.env.API_HOST;
  const apiPath = `/studi/monthly-reports/${logbookId}`;

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

export async function POST(req, { params }) {
  const body = await req.json();
  const authorization = req.headers?.get('authorization');
  const { logbookId } = params;

  const apiHost = process.env.API_HOST;
  const apiPath = `/state/next`;

  const payload = {
    workflow_key: "studi_monthly_report_state",
    object_id: logbookId,
    current_state: body.current_state,
    event: body.event,
    notes: body.notes,
  }
  
  try {
    const res = await axios.post(apiHost + apiPath, payload, {
      headers: {
        Authorization: 'Bearer ' + authorization,
        "Content-Type": 'application/json',
      }
    });
    const { status, data } = res;
    return NextResponse.json(data, { status });
  } catch (error) {
    const { status, data } = error.response;
    return NextResponse.json(data, { status });
  }
}
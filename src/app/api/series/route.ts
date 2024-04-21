import { SeriesFull } from "@domain/models/series";
import { NextRequest } from "next/server";
import StatusCodes from "../_internal/shared/StatusCodes";
import dbContext from "../_internal/shared/db/dbContext";
import handleServerError from "../_internal/shared/errors/handleServerError";

export async function POST(request: NextRequest) {
  const series: SeriesFull = await request.json();
  if (series.adventures === undefined) series.adventures = [];
  try {
    await dbContext.series.create(series);
    return new Response(undefined, { status: StatusCodes.Created });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function GET() {
  try {
    const adventures = await dbContext.series.list();
    return Response.json(adventures);
  } catch (error) {
    return handleServerError(error);
  }
}

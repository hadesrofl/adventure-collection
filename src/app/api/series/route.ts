import { NextRequest } from "next/server";
import StatusCodes from "../_internal/shared/StatusCodes";
import handleServerError from "../_internal/shared/errors/handleServerError";
import { SeriesFull, seriesRepository } from "@features/series";

export async function POST(request: NextRequest) {
  const series: SeriesFull = await request.json();
  if (series.adventures === undefined) series.adventures = [];
  try {
    await seriesRepository.create(series);
    return new Response(undefined, { status: StatusCodes.Created });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function GET() {
  try {
    const adventures = await seriesRepository.list();
    return Response.json(adventures);
  } catch (error) {
    return handleServerError(error);
  }
}

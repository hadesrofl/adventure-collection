import IdParamProps from "@app/_shared/idParam";
import StatusCodes from "@app/api/_internal/shared/StatusCodes";
import dbContext from "@repositories/dbContext";
import handleServerError from "@app/api/_internal/shared/errors/handleServerError";
import { NextRequest } from "next/server";
import { SeriesFull } from "@features/series";

export async function PUT(request: NextRequest) {
  const series: SeriesFull = await request.json();
  try {
    await dbContext.series.edit(series);
    return new Response(undefined, { status: StatusCodes.NoContent });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: IdParamProps) {
  const { id } = params;
  try {
    await dbContext.series.deleteById(Number.parseInt(id));
    return new Response(undefined, { status: StatusCodes.NoContent });
  } catch (error) {
    return handleServerError(error);
  }
}

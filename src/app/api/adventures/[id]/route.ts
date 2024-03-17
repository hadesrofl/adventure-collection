import { NextRequest } from "next/server";
import handleServerError from "../../_internal/shared/errors/handleServerError";
import dbContext from "../../_internal/shared/db/dbContext";
import StatusCodes from "../../_internal/shared/StatusCodes";
import IdParamProps from "@app/_shared/idParam";
import { AdventureFull } from "@domain/models/adventure";

export async function GET(_request: NextRequest, { params }: IdParamProps) {
  const { id } = params;
  try {
    const adventure = await dbContext.adventures.getById(Number.parseInt(id));
    return Response.json(adventure, { status: StatusCodes.OK });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function PUT(request: NextRequest) {
  const adventure: AdventureFull = await request.json();
  try {
    await dbContext.adventures.edit(adventure);
    return new Response(undefined, { status: StatusCodes.NoContent });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: IdParamProps) {
  const { id } = params;
  try {
    await dbContext.adventures.deleteById(Number.parseInt(id));
    return new Response(undefined, { status: StatusCodes.NoContent });
  } catch (error) {
    return handleServerError(error);
  }
}

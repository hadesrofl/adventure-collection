import { NextRequest } from "next/server";
import handleServerError from "../../_internal/shared/errors/handleServerError";
import StatusCodes from "../../_internal/shared/StatusCodes";
import IdParamProps from "@app/_shared/idParam";
import { AdventureFull } from "@features/adventures";
import { adventureRepository } from "@features/adventures/repositoryExports";

export async function GET(_request: NextRequest, { params }: IdParamProps) {
  const { id } = params;
  try {
    const adventure = await adventureRepository.getById(Number.parseInt(id));
    return Response.json(adventure, { status: StatusCodes.OK });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function PUT(request: NextRequest) {
  const adventure: AdventureFull = await request.json();
  try {
    await adventureRepository.edit(adventure);
    return new Response(undefined, { status: StatusCodes.NoContent });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: IdParamProps) {
  const { id } = params;
  try {
    await adventureRepository.deleteById(Number.parseInt(id));
    return new Response(undefined, { status: StatusCodes.NoContent });
  } catch (error) {
    return handleServerError(error);
  }
}

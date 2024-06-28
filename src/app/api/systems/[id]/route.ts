import IdParamProps from "@app/_shared/idParam";
import StatusCodes from "@app/api/_internal/shared/StatusCodes";
import handleServerError from "@app/api/_internal/shared/errors/handleServerError";
import { NextRequest } from "next/server";
import { SystemFull, systemRepository } from "@features/systems";

export async function PUT(request: NextRequest) {
  const system: SystemFull = await request.json();
  try {
    await systemRepository.edit(system);
    return new Response(undefined, { status: StatusCodes.NoContent });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: IdParamProps) {
  const { id } = params;
  try {
    await systemRepository.deleteById(Number.parseInt(id));
    return new Response(undefined, { status: StatusCodes.NoContent });
  } catch (error) {
    return handleServerError(error);
  }
}

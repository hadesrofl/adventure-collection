import { NextRequest } from "next/server";
import StatusCodes from "../_internal/shared/StatusCodes";
import handleServerError from "../_internal/shared/errors/handleServerError";
import { SystemFull, systemRepository } from "@features/systems";

export async function POST(request: NextRequest) {
  const system: SystemFull = await request.json();
  if (system.adventures === undefined) system.adventures = [];
  try {
    await systemRepository.create(system);
    return new Response(undefined, { status: StatusCodes.Created });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function GET() {
  try {
    const systems = await systemRepository.list();
    return Response.json(systems);
  } catch (error) {
    return handleServerError(error);
  }
}

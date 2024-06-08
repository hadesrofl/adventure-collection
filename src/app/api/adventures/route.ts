import { NextRequest } from "next/server";
import handleServerError from "../_internal/shared/errors/handleServerError";
import StatusCodes from "../_internal/shared/StatusCodes";
import { AdventureFull } from "@features/adventures";
import { adventureRepository } from "@features/adventures/adventureRepository";

export async function POST(request: NextRequest) {
  const adventure: AdventureFull = await request.json();
  try {
    await adventureRepository.create(adventure);
    return new Response(undefined, { status: StatusCodes.Created });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function GET() {
  try {
    const adventures = await adventureRepository.list();
    return Response.json(adventures);
  } catch (error) {
    return handleServerError(error);
  }
}

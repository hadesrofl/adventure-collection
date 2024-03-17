import { NextRequest } from "next/server";
import handleServerError from "../_internal/shared/errors/handleServerError";
import StatusCodes from "../_internal/shared/StatusCodes";
import dbContext from "../_internal/shared/db/dbContext";
import { AdventureFull } from "@domain/models/adventure";

export async function POST(request: NextRequest) {
  const adventure: AdventureFull = await request.json();
  try {
    await dbContext.adventures.create(adventure);
    return new Response(undefined, { status: StatusCodes.Created });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function GET() {
  try {
    const adventures = await dbContext.adventures.list();
    return Response.json(adventures);
  } catch (error) {
    return handleServerError(error);
  }
}

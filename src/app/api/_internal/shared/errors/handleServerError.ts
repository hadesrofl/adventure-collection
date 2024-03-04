import StatusCodes from "../StatusCodes";
import ServerError from "./ServerError";

const handleServerError = (error: unknown, status?: StatusCodes) => {
  const serverErrorStatus = status ?? StatusCodes.InternalServerError;
  return Response.json(
    new ServerError(error as string, serverErrorStatus).toJSON(),
    { status: serverErrorStatus }
  );
};

export default handleServerError;

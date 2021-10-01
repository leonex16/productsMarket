import { ResponseStatus } from "../interfaces/ResponseStatus";

export const handleResponse = async <T>(promise: Promise<Response>) => {
  const responseStatus: ResponseStatus<T> = {
    error: null,
    body: null,
    status: 'error',
    statusCode: 400
  };
  try {
    const resp: Response = await promise;
    console.log
    const json: T = await resp.json();
    responseStatus.status = 'success';
    responseStatus.statusCode = resp.status;
    responseStatus.body = json;
    return responseStatus;
  } catch (error) {
    console.error(error);
    responseStatus.error = error;
    return responseStatus;
  }
};
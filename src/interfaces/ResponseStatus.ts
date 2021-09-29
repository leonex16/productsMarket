export interface ResponseStatus<T> {
  error: unknown;
  status: 'success' | 'error';
  statusCode: number;
  body: T | null;
}
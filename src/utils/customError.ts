export class ServerError extends Error {
  status;
  data;
  constructor(status: number, message: string, data?: Object) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

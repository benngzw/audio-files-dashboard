export class InvalidCredentialsError extends Error {
  status: number;

  constructor(message: string = "Invalid Credentials") {
    super(message);
    this.name = "InvalidCredentialsError";
    this.status = 401;
  }
}

export class UnauthorizedError extends Error {
  status: number;

  constructor(message: string = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.status = 401;
  }
}

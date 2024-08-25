export class InvalidCredentialsError extends Error {
  status: number;

  constructor(message: string = "Invalid credentials") {
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

export class AccessDeniedError extends Error {
  status: number;

  constructor(message: string = "Access Denied") {
    super(message);
    this.name = "AccessDeniedError";
    this.status = 403;
  }
}

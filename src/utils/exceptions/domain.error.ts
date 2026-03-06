export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly httpStatus: number,
  ) {
    super(message);
  }
}

export class UserNotFoundError extends DomainError {
  constructor(userId: string) {
    super(
      `User with id ${userId} not found`,
      'USER_NOT_FOUND',
      404,
    );
  }
}
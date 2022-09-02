export class Exception {
  constructor(public code: number, public message: string) {}

  static badRequest(message: string) {
    return new Exception(400, message);
  }

  static unauthorized(message: string = "Unauthorized.") {
    return new Exception(401, message);
  }

  static internal(message: string = "Something went wrong.") {
    return new Exception(500, message);
  }
}

export class RequestError {
  constructor(public code: number, public message: string) {
    this.code = code;
    this.message = message;
  }
}

declare global {
  interface RequestError {
    code: number;
    message: string;
  }
}

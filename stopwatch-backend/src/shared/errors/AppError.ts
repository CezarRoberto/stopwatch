export class AppError {
    public readonly message: string;
    public readonly statusCode: number;
    public readonly code: string | undefined = undefined;
  
    constructor(message: string, statusCode = 400, code = '') {
      this.message = message;
      this.statusCode = statusCode;
      this.code = code || undefined;
    }
  }
  
  
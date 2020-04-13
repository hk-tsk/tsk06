export const ErrorType = { General: 0, Unauthorized: 1, Forbidden: 2 };

export class ApiException  {
  // tslint:disable-next-line: variable-name
  private _error: string;
  private errorType: number;

  constructor(error: string, errorType: number = ErrorType.General) {
    this._error = error || " raise an error";
    this.errorType = errorType;
  }

  public get Error(): string {
    return this._error;
  }

  public IsGeneralError() {
    return this.errorType === ErrorType.General;
  }

  public IsUnauthorizedError() {
    return this.errorType === ErrorType.Unauthorized;
  }
}

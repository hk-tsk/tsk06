
export class ApiException {

    public get Error(): string {
        return this._error;
    }
    // tslint:disable-next-line: variable-name
    private _error: string;

    /**
     *
     */
    constructor(error: string) {
        this._error = error;
    }

}
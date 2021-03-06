/// <reference path="../../typings/index.d.ts" />

import APISearchIm from "./APISearchIm";

export class APISearch {
    public im: APISearchIm;

    private _clientId: string;

    constructor (clientId: string) {
        this._clientId = clientId;
        this.im = new APISearchIm(clientId);
    };

    public auth(token?: string, projectKey?: string): void {
        this.im.auth(token, projectKey);
    }
}

export default APISearch;

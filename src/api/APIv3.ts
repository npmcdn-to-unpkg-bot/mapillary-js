/// <reference path="../../typings/index.d.ts" />

import * as falcor from "falcor";
import * as HttpDataSource from "falcor-http-datasource";

import {Urls} from "../Utils";

export class APIv3 {
    private _clientId: string;
    private _model: falcor.Model;
    private _hProperties: string[] = [
        "user",
        "calt",
        "rotation",
        "cca",
        "cfocal",
        "atomic_scale",
        "camera_mode",
        "merge_version",
        "orientation",
        "width",
        "height",
        "captured_at",
        "fmm35",
        "l",
        "ca",
        "merge_cc",
        "cl",
        "gpano",
        "sequence",
    ];

    constructor (clientId: string) {
        this._clientId = clientId;

        this._model =
            new falcor.Model({
                source: new HttpDataSource(Urls.falcorModel(clientId), {
                    crossDomain: true,
                    withCredentials: false,
                }),
            });

        this._model = (<any> this._model).batch(40);
    };

    public get model(): falcor.Model {
        return this._model;
    }

    public get clientId(): string {
        return this._clientId;
    }

    public imagesByImageH(im: string): void {
        console.log(im);
        this.model.get(["imageByKey", im, "h", {from: 0, to: 100}, this._hProperties])
            .then(
                (response: any) => {
                    if (!response) {
                        return;
                    }
                    console.log(Object.keys(response.json.imageByKey[im].h).length);
                    let images: any = response.json.imageByKey[im].h;
                    let sequences: {[key: string]: boolean} = {};

                    let full: boolean = true;
                    for (let i in images) {
                        if (!images.hasOwnProperty(i)) {
                            continue;
                        }
                        let image: any = images[i];
                        if (image) {
                            sequences[image.sequence[1]] = true;
                        } else {
                            full = false;
                            break;
                        }
                    }
                    console.log("FULL:", full);

                    let paths: any = [];

                    for (let sequence of Object.keys(sequences)) {
                        paths.push([
                            "sequenceByKey",
                            sequence,
                            ["key", "keys"],
                        ]);
                    }

                    this.model.get.apply(this.model, paths)
                        .then(
                            (sResponse: any) => {
                                console.log(sResponse);
                            });
                    console.log(paths);
                });
    }

    public imagesByH(h: string): void {
        console.log(h);
        this.model.get(["imagesByH", h, {from: 0, to: 100}, this._hProperties])
            .then(
                (response: any) => {
                    if (!response) {
                        return;
                    }
                    console.log(Object.keys(response.json.imagesByH[h]).length);
                    let images: any = response.json.imagesByH[h];
                    let sequences: {[key: string]: boolean} = {};

                    for (let i in images) {
                        if (!images.hasOwnProperty(i)) {
                            continue;
                        }
                        let image: any = images[i];
                        if (image) {
                            sequences[image.sequence[1]] = true;
                        }
                    }

                    let paths: any = [];

                    for (let sequence of Object.keys(sequences)) {
                        paths.push([
                            "sequenceByKey",
                            sequence,
                            ["key", "keys"],
                        ]);
                    }

                    this.model.get.apply(this.model, paths)
                        .then(
                            (sResponse: any) => {
                                console.log(sResponse);
                            });
                    console.log(paths);
                });
    }
}

export default APIv3;

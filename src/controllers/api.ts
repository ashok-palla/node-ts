import { Response, Request, NextFunction } from "express";
import * as log from "../logger/log";

export let globalApiHandler: any = (req: Request, res: Response, next: NextFunction) => {
    if (req.url === "/login") {
        next();
    } else {
        let auth: string = req.headers["x-auth"];
        if (auth) {
            // data_layer.token_check({ token: auth }, (response) => {
            //     if (response.status == 200) { next(); }
            //     else { res.status(401).json(response.data); }
            // });
        } else { res.status(401).json("Unauthorization"); }
    }
};

export let defaultApi: any = (req: Request, res: Response) => { res.status(401).json("ASD"); };
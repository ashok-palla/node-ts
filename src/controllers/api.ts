import { Response, Request, NextFunction } from "express";
import * as log from "../logger/log";
import * as data_layer from "../config/mssql";

export let globalApiHandler: any = (req: Request, res: Response, next: NextFunction) => {
    // if (req.url === "/login") {
    //     next();
    // } else {
    //     let auth: IToken = req.headers["x-auth"];
    //     if (auth) {
    //         data_layer.token_check({ token: auth }, (response) => {
    //             if (response.status === 200) { next(); } else { res.status(401).json(response.data); }
    //         });
    //     } else { res.status(401).json("Unauthorization"); }
    // }
    next();
};

export let login: any = (req: Request, res: Response) => {
    data_layer.authenticate(req.body as ILoginRequestParams, (response) => {
        if (response.status === 200) { res.header("x-auth", req.body.password); }
        res.status(response.status).json(response.data);
    });
};

export let city_get: any = (req: Request, res: Response) => {
    data_layer.getCities_spl((response) => res.status(response.status).json(response.data));
};

export let CITY_INSERT: any = (req, res) => {
    data_layer.CITY_INSERT(req.body as ICityInsertParams, (response) => res.status(response.status).json(response.data));
};

export let CITY_GET: any = (req: Request, res: Response) => {
    data_layer.CITY_GET(req.body as ICityPostRequestParams, (response) => res.status(response.status).json(response.data));
};

export let CITY_DELETE: any = (req: Request, res: Response) => {
    data_layer.CITY_DELETE(req.body as ICityPostRequestParams, (response) => res.status(response.status).json(response.data));
};

export let EMPLOYEE_GET: any = (req: Request, res: Response) => {
    data_layer.EMPLOYEE_GET(req.params as IEmployeeGetRequestParams, (response) => res.status(response.status).json(response.data));
};

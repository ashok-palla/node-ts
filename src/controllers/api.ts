import { Response, Request, NextFunction } from "express";
import * as log from "../logger/log";
import * as crpto_hash from '../config/crpto_hash'
import * as data_layer from "../config/mssql";
export let globalApiHandler: any = (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth, Authorization");
    if (req.url === "/login") { next(); }
    else {
        // 76c9dd40b3d42136ea691f74d17eb5e0
        let auth: IToken = req.headers["x-auth"];
        if (auth) {
            const hash_key_data = crpto_hash.return_hash_data('dg41rq', auth);
            if (hash_key_data !== 'invalid') {
                res.header("x-auth", auth);
                next();
            }
            else { res.status(401).json("Unauthorization"); }
            // data_layer.token_check({ token: auth }, (response) => {
            //     if (response.status === 200) { next(); } else { res.status(401).json(response.data); }
            // });

            // const hash_key = crpto_hash.return_hash_key('dg41rq', { "asd": "asd" });
            // console.log(hash_key);
            // if (hash_key !== 'invalid') {
            //     const hash_key_data = crpto_hash.return_hash_data('dg41rq', hash_key);
            //     console.log(hash_key_data);
            //     if (hash_key_data !== 'invalid') { next(); }
            //     else { res.status(401).json("Unauthorization"); }
            // }
        } else { res.status(401).json("Unauthorization"); }
    }


};
export let check: any = (req: Request, res: Response, next) => {
    res.status(200).json({ asd: 'asd' });
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

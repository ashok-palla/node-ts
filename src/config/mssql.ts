import * as sql from "mssql";
import * as log from "../logger/log";
import { isUndefined } from "util";

const config: object = {
    user: "sa",
    password: "123",
    server: "localhost",
    database: "CR"
};

export let authenticate: any = (body: ILoginRequestParams, callback) => {
    let params: IParams[] = [{ name: "email", dataType: sql.VarChar(200), value: body.email }
        , { name: "password", dataType: sql.VarChar(500), value: body.password }];
    ExecuteStoredProcedure(params, "[admin].[authenticate]", (data) => callback(data));
};

export let token_check: any = (body: IToken, callback) => {
    let params: IParams[] = [{ name: "token", dataType: sql.VarChar(200), value: body.token }];
    ExecuteStoredProcedure(params, "[admin].[token_check]", (data) => callback(data));
};

export let getCities_spl: any = (callback) => {
    ExecuteStoredProcedure([], "[Admin].[CITY_GET]", (data) => callback(data));
};

export let CITY_INSERT: any = (body: ICityInsertParams, callback) => {
    let params: IParams[] = [{ name: "CityID", dataType: sql.Int, value: isUndefined(body.CityID) ? 0 : body.CityID }
        , { name: "CityName", dataType: sql.VarChar(150), value: body.CityName }];
    console.log(params);
    ExecuteStoredProcedure(params, "[Admin].[CITY_INSERT]", (data) => callback(data));
};

export let CITY_GET: any = (body: ICityPostRequestParams, callback) => {
    sql.connect(config).then(pool => {
        return pool.request().query(body.CityID == null
            || body.CityID === undefined ? "select * from [admin].[city]"
            : "select * from [admin].[city] where CityID = " + body.CityID);
    })
        .then(result => { callback({ status: 200, data: result.recordset }); sql.close(); })
        .catch(err => { log.errorLog(err); callback({ status: 500, data: err.originalError.info.message }); sql.close(); });
};

export let CITY_DELETE: any = (body: ICityPostRequestParams, callback) => {
    sql.connect(config).then(pool => { return pool.request().query("delete from [Admin].CITY where CityID = " + body.CityID); })
        .then(result => { callback({ status: 200, data: "City Deleted Succesfully." }); sql.close(); })
        .catch(err => { log.errorLog(err); callback({ status: 500, data: err.originalError.info.message }); sql.close(); });
};

let ExecuteStoredProcedure: any = (params: IParams[], stored_proc: string, callback: Function) => {

    const pool: any = new sql.ConnectionPool(config, err => {
        if (err) {
            switch (err.code) {
                case "ELOGIN": callback({ status: 500, data: "Login failed." }); log.errorLog(JSON.stringify(err)); break;
                case "ETIMEOUT": callback({ status: 500, data: "Connection timeout." }); log.errorLog(JSON.stringify(err)); break;
                case "EALREADYCONNECTED": callback({ status: 500, data: "Database is already connected!" });
                    log.errorLog(JSON.stringify(err)); break;
                case "EALREADYCONNECTING": callback({ status: 500, data: "Already connecting to database!" });
                    log.errorLog(JSON.stringify(err)); break;
                case "EINSTLOOKUP": callback({ status: 500, data: "Instance lookup failed." }); log.errorLog(JSON.stringify(err)); break;
                case "ESOCKET": callback({ status: 500, data: "Login failed." }); log.errorLog(JSON.stringify(err)); break;
                default: callback({ status: 500, data: err }); log.errorLog(err);
            }
        } else {
            const StoredProcedureExecute: any = pool.request();
            params.forEach(param => { StoredProcedureExecute.input(param.name, param.dataType, param.value); });
            StoredProcedureExecute.execute(stored_proc, (err, result) => {
                try {
                    if (err) {
                        callback({ status: 500, data: err.originalError.message });
                    } else { callback({ status: 200, data: result.recordsets }); }
                } catch (err) {
                    callback({ status: 500, data: err });
                }
            });
        }
    });

    pool.on("error", err => { callback({ status: 500, data: err }); pool.close(); });
};


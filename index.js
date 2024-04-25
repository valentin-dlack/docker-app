"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const os_1 = __importDefault(require("os"));
const process_1 = __importDefault(require("process"));
const ioredis_1 = require("ioredis");
const promise_1 = __importDefault(require("mysql2/promise"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = +((_a = process_1.default.env.PORT) !== null && _a !== void 0 ? _a : "8080");
var Status;
(function (Status) {
    Status["OK"] = "OK";
    Status["KO"] = "KO";
})(Status || (Status = {}));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f, _g, _h;
    const data = {
        port: Status.KO,
        hostname: Status.KO,
        redis: Status.KO,
        mysql: Status.KO,
        user: Status.KO,
        file: Status.KO,
    };
    // Port check
    if (port === 1337) {
        data.port = Status.OK;
    }
    // Hostname check
    if (os_1.default.hostname() === "mydocker") {
        data.hostname = Status.OK;
    }
    // POSIX UID check
    if (process_1.default.getuid && process_1.default.getuid() !== 0) {
        data.user = Status.OK;
    }
    // Redis check
    //test
    try {
        const redisClient = new ioredis_1.Redis({
            port: +((_b = process_1.default.env.REDIS_PORT) !== null && _b !== void 0 ? _b : "6379"),
            host: (_c = process_1.default.env.REDIS_HOST) !== null && _c !== void 0 ? _c : "localhost",
            maxRetriesPerRequest: 0,
            lazyConnect: true,
        });
        try {
            const result = yield redisClient.ping();
            if (result === "PONG") {
                data.redis = Status.OK;
            }
            yield redisClient.quit();
        }
        catch (err) {
            yield redisClient.quit();
        }
    }
    catch (err) {
        console.error(err);
    }
    // MySQL check
    try {
        const mysqlConnection = yield promise_1.default.createConnection({
            host: (_d = process_1.default.env.MYSQL_HOST) !== null && _d !== void 0 ? _d : "localhost",
            user: (_e = process_1.default.env.MYSQL_USER) !== null && _e !== void 0 ? _e : "root",
            password: (_f = process_1.default.env.MYSQL_PASSWORD) !== null && _f !== void 0 ? _f : "",
            database: (_g = process_1.default.env.MYSQL_DB) !== null && _g !== void 0 ? _g : "test",
        });
        const result = yield mysqlConnection.query("SELECT 1");
        if (result) {
            data.mysql = Status.OK;
        }
        mysqlConnection.destroy();
    }
    catch (err) {
        console.error(err);
    }
    try {
        const filePathToCheck = (_h = process_1.default.env.FILE_PATH_TO_CHECK) !== null && _h !== void 0 ? _h : "./dummy.txt";
        if (fs_1.default.existsSync(filePathToCheck)) {
            data.file = Status.OK;
        }
    }
    catch (err) {
        console.log(err);
    }
    res.json(data);
}));
app.listen(port, () => {
    console.log(`Dummy app listening on port ${port}`);
});

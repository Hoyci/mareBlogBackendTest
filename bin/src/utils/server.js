"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const morgan_body_1 = __importDefault(require("morgan-body"));
const OpenApiValidator = __importStar(require("express-openapi-validator"));
const swagger_routes_express_1 = require("swagger-routes-express");
const yamljs_1 = __importDefault(require("yamljs"));
const api = __importStar(require("../api/controllers"));
const express_dev_logger_1 = require("./express_dev_logger");
const index_1 = __importDefault(require("../../config/index"));
<<<<<<< HEAD:bin/src/utils/server.js
const logger_1 = __importDefault(require("../utils/logger"));
=======
>>>>>>> 40c5cc83e4072451c7da3fe5ed9d38fb6736b02f:bin/utils/server.js
function createServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const yamlSpecFile = './config/openapi.yml';
        const apiDefinition = yamljs_1.default.load(yamlSpecFile);
        const apiSummary = (0, swagger_routes_express_1.summarise)(apiDefinition);
        logger_1.default.info('Summary API', apiSummary);
        const server = (0, express_1.default)();
        server.use(body_parser_1.default.json()); // this can be changed for express.json()
<<<<<<< HEAD:bin/src/utils/server.js
        logger_1.default.info(index_1.default);
=======
        console.log(index_1.default);
>>>>>>> 40c5cc83e4072451c7da3fe5ed9d38fb6736b02f:bin/utils/server.js
        if (index_1.default.morganLogger) {
            server.use((0, morgan_1.default)(':method :url :status :response-time ms - :res[content-length]'));
        }
        if (index_1.default.morganBodyLogger) {
            (0, morgan_body_1.default)(server);
        }
        if (index_1.default.exmplDevLogger) {
            server.use(express_dev_logger_1.expressDevLogger);
        }
        const validatorOptions = {
            apiSpec: yamlSpecFile,
            validateRequests: true,
            validateResponses: true
        };
        server.use(OpenApiValidator.middleware(validatorOptions));
        server.use((err, req, res, next) => {
            res.status(err.status).json({
                error: {
                    type: 'request_validation',
                    message: err.message,
                    errors: err.errors
                }
            });
        });
        const connect = (0, swagger_routes_express_1.connector)(api, apiDefinition, {
            onCreateRoute: (method, descriptor) => {
                descriptor.shift();
                logger_1.default.info(`${method}: ${descriptor.map((d) => d.name).join(', ')}`);
            },
            security: {
                bearerAuth: api.auth
            }
        });
        connect(server);
        return server;
    });
}
exports.createServer = createServer;
;

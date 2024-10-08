"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const areaRoutes_1 = __importDefault(require("./routes/areaRoutes"));
const carreraRoutes_1 = __importDefault(require("./routes/carreraRoutes"));
const categoriaRoutes_1 = __importDefault(require("./routes/categoriaRoutes"));
const departamentoRoutes_1 = __importDefault(require("./routes/departamentoRoutes"));
const responsableRoutes_1 = __importDefault(require("./routes/responsableRoutes"));
const solicitudRoutes_1 = __importDefault(require("./routes/solicitudRoutes"));
const ldapRoutes_1 = __importDefault(require("./routes/ldapRoutes"));
const ldap_conected_1 = require("./ldap_conected");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//Aqui van las entidades
app.use(areaRoutes_1.default);
app.use(carreraRoutes_1.default);
app.use(categoriaRoutes_1.default);
app.use(departamentoRoutes_1.default);
app.use(responsableRoutes_1.default);
app.use(solicitudRoutes_1.default);
app.use(ldapRoutes_1.default);
app.post("/ldap/connect", ldap_conected_1.LDAPConnection);
exports.default = app;

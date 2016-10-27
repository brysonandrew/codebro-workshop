"use strict";
var React = require("react");
var react_router_1 = require("react-router");
var App_1 = require("../containers/App");
var MainPage_1 = require("../containers/MainPage");
var routes = (React.createElement(react_router_1.Route, { component: App_1.App },
    React.createElement(react_router_1.Route, { path: "/", component: MainPage_1.MainPageFromStore })));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
//# sourceMappingURL=index.js.map
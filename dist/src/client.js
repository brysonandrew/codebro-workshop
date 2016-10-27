"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var react_router_1 = require("react-router");
var react_redux_1 = require("react-redux");
var index_1 = require("./routes/index");
var store_1 = require("./redux/stores/store");
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(react_router_1.Router, { history: react_router_1.browserHistory }, index_1.default)), document.getElementById('root'));
//# sourceMappingURL=client.js.map
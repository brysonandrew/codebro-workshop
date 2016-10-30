"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Immutable = require("immutable");
var react_redux_1 = require("react-redux");
var css_styler_1 = require("../utils/css_styler");
var async_get_1 = require("../redux/utils/async_get");
var StatFilters_1 = require("../data/StatFilters");
var StatColumns_1 = require("../data/StatColumns");
var action_creators_1 = require("../redux/action_creators/action_creators");
var Filters_1 = require("../components/Filters");
var ColumnHeading_1 = require("../components/ColumnHeading");
var Dropdown_1 = require("../components/Dropdown");
var SearchBar_1 = require("../components/SearchBar");
css_styler_1.addComponentCSS({
    default: "\n\n    "
});
var MainPage = (function (_super) {
    __extends(MainPage, _super);
    function MainPage(props, context) {
        return _super.call(this, props, context) || this;
    }
    MainPage.prototype.componentDidMount = function () {
        this.props.onPageLoad();
    };
    MainPage.prototype.handleChange = function (searchText) {
        this.props.onFilterBySearch(searchText);
    };
    MainPage.prototype.filterStats = function (stats) {
        var _this = this;
        var filteredStats = stats;
        if (this.props.searchBarTyped !== "") {
            filteredStats = filteredStats.filter(function (info) { return info.name.toLowerCase().indexOf(_this.props.searchBarTyped) >= 0; });
        }
        StatFilters_1.statFilters.forEach(function (filter, index) {
            if (_this.props.filters[index].active === true) {
                filteredStats = filteredStats.filter(filter.filterFunction);
            }
        });
        if (this.props.columns[this.props.sortByColumnIndex].isSortReversed) {
            filteredStats = Immutable.List(filteredStats).sortBy(StatColumns_1.statColumns[this.props.sortByColumnIndex].sortFunction).reverse();
        }
        else {
            filteredStats = Immutable.List(filteredStats).sortBy(StatColumns_1.statColumns[this.props.sortByColumnIndex].sortFunction);
        }
        return filteredStats;
    };
    MainPage.prototype.renderUsersFilter = function () {
        var _this = this;
        console.log(this.props.stats);
        return async_get_1.AsyncGet.render(this.props.stats, {
            fetched: function (stats) { return (React.createElement("form", null, StatFilters_1.statFilters.map(function (info, index) {
                return React.createElement(Filters_1.Filters, { key: index, index: index, heading: info.heading, total: stats.filter(info.filterFunction).length, onFilterByCheckbox: _this.props.onFilterByCheckbox });
            }))); }
        });
    };
    MainPage.prototype.renderColumns = function () {
        var _this = this;
        return React.createElement("thead", null,
            React.createElement("tr", null, StatColumns_1.statColumns.map(function (info, index) {
                return React.createElement(ColumnHeading_1.ColumnHeading, { key: index, heading: info.heading, index: index, pic: info.pic, isSortReversed: info.isSortReversed, onSortByColumn: _this.props.onSortByColumn, showArrow: (_this.props.sortByColumnIndex === index) });
            })));
    };
    MainPage.prototype.renderUsers = function () {
        var _this = this;
        return async_get_1.AsyncGet.render(this.props.stats, {
            fetched: function (data) { return (React.createElement("div", null,
                React.createElement("table", { className: "pz-admin-users__table table table-bordered table-striped table-hover table-responsive text-center" },
                    _this.renderColumns(),
                    React.createElement("tbody", null, _this.filterStats(data).map(function (info, index) { return (React.createElement("tr", { key: index },
                        React.createElement("td", null, (info.gender === "female") ?
                            React.createElement("span", null, "female \u2640") :
                            React.createElement("span", null, "male \u2642")),
                        React.createElement(Dropdown_1.Dropdown, null))); }))))); }
        });
    };
    MainPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "container-fluid" },
                React.createElement("div", { className: "text-center" },
                    this.renderUsersFilter(),
                    React.createElement(SearchBar_1.SearchBar, { onChange: this.handleChange.bind(this) })),
                this.renderUsers())));
    };
    return MainPage;
}(React.Component));
exports.MainPage = MainPage;
function mapStateToProps(state, ownProps) {
    return {
        stats: state.subStore.stats,
        filters: state.subStore.filters,
        sortByColumnIndex: state.subStore.sortByColumnIndex,
        searchBarTyped: state.subStore.searchBarTyped,
        columns: state.subStore.columns
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        onPageLoad: function () {
            dispatch(action_creators_1.fetchAll());
        },
        onFilterByCheckbox: function (filterIndex, isActive) {
            dispatch(action_creators_1.changeFilter(filterIndex, isActive));
        },
        onFilterBySearch: function (searchText) {
            dispatch(action_creators_1.changeSearch(searchText));
        },
        onSortByColumn: function (sortIndex, isSortReversed) {
            dispatch(action_creators_1.changeSort(sortIndex, isSortReversed));
        }
    };
}
exports.MainPageFromStore = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MainPage);
//# sourceMappingURL=MainPage.js.map
import * as React from 'react';
import * as moment from 'moment';
import * as Immutable from 'immutable';
import {connect} from 'react-redux';
import {addComponentCSS} from '../utils/css_styler';
import {AsyncGet} from '../redux/utils/async_get';
import {IDictionary, IStats, IFilters, IColumns} from '../models';
import {statFilters} from '../data/StatFilters';
import {statColumns} from '../data/StatColumns';
import {IStoreState} from '../redux/reducers/main_reducer';
import {fetchAll, changeFilter, changeSearch, changeSort} from '../redux/action_creators/action_creators';
import {AsyncPost} from '../redux/utils/async_post';
//import {Loading} from '../../components/admin/shared/Loading';
import {Filters} from '../components/Filters';
import {ColumnHeading} from '../components/ColumnHeading';
import {Dropdown} from '../components/Dropdown';
import {SearchBar} from '../components/SearchBar';
//import {Columns} from '../data/Columns';
//import {Filters} from '../data/Filters';

addComponentCSS({
    //language=CSS
    default: `

    `
})

interface IProperties {
    stats: AsyncGet<IStats[]>,
    filters: IFilters[],
    sortByColumnIndex: number,
    columns: IColumns[],
    searchBarTyped: string
}

interface ICallbacks {
    onPageLoad: () => void;
    onFilterByCheckbox: (number, boolean) => void;
    onSortByColumn: (number, boolean) => void;
    onFilterBySearch: (string) => void;
}

interface IProps extends IProperties, ICallbacks {

}

interface IState extends IProperties, ICallbacks {

}

export class MainPage extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        this.props.onPageLoad();
    }

    private handleChange(searchText) {
        this.props.onFilterBySearch(searchText);
    }

    private filterStats(stats){
      let filteredStats = stats;

  //filter by searchbar
      if(this.props.searchBarTyped !== "") {
        filteredStats = filteredStats.filter((info) => info.name.toLowerCase().indexOf(this.props.searchBarTyped) >= 0)
      }
  //filter by checkbox
      statFilters.forEach((filter, index) => {
        if (this.props.filters[index].active === true) {
          filteredStats = filteredStats.filter(filter.filterFunction)
        }
      })
//sorting users
      if (this.props.columns[this.props.sortByColumnIndex].isSortReversed) {
        filteredStats = Immutable.List(filteredStats).sortBy(statColumns[this.props.sortByColumnIndex].sortFunction).reverse();
      } else {
        filteredStats = Immutable.List(filteredStats).sortBy(statColumns[this.props.sortByColumnIndex].sortFunction);
      }

      return filteredStats;
    }

    private renderUsersFilter() {
        return AsyncGet.render(this.props.stats, {
            fetched: (stats: IStats[]) => (
                <form>
                    {statFilters.map((info, index) =>
                     <Filters key={index}
                        index={index}
                        heading={info.heading}
                        total={stats.filter(info.filterFunction).length}
                        onFilterByCheckbox={this.props.onFilterByCheckbox}
                      />
                  )}
                </form>
            )
        });
    }

    private renderColumns() {
      return  <thead>
                  <tr>
                    {statColumns.map((info, index) =>
                      <ColumnHeading
                        key={index}
                        heading={info.heading}
                        index={index}
                        pic={info.pic}
                        isSortReversed={info.isSortReversed}
                        onSortByColumn={this.props.onSortByColumn}
                        showArrow={(this.props.sortByColumnIndex===index)}
                      />
                    )}
                  </tr>
              </thead>
    }

    private renderUsers() {
        return AsyncGet.render(this.props.stats, {
            fetched: (data: IStats[]) => (
              <div>
                <table className="pz-admin-users__table table table-bordered table-striped table-hover table-responsive text-center">
                  {this.renderColumns()}
                    <tbody>{
                        this.filterStats(data).map((info, index) => (
                            <tr key={index}>
                                <td>{(info.gender==="female") ?
                                <span>female ♀</span> :
                                <span>male ♂</span>}
                                </td>
                                <Dropdown/>
                              </tr>
                            )
                        )}
                    </tbody>
                </table>
              </div>
            )
        });
    }

    public render(): JSX.Element {

        return (
            <div>
                <div className="container-fluid">
                    <div className="text-center">
                      {this.renderUsersFilter()}
                      <SearchBar onChange={this.handleChange.bind(this)} />
                    </div>
                    {this.renderUsers()}
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------


function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        stats: state.subStore.stats,
        filters: state.subStore.filters,
        sortByColumnIndex: state.subStore.sortByColumnIndex,
        searchBarTyped: state.subStore.searchBarTyped,
        columns: state.subStore.columns
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onPageLoad: () => {
            dispatch(fetchAll());
        },
        onFilterByCheckbox: (filterIndex, isActive) => {
            dispatch(changeFilter(filterIndex, isActive));
        },
        onFilterBySearch: (searchText) => {
            dispatch(changeSearch(searchText));
        },
        onSortByColumn: (sortIndex, isSortReversed) => {
            dispatch(changeSort(sortIndex, isSortReversed));
        }
    }
}

export var MainPageFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(MainPage);

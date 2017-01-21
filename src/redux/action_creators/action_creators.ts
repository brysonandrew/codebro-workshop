import {
    FETCH_ALL__INIT,
    FETCH_ALL__SUCCESS,
    FETCH_ALL__FAILURE,
    UPDATE__FILTER,
    UPDATE__SEARCH,
    UPDATE__SORT
} from "../actions/actions";
import {createAction, checkServerError} from "../utils/actions";

export function fetchAll(artist) {
  return dispatch => {
    // Dispatch the init action before fetching the data
    dispatch(createAction(FETCH_ALL__INIT.type, {}));
    fetch(`https://api.spotify.com/v1/search?q=artist:${artist}&type=album&market=US`, {
      method : 'GET',
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then((res: any) => { return res.json(); })
      .then(checkServerError)
      .then((result) => {
        dispatch(
          createAction<FETCH_ALL__SUCCESS>(FETCH_ALL__SUCCESS.type, {
            stats: result
          })
        );
      })
      .catch((result) => {
        dispatch(
          createAction<FETCH_ALL__FAILURE>(FETCH_ALL__FAILURE.type, {
            error: result
          })
        );
      });
  }
}

export function changeFilter(filterIndex, isActive) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__FILTER>(UPDATE__FILTER.type, {
          filterIndex: filterIndex,
          isActive: isActive
        }));
    }
}

export function changeSearch(searchText) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__SEARCH>(UPDATE__SEARCH.type, {
          searchText: searchText
        }));
    }
}

export function changeSort(sortIndex, isSortReversed) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__SORT>(UPDATE__SORT.type, {
          sortIndex: sortIndex,
          isSortReversed: isSortReversed
        }));
    }
}

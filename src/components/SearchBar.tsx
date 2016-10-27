import * as React from 'react';
import * as moment from 'moment';
import {IStats} from '../models';
import {addComponentCSS} from '../utils/css_styler';

addComponentCSS({
    //language=CSS
    default: `
    div.searchbar {
      margin-bottom: 20px;
    }
    `
});

interface ISearchBarProps {
  onChange: (string) => void;
}

export class SearchBar extends React.Component<ISearchBarProps, any> {

    handleChange(event){
      this.props.onChange(event.target.value.substr(0, 20)) //.substr limits characters used in filter to 20 so characters falling outside of bar are not counted
    }

    public render(): JSX.Element {
        return (
          <div className="searchbar row">
            <div className="col-sm-8 col-sm-offset-2">
              <div className="input-group">
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">🔎</button>
                </span>
                <input onChange={(event) => this.handleChange(event)} type="text" className="form-control" placeholder="Search by name..."/>
              </div>
            </div>
          </div>
        );
    }
}

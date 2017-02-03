import * as React from 'react';
import {addComponentCSS} from '../utils/css_styler';

addComponentCSS({
    //language=CSS
    default: `
    div.search-bar {
        margin-bottom: 20px;
    }
    div.search-bar__input {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);    
    }
    `
});

interface ISearchBarProps {
  onChange: (string) => void;
}

export class SearchBar extends React.Component<ISearchBarProps, any> {

    handleChange(event){
      this.props.onChange(event.target.value.substr(0, 20)); //.substr limits characters used in filter to 20 so characters falling outside of bar are not counted
    }

    public render(): JSX.Element {
        return (
          <div className="search-bar row">
            <div className="col-sm-8 col-sm-offset-2">
              <div className="search-bar__input input-group">
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">🔎</button>
                </span>
                <input onChange={(event) => this.handleChange(event)}
                       type="text"
                       className="form-control"
                       placeholder="Search Albums"/>
              </div>
            </div>
          </div>
        );
    }
}

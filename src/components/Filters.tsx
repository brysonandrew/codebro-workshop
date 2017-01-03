import * as React from 'react';
import {IStats} from '../models';
import {addComponentCSS} from '../utils/css_styler';

addComponentCSS({
    //language=CSS
    default: `
    input[type=checkbox].filters__input {
      display: none;
    }

    div.filters {
     display: inline-block;
     padding: 0;
     margin: 0 0 20px 0;
     background: white;
     color: #FF6F00;
     border: 2px solid #FF6F00;
     border-right: none;
    }

    div.filters:first-child {
      border-radius: 5px 0 0 5px;
    }

    div.filters:last-child {
      border-radius: 0 5px 5px 0;
      border-right: 2px solid #FF6F00;
    }

    div.filters:hover {
      opacity: 1;
    }

    label.filters__label {
      padding: 0;
      margin: 0;
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);      
      border: none;
      cursor: pointer;
    }

    p.filters__heading {
      margin: 0 6px;
    }

    p.filters__total {
      background-color: #FF6F00;
      font-size: 30px;
      color: white;
      width: 100%;
      height: 100%;
      margin: 0;
      border-bottom: 2px solid #FF6F00;
    }
    `
});

interface IFiltersProps {
  heading: string;
  total: number;
  index: number;
  onFilterByCheckbox: (number, boolean) => void;
}

interface IFiltersState {
  checked: boolean;
}

export class Filters extends React.Component<IFiltersProps, IFiltersState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
          checked: false
        }
    }

    handleChange(event, index) {
      this.setState({
        checked: event.target.checked
      });
      this.props.onFilterByCheckbox(index, event.target.checked);
    }

    render(): JSX.Element {
        const {heading, total, index} = this.props;
        let filtersStyle = (this.state.checked)
          ? {
              backgroundColor: "#FF6F00",
              border: "2px solid #FF6F00",
              color: "white",
            }
          : null;

        return (
          <div className="filters"
            style={filtersStyle}>
            <label
              className="filters__label"
              >
              <input
                className="filters__input"
                checked={this.state.checked}
                onChange={(event) => this.handleChange(event, index)}
                type="checkbox"
              />
              <p className="filters__heading">{heading}</p>
              <p className="filters__total">{total}</p>
            </label>
          </div>
        );
    }
}

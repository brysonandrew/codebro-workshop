import * as React from 'react';
import {addComponentCSS} from '../utils/css_styler';

addComponentCSS({
    //language=CSS
    default: `
    .column-heading__input {
        display: none;
    }

    .column-heading {
        padding: 0 !important;
    }

    .column-heading__label {
        padding: 2px 6px;
        margin: 0;
        border: none;
        height: 110%;
        width: 100%;
        background: white;
        color: #FF6F00;
        cursor: pointer;
    }

    .column-heading__label:hover {
        background-color: #FF6F00;
        color: white;
        opacity: 1;
    }
    `
});

interface IColumnHeadingProps {
    heading: string;
    index: number;
    pic: string;
    isSortReversed: boolean;
    onSortByColumn: (number, boolean) => void;
    showArrow: boolean;
}

interface IColumnHeadingState {
    isChecked: boolean;
}

export class ColumnHeading extends React.Component<IColumnHeadingProps, IColumnHeadingState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isChecked: false
        }
    }

    handleChange(event, sortIndex) {
        this.setState({
            isChecked: event.target.checked
        });
        this.props.onSortByColumn(sortIndex, event.target.checked);
    }

    renderIcon() {
        const {pic} = this.props;
        if (pic != null) {
            if (pic.indexOf("glyphicon") < 0) {
                return <img src={pic} />
            } else {
                return <i className={pic} />
            }
        }
    }

    renderArrow() {
        if (this.props.showArrow) {
            return (
                <div className="column-heading__arrow">
                    <i className={`glyphicon glyphicon-triangle-${this.state.isChecked ? 'top' : 'bottom'}`}/>
                </div>
            );
        }
    }

    public render(): JSX.Element {
        const {heading, index} = this.props;
        return (
            <th className="column-heading">
                {(heading!=="") &&
                <label className="column-heading__label text-center">
                    <input
                        className="column-heading__input"
                        onChange={(event) => this.handleChange(event, index)}
                        type="checkbox"
                        checked={this.state.isChecked}
                    />
                    {this.renderArrow()}
                    {heading}
                    {this.renderIcon()}
                </label>}
            </th>
        );
    }
}

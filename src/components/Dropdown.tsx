import * as React from 'react';

interface IDropdownProps {
}

export class Dropdown extends React.Component<IDropdownProps, any> {

    dropDownOptions = [
      "View profile",
      "View concerts",
      "View friends",
    ];

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    handleClick(option) {
      alert(`function for ${option} has not yet been created...in short "hello world!"`)
    }

    public render(): JSX.Element {

        return (
            <td>
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle"
                            type="button"
                            id="menu1"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true">
                        Actions <span className="caret" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="menu1">
                      {this.dropDownOptions.map(option =>
                        <li key={option}>
                          <a onClick={() => this.handleClick(option)} href="#">{option}</a>
                        </li>)}
                    </ul>
                </div>
            </td>
        );
    }
}

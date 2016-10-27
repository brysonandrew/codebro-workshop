import * as React from 'react';
import * as moment from 'moment';
import {IStats} from '../models';


interface IDropdownProps {
}

export class Dropdown extends React.Component<IDropdownProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    public render(): JSX.Element {
        return (
            <td>
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Actions <span className="caret" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="menu1">
                        <li><a href="#">View profile</a></li>
                        <li><a href="#">View events</a></li>
                        <li><a href="#">View friends</a></li>
                    </ul>
                </div>
            </td>
        );
    }
}

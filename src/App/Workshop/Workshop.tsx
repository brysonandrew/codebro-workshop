import * as React from 'react';
import {addComponentCSS} from '../../utils/css_styler';
import {browserHistory, Link} from 'react-router';

addComponentCSS({
    //language=CSS
    default: `
    `
});

interface IProps {
}

interface IState {
}

export class WorkshopIndex extends React.Component<IProps, IState> {

    public render(): JSX.Element {
        const styles = {
            workshop: {
                width: "100%",
                padding: "50px 0",
                color: "#eeeeee",
                textAlign: "center"
            },
            workshop__inner: {
                display: "inline-block",
                width: "80%",
            },
            workshop__mainHeader: {
                display: "inline-block",
                width: "80%",
            },
            workshop__subHeader: {
                display: "inline-block",
                width: "80%",
            },
        };
        return (
            <div style={ styles.workshop }>
                <div style={ styles.workshop__inner }>
                    <h1 style={styles.workshop__mainHeader}>
                        Workshop
                    </h1>
                    <h2 style={styles.workshop__mainHeader}>
                        Games
                    </h2>
                    <ul>
                        <li>
                            <Link to="workshop/gatling-gun">Gatling Gun</Link>
                        </li>
                    </ul>
                    <h2 style={styles.workshop__mainHeader}>
                        Sites
                    </h2>
                    <ul>
                        <li>
                            <Link to="workshop/g-consulting">G Consulting</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

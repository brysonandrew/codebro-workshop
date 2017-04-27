import * as React from 'react';
import { addComponentCSS } from '../../utils/css_styler';
import { browserHistory, Link } from 'react-router';
import { WorkshopBackground } from "./WorkshopBackground/WorkshopBackground";

addComponentCSS({
    //language=CSS
    default: `
    `
});

interface IProps {
}

interface IState {}

export class WorkshopIndex extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        browserHistory.push("/workshop");
    }

    handleClick(path) {
        browserHistory.push(path);
    }

    public render(): JSX.Element {
        const styles = {
            workshop: {
                position: "absolute",
                left: 0,
                top: 0,
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
                margin: "0 0 20px 0"
            },
            workshop__subHeader: {
                margin: "0 0 20px 0"
            },
            workshop__section: {
                width: "100%",
                margin: "40px 0",
                padding: 20,
                border: "solid 1px #eeeeee",
                borderRadius: 8
            }
        };
        return (
            <div style={ styles.workshop }>
                <div style={ styles.workshop__inner }>
                    <h1 style={styles.workshop__mainHeader}>
                        Workshop
                    </h1>
                    <div style={styles.workshop__section}>
                        <h2 style={styles.workshop__mainHeader}>
                            Games
                        </h2>
                        <ul>
                            <li style ={{listStyleType: "none", color: "#fafafa"}}>
                                <Link style={{color: "#fafafa"}}
                                      onClick={() => this.handleClick("/workshop/gatling-gun")}
                                      to="/workshop/gatling-gun">Gatling Gun</Link>
                            </li>
                        </ul>
                    </div>
                    <div style={styles.workshop__section}>
                        <h2 style={styles.workshop__mainHeader}>
                            Sites
                        </h2>
                        <ul>
                            <li style ={{listStyleType: "none"}}>
                                <Link style={{color: "#fafafa"}}
                                      onClick={() => this.handleClick("/workshop/gatling-gun")}
                                      to="/workshop/g-consulting">G Consulting</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <WorkshopBackground />
            </div>
        );
    }
}

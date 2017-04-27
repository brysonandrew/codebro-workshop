import * as React from 'react';
import { addComponentCSS } from '../../utils/css_styler';
import { browserHistory, Link } from 'react-router';

addComponentCSS({
    //language=CSS
    default: `
    `
});

interface IProps {
}

interface IState {}

export class ShowroomIndex extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        browserHistory.push("/showroom");
    }

    handleClick(path) {
        browserHistory.push(path);
    }

    public render(): JSX.Element {
        const styles = {
            showroom: {
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                padding: "50px 0",
                color: "#eeeeee",
                textAlign: "center"
            },
            showroom__inner: {
                display: "inline-block",
                width: "80%",
            },
            showroom__mainHeader: {
                margin: "0 0 20px 0"
            },
            showroom__subHeader: {
                margin: "0 0 20px 0"
            },
            showroom__section: {
                width: "100%",
                margin: "40px 0",
                padding: 20,
                border: "solid 1px #eeeeee",
                borderRadius: 8
            }
        };
        return (
            <div style={ styles.showroom }>
                <div style={ styles.showroom__inner }>
                    <h1 style={styles.showroom__mainHeader}>
                        Showroom
                    </h1>
                    <div style={styles.showroom__section}>
                        <h2 style={styles.showroom__mainHeader}>
                            Sites
                        </h2>
                        <ul>
                            <li style ={{listStyleType: "none"}}>
                                <Link style={{color: "#fafafa"}}
                                      onClick={() => this.handleClick("/showroom/sphinx")}
                                      to="/showroom/sphinx">Sphinx</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

import * as React from 'react';
import { addComponentCSS } from '../../utils/css_styler';
import { browserHistory, Link } from 'react-router';
import { WorkshopBackground } from "./WorkshopBackground/WorkshopBackground";
import { workshopLinks } from '../../data/workshop';

addComponentCSS({
    //language=CSS
    default: `
    `
});

interface IProps {
}

interface IState {
    hoveringIndex: number
}

export class WorkshopIndex extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            hoveringIndex: -1
        }
    }

    componentDidMount() {
        browserHistory.push("/workshop");
    }

    handleClick(path) {
        browserHistory.push(path);
    }

    handleMouseEnter(i) {
        this.setState({
            hoveringIndex: i
        })
    }

    handleMouseLeave() {
        this.setState({
            hoveringIndex: -1
        })
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
            },
            workshop__item: {
                listStyleType: "none",
                margin: "10px 0"
            },
            workshop__link: {
                transition: "all 200ms"
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
                            Projects
                        </h2>
                        <ul>
                        {workshopLinks.map((link, i) =>
                            <li key={i} style={ styles.workshop__item }
                                onMouseEnter={() => this.handleMouseEnter(i)}
                                onMouseLeave={() => this.handleMouseLeave()}>
                                <Link style={ Object.assign({}, styles.workshop__link,
                                                {color: (this.state.hoveringIndex===i)
                                                            ? "#fafafa" : "#757575" }) }
                                      onClick={() => this.handleClick(link.path)}
                                      to={link.path}>
                                    {link.name}
                                </Link>
                            </li>
                        )}
                        </ul>
                    </div>
                </div>
                <WorkshopBackground />
            </div>
        );
    }
}

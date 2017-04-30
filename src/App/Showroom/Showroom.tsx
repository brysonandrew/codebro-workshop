import * as React from 'react';
import { addComponentCSS } from '../../utils/css_styler';
import { browserHistory, Link } from 'react-router';
import { showroomLinks } from '../../data/showroom';

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

export class ShowroomIndex extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            hoveringIndex: -1
        }
    }

    componentDidMount() {
        browserHistory.push("/showroom");
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
            },
            showroom__item: {
                listStyleType: "none",
                margin: "10px 0"
            },
            showroom__link: {
                transition: "all 200ms"
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
                        {showroomLinks.map((link, i) =>
                            <li key={i} style={ styles.showroom__item }
                                onMouseEnter={() => this.handleMouseEnter(i)}
                                onMouseLeave={() => this.handleMouseLeave()}>
                                <Link style={ Object.assign({}, styles.showroom__link,
                                                {color: (this.state.hoveringIndex===i)
                                                            ? "#fafafa" : "#757575" }) }
                                      onClick={() => this.handleClick(link.path)}
                                      to={link.path}>
                                    {link.name}
                                </Link>
                            </li>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

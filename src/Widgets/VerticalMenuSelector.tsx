import * as React from 'react';
import {addComponentCSS} from '../utils/css_styler';
import {IPost} from '../models';
import { browserHistory, Link } from 'react-router';
import { pages } from "../data/pages";

addComponentCSS({
    //language=CSS
    default: `
    .verticalMenu {
    }
    `
});

interface IVerticalMenuSelectorProps {
    activePageIndex?: number
    viewIndex?: number
    post?: IPost
    onClick?: (i: number) => void
}

interface IVerticalMenuSelectorState {
    isHovering: boolean
}

export class VerticalMenuSelector extends React.Component<IVerticalMenuSelectorProps, IVerticalMenuSelectorState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovering: false
        };
    }

    handleClick(path) {
        browserHistory.push(path);
        this.props.onClick(this.props.viewIndex);
    }

    handleMouseEnter() {
        this.setState({
            isHovering: true
        })
    }

    handleMouseLeave() {
        this.setState({
            isHovering: false
        })
    }

    render(): JSX.Element {
        const styles = {
            verticalMenuSelector: {
                position: "relative",
                height: 20,
                margin: "20px 0",
                width: "100%",
                textAlign: "center",
            },
            verticalMenuSelector__label: {
                position: "absolute",
                top: -4,
                right: "calc(3vw + 20px)",
                padding: 4,
                background: "#212121",
                color: "rgba(238,238,238, 0.8)",
                overflow: "hidden",
                whiteSpace: "nowrap"
            },
            verticalMenuSelector__icon: {
                display: "inline-block",
                background: "#eeeeee",
                width: 20,
                height: 20,
                borderRadius: 10
            }
        };
        const pagePath = pages[this.props.activePageIndex].path;
        const viewPath = this.props.post.heading.replace(/\s/g, "-").toLowerCase();
        const path = `/${pagePath}/${viewPath}`;
        return (
            <div style={styles.verticalMenuSelector}
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}>
                {this.state.isHovering
                    ?   <Link style={styles.verticalMenuSelector__label}
                              to={path} onClick={() => this.handleClick(path)}>
                            {this.props.post.heading}
                        </Link>
                    : null}
                <Link style={styles.verticalMenuSelector__icon}
                      to={path}
                      onClick={() => this.handleClick(path)}>
                </Link>
            </div>
        );
    }
}

import * as React from 'react';
import { addComponentCSS } from '../../utils/css_styler';
import { IPost } from '../../models';
import { browserHistory, Link } from 'react-router';
import { pages } from "../../data/pages";

addComponentCSS({
    //language=CSS
    default: `
    .verticalMenu {
    }
    `
});

interface IVerticalMenuSelectorProps {
    activePageIndex?: number
    activeViewIndex?: number
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
        const { activePageIndex, activeViewIndex, viewIndex, post } = this.props;
        const styles = {
            verticalMenuSelector: {
                display: "block",
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
                borderRadius: (activeViewIndex===viewIndex) ? 10 : 0,
                transform: `scaleY(${(activeViewIndex===viewIndex) ? 1 : 0.15})`,
                transition: "all 200ms"
            }
        };
        const pagePath = pages[activePageIndex].path;
        const viewPath = post.name.replace(/\s/g, "-").toLowerCase();
        const path = `/${pagePath}/${viewPath}`;
        return (
            <Link style={styles.verticalMenuSelector}
                 to={path}
                 onClick={() => this.handleClick(path)}
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}>
                {this.state.isHovering
                    ?   <Link style={styles.verticalMenuSelector__label}
                              to={path} onClick={() => this.handleClick(path)}>
                            {post.name}
                        </Link>
                    :   null}
                <span style={styles.verticalMenuSelector__icon}>
                </span>
            </Link>
        );
    }
}

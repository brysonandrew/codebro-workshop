import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { changePageIndex } from '../Home/HomeActionCreators';
import { pages } from '../data/pages';
import { browserHistory, Link } from 'react-router';
import { Word } from './Logo/Word';

interface IProperties {
    pageIndex?: number
    width?: number
    height?: number
}

interface ICallbacks {
    onChangeMenuIndex?: (menuIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    hoveringIndex?: number
    isHoverSwitched?: boolean
}

export class Menu extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            hoveringIndex: -1,
            isHoverSwitched: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isMounted: true})
        }, 0)
    }

    handleOpenClick(i, link) {
        browserHistory.push(link);
        this.props.onChangeMenuIndex(i);
    }

    handleCloseClick() {
        this.props.onChangeMenuIndex(-1);
    }

    handleMouseEnter(i) {
        this.setState({hoveringIndex: i});
    }

    handleMouseLeave() {
        this.setState({
            hoveringIndex: -1
        });
    }

    render(): JSX.Element {
        let { hoveringIndex, isMounted } = this.state;
        let { pageIndex, width } = this.props;

        let lineAboveTransforms = [
            ((pageIndex > -1)   //blogPosts
                ? `translate3d(${width * 1.25}px,0px,0px)`      //menuactive
                : `translate3d(${width * 0.25}px,0px,0px)`),    //frontpage
            ((pageIndex > -1)   //work
                ? `translate3d(${width * 1.25}px,0px,0px)`      //menuactive
                : `translate3d(${width * 0.75}px,0px,0px)`)     //frontpage
        ];

        let lineBelowTransforms = [
            ((pageIndex > -1)   //blogPosts
                ? `translate3d(${-width * 0.75}px,0px,0px)`      //menuactive
                : `translate3d(${-width * 0.75}px,0px,0px)`),    //frontpage
            ((pageIndex > -1)   //work
                ? `translate3d(${-width * 0.75}px,0px,0px)`      //menuactive
                : `translate3d(${-width * 0.25}px,0px,0px)`)    //frontpage
        ];

        let styles = {
            menu: {
                position: "absolute",
                width: "100%",
                top: (pageIndex > -1) ? "8%" : "50%",
                transform: "translateY(-50%)",
                overflow: "hidden",
                transition: "top 400ms"
            },
            menu_selector: {
                background: "none",
                border: "none",
                outline: "none",
                textDecoration: "none",
                position: "relative",
                display: "inline-block",
                padding: "6px 0",
                verticalAlign: "top",
                textAlign: "center",
                width: "50%",
                fontSize: 40,
                color: "#ffffff",
                fontFamily: "UrbanJungle, 'arial', sans-serif",
                transform: isMounted ? "translate3d(0px,0px,0px)" : "translate3d(0px,80px,0px)",
                transition: "all 400ms",
                cursor: "pointer"
            },
            menu_lineAbove: {
                position: "absolute",
                width: (pageIndex > -1) ? "50%" : "100%",
                left: "-100%",
                height: 2,
                background: "#ffffff",
                top: 0,
                WebkitTransform: (hoveringIndex > -1)
                    ? lineAboveTransforms[hoveringIndex]
                    : "translate3d(0px,0px,0px)",
                transform: (hoveringIndex > -1)
                    ? lineAboveTransforms[hoveringIndex]
                    : "translate3d(0px,0px,0px)",
                transition: "transform 400ms"
            },
            menu_lineBelow: {
                position: "absolute",
                width: (pageIndex > -1) ? "50%" : "100%",
                left: "100%",
                height: 2,
                background: "#ffffff",
                bottom: 0,
                WebkitTransform: (hoveringIndex > -1)
                    ? lineBelowTransforms[hoveringIndex]
                    : "translate3d(0px,0px,0px)",
                transform: (hoveringIndex > -1)
                    ? lineBelowTransforms[hoveringIndex]
                    : "translate3d(0px,0px,0px)",
                transition: "transform 400ms"
            },
            menu_cross: {
                position: "absolute",
                right: 80,
                top: "50%",
                opacity: (hoveringIndex > -1) ? 1 : 0.5,
                width: 40,
                height: "100%",
                transform: "translateY(-25%)"
            },
            menu_crossArm1: {
                position: "absolute",
                background: "#ffffff",
                left: -1,
                width: 3,
                height: "50%",
                transform: (hoveringIndex > -1) ? "rotate(90deg)" : "rotate(45deg)",
                transition: "transform 200ms"
            },
            menu_crossArm2: {
                position: "absolute",
                background: "#ffffff",
                left: 1,
                width: 3,
                height: "50%",
                transform: (hoveringIndex > -1) ? "rotate(90deg)" : "rotate(-45deg)",
                transition: "transform 200ms"
            },
            menu__name: {
                display: "inline-block"
            },
            menu__nameOrigin: {
                fontFamily: "PlayBold, 'arial', sans-serif",
                transition: "opacity 200ms"
            },
            menu__nameTransform: {
                position: "absolute",
                top: "12.5%",
                transition: "opacity 200ms"
            }
        };
        return (
            <div style={styles.menu}>
                <div style={styles.menu_lineAbove}></div>
                {pages.map((section, i) =>
                    <Link   key={i}
                            to={section.link}
                            style={Object.assign({},
                            styles.menu_selector,
                                { opacity: (pageIndex > -1)
                                    ? ((pageIndex===i) ? 1 : 0)
                                    : 1},
                                { width: (pageIndex > -1)
                                    ? ((pageIndex===i) ? "100%" : "0")
                                    : "50%"})}
                             onClick={(pageIndex > -1)
                                ? (() => this.handleCloseClick())
                                : (() => this.handleOpenClick(i, section.link))}
                             onMouseEnter={() => this.handleMouseEnter(i)}
                             onMouseLeave={() => this.handleMouseLeave()}
                    >
                        <div style={ styles.menu__name }>
                            <span style={Object.assign({}, styles.menu__nameOrigin,
                                                            {opacity: hoveringIndex===i ? 0 : 1})}>
                                {section.name}
                            </span>
                            <div style={ Object.assign({}, styles.menu__nameTransform,
                                                           {opacity: hoveringIndex===i ? 1 : 0})}>
                                <Word
                                    word={section.name}
                                    isLogoHovered={hoveringIndex===i}
                                />
                            </div>
                        </div>
                        {(pageIndex > -1)
                            ?   <div style={styles.menu_cross}>
                                    <div style={styles.menu_crossArm1}></div>
                                    <div style={styles.menu_crossArm2}></div>
                                </div>
                            :   null}
                    </Link>
                )}
                <div style={styles.menu_lineBelow}></div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        pageIndex: state.subStore.pageIndex,
        width: state.subStore.width,
        height: state.subStore.height
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onChangeMenuIndex: (menuIndex) => {
            dispatch(changePageIndex(menuIndex));
        }
    }
}

export let MenuFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Menu);

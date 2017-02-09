import * as React from 'react';
import { connect } from 'react-redux';
import { addComponentCSS } from '../utils/css_styler';
import { IStoreState } from '../redux/main_reducer';
import { changeMenuIndex } from '../Home/HomeActionCreators';
import { sections } from '../data/sections';

addComponentCSS({
    //language=CSS
    default: `
    `
});

interface IProperties {
    menuIndex?: number
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
}

export class Menu extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            hoveringIndex: -1
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isMounted: true})
        }, 0)
    }

    handleOpenClick(i) {
        this.props.onChangeMenuIndex(i);
    }

    handleCloseClick() {
        this.props.onChangeMenuIndex(-1);
    }

    handleMouseEnter(i) {
        this.setState({hoveringIndex: i})
    }

    handleMouseLeave() {
        this.setState({hoveringIndex: -1})
    }

    render(): JSX.Element {
        let { hoveringIndex, isMounted } = this.state;
        let { menuIndex, width, height } = this.props;

        let lineAboveTransforms = [
            ((menuIndex > -1)   //blog
                ? `translate3d(${width * 1.25}px,0px,0px)`      //menuactive
                : `translate3d(${width * 0.25}px,0px,0px)`),    //frontpage
            ((menuIndex > -1)   //work
                ? `translate3d(${width * 1.25}px,0px,0px)`      //menuactive
                : `translate3d(${width * 0.75}px,0px,0px)`)     //frontpage
        ];

        let lineBelowTransforms = [
            ((menuIndex > -1)   //blog
                ? `translate3d(${-width * 0.75}px,0px,0px)`      //menuactive
                : `translate3d(${-width * 0.75}px,0px,0px)`),    //frontpage
            ((menuIndex > -1)   //work
                ? `translate3d(${-width * 0.75}px,0px,0px)`      //menuactive
                : `translate3d(${-width * 0.25}px,0px,0px)`)    //frontpage
        ];

        let styles = {
            menu: {
                position: "absolute",
                width: "100%",
                top: (menuIndex > -1) ? "8%" : "50%",
                transform: "translateY(-50%)",
                overflow: "hidden",
                transition: "top 400ms"
            },
            menu_selector: {
                position: "relative",
                display: "inline-block",
                padding: "6px 0",
                verticalAlign: "top",
                textAlign: "center",
                opacity: 0.8,
                width: "50%",
                fontSize: 40,
                color: "#eeeeee",
                fontFamily: "Shock, 'arial', sans-serif",
                transform: isMounted ? "translate3d(0px,0px,0px)" : "translate3d(0px,80px,0px)",
                transition: "all 400ms",
                cursor: "pointer"
            },
            menu_lineAbove: {
                position: "absolute",
                width: (menuIndex > -1) ? "50%" : "100%",
                left: "-100%",
                height: 2,
                background: "#eeeeee",
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
                width: (menuIndex > -1) ? "50%" : "100%",
                left: "100%",
                height: 2,
                background: "#eeeeee",
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
                background: "#eeeeee",
                left: -1,
                width: 3,
                height: "50%",
                transform: (hoveringIndex > -1) ? "rotate(90deg)" : "rotate(45deg)",
                transition: "transform 200ms"
            },
            menu_crossArm2: {
                position: "absolute",
                background: "#eeeeee",
                left: 1,
                width: 3,
                height: "50%",
                transform: (hoveringIndex > -1) ? "rotate(90deg)" : "rotate(-45deg)",
                transition: "transform 200ms"
            }
        };
        return (
            <div style={styles.menu}>
                <div style={styles.menu_lineAbove}></div>
                {sections.map((section, i) =>
                    <div key={i}
                         style={Object.assign({},
                            styles.menu_selector,
                            { opacity: (menuIndex > -1)
                                ? ((menuIndex===i) ? "1" : "0")
                                : ((hoveringIndex===i) ? "1" : "0.85")},
                            { width: (menuIndex > -1)
                                ? ((menuIndex===i) ? "100%" : "0")
                                : "50%"})}
                         onClick={(menuIndex > -1)
                            ? (() => this.handleCloseClick())
                            : (() => this.handleOpenClick(i))}
                         onMouseEnter={() => this.handleMouseEnter(i)}
                         onMouseLeave={() => this.handleMouseLeave()}
                    >{section.heading}
                        {(menuIndex > -1)
                            ?   <div style={styles.menu_cross}>
                                    <div style={styles.menu_crossArm1}></div>
                                    <div style={styles.menu_crossArm2}></div>
                                </div>
                            :   null}
                    </div>
                )}
                <div style={styles.menu_lineBelow}></div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        menuIndex: state.subStore.menuIndex,
        width: state.subStore.width,
        height: state.subStore.height
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onChangeMenuIndex: (menuIndex) => {
            dispatch(changeMenuIndex(menuIndex));
        }
    }
}

export let MenuFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Menu);

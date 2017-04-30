import * as React from 'react';
import { colors } from "../../../cyclopsData/themeOptions";
import { connect } from 'react-redux';
import { IStoreState } from '../../../../../../../redux/main_reducer';
import { openMenu } from '../../../CyclopsActionCreators';
import { siteContent } from '../../../cyclopsData/siteContent';

interface IProperties {
    width?: number
    height?: number
    activePageIndex?: number
    isMenuOpen?: boolean
}

interface ICallbacks {
    onMenuButtonClick?: (isMenuOpen: boolean) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isHovered?: boolean
}

export class CyclopsMenuButton extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        }
    }

    componentDidMount() {

    }

    handleMouseEnter() {
        this.setState({isHovered: true})
    }

    handleMouseLeave() {
        this.setState({isHovered: false})
    }

    handleClick() {
        const isMenuOpen = !this.props.isMenuOpen;
        this.props.onMenuButtonClick(isMenuOpen);
    }

    render(): JSX.Element {
        const { isHovered } = this.state;
        const { isMenuOpen } = this.props;

        const verticalLineHeight = siteContent.length * 52 + 100;
        const styles = {
            cyclopsMenuButton: {
                position: "relative",
                height: 50,
                textAlign: "left",
                cursor: "pointer"
            },
            cyclopsMenuButton__icon: {
                display: "inline-block",
                width: 40,
                height: 40,
                margin: 5,
                borderRadius: "50%",
                overflow: isMenuOpen ? "visible" : "hidden",
                transform: `translateX(${isMenuOpen ? 14 : 0}px)`,
                transition: "transform 200ms"
            },
            cyclopsMenuButton__label: {
                display: "inline-block",
                height: 40,
                margin: 5,
                verticalAlign: "top",
                fontSize: 18
            },
            cyclopsMenuButton__line: {
                width: "100%",
                height: 2,
                background: colors.std,
                transition: "all 200ms"
            },
            cyclopsMenuButton__labelText: {
                display: "table-cell",
                height: 40,
                verticalAlign: "middle"
            },
            cyclopsMenuButton__verticalLine: {
                position: "absolute",
                top: 50,
                left: 24,
                height: siteContent.length * 52 + 100,
                width: 2,
                background: colors.std,
                transform: `scaleY(${isMenuOpen ? 1 : 0}) 
                            translateY(${isMenuOpen ? 0 : -verticalLineHeight}px)`,
                transition: "transform 200ms"
            }
        };
        return (
            <div style={ styles.cyclopsMenuButton }
                 onClick={() => this.handleClick()}
                 onMouseEnter={()=> this.handleMouseEnter()}
                 onMouseLeave={()=> this.handleMouseLeave()}>
                <div style={ styles.cyclopsMenuButton__verticalLine }/>
                <div style={ styles.cyclopsMenuButton__icon }>
                    <div style={ Object.assign({}, styles.cyclopsMenuButton__line,
                                {   marginBottom: 10,
                                    height: isHovered ? 4 : 2,
                                    paddingBottom: isHovered ? 0 : 2,
                                    transform: isMenuOpen
                                                ? "rotate(45deg) translate3d(0px,20px,0px)"
                                                : "rotate(0deg) translate3d(0px,0px,0px)"
                                }) }></div>
                    <div style={ Object.assign({}, styles.cyclopsMenuButton__line,
                                {   marginBottom: 10,
                                    height: 2,
                                    padding: "1px 0",
                                    opacity: isMenuOpen ? 0 : 1
                                }) }></div>
                    <div style={ Object.assign({}, styles.cyclopsMenuButton__line,
                                {   marginBottom: 0,
                                    height: isHovered ? 4 : 2,
                                    paddingTop: isHovered ? 0 : 2,
                                    transform: isMenuOpen
                                                ? "rotate(-45deg) translate3d(0px,-20px,0px)"
                                                : "rotate(0deg) translate3d(0px,0px,0px)"
                                }) }></div>
                </div>
                {this.props.isMenuOpen
                    ?   null
                    :   <div style={ styles.cyclopsMenuButton__label }>
                            <h4 style={ styles.cyclopsMenuButton__labelText }>
                                MENU
                            </h4>
                        </div>}
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.cyclopsStore.width,
        activePageIndex: state.cyclopsStore.activePageIndex,
        isMenuOpen: state.cyclopsStore.isMenuOpen,
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onMenuButtonClick: (isMenuOpen) => {
            dispatch(openMenu(isMenuOpen));
        }
    }
}

export let CyclopsMenuButtonFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(CyclopsMenuButton);

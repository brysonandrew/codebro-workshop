import * as React from 'react';
import { colors } from "../../../sphinxData/themeOptions";
import { connect } from 'react-redux';
import { IStoreState } from '../../../../../../../redux/main_reducer';
import { openMenu } from '../../../SphinxActionCreators';

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

export class SphinxMenuButton extends React.Component<IProps, IState> {

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
        const styles = {
            sphinxMenuButton: {
                height: 50,
                textAlign: "left",
                cursor: "pointer"
            },
            sphinxMenuButton__icon: {
                display: "inline-block",
                width: 40,
                height: 40,
                margin: 5,
                transform: `translateX(${isMenuOpen ? 20 : 0}px)`,
                transition: "transform 200ms"
            },
            sphinxMenuButton__label: {
                display: "inline-block",
                height: 40,
                margin: 5,
                verticalAlign: "top",
                fontSize: 18
            },
            sphinxMenuButton__line: {
                width: "100%",
                height: 2,
                background: "#212121",
                transition: "all 200ms"
            },
            sphinxMenuButton__labelText: {
                display: "table-cell",
                height: 40,
                verticalAlign: "middle"
            }
        };
        return (
            <div style={ styles.sphinxMenuButton }
                 onClick={() => this.handleClick()}
                 onMouseEnter={()=> this.handleMouseEnter()}
                 onMouseLeave={()=> this.handleMouseLeave()}>
                <div style={ styles.sphinxMenuButton__icon }>
                    <div style={ Object.assign({}, styles.sphinxMenuButton__line,
                                {   marginBottom: 10,
                                    height: isHovered ? 4 : 2,
                                    paddingBottom: isHovered ? 0 : 2,
                                    transform: isMenuOpen
                                                ? "rotate(45deg) translate3d(0px,20px,0px)"
                                                : "rotate(0deg) translate3d(0px,0px,0px)"
                                }) }></div>
                    <div style={ Object.assign({}, styles.sphinxMenuButton__line,
                                {   marginBottom: 10,
                                    height: 2,
                                    padding: "1px 0",
                                    opacity: isMenuOpen ? 0 : 1
                                }) }></div>
                    <div style={ Object.assign({}, styles.sphinxMenuButton__line,
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
                    :   <div style={ styles.sphinxMenuButton__label }>
                            <h4 style={ styles.sphinxMenuButton__labelText }>
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
        width: state.sphinxStore.width,
        activePageIndex: state.sphinxStore.activePageIndex,
        isMenuOpen: state.sphinxStore.isMenuOpen,
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onMenuButtonClick: (isMenuOpen) => {
            dispatch(openMenu(isMenuOpen));
        }
    }
}

export let SphinxMenuButtonFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(SphinxMenuButton);

import * as React from 'react';
import { colors } from "../../../cyclopsData/themeOptions";
import { siteContent } from '../../../cyclopsData/siteContent';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../../../../redux/main_reducer';
import { setPageIndex, saveParams, openMenu } from '../../../CyclopsActionCreators';
import { ISavedParams } from '../../../cyclopsData/models';

interface IProperties {
    width?: number
    height?: number
    activePageIndex?: number
    isMenuOpen?: boolean
    savedParams?: ISavedParams
}

interface ICallbacks {
    onPageIndexSelect?: (index: number) => void
    onSaveParams?: (nextSavedParams: ISavedParams) => void
    onCloseMenu?: () => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    hoverSelectorIndex?: number
    isTextVisible?: boolean
    isOnlyMenu?: boolean //false is displays only content
}

export class CyclopsMenuSelectors extends React.Component<IProps, IState> {

    fadeInSwitch = 0;
    textFadeIndicies = [0,0];

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            hoverSelectorIndex: this.props.activePageIndex,
            isTextVisible: (this.props.width >= 700 || this.props.isMenuOpen),
            isOnlyMenu: this.props.width < 600
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isMenuOpen !== this.props.isMenuOpen) {
            this.setState({
                isTextVisible: (this.props.width >= 700 || nextProps.isMenuOpen),
                isOnlyMenu: !nextProps.isMenuOpen
            })
        }
        if (nextProps.activePageIndex !== this.props.activePageIndex) {
            this.fadeInSwitch = this.fadeInSwitch===0 ? 1 : 0;
            const prev = this.props.activePageIndex;
            const curr = nextProps.activePageIndex;
            this.textFadeIndicies = this.fadeInSwitch
                                        ?   [ curr, prev ]
                                        :   [ prev, curr ]
        }
        if (nextProps.width !== this.props.width) {
            this.setState({
                isTextVisible: (this.props.width >= 700 || nextProps.isMenuOpen),
            })
        }
    }

    handleMenuSelectorTransitionEnd() {
        // if (this.props.isMenuOpen) {
        //     this.setState({
        //         isTextVisible: true
        //     })
        // }
    }


    nameToPath(string) {
        return string.replace(/\s/g, "-") //replace spaces with hyphens
            .replace(/,/g, "")   //remove commas
            .toLowerCase();
    }

    handleSelectorClick(i) {
        this.setState({
            isOnlyMenu: false
        });

        this.props.onPageIndexSelect(i);
        const nextSavedParams = {
            activePagePath: this.nameToPath(siteContent[i].name),
            needsAction: true
        };
        if (this.props.width < 700 && this.props.isMenuOpen) {
            this.props.onCloseMenu();
        }
        this.props.onSaveParams(nextSavedParams);
    }

    handleSelectorMouseEnter(i) {
        this.setState({
            hoverSelectorIndex: i,
        })
    }

    handleSelectorMouseLeave() {
        this.setState({
            hoverSelectorIndex: -1
        })
    }

    render(): JSX.Element {
        const { hoverSelectorIndex, isTextVisible } = this.state;
        const { isMenuOpen, width, activePageIndex } = this.props;
        const transtitionDuration = "200ms";
        const styles = {
            cyclopsMenuSelectors: {
                position: "absolute",
                left: -14,
                top: 100,
                padding: "0 20px",
                textAlign: "left",
                height: "100%",
                zIndex: 2,
                cursor: "pointer",
                transition: `width ${transtitionDuration}`
            },
            cyclopsMenuSelectors__selector: {
                position: "relative",
                color: colors.std,
                fontSize: 14,
                padding: "10px 10px 10px 0",
                opacity: isMenuOpen ? 1 : 0.2,
                background: this.props.isMenuOpen
                                ? "rgba(255,255,255, 0.8)"
                                : "transparent",
                transition: "opacity 200ms"
            },
            cyclopsMenuSelectors__selectorHover: {
                opacity: 0.8,
                transition: `all ${transtitionDuration}`
            },
            cyclopsMenuSelectors__icon: {
                display: "inline-block",
                verticalAlign: "top",
                background: colors.std,
                width: 20,
                height: 20,
                borderRadius: 10,
                margin: "0 10px",
                transform: `scaleY(1)`,
                transition: "all 200ms"
            },
            cyclopsMenuSelectors__iconActive: {
                borderRadius: 0,
                transform: `scaleY(0.15)`,
            },
            cyclopsMenuSelectors__selectorText: {
                display: "inline-block",
                verticalAlign: "top",
                zIndex: 2
            },
            roundedTop: {
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10
            },
            roundedBottom: {
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10
            }
        };

        return (
            <div style={ styles.cyclopsMenuSelectors }
                 onTransitionEnd={() => this.handleMenuSelectorTransitionEnd()}>
                {siteContent.map((content, i) =>
                    <div key={i}>
                        <div style={ Object.assign({},
                                    styles.cyclopsMenuSelectors__selector,
                                    (i===0) ? styles.roundedTop : null,
                                    (i===siteContent.length-1) ? styles.roundedBottom : null,
                                    (hoverSelectorIndex===i)
                                        ?   styles.cyclopsMenuSelectors__selectorHover
                                        :   null) }
                             onClick={() => this.handleSelectorClick(i)}
                             onMouseEnter={()=> this.handleSelectorMouseEnter(i)}
                             onMouseLeave={()=> this.handleSelectorMouseLeave()}>
                            <div style={ Object.assign({}, styles.cyclopsMenuSelectors__icon,
                                               (activePageIndex===i)
                                                    ?   styles.cyclopsMenuSelectors__iconActive
                                                    :   null) }/>
                            {(isTextVisible || hoverSelectorIndex===i) &&
                            <div style={ styles.cyclopsMenuSelectors__selectorText }>
                                {content.name}
                            </div>}
                        </div>
                    </div>)}
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
        savedParams: state.cyclopsStore.savedParams
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onPageIndexSelect: (activePageIndex) => {
            dispatch(setPageIndex(activePageIndex));
        },
        onSaveParams: (nextSavedParams) => {
            dispatch(saveParams(nextSavedParams));
        },
        onCloseMenu: () => {
            dispatch(openMenu(false));
        }
    }
}

export let CyclopsMenuSelectorsFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(CyclopsMenuSelectors);

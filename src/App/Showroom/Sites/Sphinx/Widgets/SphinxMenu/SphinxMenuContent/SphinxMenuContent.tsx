import * as React from 'react';
import { colors } from "../../../sphinxData/themeOptions";
import { siteContent } from '../../../sphinxData/siteContent';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../../../../redux/main_reducer';
import { setViewportDimensions, setPageIndex, setViewIndex } from '../../../SphinxActionCreators';


interface IProperties {
    width?: number
    height?: number
    activePageIndex?: number
    isMenuOpen?: boolean
}

interface ICallbacks {
    onPageIndexSelect?: (index: number) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    hoverSelectorIndex?: number
    isTextVisible?: boolean
}

export class SphinxMenuContent extends React.Component<IProps, IState> {

    timerId;
    previousIndex = 0;
    fadeInSwitch = 0;
    textFadeIndicies = [0,0];

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            hoverSelectorIndex: this.props.activePageIndex,
            isTextVisible: this.props.isMenuOpen
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isMenuOpen !== this.props.isMenuOpen) {
            if (!nextProps.isMenuOpen) {
                this.setState({
                    isTextVisible: false
                })
            }
        }
        if (nextProps.activePageIndex !== this.props.activePageIndex) {
            this.previousIndex = this.props.activePageIndex;
            this.fadeInSwitch = this.fadeInSwitch===0 ? 1 : 0;
            this.textFadeIndicies.push(nextProps.activePageIndex);
            this.textFadeIndicies.splice(0, 1);
        }
    }

    handleMenuSelectorTransitionEnd() {
        if (this.props.isMenuOpen) {
            this.setState({
                isTextVisible: true
            })
        }
    }

    handleSelectorClick(i) {
        this.props.onPageIndexSelect(i);
    }

    handleSelectorMouseEnter(i) {
        this.setState({hoverSelectorIndex: i})
    }

    handleSelectorMouseLeave() {
        this.setState({hoverSelectorIndex: this.props.activePageIndex})
    }

    render(): JSX.Element {
        const { hoverSelectorIndex, isTextVisible } = this.state;
        const { isMenuOpen, width, activePageIndex } = this.props;
        const divisionAmount = 5;
        const transtitionDuration = "200ms";
        const styles = {
            sphinxMenuContent: {
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
            },
            sphinxMenuContent__text: {
                position: "absolute",
                left: 0,
                top: 0,
                padding: isMenuOpen
                            ? "100px 20px" : 0,
                color: colors.std,
                background: "#fafafa",
                width: isMenuOpen
                        ?   (width < 600)
                                ? "0%" : "calc(60% - 40px)"
                        :   0,
                height: "100%",
                fontSize: 20,
                transition: `width ${transtitionDuration}`,
                zIndex: 2
            },
            sphinxMenuContent__menuSelectors: {
                position: "absolute",
                right: 0,
                top: 0,
                padding: isMenuOpen
                            ? "100px 20px" : 0,
                textAlign: "right",
                background: colors.std,
                width: isMenuOpen
                        ?   (width < 600)
                                ? "calc(100% - 40px)"
                                : "calc(40% - 40px)"
                        :   0,
                height: "100%",
                zIndex: 2,
                cursor: "pointer",
                transition: `width ${transtitionDuration}`
            },
            sphinxMenuContent__menuSelector: {
                position: "relative",
                color: "#fafafa",
                fontSize: 32,
                padding: "10px 0"
            },
            sphinxMenuContent__menuSelectorHover: {
                color: colors.std,
                transition: `all ${transtitionDuration}`
            },
            sphinxMenuContent__background: {
                position: "absolute",
                right: -20,
                background: "#fafafa",
                height: `calc(${99.5/divisionAmount}% + ${4/divisionAmount}px)`,
                width: "0%",
                transition: `width ${transtitionDuration}`
            },
            sphinxMenuContent__backgroundHover: {
                width: "calc(90% + 40px)",
            },
            sphinxMenuContent__backgroundActive: {
                width: "calc(100% + 40px)",
            },
            sphinxMenuContent__paragraphPrev: {
                opacity: 1,
                transform: `translate3d(0px,${-10}px,0px)`,
                transition: "all 200ms"
            },
            sphinxMenuContent__selectorText: {
                position: "relative",
                zIndex: 2
            },
            sphinxMenuContent__underline: {
                width: "100%",
                height: 2,
                background: `#fafafa`
            },
            sphinxMenuContent__underlineHover: {
                width: "calc(90% + 40px)",
            },
            sphinxMenuContent__underlineActive: {
                width: "calc(100% + 40px)",
            },
            sphinxMenuContent__paragraph: {
                position: "absolute",
                height: 200,
                width: 200,
                opacity: 0,
                transition: "all 200ms"
            },
            sphinxMenuContent__paragraphActive: [
               {
                    opacity: 1,
                    background: "red",
                },
                {
                    opacity: 1,
                    background: "blue",
                }
            ]
        };

        return (
            <div style={ styles.sphinxMenuContent }>
                <div style={ styles.sphinxMenuContent__text }>
                    {this.textFadeIndicies.map((relevantIndex, orderIndex) =>
                        <div key={orderIndex} style={ Object.assign({},
                                    styles.sphinxMenuContent__paragraph,
                                    this.fadeInSwitch===orderIndex
                                        ? styles.sphinxMenuContent__paragraphActive[orderIndex]
                                        : null) }/>
                    )}
                    {/*{ this.textContent.map((content, contentIndex) =>*/}
                        {/*<div key={contentIndex} style={ styles.sphinxMenuContent__paragraph[content.index] }>*/}
                            {/*{isTextVisible && siteContent[content.index]*/}
                                {/*.textContent*/}
                                {/*.map((paragraph, paragraphIndex) =>*/}
                                    {/*<p key={paragraphIndex}>*/}
                                        {/*{paragraph}*/}
                                    {/*</p>)}*/}
                        {/*</div>*/}
                    {/*)}*/}
                </div>
                <div style={ styles.sphinxMenuContent__menuSelectors }
                     onTransitionEnd={() => this.handleMenuSelectorTransitionEnd()}>
                    {isTextVisible && siteContent.map((content, contentIndex) =>
                        <div key={contentIndex}>
                            <div style={ Object.assign({},
                                        styles.sphinxMenuContent__menuSelector,
                                        (hoverSelectorIndex===contentIndex)
                                            ?   styles.sphinxMenuContent__menuSelectorHover
                                            :   null) }
                                 onClick={() => this.handleSelectorClick(contentIndex)}
                                 onMouseEnter={()=> this.handleSelectorMouseEnter(contentIndex)}
                                 onMouseLeave={()=> this.handleSelectorMouseLeave()}>
                                {Array.apply(null, new Array(divisionAmount)).map((_, backgroundIndex) =>
                                    <div key={backgroundIndex} style={ Object.assign({},
                                            styles.sphinxMenuContent__background,
                                            {top: `calc(${-2 + 4/divisionAmount
                                                            * backgroundIndex}px
                                                    + ${99.5/divisionAmount
                                                            * backgroundIndex}%)`,
                                             transitionDelay: `${(Math.sin(Math.PI * 2
                                                                    / divisionAmount
                                                                    * backgroundIndex)) * 100}ms`},
                                            (hoverSelectorIndex===contentIndex)
                                                ?   (activePageIndex===contentIndex)
                                                        ?   styles.sphinxMenuContent__backgroundActive
                                                        :   styles.sphinxMenuContent__backgroundHover
                                                :   null) }/>)}
                                <div style={ styles.sphinxMenuContent__selectorText }>
                                    {content.name}
                                </div>
                            </div>
                            <div style={ Object.assign({},
                                            styles.sphinxMenuContent__underline,
                                            (hoverSelectorIndex===contentIndex)
                                                ?   (activePageIndex===contentIndex)
                                                        ?   styles.sphinxMenuContent__underlineActive
                                                        :   styles.sphinxMenuContent__underlineHover
                                                :   null) }/>
                        </div>)}
                </div>
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
        onPageIndexSelect: (activePageIndex) => {
            dispatch(setPageIndex(activePageIndex));
        }
    }
}

export let SphinxMenuContentFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(SphinxMenuContent);

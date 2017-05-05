import * as React from 'react';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { changePageIndex, changeViewIndex, changeViewportDimensions } from './WorkshopActionCreators';
import { WorkshopBackground } from "./WorkshopBackground/WorkshopBackground";
import { Logo } from "../Widgets/Logo/Logo";
import { IComponentType, IHomeParams } from "../models";
import { browserHistory, Link } from 'react-router';
import {workshopLinks} from "../data/workshop";

interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
    width?: number
}

interface ICallbacks {
    onResizeViewport?: (width: number, height: number) => void
    onViewIndexSelect?: (viewIndex: number) => void
    onPageIndexSelect?: (pageIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {
    params: IHomeParams
}

interface IState extends IProperties, ICallbacks {
    isMini?: boolean
    hoveringIndex?: number
}

export class Workshop extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMini: false,
            hoveringIndex: -1
        };
    }

    handleClick(path, i) {
        browserHistory.push(path);
        this.props.onPageIndexSelect(i);
    }

    handleLogoClick() {
        browserHistory.push("");
        this.props.onPageIndexSelect(-1);
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

    componentDidMount() {
        console.log("mounted")
        const { params, onResizeViewport, onPageIndexSelect, onViewIndexSelect } = this.props;
        //routing
        /////SET PAGE
        let activePageIndex = Immutable.List(workshopLinks)
                                .findIndex((item, index) =>
                                    item.path === params.activePage);
        onPageIndexSelect(activePageIndex);
        // if (activePageIndex > -1) {
        //     /////SET VIEW
        //     let activeViewIndex = Immutable.List(workshopLinks[activePageIndex].viewPaths)
        //                             .findIndex(item =>
        //                                 item === params.activeView);
        //     onViewIndexSelect(activeViewIndex);
        // }
        //responsive on window resize
        window.addEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        window.addEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
    }

    componentWillReceiveProps(nextProps) {
        const { onPageIndexSelect } = this.props;
        if (nextProps.width !== this.props.width) {
            this.setState({
                isMini: (nextProps.width < 600)
            })
        }
        if (nextProps.params.activePage !== this.props.params.activePage) {
            if (nextProps.activePageIndex > -1){
                /////SET PAGE
                let activePageIndex = Immutable.List(workshopLinks)
                                        .findIndex((item, index) =>{
                    console.log(item.path + " === " + nextProps.params.activePage);
                                          return  item.path === nextProps.params.activePage;
                });
                onPageIndexSelect(activePageIndex);
                // if (activePageIndex > -1) {
                //     /////SET VIEW
                //     let activeViewIndex = Immutable.List(workshopLinks[activePageIndex].viewPaths)
                //                             .findIndex(item =>
                //                                 item === nextProps.params.activeView);
                //     onViewIndexSelect(activeViewIndex);
                // }
            } else {
                this.props.onViewIndexSelect(-1);
            }
        }
    }

    render(): JSX.Element {
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
            workshop__logo: {
                position: "absolute",
                top: this.state.isMini
                        && (this.props.activePageIndex===-1)
                            ? "85.5vh" : "4.5vh",
                left: "2vw",
                width: "100%",
                textAlign: "left",
                zIndex: 2
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
            <div style={styles.workshop}>
                <div style={styles.workshop__logo}>
                    <Logo
                        activePageIndex={this.props.activePageIndex}
                        onClick={this.handleLogoClick.bind(this)}
                    />
                </div>
                {this.props.activePageIndex === -1
                    ?   <div style={ styles.workshop__inner }>
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
                                                                ? "#fafafa"
                                                                : "#757575" }) }
                                                  onClick={() => this.handleClick(link.path, i)}
                                                  to={link.path}>
                                                {link.name}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    :   <div>
                            {workshopLinks[this.props.activePageIndex].component}
                        </div>}
                <WorkshopBackground />
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.workshopStore.width,
        activePageIndex: state.workshopStore.activePageIndex,
        activeViewIndex: state.workshopStore.activeViewIndex
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onResizeViewport: (width, height) => {
            dispatch(changeViewportDimensions(width, height));
        },
        onPageIndexSelect: (activePageIndex) => {
            dispatch(changePageIndex(activePageIndex));
        },
        onViewIndexSelect: (activeViewIndex) => {
            dispatch(changeViewIndex(activeViewIndex));
        }
    }
}

export let WorkshopFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Workshop);

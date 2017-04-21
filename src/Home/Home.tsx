import * as React from 'react';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { changePageIndex, changeViewIndex, changeViewportDimensions } from './HomeActionCreators';
import { MenuFromStore } from '../Widgets/Menu';
import { PostsFromStore } from "../Widgets/Posts/Posts";
import { BackgroundFromStore } from "../Widgets/Background";
import { Logo } from "../Widgets/Logo/Logo";
import { pages } from "../data/pages";
import { IntroHeader } from "../Widgets/IntroHeader/IntroHeader";

interface IHomeParams {
    activePage: string
    activeView: string
}

interface IProperties {
    pageIndex?: number
    viewIndex?: number
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
    isMini: boolean
}

export class Home extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMini: false
        };
    }

    componentDidMount() {
        const { params, onResizeViewport, onPageIndexSelect, onViewIndexSelect } = this.props;
        //routing
        let pageIndex = Immutable.List(pages)
                            .findIndex((item, index) => item.link === params.activePage);
        onPageIndexSelect(pageIndex);

        if (pageIndex > -1) {
            let viewIndex = Immutable.List(pages[pageIndex].viewLinks)
                                .findIndex((item, index) => item === params.activeView);
            viewIndex = (viewIndex===-1) ? 0 : viewIndex;
            onViewIndexSelect(viewIndex);
        }
        //responsive on window resize
        window.addEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window
                .innerHeight));
        window.addEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.width !== this.props.width) {
            this.setState({
                isMini: (nextProps.width < 600)
            })
        }
        if (nextProps.pageIndex !== this.props.pageIndex) {
            if (nextProps.pageIndex > -1){
                let viewIndex = Immutable.List(pages[nextProps.pageIndex].viewLinks)
                                    .findIndex((item, index) => item === this.props.params.activeView);
                viewIndex = (viewIndex===-1) ? 0 : viewIndex;
                this.props.onViewIndexSelect(viewIndex);
            } else {
                this.props.onViewIndexSelect(-1);
            }
        }
    }

    public render(): JSX.Element {
        let styles = {
            home: {
                position: "fixed",
                height: "100vh",
                width: "100vw",
                textAlign: "center"
            },
            home__logo: {
                position: "absolute",
                top: this.state.isMini
                        ? "86vh" : "2vh",
                left: "2vw",
                width: "100%",
                textAlign: "left"
            },
            home__introHeader: {
                position: "absolute",
                top: "2vh",
                right: "4vw",
            }
        };
        return (
            <div style={styles.home}>
                <div style={styles.home__logo}>
                    <Logo/>
                </div>
                <div style={styles.home__introHeader}>
                    <IntroHeader
                        isOnFrontPage={(this.props.pageIndex===-1)}
                    />
                </div>
                <MenuFromStore/>
                {(this.props.pageIndex > -1)
                    ?   <PostsFromStore
                            params={this.props.params}
                        />
                    :   null}
                <BackgroundFromStore/>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.subStore.width,
        pageIndex: state.subStore.pageIndex,
        viewIndex: state.subStore.viewIndex
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onResizeViewport: (width, height) => {
            dispatch(changeViewportDimensions(width, height));
        },
        onPageIndexSelect: (pageIndex) => {
            dispatch(changePageIndex(pageIndex));
        },
        onViewIndexSelect: (viewIndex) => {
            dispatch(changeViewIndex(viewIndex));
        }
    }
}

export let HomeFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Home);

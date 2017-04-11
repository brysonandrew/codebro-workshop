import * as React from 'react';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { changePageIndex, changeViewIndex, changeViewportDimensions } from './HomeActionCreators';
import { MenuFromStore } from '../Widgets/Menu';
import { PostsFromStore } from "../Widgets/Posts/Posts";
import { BackgroundFromStore } from "../Widgets/Background";
import {pages} from "../data/pages";


interface IHomeParams {
    activePage: string
    activeView: string
}

interface IProperties {
    pageIndex?: number
    viewIndex?: number
    width?: number
    height?: number
}

interface ICallbacks {
    onResizeViewport?: (width: number, height: number) => void
    onViewIndexSelect?: (viewIndex: number) => void
    onPageIndexSelect?: (pageIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {
    params: IHomeParams
}

interface IState extends IProperties, ICallbacks {}

export class Home extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        const { params, onResizeViewport, onPageIndexSelect, onViewIndexSelect } = this.props;
        //routing
        let pageIndex = Immutable.List(pages)
            .findIndex( (item, index) => item.link === params.activePage );
        onPageIndexSelect(pageIndex);

        if (pageIndex > -1) {
            let viewIndex = Immutable.List(pages[pageIndex].viewLinks)
                .findIndex( (item, index) => item === params.activeView );
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
                top: "2vh",
                left: "2vw",
                width: 40,
                height: "auto",
                filter: "invert(100%)"
            }
        };
        return (
            <div style={styles.home}>
                <img style={styles.home__logo} src="/images/logo.png"/>
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

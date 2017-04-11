import * as React from 'react';
import * as Immutable from 'immutable';
import THREE = require('three');
import { connect } from 'react-redux';
import { IStoreState } from '../../redux/main_reducer';
import { changePageIndex, changeViewIndex } from '../../Home/HomeActionCreators';
import { workPosts } from '../../data/work/workPosts';
import { blogPosts } from '../../data/blog/blogPosts';
import { PostFromStore } from './Post';
import { IPage } from "../../models";

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
    onPageIndexSelect?: (pageIndex: number) => void
    onViewIndexSelect?: (viewIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {
    params?: IHomeParams
}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isHovering?: boolean
}

export class Posts extends React.Component<IProps, IState> {

    timerId;
    pages: IPage[];

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isHovering: false
        };

        this.pages = [
            {
                name: "Blog",
                link: "./blogPosts",
                viewLinks: [],
                posts: blogPosts
            },
            {
                name: "Work",
                link: "./work",
                viewLinks: [],
                posts: workPosts
            }
        ]
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pageIndex > -1 && nextProps.params.activePage !== this.props.params.activePage) {
            let pageIndex = Immutable.List(this.pages)
                .findIndex( (item, index) => item.link === nextProps.params.activePage );
            this.props.onPageIndexSelect(pageIndex);
        }
        if (nextProps.pageIndex > -1 && nextProps.params.activeView !== this.props.params.activeView) {
            let viewIndex = Immutable.List(this.pages[this.props.pageIndex].viewLinks)
                .findIndex( (item, index) => item === nextProps.params.activeView );
            viewIndex = (viewIndex===-1) ? 0 : viewIndex;
            this.props.onViewIndexSelect(viewIndex);
        }
    }

    componentDidMount() {
        this.timerId = setTimeout(() => {
            this.setState({isMounted: true});
            window.scrollTo(0,0);
        }, 1000);
    }

    handleMouseEnter() {
        this.setState({isHovering: true})
    }

    handleMouseLeave() {
        this.setState({isHovering: false})
    }

    render(): JSX.Element {
        let { isHovering, isMounted } = this.state;
        let { pageIndex, width, height } = this.props;

        let posts = [
            blogPosts,
            workPosts
        ];

        let styles = {
            posts: {
                position: "absolute",
                top: "calc(8% + 40px)",
                left: "50%",
                width: "90vw",
                height: "80vh",
                overflowY: "scroll",
                borderRadius: 8,
                transform: "translateX(-50%)",
                zIndex: 1
            }
        };
        return (
            <div style={styles.posts}
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}
            >
                {posts[pageIndex].map((post, i) =>
                    <PostFromStore
                        key={i}
                        post={post}
                    />)}
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        pageIndex: state.subStore.pageIndex,
        viewIndex: state.subStore.viewIndex,
        width: state.subStore.width,
        height: state.subStore.height
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onPageIndexSelect: (pageIndex) => {
            dispatch(changePageIndex(pageIndex));
        },
        onViewIndexSelect: (viewIndex) => {
            dispatch(changeViewIndex(viewIndex));
        }
    }
}

export let PostsFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Posts);

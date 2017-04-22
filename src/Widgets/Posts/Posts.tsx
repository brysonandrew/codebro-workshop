import * as React from 'react';
import THREE = require('three');
import { connect } from 'react-redux';
import { IStoreState } from '../../redux/main_reducer';
import { workPosts } from '../../data/work/workPosts';
import { blogPosts } from '../../data/blog/blogPosts';
import { PostFromStore } from './Post';
import { IHomeParams } from "../../models";
import { pages } from "../../data/pages";

interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
    width?: number
    height?: number
}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isHovering?: boolean
}

export class Posts extends React.Component<IProps, IState> {

    timerId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isHovering: false
        };
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
                 className={"posts"}
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}
            >
                {pages[this.props.activePageIndex].posts.map((post, i) =>
                    <PostFromStore
                        key={i}
                        viewIndex={i}
                        post={post}
                    />)}
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        activePageIndex: state.subStore.activePageIndex,
        activeViewIndex: state.subStore.activeViewIndex,
        width: state.subStore.width,
        height: state.subStore.height
    };
}

export let PostsFromStore = connect(
    mapStateToProps
)(Posts);

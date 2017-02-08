import * as React from 'react';
import THREE = require('three');
import {connect} from 'react-redux';
import {addComponentCSS} from '../../utils/css_styler';
import {IStoreState} from '../../redux/main_reducer';
import { changeMenuIndex } from '../../Home/HomeActionCreators';
import { sections } from '../../data/sections';
import { workPosts } from '../../data/work/workPosts';
import { blogPosts } from '../../data/blog/blogPosts';
import { PostFromStore } from './Post';

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
    isHovering?: boolean
}

export class Posts extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isHovering: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isMounted: true})
        }, 1000)
    }

    handleMouseEnter() {
        this.setState({isHovering: true})
    }

    handleMouseLeave() {
        this.setState({isHovering: false})
    }

    render(): JSX.Element {
        let { isHovering, isMounted } = this.state;
        let { menuIndex, width, height } = this.props;

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
                transform: "translateX(-50%)"
            }
        };
        return (
            <div style={styles.posts}
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}
            >
                {posts[menuIndex].map((post, i) =>
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

export let PostsFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Posts);

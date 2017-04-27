import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../redux/main_reducer';
import { PostFromStore } from './Post';
import { pages } from "../../data/pages";
import { VerticalMenuSelector } from "./VerticalMenuSelector";
import { changeViewIndex } from '../../Home/HomeActionCreators';

interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
    width?: number
    height?: number
}

interface ICallbacks {
    onViewIndexSelect?: (activeViewIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isHovering?: boolean
}

export class Posts extends React.Component<IProps, IState> {

    timerId;
    postsRef: HTMLDivElement

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isHovering: false
        };
    }

    componentDidMount() {
        if (this.props.activeViewIndex===-1) {
            this.props.onViewIndexSelect(0);
        }
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

    handleSelectorClick(i) {
        this.props.onViewIndexSelect(i);
    }

    render(): JSX.Element {
        let { isHovering, isMounted } = this.state;

        let styles = {
            posts: {
                position: "absolute",
                top: "calc(8% + 40px)",
                left: "6vw",
                width: "94vw",
                height: "80vh",
                textAlign: "center"

            },
            posts__content: {
                display: "inline-block",
                width: "88vw",
                height: "100%",
                overflowY: "scroll",
                borderRadius: 8,
                zIndex: 1
            },
            posts__verticalMenu: {
                display: "inline-block",
                verticalAlign: "top",
                width: "6vw",
                height: "100%",
                zIndex: 2
            }
        };

        return (
            <div style={styles.posts}>
                <div style={styles.posts__content}
                     ref={(el) => this.postsRef = el}
                     onMouseEnter={() => this.handleMouseEnter()}
                     onMouseLeave={() => this.handleMouseLeave()}
                >
                    {this.state.isMounted && pages[this.props.activePageIndex].posts.map((post, i) =>
                        <PostFromStore
                            key={i}
                            viewIndex={i}
                            post={post}
                            postsRef={this.postsRef}
                        />
                    )}
                </div>
                <div style={styles.posts__verticalMenu}>
                    {pages[this.props.activePageIndex].posts.map((post, i) =>
                        <VerticalMenuSelector
                            key={i}
                            activePageIndex={this.props.activePageIndex}
                            activeViewIndex={this.props.activeViewIndex}
                            viewIndex={i}
                            post={post}
                            onClick={this.handleSelectorClick.bind(this)}
                        />
                    )}
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        activePageIndex: state.homeStore.activePageIndex,
        activeViewIndex: state.homeStore.activeViewIndex,
        width: state.homeStore.width,
        height: state.homeStore.height
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onViewIndexSelect: (activeViewIndex) => {
            dispatch(changeViewIndex(activeViewIndex));
        }
    }
}

export let PostsFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Posts);

import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../redux/main_reducer';
import { IPost } from '../../models';
import { changePageIndex } from '../../Home/HomeActionCreators';

interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
    width?: number
    height?: number
}

interface ICallbacks {
    onChangeMenuIndex?: (menuIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {
    viewIndex?: number
    post?: IPost
}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isHovering?: boolean
    isMini?: boolean
}

export class Post extends React.Component<IProps, IState> {

    containerEl: HTMLDivElement;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isHovering: false,
            isMini: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isMounted: true})
        }, 0);
        const isSelectedView = this.props.activeViewIndex===this.props.viewIndex;
        if (isSelectedView) {
            document.getElementsByClassName("posts")[0].scrollTop = this.containerEl.offsetHeight;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.width !== this.props.width) {
            if (nextProps.width < 720) {
                this.setState({ isMini: true })
            } else {
                this.setState({ isMini: false })
            }
        }
    }

    handleMouseEnter() {
        this.setState({isHovering: true})
    }

    handleMouseLeave() {
        this.setState({isHovering: false})
    }

    render(): JSX.Element {
        let { isHovering, isMounted, isMini } = this.state;
        let { activePageIndex, width, height, post } = this.props;

        let styles = {
            post: {
                width: "96%",
                padding: "2%",
                borderBottom: "1px solid #212121",
                marginBottom: 10,
                color: "#212121",
                background: "#eeeeee"
            },
            post__picContainer: {
                display: "inline-block",
                verticalAlign: "top",
                width: isMini ? "50%" :"20%",
            },
            post__pic: {
                height: 60,
                width: "auto"
            },
            post__heading: {
                display: "inline-block",
                verticalAlign: "top",
                width: isMini ? "100%" :"60%",
            },
            post__date: {
                display: "inline-block",
                verticalAlign: "top",
                width: isMini ? "50%" :"20%",
            },
            post__paragraph: {
                textAlign: "left",
                margin: "10px 0"
            }
        };
        return (
            <div style={styles.post}
                 ref={el => this.containerEl = el}
                 onMouseEnter={() => this.handleMouseEnter()}
                 onMouseLeave={() => this.handleMouseLeave()}
            >
                <a href={(post.link.length > 0) ? post.link : null}
                   target="_blank">
                    <div style={styles.post__picContainer} >
                        <img style={styles.post__pic} src={post.pic}/>
                    </div>
                    <h2 style={styles.post__heading}>{post.heading}</h2>
                    <div style={styles.post__date}>{post.date}</div>
                </a>
                <div>{post.content.map((paragraph, i) =>
                    <div key={i}
                         style={styles.post__paragraph}>
                        {paragraph}
                    </div>
                )}
                </div>
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

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onChangeMenuIndex: (menuIndex) => {
            dispatch(changePageIndex(menuIndex));
        }
    }
}

export let PostFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Post);

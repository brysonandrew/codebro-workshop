import * as React from 'react';
import THREE = require('three');
import { connect } from 'react-redux';
import { IStoreState } from '../../redux/main_reducer';
import { IPost } from '../../models';
import { changePageIndex } from '../../Home/HomeActionCreators';
import { pages } from '../../data/pages';


interface IProperties {
    pageIndex?: number
    width?: number
    height?: number
    post?: IPost
}

interface ICallbacks {
    onChangeMenuIndex?: (menuIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isHovering?: boolean
}

export class Post extends React.Component<IProps, IState> {

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
        }, 0)
    }

    handleMouseEnter() {
        this.setState({isHovering: true})
    }

    handleMouseLeave() {
        this.setState({isHovering: false})
    }

    render(): JSX.Element {
        let { isHovering, isMounted } = this.state;
        let { pageIndex, width, height, post } = this.props;

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
                width: "20%",
            },
            post__pic: {
                height: 40,
                width: "auto"
            },
            post__heading: {
                display: "inline-block",
                verticalAlign: "top",
                width: "60%",
            },
            post__date: {
                display: "inline-block",
                verticalAlign: "top",
                width: "20%",
            },
            post__paragraph: {
                textAlign: "left",
                margin: "10px 0"
            }
        };
        return (
            <div style={styles.post}
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
        pageIndex: state.subStore.pageIndex,
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

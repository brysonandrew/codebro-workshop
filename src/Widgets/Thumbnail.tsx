import * as React from 'react';
import { addComponentCSS } from '../utils/css_styler';
import { Logo } from './Logo/Logo'
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { pages } from "../data/pages";
import { changePageIndex } from '../Home/HomeActionCreators';

addComponentCSS({
    //language=CSS
    default: `
    `
});

interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
    width?: number
}

interface ICallbacks {
    onPageIndexSelect?: (activePageIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isActivated: boolean
}

export class Thumbnail extends React.Component<IProps, IState> {

    array;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isActivated: false
        };
    }

    componentDidMount() {
    }

    handleClick() {
        this.setState({
            isActivated: !this.state.isActivated
        })
    }

    render(): JSX.Element {
        let styles = {
            thumbnail: {
                position: "fixed",
                height: "100vh",
                width: "100vw",
                background: "transparent",
                zIndex: 20
            },
            thumbnail__videoTitle: {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "80%",
                fontSize: 100,
                color: "#eeeeee",
                transform: "translate(-50%, -50%)"
            }
        };
        const thumbnailInfo = pages[this.props.activePageIndex].posts[this.props.activeViewIndex];
        return (
            <div style={styles.thumbnail}>
                <div style={styles.thumbnail__videoTitle}>
                    {thumbnailInfo.heading}
                </div>
            </div>
        );
    }
}
// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.subStore.width,
        activePageIndex: state.subStore.activePageIndex,
        activeViewIndex: state.subStore.activeViewIndex
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onPageIndexSelect: (activePageIndex) => {
            dispatch(changePageIndex(activePageIndex));
        }
    }
}

export let ThumbnailFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Thumbnail);

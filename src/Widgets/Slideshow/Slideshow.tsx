import * as React from 'react';
import { addComponentCSS } from '../../utils/css_styler';
import { Logo } from '../Logo/Logo'
import { connect } from 'react-redux';
import { IStoreState } from '../../redux/main_reducer';
import { changePageIndex } from '../../Workshop/WorkshopActionCreators';
import {workshopLinks} from "../../data/workshop";

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
    partIndex?: number
}

export class Slideshow extends React.Component<IProps, IState> {

    array;
    slideshowInfo = workshopLinks[this.props.activePageIndex].slides[this.props.activeViewIndex];
    pageInfo = workshopLinks[this.props.activePageIndex];

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            partIndex: 0
        };
    }

    componentDidMount() {
        window.addEventListener("keypress", (e) => this.handleKeyPress(e))
    }

    handleKeyPress(e) {
        const { partIndex } = this.state;
        if (e.keyCode===122 && partIndex > 0) {
            this.setState({
                partIndex: partIndex - 1
            })
        } else if (e.keyCode===120 && partIndex <= this.pageInfo.parts.length) {
            this.setState({
                partIndex: partIndex + 1
            })
        }
    }

    render(): JSX.Element {
        const {partIndex} = this.state;
        let styles = {
            slideshow: {
                position: "fixed",
                height: "100vh",
                width: "100vw",
                background: "transparent",
                zIndex: 20
            },
            slideshow__videoTitle: {
                position: "absolute",
                left: "50%",
                top: "40%",
                width: "80%",
                fontSize: 80,
                color: "#eeeeee",
                transform: "translate(-50%, -50%)",
                zIndex: 1
            },
            slideshow__videoPart: {
                position: "absolute",
                left: "50%",
                top: "60%",
                width: "80%",
                fontSize: 60,
                color: "#eeeeee",
                transform: "translate(-50%, -50%)",
                zIndex: 1
            },
            slideshow__category: {
                position: "absolute",
                right: "4vw",
                bottom: "4vh",
                fontSize: 40,
                color: "#eeeeee",
                zIndex: 1
            },
            slideshow__pic: {
                position: "absolute",
                top: "10vh",
                height: "80vh",
                width: "auto",
                opacity: 0.5
            }
        };
        return (
            <div style={styles.slideshow}>
                <div>
                    <div style={styles.slideshow__videoTitle}>
                        {this.pageInfo.name}
                    </div>
                    <div style={styles.slideshow__videoPart}>
                       {this.pageInfo.parts[partIndex]}
                    </div>
                    <div style={styles.slideshow__category}>
                       {this.pageInfo.category}
                    </div>
                    <img
                        style={styles.slideshow__pic}
                        src={this.pageInfo.image}
                    />
                </div>
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
        onPageIndexSelect: (activePageIndex) => {
            dispatch(changePageIndex(activePageIndex));
        }
    }
}

export let SlideshowFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Slideshow);

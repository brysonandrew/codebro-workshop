import * as React from 'react';
import { addComponentCSS } from '../../utils/css_styler';
import { Logo } from '../Logo/Logo'
import { connect } from 'react-redux';
import { IStoreState } from '../../redux/main_reducer';
import { pages } from "../../data/pages";
import { changePageIndex } from '../../Home/HomeActionCreators';

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
    slideshowIndex?: number
}

export class Slideshow extends React.Component<IProps, IState> {

    array;
    slideshowInfo = pages[this.props.activePageIndex].posts[this.props.activeViewIndex];

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            slideshowIndex: -1
        };
    }

    componentDidMount() {
        window.addEventListener("keypress", (e) => this.handleKeyPress(e))
    }

    handleKeyPress(e) {
        const { slideshowIndex } = this.state;
        if (e.keyCode===122 && slideshowIndex > 0) {
            this.setState({
                slideshowIndex: slideshowIndex - 1
            })
        } else if (e.keyCode===120 && slideshowIndex < this.slideshowInfo.slides.length) {
            this.setState({
                slideshowIndex: slideshowIndex + 1
            })
        }
    }

    render(): JSX.Element {
        const {slideshowIndex} = this.state;
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
                top: "50%",
                width: "80%",
                fontSize: 100,
                color: "#eeeeee",
                transform: "translate(-50%, -50%)",
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
        console.log(slideshowIndex);
        return (
            <div style={styles.slideshow}>
               {(slideshowIndex===-1)
                ?   <div>
                        <div style={styles.slideshow__videoTitle}>
                            {this.slideshowInfo.heading}
                        </div>
                        <img
                            style={styles.slideshow__pic}
                            src={this.slideshowInfo.pic}
                        />
                    </div>
                :   this.slideshowInfo.slides[slideshowIndex]}
            </div>
        );
    }
}
// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.homeStore.width,
        activePageIndex: state.homeStore.activePageIndex,
        activeViewIndex: state.homeStore.activeViewIndex
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

import * as React from 'react';
import { addComponentCSS } from '../../../../utils/css_styler';
import { CyclopsMenuFromStore } from "./Widgets/CyclopsMenu/CyclopsMenu";
import { colors } from "./cyclopsData/themeOptions";
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';
import { setViewportWidth, openMenu } from './CyclopsActionCreators';
import { siteContent } from "./cyclopsData/siteContent";
import { CyclopsPageFromStore } from './Widgets/CyclopsPage';

addComponentCSS({
    //language=CSS
    default: `
        @font-face {
            font-family: Copperplate;
            /*noinspection CssUnknownTarget*/src: url(/fonts/Showroom/Copperplate.ttf);
        }
        @font-face {
            font-family: Balthazar;
            /*noinspection CssUnknownTarget*/src: url(/fonts/Showroom/Balthazar-Regular.ttf);
        }
        .sphinxContainer * {
            font-family: Copperplate, 'arial', sans-serif;
        }
        .sphinxContainer div {
            font-family: Balthazar, 'arial', sans-serif;
        }
        
    `
});

interface IProperties {
    width?: number
    activePageIndex?: number
    isMenuOpen?: boolean
}

interface ICallbacks {
    onResizeViewport?: (width: number, isMenuOpen: boolean) => void
    onLoad?: (isMenuOpen: boolean) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
}

export class Cyclops extends React.Component<IProps, IState> {

    timerId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
        }
    }

    componentDidMount() {
        this.timerId = setTimeout(() => {
            this.setState({
                isMounted: true
            })
        }, 0);
        window.addEventListener("resize", () => this.handleWindowResize());
        this.handleWindowResize();
        this.props.onLoad(window.innerWidth >= 600); //isMenuOpen
    }

    componentWillUnmount() {
        this.timerId = this.setState({
            isMounted: false
        });
        clearTimeout(this.timerId);
    }

    handleWindowResize() {
        this.props.onResizeViewport(
            window.innerWidth, //width
            window.innerWidth >= 600 //isMenuOpen
        );
    }

    render(): JSX.Element {
        const { isMounted } = this.state;
        const { isMenuOpen } = this.props;

        const imageURL = "http://cdn.ebaumsworld.com/mediaFiles/picture/2192630/82523333.jpg";

        const styles = {
            cyclops: {
                background: "#fafafa",
                width: "100vw",
                height: "100vh",
            },
            cyclops__outer: {
                background: "#fafafa",
                width: "100vw",
                height: "100vh",
                textAlign: "center",
                opacity: isMounted ? 1 : 0,
                transition: "opacity 1000ms"
            },
            cyclops__inner: {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "100%",
                height: "100%",
                opacity: isMenuOpen ? 0.22 : 1,
                background: `radial-gradient(rgba(250,250,250, 0.85) 0%, 
                                             rgba(250,250,250, 0.45) 50%, 
                                             rgba(250,250,250, 0.85) 100%), url(${imageURL})`,
                backgroundSize: "cover",
                filter: "grayscale(100%)",
                transform: "translate(-50%, -50%)",
                transition: "opacity 1000ms"
            },
            cyclops__heading: {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                color: "#212121",
                padding: "10px 0",
                borderTop: "2px solid #212121",
                borderBottom: "2px solid #212121",
            }
        };
        return (
            <div style={ styles.cyclops }>
                <div style={ styles.cyclops__outer }>
                    <CyclopsMenuFromStore/>
                    <div style={ styles.cyclops__inner }>
                        <h1 style={ styles.cyclops__heading }>
                            Cyclops
                        </h1>
                    </div>
                </div>
                {siteContent.map((content, i) =>
                    <CyclopsPageFromStore
                        key={i}
                        pageIndex={i}
                        content={content}
                    />)}
            </div>
        );
    }
}

// ------------ redux mappers -------------


function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.cyclopsStore.width,
        isMenuOpen: state.cyclopsStore.isMenuOpen,
        activePageIndex: state.cyclopsStore.activePageIndex
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onLoad: (isMenuOpen) => {
            dispatch(openMenu(isMenuOpen));
        },
        onResizeViewport: (width, isMenuOpen) => {
            dispatch(setViewportWidth(width));
            dispatch(openMenu(isMenuOpen));
        }
    }
}

export let CyclopsFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Cyclops);

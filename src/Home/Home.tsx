import * as React from 'react';
import { connect } from 'react-redux';
import { addComponentCSS } from '../utils/css_styler';
import { IStoreState } from '../redux/main_reducer';
import { changeMenuIndex, changeViewportDimensions } from './HomeActionCreators';
import { MenuFromStore } from '../Widgets/Menu';
import { PostsFromStore } from "../Widgets/Posts/Posts";
import { BackgroundFromStore } from "../Widgets/Background";

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
    onChangeViewport?: (width: number, height: number) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {}

export class Home extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        this.props.onChangeViewport( window.innerWidth, window.innerHeight );
        window.addEventListener( 'resize', () => this.onWindowResized(), false );
    }

    onWindowResized() {
        this.props.onChangeViewport(window.innerWidth, window.innerHeight);
    }

    public render(): JSX.Element {
        let styles = {
            home: {
                position: "fixed",
                height: "100vh",
                width: "100vw",
                textAlign: "center"
            },
            home__logo: {
                position: "absolute",
                top: "2vh",
                left: "2vw",
                width: 40,
                height: "auto",
                filter: "invert(100%)"
            }
        };
        return (
            <div style={styles.home}>
                <img style={styles.home__logo} src="/images/logo.PNG"/>
                <MenuFromStore/>
                {(this.props.menuIndex > -1)
                    ?   <PostsFromStore/>
                    :   null}
                <BackgroundFromStore/>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        menuIndex: state.subStore.menuIndex
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onChangeMenuIndex: (menuIndex) => {
            dispatch(changeMenuIndex(menuIndex));
        },
        onChangeViewport: (width, height) => {
            dispatch(changeViewportDimensions(width, height));
        }
    }
}

export let HomeFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Home);

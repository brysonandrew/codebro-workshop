import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';
import { Sphinx } from "./Sphinx";
import { addComponentCSS } from '../../../../utils/css_styler';
import { AsyncGet } from '../../../../redux/utils/async_get';
import { fetchAPIInfo } from "../../ShowroomActionCreators";

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
    info: AsyncGet<any[]>,
}

interface ICallbacks {
    onMount: (subject: string) => void;
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {}

export class SphinxContainer extends React.Component<IProps, IState> {

    subject = "sphinx";

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        this.props.onMount(this.subject);
    }

    renderContent() {
        const style = {textAlign: 'center'};
        return AsyncGet.render(this.props.info, {
            none    : () => <p style={style}>Blog posts not fetched, fetching will start in few seconds</p>,
            fetching: () => <p style={style}>Loading...</p>,
            fetched: (info: any) => (
                <Sphinx
                    info={info}
                />
            ),
            error   : () => <p style={style}>Failed to fetch blog</p>
        });
    }

    render(): JSX.Element {
        const styles = {
            container: {
                position: "relative",
                top: 0,
                left: 0,
                background: "#fafafa",
                width: "100vw",
                height: "100vh",
                textAlign: "center"
            },
            container__object: {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
            }
        };
        return (
            <div className="sphinxContainer" style={ styles.container }>
                <div style={ styles.container__object }>
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------


function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        info: state.showroomStore.info,
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onMount: (subject) => {
            dispatch(fetchAPIInfo(subject));
        },
    }
}

export let SphinxContainerFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(SphinxContainer);

import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';
import { CyclopsFromStore } from "./Cyclops";
import { addComponentCSS } from '../../../../utils/css_styler';

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
        .sphinxContainer div p {
            font-family: Balthazar, 'arial', sans-serif;
        }
        
    `
});

interface IProperties {}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {}

export class CyclopsContainer extends React.Component<IProps, IState> {

    subject = "sphinx";

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {}

    render(): JSX.Element {
        const styles = {
            container: {
                position: "relative",
                top: 0,
                left: 0
            }
        };
        return (
            <div className="sphinxContainer" style={ styles.container }>
                <CyclopsFromStore/>
            </div>
        );
    }
}

// ------------ redux mappers -------------


function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
    }
}

export let CyclopsContainerFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(CyclopsContainer);

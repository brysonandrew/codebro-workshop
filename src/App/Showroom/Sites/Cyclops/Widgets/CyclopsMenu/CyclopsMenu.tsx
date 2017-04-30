import * as React from 'react';
import { CyclopsMenuButtonFromStore } from "./CyclopsMenuButton/CyclopsMenuButton";
import { CyclopsMenuSelectorsFromStore } from "./CyclopsMenuSelectors/CyclopsMenuSelectors";
import { colors } from "../../cyclopsData/themeOptions";
import { connect } from 'react-redux';
import { IStoreState } from '../../../../../../redux/main_reducer';

interface IProperties {
    width?: number
    height?: number
    activePageIndex?: number
    isMenuOpen?: boolean
}

interface ICallbacks {
    onResizeViewport?: (width: number, height: number) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
}

export class CyclopsMenu extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {

    }

    render(): JSX.Element {
        const styles = {
            cyclopsMenu: {
                position: "relative",
                height: "100vh",
                zIndex: 4
            },
            cyclopsMenu__button: {
                position: "fixed",
                left: "2vw",
                top: "2vh",
                zIndex: 6
            },
            cyclopsMenu__content: {
                position: "fixed",
                left: "2vw",
                top: "2vh",
                width: "100%",
                height: "100%",
            }
        };
        return (
            <div style={ styles.cyclopsMenu }>
                <div style={ styles.cyclopsMenu__button }>
                    <CyclopsMenuButtonFromStore/>
                </div>
                <div style={ styles.cyclopsMenu__content }>
                    <CyclopsMenuSelectorsFromStore/>
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.cyclopsStore.width,
        activePageIndex: state.cyclopsStore.activePageIndex,
        isMenuOpen: state.cyclopsStore.isMenuOpen,
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {}
}

export let CyclopsMenuFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(CyclopsMenu);

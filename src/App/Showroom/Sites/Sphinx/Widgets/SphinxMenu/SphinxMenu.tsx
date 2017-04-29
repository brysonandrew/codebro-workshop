import * as React from 'react';
import THREE = require('three');
import {SphinxMenuButtonFromStore} from "./SphinxMenuButton/SphinxMenuButton";
import {SphinxMenuContentFromStore} from "./SphinxMenuContent/SphinxMenuContent";
import { colors } from "../../sphinxData/themeOptions";
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

export class SphinxMenu extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {

    }

    render(): JSX.Element {
        const styles = {
            sphinxMenu: {
                position: "relative",
                height: "100vh",
            },
            sphinxMenu__button: {
                position: "absolute",
                left: "2vw",
                top: "2vh",
                zIndex: 4
            },
            sphinxMenu__content: {
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
            }
        };
        return (
            <div style={ styles.sphinxMenu }>
                <div style={ styles.sphinxMenu__button }>
                    <SphinxMenuButtonFromStore/>
                </div>
                <div style={ styles.sphinxMenu__content }>
                    <SphinxMenuContentFromStore/>
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------


function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.sphinxStore.width,
        activePageIndex: state.sphinxStore.activePageIndex,
        isMenuOpen: state.sphinxStore.isMenuOpen,
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {}
}

export let SphinxMenuFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(SphinxMenu);

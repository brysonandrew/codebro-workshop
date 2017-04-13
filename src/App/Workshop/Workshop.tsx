import * as React from 'react';
import THREE = require('three');
import {connect} from 'react-redux';
import {IStoreState} from '../../redux/main_reducer';
import {Logo} from '../../Widgets/Logo/Logo';

interface IProperties {}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {}

export class Workshop extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const style = {
            position: "absolute",
            width: "100%",
            textAlign: "center",
        };
        return (
            <div style={style}>
                <Logo/>
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

export let WorkshopFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Workshop);

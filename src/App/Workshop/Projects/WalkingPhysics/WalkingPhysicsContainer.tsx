import * as React from 'react';
import THREE = require('three');
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';

interface IProperties {}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {}

export class WalkingPhysicsContainer extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const styles = {
            container: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
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
            <div style={ styles.container }>
                <div style={ styles.container__object }>
                </div>
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

export let WalkingPhysicsContainerFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(WalkingPhysicsContainer);

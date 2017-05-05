import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../redux/main_reducer';
import {VideoEditor} from "./VideoEditor";

interface IProperties {}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {}

export class VideoEditorContainer extends React.Component<IProps, IState> {

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
                display: "inline-block",
                width: "80%"
            }
        };
        return (
            <div style={ styles.container }>
                <div style={ styles.container__object }>
                    <VideoEditor/>
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

export let VideoEditorContainerFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(VideoEditorContainer);

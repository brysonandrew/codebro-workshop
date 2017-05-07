import * as React from 'react';
import * as Immutable from 'immutable';
import { VideoUploadFromStore } from "./VideoUpload/VideoUpload";

interface IProps {}

interface IState {
    videoPath: string
}

export class VideoEditor extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            videoPath: ""
        }
    }

    componentDidMount() {

    }

    handleUploadVideoChange(videoPathId) {
        const fullVideoPath = `/images/uploads/${videoPathId}`;
        this.setState({
            videoPath: fullVideoPath
        })
    }

    render(): JSX.Element {
        return (
            <div>
                <VideoUploadFromStore
                    onChange={this.handleUploadVideoChange.bind(this)}
                    value={this.state.videoPath}
                />
            </div>
        );
    }
}

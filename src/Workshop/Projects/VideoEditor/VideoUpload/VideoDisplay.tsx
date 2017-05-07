import * as React from 'react';
import THREE = require('three');

interface IProps {
    videoPath : string
}

interface IState {}

export class VideoDisplay extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {

    }

    render(): JSX.Element {
        console.log(this.props.videoPath);
        return (
            <div>
                <video width="320" height="240" controls>
                    <source src={this.props.videoPath} type="video/mp4"/>
                    <source src={this.props.videoPath} type="video/ogg"/>
                        Your browser does not support the video tag.
                </video>
            </div>
        );
    }
}

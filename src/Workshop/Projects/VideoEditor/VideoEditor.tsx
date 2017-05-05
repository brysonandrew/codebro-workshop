import * as React from 'react';
import * as Immutable from 'immutable';
import { ImageUploadFromStore } from "./ImageUpload/ImageUpload";

interface IProps {}

interface IState {
    imagePaths: string[]
}

export class VideoEditor extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            imagePaths: []
        }
    }

    componentDidMount() {

    }

    handleUploadPicChange(imagePathId) {
        const fullImagePath = `/images/uploads/${imagePathId}`;
        const imagePaths = Immutable.List(this.state.imagePaths)
            .push(fullImagePath)
            .toSet()
            .toJS();
        this.setState({
            imagePaths: imagePaths
        })
    }

    render(): JSX.Element {
        return (
            <div>
                <ImageUploadFromStore
                    onChange={this.handleUploadPicChange.bind(this)}
                    values={this.state.imagePaths}
                />
            </div>
        );
    }
}

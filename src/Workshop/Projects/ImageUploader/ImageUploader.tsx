import * as React from 'react';
import * as Immutable from 'immutable';
import { ImageUploadFromStore } from "./ImageUpload/ImageUpload";

interface IProps {}

interface IState {
    imagePaths?: string[]
    imageGalleryIndex?: number
}

export class ImageUploader extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            imagePaths: [],
            imageGalleryIndex: -1
        }
    }

    handleDeletePicChange() {
        console.log(this.state.imageGalleryIndex);
        const imagePaths = Immutable.List(this.state.imagePaths)
            .splice(this.state.imageGalleryIndex, 1)
            .toSet()
            .toJS();
        this.setState({
            imagePaths: imagePaths
        })
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

    handleImageGalleryChange(i) {
        this.setState({
            imageGalleryIndex: i
        })
    }

    render(): JSX.Element {
        const styles = {
            imageUploader__delete: {
                color: "red",
                fontSize: 22
            }
        };
        return (
            <div>
                <ImageUploadFromStore
                    onImageGalleryIndexChange={this.handleImageGalleryChange.bind(this)}
                    onAddChange={this.handleUploadPicChange.bind(this)}
                    values={this.state.imagePaths}
                />
                <div style={ styles.imageUploader__delete }
                    onClick={this.handleDeletePicChange.bind(this)}>
                    Delete Current Photo
                </div>
            </div>
        );
    }
}

import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';
import { uploadImage } from "../ImageUploaderActionCreators";
import { AsyncPost, AsyncPostStatus } from '../../../../redux/utils/async_post';
import { Button } from '../../../../Widgets/Button/Button';
import { ImageGallery } from '../../ImageGallery/ImageGallery';

interface IProperties {
    imagePathId?: AsyncPost<any,string>
}

interface ICallbacks {
    onImageUpload?: (imageFormData: FormData) => void
    onImageGalleryIndexChange?: (index: number) => void
}

interface IState extends IProperties, ICallbacks {
    isGalleryHovering?: boolean
    isGalleryMini?: boolean
    isMounted?: boolean
    warning?: string
}

interface IProps extends IProperties, ICallbacks {
    values:         string[]
    onAddChange:    (imagePathId: string) => void
}

export class ImageUpload extends React.Component<IProps, IState> {

    uploadImageInput: HTMLInputElement;
    wrapperElement: HTMLDivElement;

    constructor(props: IProps, context?: any) {
        super(props, context);
        this.state = {
            isGalleryHovering: false,
            isGalleryMini: false,
            isMounted: false,
            warning: ""
        };
        this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
    }

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.imagePathId.data !== this.props.imagePathId.data) {
            console.log(nextProps.imagePathId.data);
            this.props.onAddChange(nextProps.imagePathId.data);
        }
    }

    handleUploadPhoto() {
        const file = this.uploadImageInput.files[0];
        if (file != null) {
            let imageFormData = new FormData();
            imageFormData.append("img", file, file.name);
            this.props.onImageUpload(imageFormData);
        } else {
            this.setState({
                warning: "No photo selected."
            })
        }
    }

    handleMouseEnter() {
        this.setState({ isGalleryHovering: true })
    }

    handleMouseLeave() {
        this.setState({ isGalleryHovering: false })
    }

    handleImageGalleryChange(i) {
        this.props.onImageGalleryIndexChange(i);
    }

    renderImage(): JSX.Element {
        return AsyncPost.render(this.props.imagePathId, {
            none   : () =>              <div>
                                            {"Upload Photo"}
                                        </div>,
            posting: () =>              <div>
                                           {"Uploading..."}
                                        </div>,
            posted : (imagePathId) =>   <div>
                                            <img src={`/images/uploads/${imagePathId}`}/>
                                        </div>
        });
    }

    renderUploadButton(): JSX.Element {
        return AsyncPost.render(this.props.imagePathId, {
            none   : () => <Button text="Upload Photo"
                                   onClick={this.handleUploadPhoto}/>,
            posting: () => <Button text="Uploading..."
                                   onClick={null}
                                   isDisabled={true}/>,
            posted : () => <Button text="Upload Photo"
                                   onClick={this.handleUploadPhoto}/>
        });
    }

    public render(): JSX.Element {
        const styles = {
            imageUpload: {
                position: "relative",
                paddingTop: 100
    },
            imageUpload__warning: {
                fontSize: 22,
                color: "red"
            }
        };
        return (
            <div style={styles.imageUpload}
                 ref={el => this.wrapperElement = el}
                 onMouseLeave={() => this.handleMouseLeave}
                 onMouseEnter={() => this.handleMouseEnter}>
                {this.props.values.length > 0 && this.state.isMounted
                    ?   <ImageGallery
                            imagePaths={this.props.values}
                            wrapperElement={this.wrapperElement}
                            isMini={this.state.isGalleryMini}
                            isHovering={this.state.isGalleryHovering}
                            onChange={this.handleImageGalleryChange.bind(this)}
                        />
                    :   null}
                {(this.props.values.length > 0) ? this.renderImage() : null}
                <div>
                    Select a file: <input
                                        accept="application/x-zip-compressed,image/*"
                                        ref={el => this.uploadImageInput = el}
                                        type="file"
                                        name="img"/>
                    {this.renderUploadButton()}
                    <span style={styles.imageUpload__warning}>
                        {this.state.warning}
                    </span>
                </div>
            </div>
        );
    }
}
// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        imagePathId: state.videoEditorStore.videoPathId
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onImageUpload: (imageFormData) => {
            dispatch(uploadImage(imageFormData));
        }
    }
}

export let ImageUploadFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(ImageUpload);

import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';
import { uploadVideo } from "../VideoEditorActionCreators";
import { AsyncPost, AsyncPostStatus } from '../../../../redux/utils/async_post';
import { Button } from '../../../../Widgets/Button/Button';
import { VideoDisplay } from "./VideoDisplay";

interface IProperties {
    videoPathId?: AsyncPost<any,string>
}

interface ICallbacks {
    onVideoUpload?: (videoFormData: FormData) => void
}

interface IState extends IProperties, ICallbacks {
    isGalleryHovering?: boolean
    isGalleryMini?: boolean
    isMounted?: boolean
    warning?: string
}

interface IProps extends IProperties, ICallbacks {
    value?:     string
    onChange?:   (imageUrl: AsyncPost<any,string>) => void
}

export class VideoUpload extends React.Component<IProps, IState> {

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
        this.handleUploadVideo = this.handleUploadVideo.bind(this);
    }

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.imagePathId.data !== this.props.videoPathId.data) {
            this.props.onChange(nextProps.imagePathId.data);
        }
    }

    handleUploadVideo() {
        const file = this.uploadImageInput.files[0];
        console.log(file);
        if (file != null) {
            let imageFormData = new FormData();
            imageFormData.append("video", file, file.name);
            this.props.onVideoUpload(imageFormData);
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

    renderVideo(): JSX.Element {
        return AsyncPost.render(this.props.videoPathId, {
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
        return AsyncPost.render(this.props.videoPathId, {
            none   : () => <Button text="Upload Photo"
                                   onClick={this.handleUploadVideo}/>,
            posting: () => <Button text="Uploading..."
                                   onClick={null}
                                   isDisabled={true}/>,
            posted : () => <Button text="Upload Photo"
                                   onClick={this.handleUploadVideo}/>
        });
    }

    public render(): JSX.Element {
        const styles = {
            videoUpload: {
                position: "relative",
                paddingTop: 100
            },
            videoUpload__warning: {
                fontSize: 22,
                color: "red"
            }
        };
        return (
            <div style={styles.videoUpload}
                 ref={el => this.wrapperElement = el}
                 onMouseLeave={() => this.handleMouseLeave}
                 onMouseEnter={() => this.handleMouseEnter}>
                {this.props.value && this.state.isMounted
                    ?   <VideoDisplay
                            videoPath={this.props.value}
                        />
                    :   null}
                {(this.props.value)
                    ?   this.renderVideo()
                    :   null}
                <div>
                    Select a file: <input
                                        accept="application/x-zip-compressed,image/*"
                                        ref={el => this.uploadImageInput = el}
                                        type="file"
                                        name="video"/>
                    {this.renderUploadButton()}
                    <span style={styles.videoUpload__warning}>
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
        videoPathId: state.videoEditorStore.videoPathId
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onVideoUpload: (videoFormData) => {
            dispatch(uploadVideo(videoFormData));
        }
    }
}

export let VideoUploadFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(VideoUpload);

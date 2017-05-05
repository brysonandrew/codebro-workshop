import * as React from 'react';
import { addComponentCSS } from '../../../utils/css_styler';
import { Motion, spring } from 'react-motion';
import { CloseCross } from "../../../Widgets/CloseCross/CloseCross";

addComponentCSS({
  //language=CSS
  default: `
  .imageGallery {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    text-align: center;
    height: auto;
    position: relative;
    cursor: pointer;
  }

  .imageGallery__inner {
    overflow: hidden;
    position: relative;
    margin: 0 auto;
  }

  .imageGallery__image {
    position: absolute;
    background-color: lightgray;
  }
  `
});

interface IOfferImageGalleryProps {
    imagePaths: string[]
    wrapperElement: Element
    isMini: boolean
    isHovering: boolean
}

interface IOfferImageGalleryState {
    photoDimensions?: number[][]
    arePhotosLoaded?: boolean
    photoIndex?: number
    isLeftButtonHovering?: boolean
    isRightButtonHovering?: boolean
    isExpanded?: boolean
}

const springSettings = {stiffness: 170, damping: 26};

export class ImageGallery extends React.Component<IOfferImageGalleryProps, IOfferImageGalleryState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            photoDimensions: Array.apply(null, new Array(this.props.imagePaths.length)).map(photo => [800, 450]),
            //800, 450 are nominal values only, real values provided onmount and onresize
            arePhotosLoaded: false,
            photoIndex: 0,
            isLeftButtonHovering: false,
            isRightButtonHovering: false,
            isExpanded: false
        };
        this.resizePhotos = this.resizePhotos.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.imagePaths.length !== this.props.imagePaths.length) {
            this.resizePhotos(nextProps);
        }
    }

    componentDidMount() {
        //responsive on window resize
        window.addEventListener("resize", this.resizePhotos);
        this.resizePhotos(this.props);
    }

    componentWillUnmount() {
        //clean up event listeners when unmounted
        window.removeEventListener("resize", this.resizePhotos);
    }

    handleClickRight(e) {
        this.setState({
            photoIndex: this.state.photoIndex + 1
        });
        e.stopPropagation();
    }

    handleClickLeft(e) {
        this.setState({
            photoIndex: this.state.photoIndex - 1
        });
        e.stopPropagation();
    }

    handleDotClick(e, i) {
        this.setState({
            photoIndex: i
        });
        e.stopPropagation();
    }

    handleRightButtonMouseEnter() {
        this.setState({isRightButtonHovering: true})
    }

    handleRightButtonMouseLeave() {
        this.setState({isRightButtonHovering: false})
    }

    handleLeftButtonMouseEnter() {
        this.setState({isLeftButtonHovering: true})
    }

    handleLeftButtonMouseLeave() {
        this.setState({isLeftButtonHovering: false})
    }

    resizePhotos(props) {
        let parentWidth = props.wrapperElement.clientWidth;
        Promise.all(Array.apply(null, Array(props.imagePaths.length))
                        .map((_, i) => this.getAspectRatio(i, props)))
                        .then(aspectRatios => this.setPhotoDimensions(aspectRatios, parentWidth, props)
        );
    }

    getAspectRatio(i, props) : Promise<number> {
        let p = new Promise((resolve, reject) => {
            let photo = new Image();
            photo.onload = () => {
                resolve(photo.width/photo.height)
            };
            photo.src = this.photoPathBy(i, props);
        });
        return p;
    }

    photoPathBy(photoIndex, props) {
        return `${props.imagePaths[photoIndex]}`
    }

    setPhotoDimensions(aspectRatios, parentWidth, props) {
        const nextPhotoDimensions = Array.apply(null, new Array(props.imagePaths.length))
                                        .map((pic, index) =>
                                            this.applyAspectRatioToXY(
                                                parentWidth,
                                                aspectRatios,
                                                index)
                                        ); //width, height
        this.setState({
            photoDimensions: nextPhotoDimensions,
            arePhotosLoaded: true
        })
    }

    applyAspectRatioToXY(parentWidth, aspectRatios, index) {
        let adjustedWidth = parentWidth * aspectRatios[index];
        let adjustmentForWidth = parentWidth / adjustedWidth;
        let fixedHeight = this.state.isExpanded ? 420 : 240;
        let heightDiff = (parentWidth * adjustmentForWidth);
        let adjustmentForHeight = fixedHeight / heightDiff;

        const width = (parentWidth * aspectRatios[index]) * adjustmentForWidth * adjustmentForHeight;
        const height = parentWidth * adjustmentForWidth * adjustmentForHeight;

        return [ width, height ]; //[width, height]
    }

    handlePhotoClick(e) {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
        this.resizePhotos(this.props);
        e.stopPropagation();
    }

    render(): JSX.Element {
        //react-motion stuff
        const { photoDimensions, photoIndex, isLeftButtonHovering, isRightButtonHovering, isExpanded }
                = this.state;

        const  [currWidth, currHeight ] = photoDimensions[photoIndex];

        const widths = photoDimensions.map(([origW, origH]) => currHeight / origH * origW);

        const leftStartCoords = widths // this sets x position of the beginning of the photo we are viewing
            .slice(0, photoIndex)
            .reduce((sum, width) => sum - width, 0);

        let configs = [];
        photoDimensions.reduce((prevLeft, [origW, origH], i) => {
            configs.push({
                left: spring(prevLeft, springSettings),
                height: spring(currHeight, springSettings),
                width: spring(widths[i], springSettings),
            });
            return prevLeft + widths[i];
        }, leftStartCoords);

        const styles = {
            imageGallery__buttonLeft: {
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: 80,
                background: isLeftButtonHovering
                                ? "linear-gradient(to right, rgba(222, 222, 222, 0.6), transparent"
                                : "linear-gradient(to right, rgba(22, 22, 22, 0.6), transparent" ,
                cursor: "pointer",
                zIndex: 6,
                transition: "all 200ms"
            },
            imageGallery__buttonLeftIcon: {
                position: "absolute",
                top: "50%",
                left: "50%",
                color: isLeftButtonHovering
                            ? "#ffffff"
                            : "#eeeeee",
                width: 40,
                height: 40,
                fontSize: 20,
                transform: "translate(-50%, -50%)"
            },
            imageGallery__buttonRight: {
                position: "absolute",
                right: 0,
                top: 0,
                height: "100%",
                width: 80,
                fontSize: 20,
                background: isRightButtonHovering
                                ? "linear-gradient(to left, rgba(44, 44, 44, 0.95), transparent"
                                : "linear-gradient(to left, rgba(22, 22, 22, 0.95), transparent" ,
                cursor: "pointer",
                zIndex: 6,
                transition: "all 200ms"
            },
            imageGallery__buttonRightIcon: {
                position: "absolute",
                top: "50%",
                left: "50%",
                color: isRightButtonHovering
                            ? "#ffffff"
                            : "#eeeeee",
                width: 40,
                height: 40,
                transform: "translate(-50%, -50%)"
            },
            imageGallery__dots: {
                width: "100%"
            },
            imageGallery__dot: {
                display: "inline-block",
                margin: "0 2px",
                cursor: "pointer"
            },
            imageGallery__close: {
                position:  "absolute",
                right: "8vw",
                top: "4vh",
                zIndex: 8
            }
        };

        let modalStyle = {
            position: isExpanded ? "fixed" : "relative",
            top: isExpanded ? "50%" : "0",
            left: isExpanded ? "50%" : "0",
            transform: isExpanded ? "translate(-50%, -50%)" : "none",
            zIndex: isExpanded ? 4 : 0
        };
        let modalStyleBackground = {
            position: isExpanded ? "fixed" : "relative",
            background: isExpanded ? "rgba(0, 0, 0, 0.88)" : "transparent",
            top: 0,
            left: 0,
            width: isExpanded ? "100vw" : "auto",
            height: isExpanded ?  "100vh" : "auto",
            zIndex: isExpanded ? 4 : 0
        };
        let modalStyleButtons = {
            position: isExpanded ? "fixed" : "relative",
            top: isExpanded ? "calc(50% + 220px)" : "0",
            left: isExpanded ? "50%" : "0",
            background: isExpanded ? "#ffffff" : "transparent",
            transform: isExpanded ? "translate(-50%, -50%)" : "none",
            zIndex: isExpanded ? 10 : 0
        };

        return (
            <div style={modalStyleBackground}
                 onClick={isExpanded ? ((e) => this.handlePhotoClick(e)) : null}>
                {isExpanded
                    ?   <div style={styles.imageGallery__close}>
                            <CloseCross onClick={(e) => this.handlePhotoClick(e)}/>
                        </div>
                    :   null}
                <div className="imageGallery" style={modalStyle}>
                    <Motion style={{height: spring(currHeight), width: spring(currWidth)}}>
                        {container =>
                            <div className="imageGallery__inner" style={container}>
                                {(photoIndex > 0)
                                    ?   <div style={styles.imageGallery__buttonLeft}
                                                onMouseEnter={() => this.handleLeftButtonMouseEnter()}
                                                onMouseLeave={() => this.handleLeftButtonMouseLeave()}
                                                onClick={(e) => this.handleClickLeft(e)}>
                                            <i className="fa fa-chevron-left"
                                               style={styles.imageGallery__buttonLeftIcon}/>
                                        </div>
                                    : null
                                }
                                {configs.map((style, i) =>
                                    <Motion key={i} style={style}>
                                        {style =>
                                            <img
                                                className="imageGallery__image"
                                                style={style}
                                                src={this.photoPathBy(photoIndex, this.props)}
                                                onClick={(e) => this.handlePhotoClick(e)}
                                            />
                                        }
                                    </Motion>
                                )}
                                {(photoIndex <  (this.props.imagePaths.length - 1))
                                    ?   <div style={styles.imageGallery__buttonRight}
                                                onMouseEnter={() => this.handleRightButtonMouseEnter()}
                                                onMouseLeave={() => this.handleRightButtonMouseLeave()}
                                                onClick={(e) => this.handleClickRight(e)}>
                                            <i className="fa fa-chevron-right"
                                               aria-hidden="true"
                                               style={styles.imageGallery__buttonRightIcon}/>
                                        </div>
                                    : null
                                }
                            </div>
                        }
                    </Motion>
                </div>
                <div style={Object.assign({}, styles.imageGallery__dots, modalStyleButtons)}
                    onClick={(e) => e.stopPropagation()}>
                    {this.props.imagePaths.map((dot, i) =>
                        (i<10)
                        ?   <div style={styles.imageGallery__dot}
                                 onClick={(e) =>  this.handleDotClick(e, i)}
                                 key={i}
                            >
                                <i className="fa fa-circle"
                                   aria-hidden="true"
                                   style={{
                                       color: ((photoIndex===i)
                                                ? "#F44336"
                                                : "#757575"),
                                       transition: "all 200ms"}
                                    }
                                />
                            </div>
                        : null
                    )}
                </div>
            </div>

            );
        }
    }

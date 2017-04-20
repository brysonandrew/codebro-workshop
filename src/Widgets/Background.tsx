import * as React from 'react';
import THREE = require('three');
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { computer } from '../data/3DObjects';
import { Loading } from './Loading';

interface IProperties {
    pageIndex?: number
    width?: number
    height?: number
}

interface ICallbacks {
    onChangeMenuIndex?: (pageIndex: number) => void
    onChangeViewport?: (width: number, height: number) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isFontLoaded?: boolean
    isAnimating?: boolean
}

export class Background extends React.Component<IProps, IState> {
    camera;
    scene;
    renderer;
    material;
    count = 0;
    cubeCamera1;
    cubeCamera2;
    lon = 0;
    lat = 0;
    phi = 0;
    theta = 0;
    textureLoader = new THREE.TextureLoader();
    centerPiece;
    pic = "/images/background/1.jpg";
    sphere;
    animateLoop;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isFontLoaded: false,
            isAnimating: false
        }
    }

    componentDidMount() {
        if (this.props.pageIndex === -1) {
            this.setState({
                isAnimating: true
            })
        } else {
            this.setState({
                isAnimating: false
            })
        }
        this.loadTexture();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animateLoop);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pageIndex !== this.props.pageIndex) {
            if (nextProps.pageIndex === -1) {
                this.setState({ isAnimating: true });
            } else {
                this.setState({ isAnimating: false });
            }
        }
    }

    loadTexture() {
        let textureLoader = new THREE.TextureLoader();
        textureLoader.load( this.pic, ( texture ) => {
            texture.mapping = THREE.UVMapping;
            if (!this.state.isMounted) {
                this.init( texture );
            }
        } );
    }

    init( texture ) {
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
        this.scene = new THREE.Scene();
        let mesh = new THREE.Mesh( new THREE.SphereBufferGeometry( 500, 32, 16 ), new THREE.MeshBasicMaterial( { map: texture } ) );
        mesh.scale.x = -1;
        this.scene.add( mesh );
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.cubeCamera1 = new THREE.CubeCamera( 1, 1000, 256 );
        this.cubeCamera1.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
        this.scene.add( this.cubeCamera1 );
        this.cubeCamera2 = new THREE.CubeCamera( 1, 1000, 256 );
        this.cubeCamera2.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
        this.scene.add( this.cubeCamera2 );
        document.body.appendChild( this.renderer.domElement );
        //
        this.material = new THREE.MeshBasicMaterial( {
            envMap: this.cubeCamera2.renderTarget.texture
        } );
        this.centerPiece = new THREE.Group;
        //top
        this.sphere = new THREE
            .Mesh( new THREE
            .SphereGeometry( 20, 100, 100 ), this.material );
        this.sphere.position.set(0, 10, 0);
        this.centerPiece.add( this.sphere );

        this.scene.add( this.centerPiece );

        this.setState({ isMounted: true });
        window.addEventListener( 'resize', () => this.onWindowResized(this.renderer), false );
        this.animate();
    }

    onWindowResized(renderer) {
        renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        this.renderMotion();
    }

    renderStill() {
        this.material.envMap = this.cubeCamera1.renderTarget.texture;
        this.cubeCamera2.updateCubeMap( this.renderer, this.scene );
        this.renderer.render( this.scene, this.camera );
    }

    renderMotion() {
        if (this.state.isAnimating) {
            this.lon += .15;
            this.lat = Math.max( - 20, Math.min( 20, this.lat ) );
            this.phi = THREE.Math.degToRad( 90 - this.lat );
            this.theta = THREE.Math.degToRad( this.lon );

            this.centerPiece.rotation.y = 100 * Math.sin( -this.phi );

            this.camera.position.x = 100 * Math.sin( this.phi ) * Math.cos( this.theta );
            this.camera.position.y = 100 * Math.cos( this.phi );
            this.camera.position.z = 100 * Math.sin( this.phi ) * Math.sin( this.theta );
            this.camera.lookAt( this.scene.position );
            // pingpong
            if ( this.count % 2 === 0 ) {
                this.material.envMap = this.cubeCamera1.renderTarget.texture;
                this.cubeCamera2.updateCubeMap( this.renderer, this.scene );
            } else {
                this.material.envMap = this.cubeCamera2.renderTarget.texture;
                this.cubeCamera1.updateCubeMap( this.renderer, this.scene );
            }
            this.count++;
            this.renderer.render( this.scene, this.camera );
        } else {
            this.renderStill();
            cancelAnimationFrame(this.animateLoop);
        }
    }

    render(): JSX.Element {
        return (
            <div>
                {this.state.isMounted
                    ?   null
                    :   <Loading
                            loadingMessage={"loading fancy background"}
                        />}
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        pageIndex: state.subStore.pageIndex
    };
}

export let BackgroundFromStore = connect(
    mapStateToProps
)(Background);

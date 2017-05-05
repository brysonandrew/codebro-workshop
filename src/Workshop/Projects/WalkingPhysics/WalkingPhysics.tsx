import * as React from 'react';
import THREE = require('three');
import {addComponentCSS} from '../../../utils/css_styler';
import {isGL} from "../../../helpers/WebGL";

addComponentCSS({
    //language=CSS
    default: `
    .empty {
    }
    `
});

interface IProps {}

interface IState {
    isFallback?: boolean
}

export class WalkingPhysics extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;
    controls;
    workshopLight;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isFallback: false
        };
    }

    componentDidMount() {
        if (isGL())  {
            this.initGL();
        } else {
            this.initGLFallback();
        }
    }

    initGL() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.initLighting();
        this.initAssets();
        window.addEventListener( 'resize'
            , () => this.onWindowResized(this.renderer), false );
        this.animate();
    }

    initGLFallback() {
        this.setState({ isFallback: true })
    }


    componentWillUnmount() {
        window.removeEventListener( 'resize'
            , () => this.onWindowResized(this.renderer), false );
        cancelAnimationFrame(this.animateLoop);
        if (isGL()) document.body.removeChild( this.renderer.domElement );
    }

    onWindowResized(renderer) {
        renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera( 45,
                        window.innerWidth / window.innerHeight, 1, 1000 );
        this.camera.position.z = 100;
        this.controls = new THREE.OrbitControls( this.camera );
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLighting() {
        this.workshopLight = new THREE.PointLight( 0xff0000, 1, 100 );
        this.workshopLight.position.set( 0, 50, 0 );
        this.scene.add( this.workshopLight );
    }

    initAssets() {
        const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
        const material = new THREE.MeshLambertMaterial( {emissive: 0x212121} );
        const cylinder = new THREE.Mesh( geometry, material );
        this.scene.add( cylinder );
    }

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        //this.renderMotion();
    }

    renderMotion() {
        this.camera.lookAt( this.scene.position );
        this.renderer.render( this.scene, this.camera );
    }

    render(): JSX.Element {
        return (
            <div>
                {this.state.isFallback
                    ?   "Unable to view due to browser or browser settings. Try another browser or reconfigure your current browser."
                    :   null}
            </div>
        );
    }
}
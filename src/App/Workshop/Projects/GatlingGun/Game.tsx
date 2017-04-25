import * as React from 'react';
import THREE = require('three');
import {addComponentCSS} from '../../../../utils/css_styler';
import {GatlingGun} from './assets/GatlingGun';

addComponentCSS({
    //language=CSS
    default: `
    .empty {
    }
    `
});

interface IProps {}

interface IState {
    isMounted: boolean
}

export class Game extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;
    controls;
    workshopLight;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.initLighting();
        this.initAssets();
        window.addEventListener( 'resize'
            , () => this.onWindowResized(this.renderer), false );
        this.setState({ isMounted: true });
        this.animate();
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
        this.camera.position.z = 200;
        this.controls = new THREE.OrbitControls( this.camera );
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLighting() {
        this.workshopLight = new THREE.PointLight( new THREE.Color("#ffffff"), 1, 200 );
        this.workshopLight.position.set( 0, 50, 0 );
        this.scene.add( this.workshopLight );
    }

    initAssets() {

    }

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        this.renderMotion();
    }

    renderMotion() {
        this.camera.lookAt( this.scene.position );
        this.renderer.render( this.scene, this.camera );
    }

    render(): JSX.Element {
        return (
            <div>
                {this.state.isMounted
                ?   <GatlingGun
                        scene={this.scene}
                    />
                :   null}
            </div>
        );
    }
}

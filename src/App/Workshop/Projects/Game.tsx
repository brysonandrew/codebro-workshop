import * as React from 'react';
import THREE = require('three');
import {addComponentCSS} from '../../../utils/css_styler';

addComponentCSS({
    //language=CSS
    default: `
    .empty {
    }
    `
});

interface IProps {}

interface IState {}

export class Game extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.initAssets();
        window.addEventListener( 'resize'
            , () => this.onWindowResized(this.renderer), false );
        this.animate();
        console.log(this.scene);

    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera( 45,
                        window.innerWidth / window.innerHeight, 1, 1000 );
        this.camera.position.z = 50;
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initAssets() {
        const length = 12, width = 8;

        let shape = new THREE.Shape();
        shape.moveTo( 0,0 );
        shape.lineTo( 0, width );
        shape.lineTo( length, width );
        shape.lineTo( length, 0 );
        shape.lineTo( 0, 0 );

        const extrudeSettings = {
            steps: 2,
            amount: 16,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 1
        };

        const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const mesh = new THREE.Mesh( geometry, material ) ;
        this.scene.add( mesh );
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

    renderMotion() {
        console.log("moving");
        this.camera.lookAt( this.scene.position );
        this.renderer.render( this.scene, this.camera );
    }

    render(): JSX.Element {
        return (
            <div>
            </div>
        );
    }
}

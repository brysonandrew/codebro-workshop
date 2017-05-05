import * as React from 'react';
import THREE = require('three');
import { Flame } from "./flame";
import {isGL} from "../../helpers/WebGL";

export class WorkshopBackground extends React.Component<any, any> {
    camera;
    scene;
    renderer;
    animateLoop;
    torchLeft;
    torchRight;
    flameLeft = new Flame();
    flameRight = new Flame();

    public constructor(props?: any, context?: any) {
        super(props, context);
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
        this.initAssets();
        window.addEventListener( 'resize'
            , () => this.onWindowResized(this.renderer), false );
        this.animate();
    }

    initGLFallback() {
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animateLoop);
        if (isGL()) document.body.removeChild( this.renderer.domElement );
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera( 45,
            window.innerWidth / window.innerHeight, 1, 2000 );
        this.camera.position.z = 1400;
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initAssets() {
        this.torchLeft = new THREE.Group;
        this.torchLeft.position.x = -420;
        this.torchLeft.position.y = 420;
        this.torchLeft.add(this.flameLeft.render());
        this.scene.add(this.torchLeft);

        this.torchRight = new THREE.Group;
        this.torchRight.position.x = 420;
        this.torchRight.position.y = 420;
        this.torchRight.add(this.flameRight.render());
        this.scene.add(this.torchRight);
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
        this.flameLeft.burn();
        this.flameRight.burn();
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

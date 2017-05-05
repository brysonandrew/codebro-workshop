import * as React from 'react';
import THREE = require('three');
import {GatlingGun} from './assets/GatlingGun/gatlingGun';
import {isGL} from "../../../helpers/WebGL";

interface IProps {}

interface IState {
    isFallback?: boolean
    isMounted?: boolean
    isFiring?: boolean
    isRotatingLeft?: boolean
    isRotatingRight?: boolean
}

export class GatlingGunGame extends React.Component<IProps, IState> {

    scene;
    camera;
    renderer;
    animateLoop;
    workshopLight;
    gatlingGun = new GatlingGun();


    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isFallback: false,
            isMounted: false,
            isFiring: false,
            isRotatingLeft: false,
            isRotatingRight: false
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
        document.addEventListener( 'keypress'
            , (e) => this.handleKeyPress(e), false );
        document.addEventListener( 'keyup'
            , (e) => this.handleKeyUp(e), false );
        this.setState({ isMounted: true });
        this.animate();
    }

    initGLFallback() {
        this.setState({ isFallback: true })
    }

    componentWillUnmount() {
        window.removeEventListener( 'resize'
            , () => this.onWindowResized(this.renderer), false );
        document.removeEventListener( 'keypress'
            , (e) => this.handleKeyPress(e), false );
        document.removeEventListener( 'keyup'
            , (e) => this.handleKeyUp(e), false );
        cancelAnimationFrame(this.animateLoop);
        if (isGL()) document.body.removeChild( this.renderer.domElement );
    }

    handleKeyPress(e) {
        const z = e.keyCode===122;
        const b = e.keyCode===98;
        const m = e.keyCode===109;

        // console.log("keypressed: " + e.keyCode);
               if (z) {this.setState({isFiring: true})}
               if (b) {this.setState({isRotatingLeft: true})
        } else if (m) {this.setState({isRotatingRight: true})
        }
    }

    handleKeyUp(e) {
        const z = e.keyCode===90;
        const b = e.keyCode===66;
        const m = e.keyCode===77;

        // console.log("keypup: " + e.keyCode);
               if (z) {this.setState({isFiring: false})}
               if (b) {this.setState({isRotatingLeft: false})
        } else if (m) {this.setState({isRotatingRight: false})
        }
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
        this.camera.position.y = 100;
        this.camera.position.x = 200;
        // this.controls = new THREE.OrbitControls( this.camera );
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initStats() {
        // document.body.appendChild( this.stats.dom );
    }

    initLighting() {
        this.workshopLight = new THREE.PointLight( new THREE.Color("#ffffff"), 1, 200 );
        this.workshopLight.position.set( 0, 140, 0 );
        this.scene.add( this.workshopLight );
    }

    initAssets() {
        this.gatlingGun.assemble();
    }

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        this.renderMotion();
    }

    renderMotion() {
        this.gatlingGun.rotate(this.state.isRotatingLeft, this.state.isRotatingRight);
        this.gatlingGun.fire(this.state.isFiring);
        this.scene.add(this.gatlingGun.render());
        this.scene.add(this.gatlingGun.renderBullets());
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

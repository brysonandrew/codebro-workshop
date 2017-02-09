import * as React from 'react';
import THREE = require('three');
import { computer } from '../data/3DObjects';
import { Loading } from './Loading';

interface IBackgroundState {
    isMounted?: boolean
    isFontLoaded?: boolean
}

export class Background extends React.Component<any, IBackgroundState> {
    camera;
    scene;
    renderer;
    material;
    top;
    lap;
    count = 0;
    cubeCamera1;
    cubeCamera2;
    lon = 0;
    lat = 0;
    phi = 0;
    theta = 0;
    textureLoader = new THREE.TextureLoader();
    computerComponents;
    pic = "/images/background/1.jpg";
    code;
    bro;
    animateLoop;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isFontLoaded: false
        }
    }

    componentDidMount() {
        this.loadTexture();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animateLoop);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.menuIndex === -1) {
            this.animate();
        } else {
            cancelAnimationFrame(this.animateLoop);
            this.renderStill();
        }
    }

    loadTexture() {
        let textureLoader = new THREE.TextureLoader();
        textureLoader.load( this.pic, ( texture ) => {
            texture.mapping = THREE.UVMapping;
            if (!this.state.isMounted) {
                this.init( texture );
                this.animate();
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
        this.renderer.setPixelRatio( window.devicePixelRatio );
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
        let topPosY = -Math.sin( computer.top.radians )
            * ( computer.top.depth * 0.5 )
            - Math.sin( computer.top.radians )
            * ( computer.top.height * 0.5 )
            - ( computer.top.height * 0.5 );
        let topPosZ = Math.cos( computer.top.radians )
            * ( computer.top.depth * 0.5 )
            - Math.cos( computer.top.radians )
            * ( computer.top.height * 0.5 )
            - ( computer.top.depth * 0.5 );
        this.computerComponents = new THREE.Group;
        //top
        this.top = new THREE
            .Mesh( new THREE
            .BoxGeometry( computer.top.width, computer.top.height, computer.top.depth ), this.material );
        this.top.position.set( 0, topPosY, topPosZ);
        this.top.rotation.set( computer.top.radians, 0, 0);
        this.computerComponents.add( this.top );
        //lap
        this.lap = new THREE
            .Mesh( new THREE
            .BoxGeometry( computer.lap.width, computer.lap.height, computer.lap.depth ), this.material );
        this.computerComponents.add( this.lap );

        let textureLoader = new THREE.TextureLoader();
        textureLoader.load('/images/computer/stencilx.png', (( texture ) => {
            let screenGeometry = new THREE
                .PlaneGeometry(28, 28);

            let screenMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: texture
            });
            screenMaterial.transparent = true;

            let screenMesh = new THREE.Mesh( screenGeometry, screenMaterial );
            screenMesh.position.set(0, topPosY + 1, topPosZ + 4);
            screenMesh.rotation.set(computer.top.radians + Math.PI * 0.5, 0, 0);

            this.computerComponents.add(screenMesh);
        }));

        let fontLoader = new THREE.FontLoader();
        fontLoader.load( '/fonts/Teko/Teko.typeface.json', (( font ) => {
                let codeGeometry = new THREE.TextGeometry( 'code', {
                    font: font,
                    size: 20,
                    height: 4,
                    curveSegments: 10,
                    bevelEnabled: false,
                    bevelSize: 0,
                    bevelThickness: 0,
                });
                this.code = new THREE.Mesh( codeGeometry, this.material );
                this.scene.add( this.code );

                let broGeometry = new THREE.TextGeometry( 'bro', {
                    font: font,
                    size: 20,
                    height: 4,
                    curveSegments: 10,
                    bevelEnabled: false,
                    bevelSize: 0,
                    bevelThickness: 0,
                });
                this.bro = new THREE.Mesh( broGeometry, this.material );
                this.scene.add( this.bro );

                this.setState({isFontLoaded: true})
            })
        );

        this.computerComponents.position
            .set(computer.position.x,computer.position.y,computer.position.z);
        this.computerComponents.rotation
            .set(computer.rotation.x,computer.rotation.y,computer.rotation.z);

        this.scene.add( this.computerComponents );

        window.addEventListener( 'resize', () => this.onWindowResized(this.renderer), false );
        this.setState({isMounted: true});
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
        let time = Date.now();
        this.lon += .5;
        this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
        this.phi = THREE.Math.degToRad( 90 - this.lat );
        this.theta = THREE.Math.degToRad( this.lon );

        this.computerComponents.rotation.y = 100 * Math.sin( -this.phi );

        if (this.state.isFontLoaded) {
            this.code.position.x = Math.cos( time * 0.001 ) * 20;
            this.code.position.y = Math.sin( time * 0.001 ) * 20;
            this.code.position.z = Math.sin( time * 0.001 ) * 20;
            this.code.rotation.x += 0.02;
            this.code.rotation.y += 0.03;

            this.bro.position.x = Math.cos( time * 0.001 + 10 ) * 20;
            this.bro.position.y = Math.sin( time * 0.001 + 10 ) * 20;
            this.bro.position.z = Math.sin( time * 0.001 + 10 ) * 20;
            this.bro.rotation.x += 0.02;
            this.bro.rotation.y += 0.03;
        }

        this.camera.position.x = 100 * Math.sin( this.phi ) * Math.cos( this.theta );
        this.camera.position.y = 100 * Math.cos( this.phi );
        this.camera.position.z = 100 * Math.sin( this.phi ) * Math.sin( this.theta );
        this.camera.lookAt( this.scene.position );
        this.lap.visible = false;
        this.top.visible = false;
        // pingpong
        if ( this.count % 2 === 0 ) {
            this.material.envMap = this.cubeCamera1.renderTarget.texture;
            this.cubeCamera2.updateCubeMap( this.renderer, this.scene );
        } else {
            this.material.envMap = this.cubeCamera2.renderTarget.texture;
            this.cubeCamera1.updateCubeMap( this.renderer, this.scene );
        }
        this.count++;
        this.lap.visible = true;
        this.top.visible = true;
        this.renderer.render( this.scene, this.camera );
    }

    render(): JSX.Element {
        return (
            <div>
                {this.state.isMounted
                    ?   null
                    :   <Loading/>}
            </div>
        );
    }
}
import * as React from 'react';
import THREE = require('three');
import Scene = THREE.Scene;

interface IProps {
    scene: Scene
}

interface IState {}

export class GatlingGun extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    createSingleBarrel() {
        const geometry = new THREE.CylinderGeometry( 2, 2, 100, 20 );
        const material = new THREE.MeshLambertMaterial( {
            emissive: new THREE.Color("#212121")
        } );
        return new THREE.Mesh( geometry, material );
    }

    createBarrelBrace() {
        const geometry = new THREE.CylinderGeometry( 12, 12, 4, 50 );
        const material = new THREE.MeshLambertMaterial( {
            emissive: new THREE.Color("#212121")
        } );
        return new THREE.Mesh( geometry, material );
    }

    createHandleBase() {
        const geometry = new THREE.BoxGeometry( 40, 12, 4 );
        const material = new THREE.MeshLambertMaterial( {
            emissive: new THREE.Color("#212121")
        } );
        return new THREE.Mesh( geometry, material );
    }

    createHandle() {
        const handle = new THREE.Group;
        let geometryT = new THREE.TorusGeometry( 10, 1.5, 16, 100, Math.PI * 0.5 );
        let materialT = new THREE.MeshBasicMaterial( { color: 0x757575 } );
        let handleRight = new THREE.Mesh( geometryT, materialT );
        handleRight.rotation.set(0, 0, 0);
        handleRight.position.set(4, 10, 44);
        handle.add( handleRight );

        let geometryC = new THREE.CylinderGeometry( 2, 2, 14, 20 );
        let materialC = new THREE.MeshLambertMaterial( {
            emissive: new THREE.Color("#212121")
        } );
        const bar = new THREE.Mesh( geometryC, materialC );
        bar.rotation.set(0, 0, Math.PI * 0.5);
        bar.position.set(0, 20, 44);
        handle.add( bar );

        geometryT = new THREE.TorusGeometry( 10, 1.5, 16, 100, Math.PI * 0.5 );
        materialT = new THREE.MeshBasicMaterial( { color: 0x757575 } );
        let handleLeft = new THREE.Mesh( geometryT, materialT );
        handleLeft.rotation.set(0, 0, Math.PI * 0.5);
        handleLeft.position.set(-4, 10, 44);
        handle.add( handleLeft );

        return handle;
    }

    createEngine() {
        const geometry = new THREE.CylinderGeometry( 10, 10, 35, 60 );
        const material = new THREE.MeshLambertMaterial( {
            emissive: new THREE.Color("#212121")
        } );
        return new THREE.Mesh( geometry, material );
    }

    createAmmoFeed() {
        const geometry = new THREE.CylinderGeometry( 6, 6, 30, 60 );
        const material = new THREE.MeshLambertMaterial( {
            emissive: new THREE.Color("#212121")
        } );
        return new THREE.Mesh( geometry, material );
    }

    createBackHandleBrace() {
        const handleBrace = new THREE.Group;
        const geometryLeft = new THREE.BoxGeometry( 25, 3, 2 );
        const materialLeft = new THREE.MeshLambertMaterial( {
            emissive: new THREE.Color("#212121")
        } );
        const braceLeft = new THREE.Mesh( geometryLeft, materialLeft );
        braceLeft.rotation.set(Math.PI * 0.5, 0, Math.PI * 0.25);
        braceLeft.position.set(-10, 10, 56);
        handleBrace.add( braceLeft );

        const geometryRight = new THREE.BoxGeometry( 25, 3, 2 );
        const materialRight = new THREE.MeshLambertMaterial( {
            emissive: new THREE.Color("#212121")
        } );
        const braceRight = new THREE.Mesh( geometryRight, materialRight );
        braceRight.rotation.set(Math.PI * 0.5, 0, -Math.PI * 0.25);
        braceRight.position.set(10, 10, 56);
        handleBrace.add( braceRight );

        return handleBrace;
    }

    createBackHandle() {
        const geometryT = new THREE.TorusGeometry( 10, 1.5, 16, 100, Math.PI * 0.75 );
        const materialT = new THREE.MeshBasicMaterial( { color: 0x757575 } );
        return new THREE.Mesh( geometryT, materialT );
    }

    createGun() {
        const numberOfBarrels = 6;
        const radians = Math.PI * 2 / numberOfBarrels;
        const radius = 8;
        const gun = new THREE.Group;

        let barrelBraceFront = this.createBarrelBrace();
        barrelBraceFront.rotation.set(Math.PI * 0.5, 0, 0);
        barrelBraceFront.position.set(0, 0, 40);
        gun.add( barrelBraceFront );

        let barrelBraceMid = this.createBarrelBrace();
        barrelBraceMid.rotation.set(Math.PI * 0.5, 0, 0);
        barrelBraceMid.position.set(0, 0, 0);
        gun.add( barrelBraceMid );

        let barrelBraceBack = this.createBarrelBrace();
        barrelBraceBack.rotation.set(Math.PI * 0.5, 0, 0);
        barrelBraceBack.position.set(0, 0, -44);
        gun.add( barrelBraceBack );

        let handleBase = this.createHandleBase();
        handleBase.rotation.set(Math.PI * 0.5, 0, 0);
        handleBase.position.set(0, 10, 44);
        gun.add( handleBase );

        let handle = this.createHandle();
        gun.add( handle );

        let engine = this.createEngine();
        engine.rotation.set(Math.PI * 0.5, 0, 0);
        engine.position.set(0, 0, 50);
        gun.add( engine );

        let ammoFeed = this.createAmmoFeed();
        ammoFeed.rotation.set(Math.PI * 0.5, 0, 0);
        ammoFeed.position.set(-12, 2, 50);
        gun.add( ammoFeed );

        let backHandleBrace = this.createBackHandleBrace();
        gun.add( backHandleBrace );

        let backHandle = this.createBackHandle();
        backHandle.rotation.set(Math.PI * 0.1, Math.PI * 0.5, Math.PI * 0.5);
        backHandle.position.set(0, 12, 56);
        gun.add( backHandle );

        Array.apply(null, new Array(numberOfBarrels)).map((_, i) => {
            let barrel = this.createSingleBarrel();
            barrel.rotation.set(Math.PI * 0.5, 0, 0);
            barrel.position.set(
                Math.sin(radians * i) * radius,
                Math.cos(radians * i) * radius,
                0
            );
            gun.add(barrel);
        });

        return gun
    }

    componentDidMount() {
        const gun = this.createGun();
        this.props.scene.add( gun );
    }

    render(): JSX.Element {
        return (
            <div>
            </div>
        );
    }
}

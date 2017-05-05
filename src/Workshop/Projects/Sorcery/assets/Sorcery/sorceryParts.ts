import THREE = require('three');

export const createSingleBarrel = () => {
    const geometry = new THREE.CylinderGeometry( 2, 2, 100, 20 );
    const material = new THREE.MeshLambertMaterial( {
        emissive: new THREE.Color("#212121")
    } );
    return new THREE.Mesh( geometry, material );
};

export const createBarrelBrace = () => {
    const geometry = new THREE.CylinderGeometry( 12, 12, 4, 50 );
    const material = new THREE.MeshLambertMaterial( {
        emissive: new THREE.Color("#212121")
    } );
    return new THREE.Mesh( geometry, material );
};

export const createHandleBase = () => {
    const geometry = new THREE.BoxGeometry( 40, 12, 4 );
    const material = new THREE.MeshLambertMaterial( {
        emissive: new THREE.Color("#212121")
    } );
    return new THREE.Mesh( geometry, material );
};

export const createHandle = () => {
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
};

export const createEngine = () => {
    const geometry = new THREE.CylinderGeometry( 10, 10, 35, 60 );
    const material = new THREE.MeshLambertMaterial( {
        emissive: new THREE.Color("#212121")
    } );
    return new THREE.Mesh( geometry, material );
};

export const createAmmoFeed = () => {
    const geometry = new THREE.CylinderGeometry( 6, 6, 30, 60 );
    const material = new THREE.MeshLambertMaterial( {
        emissive: new THREE.Color("#212121")
    } );
    return new THREE.Mesh( geometry, material );
};

export const createBackHandleBrace = () => {
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
};

export const createBackHandle = () => {
    const geometryT = new THREE.TorusGeometry( 10, 1.5, 16, 100, Math.PI * 0.75 );
    const materialT = new THREE.MeshBasicMaterial( { color: 0x757575 } );
    return new THREE.Mesh( geometryT, materialT );
};

export const createWholeBarrel = () => {
    const wholeBarrel = new THREE.Group;
    const numberOfBarrels = 6;
    const radians = Math.PI * 2 / numberOfBarrels;
    const radius = 8;
    Array.apply(null, new Array(numberOfBarrels)).map((_, i) => {
        let barrel = createSingleBarrel();
        barrel.rotation.set(Math.PI * 0.5, 0, 0);
        barrel.position.set(
            Math.sin(radians * i) * radius,
            Math.cos(radians * i) * radius,
            0
        );
        wholeBarrel.add(barrel);
    });
    return wholeBarrel
};

export const createGun = () => {
    const gatlingGun = new THREE.Group;

    let barrelBraceFront = this.createBarrelBrace();
    barrelBraceFront.rotation.set(Math.PI * 0.5, 0, 0);
    barrelBraceFront.position.set(0, 0, 40);
    gatlingGun.add( barrelBraceFront );

    let barrelBraceMid = this.createBarrelBrace();
    barrelBraceMid.rotation.set(Math.PI * 0.5, 0, 0);
    barrelBraceMid.position.set(0, 0, 0);
    gatlingGun.add( barrelBraceMid );

    let barrelBraceBack = this.createBarrelBrace();
    barrelBraceBack.rotation.set(Math.PI * 0.5, 0, 0);
    barrelBraceBack.position.set(0, 0, -44);
    gatlingGun.add( barrelBraceBack );

    let handleBase = this.createHandleBase();
    handleBase.rotation.set(Math.PI * 0.5, 0, 0);
    handleBase.position.set(0, 10, 44);
    gatlingGun.add( handleBase );

    let handle = this.createHandle();
    gatlingGun.add( handle );

    let engine = this.createEngine();
    engine.rotation.set(Math.PI * 0.5, 0, 0);
    engine.position.set(0, 0, 50);
    gatlingGun.add( engine );

    let ammoFeed = this.createAmmoFeed();
    ammoFeed.rotation.set(Math.PI * 0.5, 0, 0);
    ammoFeed.position.set(-12, 2, 50);
    gatlingGun.add( ammoFeed );

    let backHandleBrace = this.createBackHandleBrace();
    gatlingGun.add( backHandleBrace );

    let backHandle = this.createBackHandle();
    backHandle.rotation.set(Math.PI * 0.1, Math.PI * 0.5, Math.PI * 0.5);
    backHandle.position.set(0, 12, 56);
    gatlingGun.add( backHandle );

    let barrel = this.createWholeBarrel();
    gatlingGun.add( barrel );

    return gatlingGun
};

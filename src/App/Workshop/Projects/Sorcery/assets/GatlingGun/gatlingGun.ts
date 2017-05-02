import THREE = require('three');
import { createSingleBarrel, createGun } from './gunParts';
import { easeMotion } from '../../helpers/motion';

export class GatlingGun {

    gun = new THREE.Group;
    bullets = new THREE.Group;
    gunParts;
    gunBarrel;
    warmUp = 0;
    rate = 0;
    count = 0;
    barrelTurnRate = 0;
    gunRotateRate = 0;

    constructor() {}

    assemble() {
        this.gun.add(createGun());
        this.gunParts = this.gun.children[0].children;
        this.gunBarrel = this.gunParts[this.gunParts.length - 1];
    }

    addBullet() {
        let amount = 20;
        let radius = 2;

        let colors = new Float32Array( amount * 3 );
        let sizes = new Float32Array( amount );

        let vertex = new THREE.Vector3();
        let color = new THREE.Color( 0xffffff );

        let positions = new Float32Array( amount * 3 );

        positions.forEach((_, i) => {
            vertex.x = (Math.random() * 200 - 1) * radius;
            vertex.y = (Math.random() * 200 - 1) * radius;
            vertex.z = (Math.random() * 2 - 1) * radius;
            vertex.toArray((positions as any), i);

            sizes[i] = 35;

            color.setHSL(60, 1, 0.75);
            // color.setHSL(360 * Math.random(), 0.8, 0.6);
            color.toArray((colors as any), i * 3);
        });

        let geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        let material = new THREE.ShaderMaterial( {
            uniforms: {
                amplitude: { value: 1.0 },
                color:     { value: new THREE.Color( 0xffffff ) },
                texture:   { value: new THREE.TextureLoader().load( "/images/assets/spark1.png" ) }
            },
            vertexShader:   `uniform float amplitude;
                                attribute float size;
                                attribute vec3 customColor;
                                varying vec3 vColor;
                            void main() {
                                vColor = customColor;
                                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                                gl_PointSize = size * ( 300.0 / -mvPosition.z );
                                gl_Position = projectionMatrix * mvPosition;
                            }`,
            fragmentShader: `uniform vec3 color;
                                uniform sampler2D texture;
                                varying vec3 vColor;
                            void main() {
                                gl_FragColor = vec4( color * vColor, 1.0 );
                                gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
                            }`,
            blending:       THREE.AdditiveBlending,
            depthTest:      true,
            transparent:    true
        } );

        let bullet = new THREE.Points( geometry, material );

        bullet.position.set(
            this.gun.position.x,
            this.gun.position.y,
            this.gun.position.z
        );

        bullet.rotation.set(
            this.gun.rotation.x,
            this.gun.rotation.y,
            this.gun.rotation.z
        );

        bullet["life"] = 0;

        this.bullets.add(bullet);
    }

    fireBullets() {
        this.bullets.children.forEach((bullet, i) => {
            const bulletStartingPointX = 44 * Math.sin(bullet.rotation.y);
            const bulletStartingPointZ = 44 * Math.cos(bullet.rotation.y);
            bullet.position.x = Math.sin(bullet.rotation.y) * -bullet["life"] * 20
                                - bulletStartingPointX;
            bullet.position.z = Math.cos(bullet.rotation.y) * -bullet["life"] * 20
                                - bulletStartingPointZ;
            if (bullet["life"] === 500) {
                this.bullets.children.splice(i, 1);
            }
            bullet["life"]++;
        });
    }

    fire(isFiring) {
        this.gunBarrel.rotation.z+=easeMotion(isFiring, 5, 0.25, this.barrelTurnRate);
        this.fireBullets();
        if (isFiring) {
            this.addBullet();
        }
    }

    rotate(isLeft, isRight) {
        this.gun.rotation.y+=easeMotion(isLeft, 5, 0.05, this.gunRotateRate);
        this.gun.rotation.y-=easeMotion(isRight, 5, 0.05, this.gunRotateRate);
    }

    render() {
        return this.gun;
    }

    renderBullets() {
        return this.bullets
    }
}

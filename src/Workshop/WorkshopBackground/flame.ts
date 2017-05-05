import THREE = require('three');


export class Flame {

    cluster = new THREE.Group;
    gravity = 2;
    isEngulfing = false;
    engulfBounds = {
        min: {
            x: 0, y: 0, z: 0
        },
        max: {
            x: 0, y: 0, z: 0
        }
    };
    count = 0;

    constructor() {}

    addCluster() {
        let amount = 5;
        let radius = 10;

        let positions = new Float32Array( amount * 3 );
        let colors = new Float32Array( amount * 3 );
        let sizes = new Float32Array( amount );

        let vertex = new THREE.Vector3();
        let color = new THREE.Color( 0xffffff );

        positions.forEach((_, i) => {
            vertex.x = (Math.random() * 2 - 1) * radius;
            vertex.y = (Math.random() * 2 - 1) * radius;
            vertex.z = (Math.random() * 2 - 1) * radius;
            (vertex as any).toArray(positions, i);

            sizes[i] = 100;

            color.setHSL(0.15 * ( i / amount ) - 0.005, 0.8, 0.6);
            (color as any).toArray(colors, i * 3);
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
            depthTest:      false,
            transparent:    true
        } );

        let cluster = new THREE.Points( geometry, material );

        if (this.isEngulfing) {
            let minX = this.engulfBounds.min.x,
                minY = this.engulfBounds.min.y,
                minZ = this.engulfBounds.min.z;
            let maxX = this.engulfBounds.max.x,
                maxY = this.engulfBounds.max.y,
                maxZ = this.engulfBounds.max.z;
            let dx = (maxX - minX), dy = (maxY - minY), dz = (maxZ - minZ);

            cluster.position.x = minX + (dx * Math.random());
            cluster.position.y = minY + (dy * Math.random());
            cluster.position.z = minZ + (dz * Math.random());
        } else {
            cluster.position.x = (0.5 - Math.random()) * 40;
            cluster.position.y = (0.5 - Math.random()) * 40;
            cluster.position.z = (0.5 - Math.random()) * 40;
        }

        cluster.rotation.x = Math.PI * 2 * Math.random();
        cluster.rotation.y = Math.PI * 2 * Math.random();
        cluster.rotation.z = Math.PI * 2 * Math.random();

        cluster["life"] = 0;

        this.cluster.add(cluster);
    }

    engulf(target) {
        this.isEngulfing = !this.isEngulfing;
        this.engulfBounds = new THREE.Box3().setFromObject(target);
    }

    burn() {
        this.addCluster();

        this.cluster.children.forEach((spark, i) => {

            if (this.isEngulfing) {
                let minX = this.engulfBounds.min.x,
                    minY = this.engulfBounds.min.y,
                    minZ = this.engulfBounds.min.z;
                let maxX = this.engulfBounds.max.x,
                    maxY = this.engulfBounds.max.y,
                    maxZ = this.engulfBounds.max.z;
                let dx = (maxX - minX), dy = (maxY - minY), dz = (maxZ - minZ);

                let sourceX = spark.position.x,
                    targetX = minX + (dx * i / this.cluster.children.length);
                let sourceY = spark.position.y,
                    targetY = minY + (dy * i / this.cluster.children.length);
                let sourceZ = spark.position.z,
                    targetZ = minZ + (dz * i / this.cluster.children.length);

                let buffer = 0;
                let inc = 2;

                let isAboveX = (sourceX < targetX - buffer),
                    isBelowX = (sourceX > targetX + buffer);
                let isAboveY = (sourceY < targetY - buffer),
                    isBelowY = (sourceY > targetY + buffer);
                let isAboveZ = (sourceZ < targetZ - buffer),
                    isBelowZ = (sourceZ > targetZ + buffer);

                spark.position.x += (isAboveX || isBelowX) ? ((isAboveX) ? inc : -inc) : 0;
                spark.position.y += (isAboveY || isBelowY) ? ((isAboveY) ? inc : -inc) : 0;
                spark.position.z += (isAboveZ || isBelowZ) ? ((isAboveZ) ? inc : -inc) : 0;

                spark.position.y += spark["life"] * 0.15 - this.gravity;
            } else {
                spark.position.x += Math.cos(spark["life"]);
                spark.position.y += spark["life"] * 0.15 - this.gravity;
                spark.position.z += Math.cos(spark["life"]);
            }

            if (spark["life"]===50) {
                this.cluster.children.splice(i, 1);
            }
            spark["life"]++;
        });
    }

    render() {
        return this.cluster;
    }

}

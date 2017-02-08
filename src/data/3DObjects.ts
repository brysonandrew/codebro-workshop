import { Color, Vector3, Euler } from 'three';
//
// export let floor = {
//     position: new Vector3(0, 0, -200),
//     rotation: new Euler(0, 0, 0),
//     width: 8000,
//     height: 8000,
//     specular: new Color("#ffffff"),
//     shininess: 100,
//     color: new Color("#212121")
// };

export let computer = {
    position: new Vector3(0, -10, 0),
    rotation: new Euler(0, Math.PI * 0.5, 0),
    top: {
        width: 60,
        height: 2, //thickness
        depth: 30,
        radians: Math.PI * 1.45,
        color: new Color("#000000")
    },
    lap: {
        width: 60,
        height: 2, //thickness
        depth: 30,
        color: new Color("#757575")
    }
};

export let text = {
    thickness: 5,
    fontSize: 40,
    specular: "#ffffff",
    shininess: 100,
    color: "#000000"
};
//
// export let sky = {
//     position: new Vector3(0, 480, -2500),
//     rotation: new Euler(0, 0, 0),
//     width: 10000,
//     height: 10000,
//     color: new Color("#fafafa")
// };
//
// export let leftWall = {
//     position: new Vector3(-4000, 480, -2500),
//     rotation: new Euler(0, Math.PI * 0.5, 0),
//     width: 10000,
//     height: 2000,
//     color: new Color("#fafafa")
// };
//
// export let rightWall = {
//     position: new Vector3(4000, 480, -2500),
//     rotation: new Euler(0, -Math.PI * 0.5, 0),
//     width: 10000,
//     height: 2000,
//     color: new Color("#fafafa")
// };

//
// export let textCODE = {
//     position: new Vector3(-4000, -200, 200),
//     rotation: new Euler(0, Math.PI * 0.5, 0),
//     width: 600,
//     height: 400,
//     specular: new Color("#fafafa"),
//     shininess: 100,
//     color: new Color("#212121")
// };
//
// export let textBRO = {
//     position: new Vector3(4000, -200, -1400),
//     rotation: new Euler(0, -Math.PI * 0.5, 0),
//     width: 600,
//     height: 400,
//     specular: new Color("#fafafa"),
//     shininess: 100,
//     color: new Color("#212121")
// };
//


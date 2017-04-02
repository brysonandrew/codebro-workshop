import * as React from 'react';
import { IPost } from '../../models';

export let blogPosts: IPost[] = [
    {
        heading: "Living for the moment, with moment.js",
        link: "https://momentjs.com/",
        status: "",
        date: "14 Mar 2017",
        content:
            [
                "Moment.js is a library that helps us handle and display time in JavaScript.",
                "You could look at it like a more user-friendly version of the Javascript \"Date\" instance",
                "I've used it recently to create a date-picker, but it could also be used to show user session, booking and payment info.",
                <h2>To get you started I'll show you how to create the perfect moment</h2>,
                "Firstly you could simply create the current moment like so: ",
                <code>moment()</code>,
                "To edit this moment, it is as easy as doing something like this: ",
                <code>moment("1969-07-16", "YYYY-MM-DD")</code>,
                "or",
                <code>moment("1969-Jul-16", "YYYY-MMM-DD")</code>,
                "Now, maybe you would like to share that special moment?",
                "This can be as easy as: ",
                <code>const m = moment("1969-07-16", "YYYY-MM-DD")</code>,
                <code>console.log(m.format("MMM")) //log to console "Jul"</code>,
                <code>console.log(m.format("YYYY")) //log to console "1969"</code>,
                <code>console.log(m.format("DD")) //log to console "16"</code>,
                "Making my own date-picker has been a good way to get used to and explore the way moment.js works, why not try yourself?",
                'Other ideas could be adding moment JS to your TODO list eg/ \"task completed 2 hours ago\", or user sessions eg/ \"user last logged in last weeek\"',
                "Soon I will share a link here to my date-picker (after some beta testing). If I forget please remind me by sending an email."
            ],
        pic: "/images/blog/momentjs.png"
    },
    {
        heading: "My ultimate website build",
        link: "https://github.com/brysonandrew/isomorphic-react-redux-typescript",
        status: "",
        date: "26 Feb 2017",
        content:
            [
               "Before talking about the details I should give a shout out to Porizi Technologies for developing this build. So setting up webpack, typescript and isomorphic behaviour is all down to them and their open source project that can be found here.",
                <a href="https://github.com/porizi/isomorphic-react-redux-typescript-bootstrap">
                    Original build
                </a>,
                "When creating and developing a website I use the following technology:",
                "Javascript/HTML/CSS (obviously but I feel remiss if I didn’t mention them)",
                <h2>F  R  O  N  T  E  N  D</h2>,
                <h4>L O G I C</h4>,
                <ul>
                    <li>React.js</li>
                    <li>Redux</li>
                    <li>Typescript</li>
                </ul>,
                <h4>S T Y L E</h4>,
                "Nothing! Just React.js inline styles with a component CSS util where pseudo classes are necessary (hardly ever)",
                <h2>B  A  C  K  E  N  D</h2>,
                <ul>
                    <li>Node.js</li>
                    <li>MongoDB</li>
                    <li>Express.js</li>
                    <li>EJS</li>
                </ul>,
                "Here is a starting point which is open source so feel free to download and use!",
                <a href="https://github.com/brysonandrew/isomorphic-react-redux-typescript">
                    Forked and altered build
                </a>
            ],
        pic: "/images/blog/github-logo.jpg"
    },
    {
        heading: "THREE.js essentials",
        link: "https://threejs.org/examples/misc_controls_orbit.html",
        status: "",
        date: "24 Feb 2017",
        content:
            [
                "As web developers used to working in two dimensions there is one thing that is easy to take for granted when working with a third dimension - space. The good news is that THREE.js has a ton of built in controls and helpers that can give us some control over this.",
                "My favorite tools for helping navigate the third dimension are Orbit Controls and Camera Helper.",
                "The moment I realised how important these were was when I started playing with shadows. Since shadows are rendered using a \"shadow camera\" we can use the Camera Helper and since shadows can appear on any surface we should use Orbit Controls to navigate around our 3D objects",
                "Firstly let's look at THREE.OrbitControls.",
                "These controls I have found the most useful, they allow zoom on trackpad or mousewheel scroll, X and Y axis movement for the arrow keys and radial navigation on mouse drag.",
                "This can help you easily navigate around your project and see what your 3D objects look like from different angles, (as well as see exactly where shadows are going).",
                "If you have an animation loop running you will need to configure the Orbit Controls to update during the loop. Just add \"controls.update()\" inside your loop.",
                "THREE.CameraHelper shows you a kind of cone that shows what your camera is looking at. The camera shows in red the \"near\" limitation you set and the cone stretches out to your \"far\" limitation. The cone is as wide as your \"fov\".",
                "The CameraHelper especially helped because I found my shadow's weren't rendering because my \"far\" limitation, although initially set far enough, was mysteriously changing after render…",
                "To add these controls you simply include this line in your code. Notice they both take your camera object and must be added to the scene to work.",
                <code>Import * as THREE from 'three';</code>,
                <code>const controls = new THREE.OrbitControls(camera);</code>,
                <code>const cameraHelper = THREE.CameraHelper(camera);</code>,
                <code>scene.add(cameraHelper);</code>
            ],
        pic: "/images/blog/threejs.jpg"
    },
    {
        heading: "How to plan a webpage design for a client.",
        link: "",
        status: "",
        date: "7 Feb 2017",
        content:
            [
                "A basic issue facing web developers is reading the mind of the client. Here are some basic dos and don’ts when it comes to creating a web page from a design perspective for a client.",
                "Do listen carefully and take seriously all and every issue the client has in terms of the way they want to website to be presented. ",
                "Don’t overlook points raised by your client even if you consider them trivial.",
                "Do ask for your client to create a mock up themselves or if they prefer, find examples online of what they would like their website to look like.",
                "Don’t go in blind. This is something I did once and paid the price. I spend 4 hours creating what I thought to be an amazing looking landing page, full of creative flair and vision, while totally missing the mark regarding what the client wanted.",
                "Do send regular updates on what and how their website is developing and be responsive to their feedback.",
                "It is your job as a web developer to allow your client to express and for you to interpret their idea so that the final result is more of a pleasant surprise than a disappointment."
            ],
        pic: "/images/softwareLogos/javascriptIcon.png"
    }
];
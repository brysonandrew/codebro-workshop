import { IPost } from '../../models';

export let workPosts: IPost[] = [
    {
        heading: "CoSpaces Shared offices and meeting rooms",
        link:   "https://cb-coworking.herokuapp.com/",
        status: "Work in Progress",
        date:   "Jan 2016 - Present",
        content:
            [
                "With this job I'd like to solidify my full stack muscles and to prove that I can effectively handle all elements of producing a website from start to finish. This website will have a booking system backend along with some sophisticated front-end. ",
                "Designed by me also - My idea taking the single page website and trying to take that idea a step forward in that the main part of the website home -> search -> filter -> sort -> browse -> open -> book -> confirm is all handled within a fluid series of panes without the feeling that you are going through a number of different pages. Animations on these panes are to exemplify this feeling of fluidity.",
                "Effective utilization of full-screen images will be a signature of this website also.",
                "An interesting thing I have learnt so far is that German laws are incredibly strict when it comes to what kind of photo's you can use, even photos purchased from major websites like ShutterStock didn't pass the test. We eventually found a site that provided this.",
                "I am making this website on a fixed price basis and clearly laid out milestones and when installments should be paid, also tasks like procuring photos, logo, registering domain and making mockups I gave to the website owner.",
                "Estimated completion date is mid-March."
            ],
        pic:    "/images/work/cospaces.png"
    },
    {
        heading: "Porizi Software Marketing Website",
        link: "https://porizi.herokuapp.com/",
        status: "Ready for deployement",
        date: "Jun 2016 - Feb 2017",
        content:
            [
                "This was a real milestone for me and it provided the perfect transition from being an amateur to being a professional web developer.",
                "It was clean in that there was a designer who made the pages and a lead developer (website owner) who provided guidance, well outlined tasks and expert feedback throughout the development process.",
                "Before this job I had applied for a job interview in early 2016 with Porizi and the interview showed me just how bad I was at web development.  From that point on I worked everyday trying improve my overall skills but also how to rewrite my personal website in React. Once I had it rewritten in React I sent it to Porizi and then they offered me this job.",
                "Compared to what I get paid now the money was quite low but for my skills it was very fair and the feedback, guidance and self-improvement was invaluable to me at that point.",
                "The most important development skills I learnt were using git (before this I had never even used version control), Typescript, Bootstrap, and BEM scalable CSS. It was a great feeling also to know I could create something of value in the world of websites."
            ],
        pic: "/images/work/poriziFront.jpg"
    }
];
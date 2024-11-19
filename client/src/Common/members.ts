import { Member } from "./interfaces";

  export const members: Member[] = [
    {
      name: "Minyahel Muluneh Yimer",
      role: "Frontend and Backend Developer",
      bio: "NTNU student",
      responsibility: {
        Backend: "Signin, signup, Google Auth, tags, Mongodb, CRUD operation on forms and comments",
        Frontend: "Homepage, forms, navbar, footer",
      },
          image: "/minyahe.jpg",
          contacts: {
              email: "minyahey@ntnu.no",
              phone:""
      }
    },
    {
      name: "Suzan Mustafa",
      role: "Frontend and Backend Developer",
      bio: "NTNU student",
      responsibility: {
        Backend: "Profile, HomePage (Post Display Section) and Navigation, Post Page and CRUD operations on posts",
        Frontend: "(Basic view) :Profile, Post Page, Write Post",
      },
        image: "/57045044.jpg",
        contacts: {
            email: "suzanm@ntnu.no",
            phone:""
    }
    },
      {
          name: "Kristoffer Josefsen Hellerud",
          role: "Testing",
          bio: "",
          responsibility: {
              Backend: "Backend testing",
              Frontend: "Frontend testing",
          },
          image: "/30958753.jpg",
          contacts: {
              email: "",
              phone: ""
          }
      }
  ];
  
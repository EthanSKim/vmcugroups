import avatar_1 from "/public/images/avatar-1.png";
import avatar_2 from "/public/images/avatar-2.png";
import avatar_3 from "/public/images/avatar-3.png";
import post_img_1 from "/public/images/main.png";
import post_img_2 from "/public/images/post-img-2.png";
import post_img_3 from "/public/images/post-img-3.png";
import post_img_4 from "/public/images/post-img-4.png";

const postData = [
  // {
  //   id: 1,
  //   postText: `I created Roughly plugin to sketch crafted hand-drawn elements
  //     which can be used to any usage (diagrams/flows/decoration/etc)`,
  //   hashTags: [],
  //   imgs: [post_img_1],
  //   authorName: "Lori Cortez",
  //   authorAvt: avatar_1,
  //   comments: [],
  // },
  {
    id: 1,
    postText: "Welcome to Vision Mission Church Undergrads!!\nSunday Service: 11:00 AM\nFriday Gathering: 7:00 PM\nLocation:college station.",
    hashTags: ["Love", "God", "Share"],
    imgs: [post_img_1],
    authorName: "VMC Undergrads",
    authorAvt: avatar_1,
    comments: [
      {
        id: 1,
        commentText:
          "I love our church",
        authorName: "Soohwan Kim",
        authorAvt: avatar_2,
        replies: [
          {
            id: 1,
            replyText: "Me too hehe",
            authorName: "New Developer",
            authorAvt: avatar_3,
          },
        ],
      },
    ],
  },
  // {
  //   id: 3,
  //   postText:
  //     "Nam ornare a nibh id sagittis. Vestibulum nec molestie urna, eget convallis mi. Vestibulum rhoncus ligula eget sem sollicitudin interdum. Aliquam massa lectus, fringilla non diam ut, laoreet convallis risus. Curabitur at metus imperdiet, pellentesque ligula vel,",
  //   hashTags: [],
  //   imgs: [],
  //   authorName: "Loprayos",
  //   authorAvt: avatar_2,
  //   comments: [
  //     {
  //       id: 1,
  //       commentText:
  //         "The only way to solve the problem is to code for the hardware directly",
  //       authorName: "Lori Cortez",
  //       authorAvt: avatar_2,
  //       replies: [
  //         {
  //           id: 1,
  //           replyText: "The only way to solve the",
  //           authorName: "Alexa",
  //           authorAvt: avatar_2,
  //         },
  //         {
  //           id: 2,
  //           replyText: "The only way to solve the",
  //           authorName: "Haplika",
  //           authorAvt: avatar_2,
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       commentText:
  //         "The only way to solve the problem is to code for the hardware directly",
  //       authorName: "Marlio",
  //       authorAvt: avatar_2,
  //       replies: [],
  //     },
  //   ],
  // },
];

export default postData;

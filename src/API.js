import InstaImg from "./media/instagram-1708437015-removebg-preview.png";
import ProfileImg from "./media/dp.jpg";
import CyberpunkImg from "./media/Cyberpunk.pg.png";
import EcommImg from "./media/E-comm_prodect.pg.png";
import DivImg from "./media/Div.me.png";
import PlaybeatImg from "./media/Playbeat.site.png";
import IntelliSqrImg from "./media/001.png";


const API = {
  project: [
    {img:PlaybeatImg, name: "Playbeat.site",discription:"Vanilla website developed to represent. javaScript",link: "https://spontaneous-parfait-fee957.netlify.app/",date: "2025",role: "Developer | Designer and more",},
    {img:DivImg, name: "Div.me",discription:" Multi purpose Media platform & Hackathon Project. React.js, MongoDB, Node.js, Express.js, GSAP ",link: "https://harshjha047.github.io/-DIV--Hackathon/",date: "2024",role: "Developer",},
    {img:CyberpunkImg, name: "Cyberpunk.pg", discription:"3D model based cyberpunk themed landing page. Three.js, vite", link: "https://cyberpunk-spyder.vercel.app/", date: "2024", role: "Developer | designer",  },
    {img:"IntelliSqrImg", name: "Ulfat.com",discription:"FullStack web Application developed and designed by me . Tailwind, React.ts, AWS, MongoDB Atlas, Node.ts Express.ts ...more",link: "https://ecomm-react-6lxg.vercel.app/",date: "2025",role: "Developer | Designer and more",},
    {img:EcommImg, name: "E-comm_prodect.pg", discription: "E-Commerce website product page. React.js, vite.", link: "https://ecomm-react-tau.vercel.app/", date: "2025", role: "Developer | designer", },
  ],
  clone:[
    {name:"Kamyafood", link:"https://harshjha047.github.io/kamyafood/",},
    {name:"Tesla", link:"https://harshjha047.github.io/Tesla/",},
    {name:"Microsoft", link:"https://harshjha047.github.io/Microsoft/",},
    {name:"REDUX", link:"https://harshjha047.github.io/REDUX/",},
  ],
  fontList: [
    new FontFace("ClashDisplay-Variable", "url(./media/ClashDisplay_Complete/ClashDisplay_Complete/Fonts/TTF/ClashDisplay-Variable.ttf)"),
    new FontFace("Switzer-Variable", "url(./media/Switzer_Complete/Switzer_Complete/Fonts/TTF/Switzer-Variable.ttf)"),
  ],
  InstaImg: InstaImg,
  ProfileImg: ProfileImg,
};

export default API;

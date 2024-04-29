// components/Card.js
import React from "react";
import { useNavigate } from 'react-router-dom';

function Card(props) {
  const navigate = useNavigate();
  return (
    <div className="box">
      <img className="circle-img" src={props.img} alt="event_img" />
      <div className="content">
        <h2 className="name">{props.name}</h2>
        <button className="btn" onClick={() => navigate('/register')}>view more</button>
      </div>
    </div>
  );
}

export default Card;


// // components/Card.js
// import React from "react";

// function Card(props) {
//   return (
//     <div className="card">
//       <div className="top">
//         <h2 className="name">{props.name}</h2>
//         <img className="circle-img" src={props.img} alt="event_img" />
//       </div>
//       <div className="lower">
//         <div className="bottom">
//           <p className="info">{props.description}</p>
//           <p className="info">{props.date}</p>
//         </div>
//         <button>view more</button>
//       </div>
//       </div>
//   );
// }

// export default Card;

import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ image,id, name, description, date ,img }) => {
  const navigate = useNavigate()
  const toDetail = ()=>{
    navigate(`/event/${id}`)
  }
  return (
    <>
      <div className="card" onClick={()=>toDetail()}>
        <img
          src={img}
          alt="Card Image"
        />
        <div className="card-text">
          <div className="card-title">{name}</div>

          <div className="card-description">
            <div className="description">{description}</div>
            <div className="date">{date}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

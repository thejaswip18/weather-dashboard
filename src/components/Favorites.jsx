import React from 'react';
import "../css/Favorites.css"
import { AiFillDelete } from "react-icons/ai";

const Favorites = ({ favorites, onRemove, onSelect }) => {
  return (
    <div className="favorites">
      <h2 style={{textAlign:"center"}}>Your Favorites</h2>
      <div className='list'>
      {favorites.length > 0 ? (
        <div className='fav-list'>
          {favorites.map((favorite, index) => (
            <div key={index} className='fav-items' style={{fontSize:"20px"}}>
              {favorite}
              <button className='btn' onClick={() => onRemove(favorite)}><AiFillDelete style={{fontSize:"30px"}} /></button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{textAlign:"center"}}>No favorites found. Add some cities to your favorites list!</p>
      )}
      </div>
    </div>
  );
};

export default Favorites;

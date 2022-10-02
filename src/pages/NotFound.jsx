import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container">
      <div className="card">
        <div className="card-row">
          <img
            src="https://picsum.photos/200?blur"
            alt=""
            height={100}
            width={100}
          />
          <h1 className="info">Lost?</h1>
          <h2 className="info">Lost?</h2>
          <h3 className="info">Lost?</h3>
        </div>
        <div className="buttons" style={{display: "flex", justifyContent: "center"}}>
            <Link to="/dashboard" className="back">
              <button>dashboard</button>
            </Link>
          </div>
      </div>
    </div>
  );
}

export default NotFound;

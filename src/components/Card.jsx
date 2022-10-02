import React from "react";
import { Link } from "react-router-dom";
import ListComponent from "./ListComponent";

function Card({ personsArray, handleDelete }) {
  return (
    <>
      <div className="text-muted">{personsArray.length} birthdays today</div>
      {personsArray.map((obj) => (
        <ListComponent person={obj} key={obj._id} handleDelete={handleDelete} />
      ))}

      <div className="buttons">
        <Link to="/dashboard/personForm">
          <button>Add Person</button>
        </Link>
        <Link to="/dashboard/allbirthdays">
          <button>All Birthdays</button>
        </Link>
      </div>
    </>
  );
}

export default Card;

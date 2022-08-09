import React from "react";
import { Link } from "react-router-dom";
import ListComponent from "./ListComponent";


function Card({ personsArray, date }) {

  return (
    <>
      <div className="text-muted">{personsArray.length} birthdays today</div>
        {personsArray.map((obj) =>
          obj.dob.slice(5) === date ? (
            <ListComponent person={obj} key={obj.id} />
          ) : ("")
        )}
        <div className="buttons">
          <Link to='/personForm'><button>Add Person</button></Link>
          <Link to='/allbirthdays'><button>All Birthdays</button></Link>
        </div>
    </>
  );
}

export default Card;

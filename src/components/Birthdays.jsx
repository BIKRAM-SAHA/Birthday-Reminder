import "../styles/App.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { readData } from "../utils/firebase";
import ListComponent from "./ListComponent";

function Birthdays() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getValues = async () => {
      const value = await readData().then((response) => {
        return response || [];
      });
      setData(value);
    };
    getValues();
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="text-muted">Total Birthdays: {data.length} </div>
          {data.map((obj) => (
            <ListComponent person={obj} key={obj.id} displayDOB={true}/>
          ))}
          <div className="buttons">
            <Link to="/personForm">
              <button>Add Person</button>
            </Link>
            <Link to="/">
              <button>Birthdays Today</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Birthdays;

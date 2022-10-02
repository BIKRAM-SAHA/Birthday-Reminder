import "../styles/App.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { readData } from "../utils/firebase";
import ListComponent from "./ListComponent";
import { getBirthdays } from "../utils/birthdayService";

function Birthdays() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getValues = async () => {
      // const value = await readData().then((response) => {
      //   return response || [];
      // });
      const value = await getBirthdays();
      if (value.msg) {
        alert(value.msg);
        return;
      }
      setData([...value]);
    };
    getValues();
  }, []);

  const handleDelete = (id) => {
    setData(
      data.filter((element) => {
        return element._id !== id;
      })
    );
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="text-muted">Total Birthdays: {data.length} </div>
          {data.map((obj) => (
            <ListComponent
              person={obj}
              key={obj._id}
              displayDOB={true}
              handleDelete={handleDelete}
            />
          ))}
          <div className="buttons">
            <Link to="/dashboard/personForm">
              <button>Add Person</button>
            </Link>
            <Link to="/dashboard">
              <button>Birthdays Today</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Birthdays;

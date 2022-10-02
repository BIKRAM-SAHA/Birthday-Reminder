import "../styles/App.css";
// import { readData } from "../utils/firebase";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { getBirthdays } from "../utils/birthdayService";

function Dashboard() {
  const [personsArray, setPersonsArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const paddZero = (value) => {
    if (value < 9) return "0" + value;
    else return "" + value;
  };
  const today = new Date();
  const date = paddZero(today.getMonth() + 1) + "-" + paddZero(today.getDate());

  const handleDelete = (id) => {
    setPersonsArray(
      personsArray.filter((element) => {
        return element._id !== id;
      })
    );
  };

  useEffect(() => {
    const getValues = async () => {
      // const data = await readData().then((response) => {
      //   return response || [];
      // });
      const data = await getBirthdays();
      setPersonsArray(
        data.filter((obj) =>
          obj.dob.split("T")[0].slice(-5) === date ? true : false
        )
      );
      setLoading(false);
    };
    getValues();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="card">
        {!loading ? (
          <Card personsArray={personsArray} handleDelete={handleDelete} />
        ) : (
          <div className="loader">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

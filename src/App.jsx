import "./styles/App.css";
import { readData } from "./utils/firebase";
import { useEffect, useState } from "react";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Card from "./components/Card";
import AddPersonForm from "./components/AddPersonForm";
import Loader from "./components/Loader";
import Birthdays from "./components/Birthdays";

function App() {
  const [personsArray, setPersonsArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const paddZero = (value) => {
    if (value < 9) return "0" + value;
    else return "" + value;
  };
  const today = new Date();
  const date = paddZero(today.getMonth() + 1) + "-" + paddZero(today.getDate());

  useEffect(() => {
    const getValues = async () => {
      const data = await readData().then((response) => {
        return response || [];
      });
      setPersonsArray(
        data.filter((obj) => (obj.dob.slice(5) === date ? true : false))
      );
      setLoading(false);
    };
    getValues();
  }, []);

  

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
          <div className="container">
            <div className="card">
              {!loading ? (
                <Card personsArray={personsArray} date={date} />
              ) : (
                <div className="loader">
                  <Loader />
                </div>
              )}
            </div>
          </div>
        }/>
        <Route path="personForm" element={<AddPersonForm/>}/>
        <Route path="allbirthdays" element={<Birthdays/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;

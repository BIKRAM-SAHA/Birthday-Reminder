import "../styles/Form.css";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getImageUrl } from "../utils/firebase";
import { addBirthday } from "../utils/birthdayService";

function AddPersonForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const fileRef = useRef("");

  const notify = (status, msg) => {
    switch (status) {
      case "success":
        return toast.success(msg);
      case "error":
        return toast.error(msg);
      default:
        break;
    }
  };
  const reset = () => {
    setName("");
    setDob("");
    fileRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (name && dob && fileRef.current) {
      if (!fileRef.current.files[0]) {
        const response = await addBirthday(name, dob);
        if (response.msg) {
          notify("error", response.msg);
          return;
        }
        notify("success", "Birthday added");
        navigate("/dashboard/allbirthdays", { replace: true });
        reset();
        return;
      }
      getImageUrl(
        fileRef.current.files[0],
        fileRef.current.files[0].name,
        (url) => {
          // writeData(name, dob, url)
          const response = addBirthday(name, dob, url);
          if (response.error) {
            notify("error", response.error);
            return;
          }
          notify("success", "Birthday added");
          navigate("/dashboard/allbirthdays", { replace: true });
          reset();
        }
      );
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="item">
          <label htmlFor="name">NAME</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="item">
          <label htmlFor="dob">DOB</label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
          />
        </div>
        <div className="item">
          <input id="image" ref={fileRef} type="file" />
        </div>
        <div className="item buttons">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <Link to="/dashboard" className="back">
            <button>B'days Today</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddPersonForm;

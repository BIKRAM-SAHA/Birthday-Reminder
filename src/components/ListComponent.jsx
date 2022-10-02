import React from "react";
import { toast } from "react-toastify";
import { delBirthday } from "../utils/birthdayService";

function ListComponent({ person, displayDOB = false, handleDelete }) {
  const dob = new Date(person.dob);
  const Age = Math.abs(
    new Date(Date.now() - dob.getTime()).getUTCFullYear() - 1970
  );

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

  const handelDel = async () => {
    const response = await delBirthday(person._id);
    if (response.message) {
      notify("success", "Birthday deleted");
      handleDelete(person._id);
      return;
    }
    notify("error", "Something went wrong");
  };

  return (
    <div className="card-row">
      <img
        src={
          person.imageUrl === "" ? "https://picsum.photos/90" : person.imageUrl
        }
        alt="profile"
        className="card-img"
        height="90px"
        width="90px"
      />
      <div className="info">
        <h3>{person.name}</h3>
        <p>{Age} yo</p>
        {displayDOB && <p>{person.dob.split("T")[0]}</p>}
      </div>
      <div className="item buttons">
        <button style={{ backgroundColor: "red" }} onClick={handelDel}>
          Del
        </button>
      </div>
    </div>
  );
}

export default ListComponent;

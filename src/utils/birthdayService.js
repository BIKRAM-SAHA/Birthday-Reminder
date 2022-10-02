// @desc: add birthday
// @route: POST /birthday
// @access: public
const addBirthday = async (name, dob, url) => {
  const data = {
    name,
    dob,
    imageUrl: url,
  };
  const token = "Bearer " + localStorage.getItem("user");
  if (!token) {
    return { msg: "unauthorized" };
  }
  return await fetch("https://birthday-server.herokuapp.com/birthday", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      if (error.msg === "unauthorized") {
        localStorage.removeItem("user");
      }
      return error;
    });
};

// @desc: get all birthdays
// @route: GET /birthday
// @access: public
const getBirthdays = async () => {
  const token = "Bearer " + localStorage.getItem("user");
  if (!token) {
    return { error: "unauthorized" };
  }
  return await fetch("https://birthday-server.herokuapp.com/birthday", {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      if (error.msg === "unauthorized") {
        localStorage.removeItem("user");
      }
      return error;
    });
};

// @desc: get all birthdays
// @route: GET /birthday
// @access: public
const delBirthday = async (id) => {
  const token = "Bearer " + localStorage.getItem("user");
  if (!token) {
    return { error: "unauthorized" };
  }
  return await fetch(`https://birthday-server.herokuapp.com/birthday/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      if (error.msg === "unauthorized") {
        localStorage.removeItem("user");
      }
      return error;
    });
};

module.exports = {
  addBirthday,
  getBirthdays,
  delBirthday,
};

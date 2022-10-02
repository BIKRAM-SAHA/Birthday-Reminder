// User
// base path: /

// @desc: register
// @route: POST /register
// @access: public
const register = async (name, email, password) => {
  const data = {
    name,
    email,
    password,
  };
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(data);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    body: raw,
    redirect: "follow",
  };

  return await fetch(
    "https://birthday-server.herokuapp.com/register",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
};

// @desc: login
// @route: POST /login
// @access: public
const login = async (email, password) => {
  const data = {
    email,
    password,
  };
  return await fetch("https://birthday-server.herokuapp.com/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => error);
};

// @desc: get current user info
// @route: GET /me
// @access: public
const getMe = (name, email, password) => {};

module.exports = {
  register,
  login,
  getMe,
};

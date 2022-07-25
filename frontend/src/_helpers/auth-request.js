const authRequest = (user) => {
  let config = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };
  return config;
};

module.exports = { authRequest };

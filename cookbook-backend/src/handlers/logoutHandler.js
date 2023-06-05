const logoutHandler = async (request, response) => {
  response.clearCookie('jwt').send();
};

export default logoutHandler;

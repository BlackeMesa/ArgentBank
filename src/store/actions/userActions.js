export const loginUser = (token) => ({
  type: "USER_LOGIN",
  payload: token,
});

export const logoutUser = () => ({
  type: "USER_LOGOUT",
});

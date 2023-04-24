
export const checkLoginStatus = (req, res, next) => {
  if (req.session.isAuthenticatedUser) {
    next();
  } else {
    res.status(401).json({
      message: "ログインしてください",
      errorCode: "ERR_USER_NOT_AUTHENTICATED"
    })
  }
}

export const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === process.env.SECRET_API_KEY) {
    next();
  } else {
    res.status(401).json({
      message: '認証NG',
      errorCode: 'ERR_NOT_AUTHENTICATED'
    });
  }
};

const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const { catchAsync, AppError } = require("../../utils");

const checkAuth = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startWith("Bearer") &&
    req.headers.authorization.split(" ")[1];
  if (!token)
    return next(new AppError(401, "Not authorized, you have not token "));

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error.message);
    next(new AppError(401, "Not authorized, you have not token "));
  }

  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError(401, "Your session has been terminated, please login again")
    );
  req.user = currentUser;

  next();
});

module.exports = checkAuth;

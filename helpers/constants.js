module.exports.fullerConsoleLine = '###################################################### -_- #####################################################';

module.exports.minLen = 2;
module.exports.maxLen = 30;

// eslint-disable-next-line no-useless-escape
module.exports.regExpUrl = /^(http|https):\/\/[\w\-._~:/?#[\]\\@!\$&'()\*\+,;=]+\.[\w\/]{2,}#*$/;
module.exports.regExpEmail = /[\w]+@[\w]+\.[a-z]{2,}/;
module.exports.regExpUserId = /^[\w]{24}$/;

module.exports.LOGOUT_SUCC = 'Logout successfull';
module.exports.EXPECTED_EMAIL_TEXT = 'Некорректный email. Пример: primer@gmail.com';
module.exports.EXPECTED_URL_TEXT = 'Некорректный URL. Ожидаемый формат: http://... или https://... ';
module.exports.NOT_USER_TEXT = 'Пользователь не найден';
module.exports.NOT_MOVIE_TEXT = 'Не удалось найти фильм';
module.exports.NOT_ROUTE_TEXT = 'Роута обращения не существует у данного API';
module.exports.NOT_AUTH_TEXT = 'Необходима авторизация';
module.exports.ALIEN_MOVIE_TEXT = 'Вы не можете удалять добавленное другим пользователем';
module.exports.UNCORRECT_DATA_TEXT = 'Переданные данные некорректны';
module.exports.UNCORRECT_AUTH_TEXT = 'Неправильная почта или пароль';
module.exports.USER_EXIST_TEXT = 'Пользователь с таким email уже зарегистрирован';
module.exports.ERROR_DEFAULT_TEXT = 'На сервере произошла ошибка';

module.exports.SUCCES_CREATE_STATUS = 201;
module.exports.UNCORRECT_DATA_STATUS = 400;
module.exports.UNCORRECT_AUTH_STATUS = 401;
module.exports.ALIEN_MOVIE_STATUS = 403;
module.exports.NOT_FOUND_STATUS = 404;
module.exports.USER_EXIST_STATUS = 409;
module.exports.ERROR_DEFAULT_STATUS = 500;
module.exports.MONGO_CONFLICT_STATUS = 11000;

module.exports.mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  family: 4,
};

module.exports.newCookieOptions = {
  maxAge: 1000 * 3600 * 24 * 7,
  credentials: true,
  httpOnly: true,
};// 7 day

module.exports.oldCookieOptions = {
  maxAge: 0,
  credentials: true,
  httpOnly: true,
};

module.exports.DEFAULT_ALLOWED_METHODS = 'GET, PATCH, POST, DELETE';
module.exports.allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
];

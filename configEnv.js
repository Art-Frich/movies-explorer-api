const { NODE_ENV } = process.env;
module.exports.PORT = NODE_ENV === 'production' ? process.env.PORT : 3002;
module.exports.JWT_SECRET = NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';
module.exports.MONGO_URI = NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost:27017/bitfilmsdb';

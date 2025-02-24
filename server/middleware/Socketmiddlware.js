const SocketManager = require('../lib/socket/SocketManager');

const Socketmiddleware = (req, res, next) => {
  try {
    if (!SocketManager.getIO()) {
      console.log('Initializing Socket.IO for comment route');
      SocketManager.initializeSocket(req.app.get('server'));
    }
    next();
  } catch (error) {
    console.error('Socket middleware error:', error);
    next(error);
  }
};

module.exports = Socketmiddleware;
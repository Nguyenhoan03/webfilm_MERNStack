const express = require('express');
const router = express.Router();

const Product = require('./product');
const Admin = require('./admin');
const Crawlphim = require('../controller/crawl/Crawlphimcontroller');
const Usercontroller = require('../controller/Usercontroller');
const ErrorHandler = require('../middleware/Errorhandle');
const Categorycontroller = require('../controller/Categorycontroller');

const initRoutes = (app) => {
  app.use('/product', Product);
  app.use('/admin', Admin);

  // Auth
  app.post('/dang-nhap', Usercontroller.Login);
  app.post('/dang-ky', Usercontroller.Register);
  app.post('/refresh_token', Usercontroller.Refreshtoken);

  // Crawl APIs
  app.post('/crawl', Crawlphim.Crawlphim);
  app.post('/cron/start', Crawlphim.StartScheduledCrawl);
  app.post('/cron/stop', Crawlphim.StopScheduledCrawl);
  app.delete('/delete_scheduled_crawls', Crawlphim.Delete_Scheduled_crawls);

 app.post('/create_scheduled_crawls', Crawlphim.Create_Scheduled_crawls);
  app.get('/schedule_crawl', Crawlphim.Get_Scheduled_crawls);


  // Category & User
  app.get('/category', Categorycontroller.getallcatecontroller);
  app.get('/getalluser', Usercontroller.getallusercontroller);
  app.post('/update_roles', Usercontroller.Updateroles);
  app.post('/update_permissions', Usercontroller.Updatepermissions);

  // Error testing
  app.get('/error', (req, res, next) => {
    const error = new Error('Something went wrong!');
    error.statusCode = 400;
    error.stack = new Error().stack;
    next(error);
  });

  // Error handler middleware (cuối cùng)
  app.use(ErrorHandler);
};

module.exports = initRoutes;
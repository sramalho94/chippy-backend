const Router = require('express').Router();
const AuthRouter = require('./AuthRouter');
const UserRouter = require('./UserRouter');
const ChipRouter = require('./ChipRouter');
const ChipLocationRouter = require('./ChipLocationRouter');
const ChipReactionRouter = require('./ChipReactionRouter');
const CommentRouter = require('./CommentRouter');
const LocationRouter = require('./LocationRouter');
const UserAchievementRouter = require('./UserAchievementRouter');

Router.use('/auth', AuthRouter);
Router.use('/users', UserRouter);
Router.use('/chips', ChipRouter);
Router.use('/chip-locations', ChipLocationRouter);
Router.use('/chip-reactions', ChipReactionRouter);
Router.use('/comments', CommentRouter);
Router.use('/locations', LocationRouter);
Router.use('user-achievements', UserAchievementRouter);

module.exports = Router;

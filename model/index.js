const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Post);
Post.belongsTo(User, {
    foreignKey: 'user_id'
});
Post.hasMany(Comment);
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
User.hasMany(Comment);
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { Post, User, Comment };
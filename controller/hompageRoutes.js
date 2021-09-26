const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../model');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_title',
            'post_body',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        console.log(posts)

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;
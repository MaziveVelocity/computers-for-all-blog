const router = require('express').Router();
const { Post, Comment, User } = require('../../model');
const withAuth = require('../../utils/auth');

//--------GET-------//
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
    }).then(dbData => {
        res.json(dbData)
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
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
    }).then(dbData => {
        res.json(dbData)
    }).catch(err => {
        res.status(500).json(err);
    });
});

//--------POST-------//
router.post('/', withAuth, (req, res) => {
    console.log(req.body);
    Post.create({
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        user_id: req.session.user_id
    }).then(dbData => {
        res.json(dbData)
    }).catch(err => {
        res.status(500).json(err);
    });
});

//--------PUT-------//
router.put('/:id', withAuth,(req, res) => {
    Post.update(
        {
            post_title: req.body.post_title,
            post_body: req.body.post_body
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(dbData => {
        if (dbData[0] !== 1) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json({ message: 'update success', data: dbData });
    }).catch(err => {
        res.status(500).json(err);
    });
});

//--------DELETE-------//
router.delete('/:id', withAuth,(req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbData => {
        if (!dbData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json({ message: 'post successfully deleted', data: dbData });
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router
const router = require('express').Router();
const { Comment, User } = require('../../model');
const withAuth = require('../../utils/auth');

//--------GET-------//
router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
            post_id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(dbData => {
        res.status(200).json(dbData);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.get('/user/:id', withAuth, (req, res) => {
    Comment.findAll({
        where: {
            user_id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(dbData => {
        res.status(200).json(dbData);
    }).catch(err => {
        res.status(500).json(err);
    });
});

//--------POST-------//
router.post('/', withAuth, (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    }).then(dbCommentData => {
        res.json(dbCommentData)
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

//--------PUT-------//
router.put('/:id', withAuth, (req, res) => {
    Comment.update({
        comment_text: req.body.comment_text
    },
        {
            where: {
                id: req.params.id
            }
        }).then(dbData => {
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
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router
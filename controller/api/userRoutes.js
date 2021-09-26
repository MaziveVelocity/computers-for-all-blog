const router = require('express').Router();
const { User, Post, Comment } = require('../../model/');

// ----------GET----------//
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'post_title', 'post_body']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at']
            }
        ]
    }).then(dbData => {
        if (!dbData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// ----------Login----------//
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbData => {
        if (!dbData) {
            res.status(400).json({ message: 'Incorrect Username or Password' });
            return;
        }

        const validPassword = dbData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect Username or Password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbData.id;
            req.session.username = dbData.username;
            req.session.loggedIn = true;

            res.json({ user: dbData, message: 'You are now logged in!' });
        });
    });
});

// ----------log out----------//
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      }
      else {
        res.status(404).end();
      }
});

// ----------POST----------//
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbData => {
            req.session.save(() => {
                req.session.user_id = dbData.id;
                req.session.username = dbData.username;
                req.session.loggedIn = true;

                res.json(dbData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router
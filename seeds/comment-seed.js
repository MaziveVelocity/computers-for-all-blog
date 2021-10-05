const { Comment } = require('../model/')

const commentData = [
    {
        comment_text: 'Thanks for creating this blog so we can post about stuff to!',
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: 'Thats a really great question',
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: 'I think its somewhere around 20',
        user_id: 3,
        post_id: 3
    },
    {
        comment_text: 'Yeah the site does say Computers for all.',
        user_id: 1,
        post_id: 4
    },
    {
        comment_text: 'Well maybe we should change the name?',
        user_id: 3,
        post_id: 4
    },
    {
        comment_text: 'I second that',
        user_id: 2,
        post_id: 4
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
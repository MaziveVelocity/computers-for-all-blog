const { Post } = require('../model');

const postData = [
    {
        post_title: 'My first Post',
        post_body: 'This new blog is awesome. I love being able to post about stuff that I love to talk about.',
        user_id: 4
    },
    {
        post_title: 'Who is Willy Nelson',
        post_body: 'I keep hearing about this guy named Willy Nelson. Who is and what is he about.',
        user_id: 3
    },
    {
        post_title: 'How much is in a stack',
        post_body: 'We keep talking about lets stack but how much is turley in a stack?',
        user_id: 2
    },
    {
        post_title: 'We need to keep topics on Computers',
        post_body: 'I have read some of the most recent post and they are not about computers. I think we need to try and keep this blog on topic.',
        user_id: 4
    }
]

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
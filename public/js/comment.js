async function commentHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('#comment_text').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/comment', {
        method: 'post',
        body: JSON.stringify({
            comment_text,
            post_id
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace(`/post/${post_id}`);
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentHandler);
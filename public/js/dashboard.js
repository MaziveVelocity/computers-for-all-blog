async function newPostHandler(event) {
    event.preventDefault();

    const post_title = document.querySelector('#post_title').value.trim();
    const post_body = document.querySelector('#post_body').value.trim();

    const response = await fetch('/api/post', {
        method: 'post',
        body: JSON.stringify({
            post_title,
            post_body
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.post-form').addEventListener('submit', newPostHandler);
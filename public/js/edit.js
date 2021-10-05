async function editPostHandler(event) {
    event.preventDefault();

    const post_title = document.querySelector('#post_title').value.trim();
    const post_body = document.querySelector('#post_body').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/post/${id}`, {
        method: 'put',
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

document.querySelector('.edit-form').addEventListener('submit', editPostHandler);
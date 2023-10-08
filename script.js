const submitButton = document.getElementById('submit-post');
const postText = document.getElementById('post-text');
const postsContainer = document.getElementById('posts');
const postPage = document.getElementById('post-page');
const postDetails = document.getElementById('post-details');
const commentsContainer = document.getElementById('comments');
const commentText = document.getElementById('comment-text');
const submitCommentButton = document.getElementById('submit-comment');

let posts = [];
let currentPost = null;

submitButton.addEventListener('click', () => {
    const text = postText.value;
    if (text.trim() !== '') {
        const post = createPost(text);
        posts.push(post);
        postText.value = '';
    }
});

function createPost(text) {
    const post = {
        text: text,
        votes: 0,
        comments: [],
    };

    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const votesDiv = document.createElement('div');
    votesDiv.classList.add('votes');

    const upvoteButton = document.createElement('button');
    upvoteButton.innerText = 'Upvote';
    upvoteButton.addEventListener('click', () => {
        upvotePost(post);
    });

    const downvoteButton = document.createElement('button');
    downvoteButton.innerText = 'Downvote';
    downvoteButton.addEventListener('click', () => {
        downvotePost(post);
    });

    const voteCount = document.createElement('div');
    voteCount.innerText = `Votes: ${post.votes}`;

    const postTextDiv = document.createElement('div');
    postTextDiv.innerText = text;

    postDiv.appendChild(votesDiv);
    votesDiv.appendChild(upvoteButton);
    votesDiv.appendChild(downvoteButton);
    votesDiv.appendChild(voteCount); // Display vote count
    postDiv.appendChild(postTextDiv);

    postDiv.addEventListener('click', () => {
        showPostPage(post);
    });

    postsContainer.appendChild(postDiv);

    return post;
}

function upvotePost(post) {
    post.votes++;
    renderPosts();
}

function downvotePost(post) {
    post.votes--;
    renderPosts();
}

function renderPosts() {
    posts.sort((a, b) => b.votes - a.votes);

    while (postsContainer.firstChild) {
        postsContainer.removeChild(postsContainer.firstChild);
    }

    for (const post of posts) {
        createPost(post.text);
    }
}

function showPostPage(post) {
    currentPost = post;
    postPage.style.display = 'block';

    postDetails.innerHTML = `
        <div class="post">
            <div class="votes">
                <button id="upvote"><i class="fa fa-thumbs-up" style="font-size:20px"></i></button>
                <button id="downvote"><i class="fa fa-thumbs-down" style="font-size:20px"></i></button>
                <div id="vote-count">Votes: ${post.votes}</div>
            </div>
            <div>${post.text}</div>
        </div>
    `;

    document.getElementById('upvote').addEventListener('click', () => {
        upvotePost(post);
        showPostPage(post);
    });

    document.getElementById('downvote').addEventListener('click', () => {
        downvotePost(post);
        showPostPage(post);
    });

    renderComments(post.comments);

    submitCommentButton.addEventListener('click', () => {
        const comment = commentText.value;
        if (comment.trim() !== '') {
            post.comments.push(comment);
            commentText.value = '';
            renderComments(post.comments);
        }
    });
}

function renderComments(comments) {
    commentsContainer.innerHTML = '';
    for (const comment of comments) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerText = comment;
        commentsContainer.appendChild(commentDiv);
    }
}

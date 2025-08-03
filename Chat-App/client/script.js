const socket = io();
const form = document.getElementById('form');
const username = document.getElementById('username');
const textarea = document.getElementById('message');
const allMessages = document.getElementById('allMessages');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    socket.emit('send message', {
        username: username.value,
        message: textarea.value
    });

    textarea.value = '';
});

socket.on('chat message', function(data) {
    allMessages.innerHTML += `<b>${data.username}:</b> ${data.message}<br>`;
});

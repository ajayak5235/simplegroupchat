
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    fs.readFile('username.txt', (err, data) => {
        if (err) {
            console.error(err);
            data = 'No chat Exists';
        }
        res.send(`
            ${data}
            <form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
                <input type="text" name="message" id="message">
                <input type="text" name="username" id="username">
                <br />
                <button type="submit">send</button>
            </form>
        `);
    });
});

app.post('/', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.message);
    fs.writeFile("username.txt", `${req.body.username}: ${req.body.message}/n`, { flag: 'a' }, (err) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/');
        }
    });
});

app.get('/login', (req, res) => {
    res.send(`
        <form action="/login" method="POST" onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
            <input type="text" name="username" id="username">
            <br />
            <button type="submit">Login</button>
        </form>
    `);
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    // Store the username in localStorage
    res.send(`<script>localStorage.setItem('username', '${username}'); window.location.href = '/';</script>`);
});

app.listen(3000)
    

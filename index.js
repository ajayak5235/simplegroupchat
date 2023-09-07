const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login', (req, res, next) => {
    res.send(`
    <input id="username" type="text" name"title">
    <form onsubmit="localStorage.setItem(`{username}`, document.getElementById(`{username}`.value)" action="/product" method="POST">

	

	<button type="submit">add</button>

</form>
    `);
});

app.use('/username', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    res.send('<lable>No chat Exist</lable><br><input type="text" name="productName"> <br> <button type="submit">send</button>');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});






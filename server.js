const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 8080;

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/pubic'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
})

app.get('/', (request, response) => {

    response.send({
        name: 'Peta',
        school: [
            'BCIT',
            'UBC'
        ]
    });

});

app.use((request, response, next) => {
    var time = new Date().toString();
    console.log(`${time}:${request.method} ${request.url}`);
    next();
});

app.get('/info', (request, response) => {
    response.render('about.hbs', {
        title: 'About Page',
        year: new Date().getFullYear(),
        welcome: 'Hello!'
    });
});

app.get('/happy', (request, response) => {
    response.render('happy.hbs', {
        title: 'Hapiness',
        img: 'https://cdn3.volusion.com/exhqe.vwkag/v/vspfiles/photos/O-OFSSPS564-2.jpg?1475070982',
        year: new Date().getFullYear(),
        welcome: 'Party time!'
    });
});
app.get('/sad', (request, response) => {
    response.render('sad.hbs', {
        title: 'Sadness',
        year: new Date().getFullYear(),
        img: 'https://cdn.shopify.com/s/files/1/1061/1924/files/Sad_Face_Emoji.png?9898922749706957214"',
        welcome: 'I wanna stay alone!'
    });
});

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
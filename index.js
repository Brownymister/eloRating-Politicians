const express = require('express');
const app = express();
var Ra = 1000;
var Rb = 1000;
var port = process.env.PORT || 4000;
app.listen(port);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/Ra', function(req, res) {
    RaWin();
    res.json({
        "elo": {
            "Ra": Ra,
            "Rb": Rb,
        }
    });
});

app.get('/Rb', function(req, res) {
    RbWin();
    res.json({
        "elo": {
            "Ra": Ra,
            "Rb": Rb,
        }
    });
});

app.get('/getELO', function(req, res) {
    res.json({
        "elo": {
            "Ra": Ra,
            "Rb": Rb,
        }
    });
});

app.get('/result', function(req, res) {
    res.sendFile(__dirname + '/result.html');
});

app.get('/getImg', function(req, res) {
    res.json({
        "Img": {
            "Ra": 'https://pbs.twimg.com/media/E87IXSYWQAI-8ti?format=jpg&name=large',
            "Rb": 'https://www.filmfestivalcottbus.de/media/k2/items/cache/2f7bb693f9e8b1bbf875f0818996978d_XL.jpg',
        }
    });
});

function RaWin() {
    Ea = 1 / (1 + Math.pow(10, ((Rb - Ra) / 400)))
    Eb = 1 / (1 + Math.pow(10, ((Ra - Rb) / 400)))
    Ra = Ra + 32 * (1 - Ea)
    Rb = Rb + 32 * (0 - Eb)
}

function RbWin() {
    Ea = 1 / (1 + Math.pow(10, ((Rb - Ra) / 400)))
    Eb = 1 / (1 + Math.pow(10, ((Ra - Rb) / 400)))
    Ra = Ra + 32 * (0 - Ea)
    Rb = Rb + 32 * (1 - Eb)
}
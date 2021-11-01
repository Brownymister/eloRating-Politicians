const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

app.use(cookieParser());

var Ea = 0;
var Eb = 0;
var calulated = false;

var politics = [

    {
        "url": "https://pbs.twimg.com/media/E87IXSYWQAI-8ti?format=jpg&name=large",
        "name": "Laschet",
        "partei": "CDU",
        "score": 1000,
    },
    {
        "url": "https://www.filmfestivalcottbus.de/media/k2/items/cache/2f7bb693f9e8b1bbf875f0818996978d_XL.jpg",
        "name": "Scholz",
        "partei": "SPD",
        "score": 1000,
    },
    {
        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Annalena_Baerbock_%28cropped%2C_2%29.jpg/1200px-Annalena_Baerbock_%28cropped%2C_2%29.jpg",
        "name": "Bearbock",
        "partei": "Die Grünen",
        "score": 1000,
    },
    {
        "url": "https://www.fdp.de/sites/default/files/2021-09/Profilbild%20Christian%20Lindner.png",
        "name": "Lindner",
        "partei": "FDP",
        "score": 1000,
    },
]

var tokens = [];

var port = process.env.PORT || 4000;
app.listen(port);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/setEverythingTo1000', function(req, res) {
    politics.forEach(element => {
        element.score = 1000;
    });
    res.json({ "status": "set to 1000" })
});

app.get('/Ra', function(req, res) {
    RaWin(req);
    res.json({ "status": "updated" });
});

app.get('/Rb', function(req, res) {
    RbWin(req);
    res.json({ "status": "updated" })
});

app.get('/result', function(req, res) {
    res.sendFile(__dirname + '/result.html');
});

app.get('/getAllImg', function(req, res) {
    var politicsArray = Object.values(politics)
    res.json(politicsArray.sort((a, b) => b.score - a.score));
});

app.get('/getImg', function(req, res) {
    randomPolitics();
    var token = uuidv4();
    res.cookie('cookie', token); //{ maxAge: 5000, }
    tokens.push({ "Ra": selectedPolitics[0], "Rb": selectedPolitics[1], "token": token })
    res.json(selectedPolitics);
});

function randomPolitics() {
    selectedPolitics = []
    for (let i = 0; i < 2; i++) {
        var randomPolitic = Math.floor(Math.random() * Object.keys(politics).length);
        while (i == 1 && politics[randomPolitic].name == selectedPolitics[0].name) {
            var randomPolitic = Math.floor(Math.random() * Object.keys(politics).length);
        }
        selectedPolitics.push(politics[randomPolitic]);
    }
    return selectedPolitics;
}

function calculateScore(Ra, Rb) {
    Ea = 1 / (1 + Math.pow(10, ((Rb - Ra) / 400)))
    Eb = 1 / (1 + Math.pow(10, ((Ra - Rb) / 400)))
    return { "Ea": Ea, "Eb": Eb }
}

function RaWin(req) {
    const { cookies } = req;
    var token = cookies['cookie'];
    const found = tokens.find(element => element.token == token);
    var clientRa = found['Ra'];
    var clientRb = found['Rb'];
    var Ra = politics.find(element => element.name == clientRa.name);
    Ra = Ra.score;
    var Rb = politics.find(element => element.name == clientRb.name);
    Rb = Rb.score;
    var Ea = ""
    var Eb = ""
    for (var i = 0; i < Object.keys(politics).length; i++) {
        var element = politics[i];
        if (element.name == clientRa.name && !calulated) {
            var Ra = element.score;
            politics.forEach(element => {
                if (element.name == clientRb.name && !calulated) {
                    var Rb = element.score;
                    var EaEb = calculateScore(Ra, Rb)
                    Ea = EaEb.Ea
                    Eb = EaEb.Eb
                    element.score = Rb + 32 * (0 - Eb);
                }
            });
            element.score = Ra + 32 * (1 - Ea);
            calulated = true;
            return;
        }
    }
    if (calulated) {
        calulated = false;
    }
}

function RbWin(req) {
    const { cookies } = req;
    var token = cookies['cookie'];
    const found = tokens.find(element => element.token == token);
    var clientRa = found['Ra'];
    var clientRb = found['Rb'];
    var Ra = politics.find(element => element.name == clientRa.name);
    Ra = Ra.score;
    var Rb = politics.find(element => element.name == clientRb.name);
    Rb = Rb.score;
    var Ea = ""
    var Eb = ""
    for (var i = 0; i < Object.keys(politics).length; i++) {
        var element = politics[i];
        if (element.name == clientRa.name && !calulated) {
            var Ra = element.score;
            politics.forEach(element => {
                if (element.name == clientRb.name && !calulated) {
                    var Rb = element.score;
                    var EaEb = calculateScore(Ra, Rb)
                    Ea = EaEb.Ea
                    Eb = EaEb.Eb
                    element.score = Rb + 32 * (1 - Eb);
                }
            });
            element.score = Ra + 32 * (0 - Ea);
            calulated = true;
            return;
        }
    }
    if (calulated) {
        calulated = false;
    }
}
/**
 * calculateScore();
    Ra = Ra + 32 * (0 - Ea)
    Rb = Rb + 32 * (1 - Eb)
 */
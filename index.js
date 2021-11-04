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
        "name": "Armin Laschet",
        "partei": "CDU/CSU",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/862376/3x4/284/379/ca03a3a00ec3537ce77a3cf4546ea480/cq/scholz_olaf.jpg",
        "name": "Olaf Scholz",
        "partei": "SPD",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/864550/3x4/170/227/35a8441fba3e1082695ae9b8c2589f29/Uo/baerbock_annalena_gross.jpg",
        "name": "Annalena Bearbock",
        "partei": "Die Grünen",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/864418/3x4/284/379/58b49fb7af6c863309dc5626870b02a3/mZ/lindner_christian_gross.png",
        "name": "Christian Lindner",
        "partei": "FDP, Fraktionsvorsitz",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/864094/3x4/284/379/98471e92cb87b4f4e9a2057732a5281c/YS/amthor_philipp_gross.jpg",
        "name": "Philipp Amthor",
        "partei": "CDU/CSU",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/864626/3x4/284/379/e565c45881e60420bbcf80d8a2419bc3/PA/kubicki_wolfgang_gross.png",
        "name": "Wolfgang Kubicki",
        "partei": "FDP, Bundestagspräsident",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/864218/3x4/284/379/5cf1209918c85b40e85a14c07108166a/mk/roth_claudia_gross.jpg",
        "name": "Claudia Roth",
        "partei": "Die Grünen, Bundestagspräsidentin",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/862088/3x4/284/379/ae5261fd18c83ded7970c72131e0fe45/QW/habeck_robert.jpg",
        "name": "Dr. Robert Habeck",
        "partei": "Die Grünen",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/864486/3x4/284/379/8adcfae90293fba1bab06d37a6211cbe/cS/muetzenich_rolf_gross.jpg",
        "name": "Dr. Rolf Mützenich",
        "partei": "SPD, Fraktionsvorsitz",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/864318/3x4/284/379/1b909c07c63b2156fe17c2ed105781f1/vX/hofreiter_anton_gross.jpg",
        "name": "Dr. Anton Hofreiter",
        "partei": "Die Grünen, Fraktionsvorsitz",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/864564/3x4/284/379/94d1d87ec8281c1661028ea08afcf119/Im/braun_helge_gross.jpg",
        "name": "Prof. Dr. Helge Braun",
        "partei": "CDU/CSU",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/867456/3x4/284/379/b1642784c73b8f4f788bf260c7b96154/UT/kloeckner_julia.jpg",
        "name": "Julia Klöckner",
        "partei": "CDU/CSU",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/864396/3x4/284/379/4c7c54987e4152a9b19ab94b69233cdf/qE/lauterbach_karl_gross.jpg",
        "name": "Prof. Dr. Karl Lauterbach",
        "partei": "SPD",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/864462/3x4/284/379/3939ee734092f1afdd7e5ff7cd7f6ce3/Gm/maas_heiko_gross.jpg",
        "name": "Heiko Maas",
        "partei": "SPD",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/864438/3x4/284/379/8423505fda7259e6437440483e13bb5c/Pv/lambsdorff_alexander_gross.jpg",
        "name": "Alexander Graf Lambsdorff",
        "partei": "FDP",
        "score": 1000,
    },
    {
        "url": "https://www.bundestag.de/resource/image/864162/3x4/284/379/1b24551dcb0492145ef792963db040a2/gM/faber_marcus_gross.jpg",
        "name": "Dr. Marcus Faber",
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
    Win(req, 'Ra');
    res.json({ "status": "updated" });
});

app.get('/Rb', function(req, res) {
    Win(req, 'Rb');
    res.json({ "status": "updated" })
});

app.get('/result', function(req, res) {
    res.sendFile(__dirname + '/result.html');
});

app.get('/getAllImg', function(req, res) {
    var politicsArray = Object.values(politics)
    res.json(politicsArray.sort((a, b) => b.score - a.score));
});

/* app.get('/getRankByParty', function(req, res) {
    var politicsArray = Object.values(politics);
    res.json(politicsArray.sort((a, b) => b.score - a.score));
});
 */
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

function Win(req, RaORb) {
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
                    Ea = EaEb.Ea;
                    Eb = EaEb.Eb;
                    if (RaORb == 'Rb') { element.score = Rb + 32 * (1 - Eb); } else {
                        element.score = Rb + 32 * (0 - Eb);
                    }
                }
            });
            if (RaORb == 'Rb') {
                element.score = Ra + 32 * (0 - Ea);
            } else {
                element.score = Ra + 32 * (1 - Ea);
            }
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
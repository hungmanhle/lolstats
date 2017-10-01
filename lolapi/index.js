// Load up environment variables
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT;
// Some libs
const request = require('request');
const Promise = require('bluebird');
const express = require('express');
const path = require('path');

const app = express();

const riotApiBase = 'https://na1.api.riotgames.com';
const riotRoutes = {
    'summoner': '/lol/summoner/v3/summoners/by-name/',
    'matchlist': `/lol/match/v3/matchlists/by-account/`,
    'match': '/lol/match/v3/matches/',
    'champion': '/lol/static-data/v3/champions/',
    'champions': '/lol/static-data/v3/champions',
}
let championData = null;

function genRiotUrl(route, id = '', mod = '?') {
    return `${riotApiBase}${riotRoutes[route]}${id}${mod}api_key=${API_KEY}`;
}

function genRiotReq(route, id = '', mod = '?') {
    return genReq(genRiotUrl(route, id, mod));
}

function genReq(url) {
    return new Promise(function (resolve, reject) {
        // make request
        request(url, function (error, response, body) {
            if (error) {
                console.log('error requesting : ', url, ". error msg: ", error);
                reject(error);
            }
            resolve(JSON.parse(body));
        });
    });
}


// Routes
app.get('/api/account/:account', function (req, res, next) {
    const username = req.params.account;
    genRiotReq('summoner', username).then(function (data) {
        res.send(data);
    }).catch(next);
});

app.get('/api/matchlist/:account', function (req, res, next) {
    const username = req.params.account;
    genRiotReq('summoner', username).then(function (data) {
        let accountId = data.accountId;
        return genRiotReq('matchlist', accountId, '/recent?');
    }).then(function (data) {
        res.send(data);
    }).catch(next);
});

app.get('/api/champion/:champId', function (req, res, next) {
    const champId = parseInt(req.params.champId);
    if (!!championData) {
        return res.json(championData.get(champId));
    }
    genRiotReq('champions', '', '?locale=en_US&tags=image&dataById=false&').then(({ data }) => {
        championData = new Map();
        Object.entries(data).forEach(([key, value]) => {
            championData.set(value.id, value);
        });
        res.json(championData.get(champId));
    }).catch(next);
});

app.use((err, req, res, next) => {
    console.error(err); res.sendStatus(500);
});

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => res.send('Hello'));

app.listen(PORT, () => console.log('Server listening at: ', PORT));

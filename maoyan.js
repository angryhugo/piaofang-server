var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var port = 8686;

var request = require('request');
var cheerio = require('cheerio');

//http
var httpServer = http.createServer(app);
httpServer.listen(port);

console.log('Server is running on http://localhost:' + port);


//抓取猫眼票房数据
app.get('/maoyan/promovie', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    var httpload = https.get('https://box.maoyan.com/promovie/api/box/second.json', function(minres) {
        res.header("Access-Control-Allow-Origin", "*");

        if (minres.statusCode == 200) {
            var thisData = '';
            minres.on('data', function(data) {
                thisData += data;
            }).on('end', function() {
                res.json(JSON.parse(thisData));

            });
        } else {
            res.send('请求失败');
        };

    });
});

//抓取猫眼热门电影数据
app.get('/maoyan/hotmovie', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    var httpload = http.get('http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=8', function(minres) {
        res.header("Access-Control-Allow-Origin", "*");

        if (minres.statusCode == 200) {
            var thisData = '';
            minres.on('data', function(data) {
                thisData += data;
            }).on('end', function() {
                res.json(hotMovieHandler(JSON.parse(thisData).data.movies));
            });
        } else {
            res.send('请求失败');
        };

    });
});

//抓取中国票房总票房数据
app.get('/cbo/zpf', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    var httpload = http.get('http://www.cbooo.cn/BoxOffice/getInland?pIndex=1', function(minres) {
        res.header("Access-Control-Allow-Origin", "*");

        if (minres.statusCode == 200) {
            var thisData = '';
            minres.on('data', function(data) {
                thisData += data;
            }).on('end', function() {
                res.json(zpfHandler(JSON.parse(thisData)));
            });
        } else {
            res.send('请求失败');
        };

    });
});

//抓取猫眼总票房数据
app.get('/maoyan/pf', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    var options = {
        url: 'http://piaofang.maoyan.com/rankings/year',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
        }
    };

    request(options, function(error, resp, body) {
        if (!error && res.statusCode == 200) {
            var $ = cheerio.load(body, {
                decodeEntities: false
            });
            var $rowList = $('#ranks-list .row');
            var pfArr = [];
            var fontString = $("#js-nuwa").html();
            for (var i = 0; i < 10; i++) {
                var obj = {};
                var $ele = $($rowList[i]);
                obj.name = $ele.find(".first-line").html();
                obj.pf = $ele.find(".col2 .cs").html();
                pfArr.push(obj);
            }
            var result = {
            	fontString: fontString,
            	data: pfArr
            }
            res.json(result);
        }
    });

});

function hotMovieHandler(data) {
    var movieArr = [];
    for (var movie of data) {
        var ver = "";
        if (movie["3d"]) {
            ver += "3D";
        }
        if (movie.imax) {
            ver += "IMAX";
        }
        movieArr.push({
            id: movie.id,
            name: movie.nm,
            img: movie.img,
            score: movie.sc,
            // 简介
            scm: movie.scm,
            // 上映时间
            rt: movie.rt,
            director: movie.dir,
            star: movie.star,
            category: movie.cat,
            ver: ver
        });
    }
    return movieArr;
}

function zpfHandler(data) {
    var movieArr = [];
    for (var i=0;i<10;i++) {
    	var movie = data[i];
        movieArr.push({
            name: movie.MovieName,
            pf: movie.BoxOffice
        });
    }
    return movieArr;
}
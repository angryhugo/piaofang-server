var request = require('request');
var cheerio = require('cheerio');

var options = {
    url: 'http://piaofang.maoyan.com/rankings/year',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }
};

request(options, function(error, res, body) {
    console.log(res.statusCode)
    if (!error && res.statusCode == 200) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });
        var $rowList = $('#ranks-list .row');
        var pfArr = [];
        var fontString = $("#js-nuwa").html();
        for(var i=0;i<10;i++){
            var obj = {};
            var $ele = $($rowList[i]);
            obj.name = $ele.find(".first-line").html();
            obj.pf = $ele.find(".col2 .cs").html();
            pfArr.push(obj);
        }
        console.log(pfArr);
    }
});
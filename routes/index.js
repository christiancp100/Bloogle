var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();
var SolrNode = require('solr-node');

var client = new SolrNode({
  host: '127.0.0.1',
  port: '8983',
  core: 'bloogle',
  protocol: 'http'
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Bloogle | Search'});
});

router.post('/search', (req, res, next) => {
  let query = req.body.search.toLowerCase();
  query = query.split(" ");
  console.log(query);
  var caseLess = "";
  query.forEach((q,i) => {
    caseLess = caseLess.concat("(*" + q.toLowerCase() + "*+OR+");
    caseLess = caseLess.concat("*" + q.toUpperCase() + "*+OR+");
    caseLess = caseLess.concat("*" + q.charAt(0).toUpperCase() + q.slice(1) + "*)");
    if(i!=(query.length-1)){
      caseLess = caseLess.concat("+AND+title%3A");
    }
  });
  let strQuery = "q=(((url:*.html+OR+*.com)+AND+title%3A" + caseLess + ")+OR+content%3A" + caseLess + ")+&wt=json&indent=true";
  let resultSet = [];
  client.search(strQuery, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    result.response.docs.forEach(doc => {
      resultSet.push(
        {
          title: doc.title[0],
          content: doc.content[0].substring(0, 200),
          url: "/" + doc.digest
        }
      );
    });
    res.render('results', {results: resultSet});
  });
});

router.get('/:digest', (req, res, next) => {
  console.log("hola amigos");
  let digest = req.params.digest.toString();

  var strQuery = "q=digest%3A\"" +  digest +"\"&wt=json";
  let resultSet = [];
  client.search(strQuery, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    result.response.docs.forEach(doc => {
      resultSet.push(
        {
          title: doc.title[0],
          content: doc.content[0],
          url: doc.url[0]
        }
      );
    });
    console.log(resultSet[0]);
    res.render('single_result', {result: resultSet[0]});
  });

});


module.exports = router;

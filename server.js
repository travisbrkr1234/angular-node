const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var recipes = {"Cookies":{"ingredient":"Sugar","amount":"1/3 lb"},
               "Pizza":{"ingredient":"Dough", "amount":"1 lb"},
               "Lasagna":{"ingredient":"Noodles", "amount":".5 lb"}
   };
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader("Access-Control-Allow-Origin", "*"); //Allow CORS
  res.end(JSON.stringify(recipes));
  console.log("resource requested");
  console.log(recipes);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

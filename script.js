let http = require("http");
let url = require("url");
let static = require("node-static");
let fileServer = new static.Server(".");

const host = 'localhost';
const port = 8000;

function onConvertToRoman(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache",
  });

    // The main and edges of roman literals
    var roman = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    var parts = url.parse(req.url, true);
    num = parts.query.num;
    // to store the final output
    var outputString = '';
    // Getting object values and keys
    for (let i of Object.keys(roman)) {
        //check num divisible by roman key value
        var divideByValue = Math.floor(num / roman[i]);
        // remove the q value from given numer
        num -= divideByValue * roman[i];
        // check unti the value of q is not equal to zero
        if(divideByValue !== 0 ){
            outputString += i.repeat(divideByValue);
        }
    }

    res.write("data: " + outputString + "\n\n")
}

const requestListener = function (req, res) {
    var parts = url.parse(req.url, true);
    console.log(parts.pathname);
    if (parts.pathname == "/convert_to_roman") {
        onConvertToRoman(req, res);
        return;
    }
    fileServer.serve(req, res);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

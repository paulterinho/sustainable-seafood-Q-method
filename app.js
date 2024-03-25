const express = require('express');
const path = require('path');
const fs = require('fs');
const papa = require("papaparse");
const app = express();
const port = 9002;
const password = 'fishAreC00L!'

function saveToFile(filename, newData) {
  fs.readFile(`${filename}.json`, 'utf8', (err, dataString) => {
    if (err) {
      console.log(`Could not find ${filename}. Creating an empty file.`);
      var data = [];
    } else {
      console.log("Opened the file")
      var data = JSON.parse(dataString);
    }

    data.push(newData);

    write(`${filename}.json`, JSON.stringify(data));
    write(`${filename}.csv`, papa.unparse(data));
  });
}

function write(filename, data) {
  fs.writeFile(filename, data, function(err) {
      if(err) {
          console.log(err);
      }
      console.log(`Writing ${filename}`);
  });
}

app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/save/Sheet1', (req, res) => {
    let data = req.body[0];
    let fixed_data = {};

    Object.keys(data).forEach(element => {
      let [key, value] = data[element].split(': ');
      fixed_data[key] = value;
    });

    if (fixed_data.sort != 'no_data') {
      let statementRankings = fixed_data.sort.split('|');

      statementRankings.forEach((element, i) => {
        fixed_data[`s${i}`] = element;
      });
    }


    saveToFile('data', fixed_data);

    res.send({});
})

app.get('/download/:format', (req, res) => {

  if (req.query.password && req.query.password == password) {
    res.download(path.join(__dirname, `/data.${req.params.format}`));
  }
  else {
    res.send('Password missing or incorrect.')
  }
})

app.listen(port, () => {
  console.log(`Starting the server on port ${port}`);
})


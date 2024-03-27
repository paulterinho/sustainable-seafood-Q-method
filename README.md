
# Q method survey on sustainable seafood (Swedish and Japanese)
This project sets up a website to host a Q method survey. The survey investigates the question "What are the important issues in achieving sustainable seafood?" by asking participants to rank 40 statements on the topic of "sustainable seafood" from 0 to 10 (most disagree to most agree). The statements and survey instructions are available in Swedish and Japanese.

The original code was adapted from [shawnbanasick](https://github.com/shawnbanasick)'s [EQ-websort code](https://github.com/shawnbanasick/eq-web-sort). The main adaptation was to export the results into a CSV file on the server.

# Installation instructions

The application is mostly made of static files, a small Node server was added to save the survey answers in a CSV file.

To install the dependencies, run
```bash
npm i
```

To start the server, run
```bash
node app.js
```

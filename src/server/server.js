import express from 'express';
import App from '../App.js';
import Inferno from 'inferno';
import InfernoServer from 'inferno-server';

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {

    const app = InfernoServer.renderToString(<App />);

    res.send(`
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="bundle.css" />
                <link href="https://fonts.googleapis.com/css?family=Roboto|Source+Sans+Pro:300,400" rel="stylesheet">
            </head>
            <body>
                <div id="content">
                    ${app}
                </div>
                <script src="client.js"></script>
            </body>
        </html>
    `);
});

app.listen(3123);
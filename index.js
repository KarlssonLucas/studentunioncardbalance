import express from "express";
import fetch from "node-fetch";
const app = express();
const port = process.env.PORT || '5000'

app.use(express.json());
app.use(express.urlencoded({ extended: false}));



app.get('/', async function (req, res) {

    var bal = 'error';

    if (req.headers.user && req.headers.password) {
        const credentials = {
            Username: req.headers.user,
            Password: req.headers.password
        }

        await fetch('https://portal.microdeb.se:44396/api/v1/login/194699f3-1f9e-47a4-8052-df26df0bc114/mps', {
            body: JSON.stringify(credentials),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
    })
            .then(response => response.json())
                .then(data => {
                    if (!data[0]?.error) {
                        const temp = JSON.stringify(data?.information.balance);
                        bal = [temp.slice(0, temp.length-2), '.', temp.slice(temp.length-2)].join('');
                    }
                });         
    }    

    res.send({balance: bal})

  })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
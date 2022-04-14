import express from "express";
import fetch from "node-fetch";
const app = express();
const port = process.env.PORT || '5000'

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
    if (!req.headers.user || !req.headers.password) {
        res.send("Missing Header");
    } else { 

        const credentials = {
            Username: req.headers.user,
            Password: req.headers.password
        }

        fetch('http://portal.microdeb.se:44396/api/v1/login/194699f3-1f9e-47a4-8052-df26df0bc114/mps', {
            body: JSON.stringify(credentials),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }

    })
            .then(response => response.json())
                .then(data => {
                    if (data[0]?.error) {
                        res.send("Wrong Credentials")
                    } else {
                        const bal = JSON.stringify(data?.information.balance);
                        res.send({bal: [bal.slice(0, bal.length-2), '.', bal.slice(bal.length-2)].join('')})
                    }
                });         
    }    
  })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
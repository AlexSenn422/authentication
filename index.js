const express = require('express')
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const mongoose = require('mongoose');
const port = parseInt(process.env.PORT, 10) || 8000;
const dbconfig = require('./database/dbconfig');
const User = require('./database/User');

//mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.DB, {useNewUrlParser: true, useCreateIndex: true}).then(
    () => {console.log(`Database is connected - ${dbconfig.DB}`)},
    err => {console.log(`Can't connect to the database - ${err}`)}
);

app.use(bodyParser.json());

//gmail configuration
let mailTransporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'james.jin.0422@gmail.com',
        pass: 'Good!123'
    }
}));
 
//login
app.post('/api/login', async (req, res) => {
    let {email, password} = req.body;
    User.find({email: email}).then((doc) => {
        if(doc.length == 0) {
            res.status(400).send("No exist!")
        } else {
            let comp = bcrypt.compareSync(password, doc[0].password);
            if(comp) {
                res.status(200).send("Success Login")
            } else {
                res.status(400).send("Password Incorrect!")
            }
        }
    }).catch(err => res.status(400).send(err))
});

//register
app.post('/api/register', async (req, res) => {
    let data = req.body;
    let duplicate = {
        status: false,
        data: []
    }
    for(let i=0; i < data.length; i++) {
        await User.find({email: data[i].email}).then((doc) => {
            if(doc.length == 0) {
                data[i].password = bcrypt.hashSync(data[i].password, 10)
                delete data[i].repassword;
            } else {
                duplicate.status = true;
                duplicate.data.push(data[i]);
            }
        }).catch(err => res.status(400).send(err))
        
    }
    if(duplicate.status) {
        res.status(400).send(duplicate)
    } else {
         User.insertMany(data).then(function(){
            for(let i=0; i < data.length; i++) {
                let item = data[i];
                let mailDetails = {
                    from: 'james.jin.0422@gmail.com',
                    to: item.email,
                    subject: 'Test Registeration',
                    text: `Hi ${item.name}. This is test registeration email.`
                };
                  
                mailTransporter.sendMail(mailDetails, function(err, data) {
                    console.log(err, data)
                    if(err) {
                        console.log('Error Occurs');
                    } else {
                        console.log('Email sent successfully');
                    }
                });
            }
            res.status(200).send("Success Saved!");
        }).catch(function(error){
            res.status(400).send(error);
        });
    }  
});

const server = http.createServer(app);

//socket start
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  socket.emit("FromAPI", response);
};
//socket end

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
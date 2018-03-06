const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
      if (err) {
        console.log('Enable to write on the file');
      }
    })
    next();
});
// app.use((req, res) =>{
//   res.render('maintenance.hbs');
// });
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
});
app.get('/',(req, res) => {
  res.render('home.hbs',{
    'title': 'home page',
    'message': 'welcome to home page'
  });
});
app.get('/project',(req, res) => {
    res.render('project.hbs',{
      'main_message': 'this my porfolio'
    });
});
app.get('/about', (req,res) =>{
  res.render('about.hbs',{
    'about_title': 'about page'
  });
});
app.get('/bad', (req,res) => {
  res.send({
    erroMessage: 'error occured'
  });
});
app.listen(port, ()=>{
  console.log(`server is up running on port ${port}...`);
});

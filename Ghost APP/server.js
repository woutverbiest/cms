const express = require('express')
const GhostAdminAPI = require('@tryghost/admin-api');
const GhostContentAPI = require('@tryghost/content-api');
const session = require('express-session')
const app = express()
const port = 3000

var sess = {
    secret: 'this is some very secret password that should never leak otherwise bad things will happen!',
    cookie: {}
  }
  
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')


function getuser(token){
    try{
        const api = new GhostAdminAPI({
            url: 'http://localhost:2368',
            key: token,
            version: "v3"
        });

        return api
    } catch (e) {
        return null
    }
}

async function getPosts(){
    const api = new GhostContentAPI({
        url: 'http://localhost:2368',
        key: 'd51c7969e2c0c36db160db60ad',
        version: "v3"
      });

    return await api.posts.browse({include: 'tags'});
}

app.get('/', (req, res) => {

    getPosts().then(posts => {

        console.log(posts);
        res.render('home', {
            posts: posts,
            admin: getuser(req.session.key),
          });
    });
});

app.get('/login', (req,res)=>{
    res.render('login');
});

app.post('/login', (req,res)=>{
    
    req.session.key = req.body.key;

    if(getuser(req.session.key)){
        res.redirect('/')
    } else {
        res.render('login', {
            error: 'key is not valid',
        });
    }
});

app.get('/logout', (req,res)=>{
    req.session.key = '';
    res.redirect('/');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
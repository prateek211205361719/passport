

const  { Todo } = require("../models/todo");
module.exports = (app) => {
    app.get('/', (req, res) => {
        if (req.isAuthenticated()){
            res.redirect('/home');
        }else{
            res.render('login.hbs',{
                isLogin:false
            });
        }
    });
   
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
   
    app.get('/home', isLoggedIn , async (req, res) => {
         var todoList = await Todo.find({userId:req.user._id});
         if(todoList){
            res.render('home.hbs',{
                isLogin: req.isAuthenticated(),
                data:todoList
             });
         }
        
    });

    app.get('/api/todo/delete/:id', isLoggedIn, async (req, res) => {
       var todo = await Todo.findByIdAndRemove(req.params.id);
       if(todo){
            res.redirect('/home');
       }
       
    });
    app.get('/api/todo/new', isLoggedIn, async (req, res) => {
        res.render('new_todo.hbs', {
            isLogin: req.isAuthenticated(),
        });
    });

    app.post('/api/todo/create', isLoggedIn, async (req, res) => {
        console.log(req.user._id);
        req.body.completed = req.body.completed === 'on' ? true : false;
        req.body.userId = req.user._id;
        var todo =  new Todo(req.body);
        var result = await todo.save();
       if(result){
            res.redirect('/home');
        }
        
    });
}

// route middleware to make sure
function isLoggedIn(req, res, next){
    if (req.isAuthenticated())
        return next();
     res.redirect('/');
 }

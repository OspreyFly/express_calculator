const express = require('express');
const ExpressError = require('./expressError');
const math = require('mathjs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function unpack(req){
    const nums = req.query.nums;
    const numsList = nums.split(',').map(Number);
    return numsList;
}

app.get('/', (req, res) => {
  return res.send("<h1>Math Routes: /mean, /median, /mode</h1><h1>Define values as route query: /mean?nums=1,3,5,7</h1>");
});

app.get('/mean', (req, res) => {
    try{
        if (!req.query.nums) throw new ExpressError("No values passed", 404);
        const answer = math.mean(unpack(req));
        return res.json({operation: "mean", value: answer});
    }
    catch(e){
        return next(e);
    }
    
});

app.get('/median', (req, res) => {
    try{
        if (!req.query.nums) throw new ExpressError("No values passed", 404);
        const answer = math.median(unpack(req));
        return res.json({operation: "median", value: answer});
    }catch(e){
        return next(e);
    }
    
});

app.get('/mode', (req, res) => {
    try{
        if (!req.query.nums) throw new ExpressError("No values passed", 404);
        const answer = math.mode(unpack(req));
        return res.json({operation: "mode", value: answer});
    }catch(e){
        return next(e);
    }
    
});

app.get('/all', (req, res) => {
    try{
        const mean = math.mean(unpack(req));
        const median = math.mean(unpack(req));
        const mode = math.mode(unpack(req));
        return res.json({operation: "all", mean: mean, median: median, mode: mode});
    }catch(e){
        return next(e);
    }
    
})

app.use(function(err, req, res, next){
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError);
});

app.use(function(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;
    return res.status(status).json({
        error: {message, status}
    });
});

app.listen(3000, function(){
    console.log('Server Started on port:3000');
});

module.exports = { unpack };
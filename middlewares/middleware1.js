module.exports = (req, res, next) => {
    if(req.body.username === "Homer"){
        res.status(500).send("Sorry, no Homers")
    }else{
        next();
    }
};
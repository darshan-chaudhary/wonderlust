
    module.exports.savedRedirectUrl=(req,res,next)=>{
        if(req.session.redirectUrl){
            res.locals.redirectUrl=req.session.redirectUrl;
        }
        next();
    }
module.exports.isLogedIn=(req,res,next)=>{
     if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","please log in first");
        return res.redirect("/login");
     }
     next();
}

     //TODO : console.log(req.user); //this  print the user ingo if user is logedin then it return the user obj and if not then it return undefine so we can use this as condition in our project code  
     //console.log(req.path ," ", req.originalUrl)
    // **console.log(req); // req object me client se aayi request ki saari information hoti hai (dhangee de padhna bhale isko uncomment karke   check karna pura data hold karti hai ye)



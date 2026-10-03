module.exports.isLogedIn=(req,res,next)=>{
     console.log(req.user); //this  print the user ingo if user is logedin then it return the user obj and if not then it return undefine so we can use this as condition in our project code 
     if(!req.isAuthenticated()){
        req.flash("error","please log in first");
       return res.redirect("/login");
     }
     next();
}
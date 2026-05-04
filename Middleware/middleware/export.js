function checkLogin(req,res,next){

    let isLogin = true;

    if(isLogin){
        console.log("page is login");
        next();
    }else{
        res.send("please login first after use");
    }

}

export default  checkLogin ;
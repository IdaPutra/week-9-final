
const employee= require("./employee");

class manager extends employee{
constructor(name,id,email,office){
super(name,id,email);
this.office=office;
}
getoffice(){
 return this.office;  
 
}

getrole(){
    return "manager";
}
}

module.exports=manager;
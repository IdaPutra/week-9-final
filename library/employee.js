const inquirer = require("inquirer");


class employee{
    constructor(name,id,email){
        this.name=name;
        this.id=id;
        this.email=email;
    }

    getName(){
         return this.name;
        
    }
  getID(){
    return this.id;
  }  
  getEmail(){
    return this.email;
  }
  getrole(){
    return "employee"; 
      
  }

}

   
   module.exports=employee;      
    


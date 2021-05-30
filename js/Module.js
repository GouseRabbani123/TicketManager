 const productdb = (dbName,table) =>{
     //create a database
     const db = new Dexie(dbName);
     db.version(1).stores(table);
     db.open();
      return db;
 }

 //Create
 const addticket=(dbtable,data)=>{
     //check box validation
     let flag = empty(data);
     if(flag){ 
     dbtable.bulkAdd([data]);
     console.log("Data Inserted ");
     }
     else{
         console.log("Please enter valuues");
     }
     return ;
 }


 const empty = object =>{
     let flag = false;
     for (const value in object){
         if(object[value] !="" &&  object.hasOwnProperty(value)){
             flag = true;
         }
         else{
             flag = false;
         }
     }return flag;
 }


// get dataa from the data base
// a higher order function is a function which has the function as a argument..


//shows the number of  rows presented inside the data.
//this geets the dataa from the data base
//passing the function as argument inside the another function
const gettheData = (dbtable,funct)=>{
    
    let index = 0;
    let obj =  {};
    dbtable.count((count)=>{
       //by this function we can get the data in the form of object
        if(count){
            dbtable.each(table=>{
                
               obj = sortobj(table);
              funct(obj,index++);

            })
        }else{
            funct(0);
        }
        
    })
}
//sort object
const Sortobj = sortobj =>{
    let obj ={};
    obj = {
        TicketId:sortobj.TicketId,
        Title:sortobj.Title,
        Description : sortobj.Description,
       Category:sortobj.Category,
       priority:sortobj.Priority,
       DueDate:sortobj.DueDate,
       Status:sortobj.Status

    }
    return obj;
}
//ctaret dynamic element
//as here the function returning the function as a perameter so  it is a higher order function.
const createEle = (tagname,appendTo,fn) =>{
 const element = document.createElement(tagname);
 if(appendTo) appendTo.appendChild(element);
 if(fn)fn(element);
}

 export default productdb;
 export{
    addticket,
   gettheData,
   createEle
 }
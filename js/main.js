import productdb, { addticket,
   getData, 
   createEle } from "./module.js";

let db = productdb("TicketDB", {
  TicketMaster: `++TicketId,Title,Description,Category,Priority,DueDate,Status`,
});

const title = document.getElementById("exampleFormControlInput1");
const descrip = document.getElementById("exampleFormControlInput2");
const category = document.getElementById("exampleFormControlSelect3");
const priorityhigh = document.getElementById("prihigh");
const prioritymedium = document.getElementById("primedium");
const prioritylow = document.getElementById("prilow");

const duedate = document.getElementById("exampleFormControlInput5");
const Status = "Not yet Started";

const notstartcount = document.getElementById("notstartedcount");
const inpcount = document.getElementById("inprogresscount");
const rescount = document.getElementById("resolvedcount");
const closecount = document.getElementById("closedcount");

const uID = document.getElementById("TicketID");
const utitle = document.getElementById("updatetitle");
const udescrip = document.getElementById("updatedescription");
const ucategory = document.getElementById("updatecategory");
//const upriority = document.getElementById("updatepriority");
const uduedate = document.getElementById("updateduedate");
const uhigh = document.getElementById("updatehigh");
const umedium = document.getElementById("updatemedium");
const ulow = document.getElementById("updatelow");

const btncreate = document.getElementById("btn-create");
const btnupdate = document.getElementById("btn-update");




btncreate.onclick = (event) => {
  if (title.value != "" && descrip.value != "") {
    let flag = false;
    let prio = "High";
    if (priorityhigh.checked) {
      prio = priorityhigh.value;
      console.log(prio);
    } else if (prioritylow.checked == true) {
      prio = prioritylow.value;
    } else {
      prio = prioritymedium.value;
    }
    console.log(prio);
    addticket(db.TicketMaster, {
      Title: title.value,
      Description: descrip.value,
      Category: category.value,
      Priority: prio,
      DueDate: duedate.value,
      Status: Status,
    });
  } else {
    console.log("Please enter the values!");
  }
};

//Read

// const data1 = await db.TicketMaster.where('Status').anyOf('Not yet Started','Resolved','Inprogress').toArray();;
// console.log(data1);
let actiondict = {
  "Not yet Started": "Start",
  Inprogress: "Resolve",
  Resolved: "Close",
  Closed: "Closed",
};
//const data="";

window.onload = table;

function table() {
  
  const tbody = document.getElementById("tbody");
  
  let c1 = 0;
  let c2 = 0;
  let c3 = 0;
  let c4 = 0;
 
  //let mytable = $("#table2").DataTable();
  
  console.log("HHelloinndbn");
  getData(db.TicketMaster, (data) => {   
    if (data) {
      console.log(data);
       createEle("tr", tbody, (tr) => {
        for (const value in data) {
          if (value == "Title") {
            var btnedit = document.createElement("input");
            btnedit.type = "button";
            btnedit.className = "btn";
            btnedit.value = data[value];
            btnedit.setAttribute(`data-TicketId`, data.TicketId);
            btnedit.setAttribute(`data-toggle`, "modal");
            btnedit.setAttribute(`data-target`, "#update");
            btnedit.onclick = editbtn;
            createEle("td", tr, (td) => {
              td.appendChild(btnedit);
            });
          } else if (value == "Status") {
            createEle("td", tr, (td) => {
              td.textContent = data[value];
            });
            var btn = document.createElement("input");
            btn.type = "button";
            btn.className = "btn, btn-success";
            btn.setAttribute(`data-TicketId`, data.TicketId);
            btn.setAttribute(`data-status`, data.Status);
            btn.value = actiondict[data[value]];
            btn.setAttribute(`style`, "width:65px");
            btn.onclick = changestatus;
            createEle("td", tr, (td) => {
              td.appendChild(btn);
            });
            if (data[value] == "Resolved") {
              c3 = c3 + 1;
            } else if (data[value] == "Inprogress") {
              c2 = c2 + 1;
            } else if (data[value] == "Not yet Started") {
              c1 = c1 + 1;
            } else {
              c4 = c4 + 1;
              tr.setAttribute(`style`, "display:none");
            }
          } else {
            createEle("td", tr, (td) => {
              td.textContent = data[value];
            });
          }
        }
      });
    }
    notstartcount.innerText = c1;
    inpcount.innerText = c2;
    rescount.innerText = c3;
    closecount.innerText = c4;
})
}

function changestatus(event) {
  let status = event.target.dataset.status;
  let id = parseInt(event.target.dataset.ticketid);
  if (id) {
    if (status == "Not yet Started") {
      status = "Inprogress";
    } else if (status == "Inprogress") {
      status = "Resolved";
    } else {
      status = "Closed";
    }
    db.TicketMaster.update(id, {
      Status: status,
    });
    location.reload();
  }
}

function editbtn(event) {
  console.log(event.target.dataset.ticketid);
  let id = parseInt(event.target.dataset.ticketid);
  db.TicketMaster.get(id, (data) => {
    (uID.value = data.TicketId),
      (utitle.value = data.Title),
      (udescrip.value = data.Description),
      (ucategory.value = data.Category),
      (uduedate.value = data.DueDate);
  });
}

btnupdate.onclick = () => {
  const id = parseInt(uID.value);
  let prio = "High";
  if (id) {
    if (uhigh.checked) {
      prio = uhigh.value;
    } else if (ulow.checked == true) {
      prio = ulow.value;
    } else {
      prio = umedium.value;
    }
    db.TicketMaster.update(id, {
      Title: utitle.value,
      Description: udescrip.value,
      Category: ucategory.value,
      Priority: prio,
      DueDate: uduedate.value,
    }).promise.then((updated) => {
      let get = updated ? `data Updated` : `Count Updated Data`;
      console.log(get);
    });
  }
}


const signUpForm = document.querySelector('#sign-up-form');
const signUpTag = document.querySelector('#sign-up-tag');
const signUpName = document.querySelector('#sign-up-name');
const signUpGender = document.querySelector('#sign-up-gender');
const errorMsg = document.querySelector('#error');


function getAllUsers() {
    fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
       
    })
    .then(res => res.json())
    .then(response => { 
        tablebuild(response);
    });
}


signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    const signUpDetails = {
        tag: signUpTag.value,
        name: signUpName.value,
        gender: signUpGender.value,
    };

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpDetails)
    })
    .then(res => res.json())
    .then(response => { 
        if(response.error) {
            errorMsg.innerHTML = response.error;
        } else {
            console.log(response);
            errorMsg.innerHTML = '';
           getAllUsers();
        }
    });
});

fetch('/api/users', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
   
})
.then(res => res.json())
.then(response => { 
    tablebuild(response);
});



function GFG_FUN() {
fetch('/api/users', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
 
})
.then(res => res.json())
.then(response => { 
    tablebuild(response);

});
}



function tablebuild(list){
    var cols = [];
     
    for (var i = 0; i < list.length; i++) {
        for (var k in list[i]) {
            if (cols.indexOf(k) === -1) {
                 
                // Push all keys to the array
                if(k == "name" || k == "tag" || k == "gender"){
                    cols.push(k);
                    
                }
                
            }
        }
    }
     
    // Create a table element
    var table = document.createElement("table");
    
    // Create table row tr element of a table
    var tr = table.insertRow(-1);
    
    for (var i = 0; i < cols.length; i++) {
         
        // Create the table header th element
        var theader = document.createElement("th");

        theader.innerHTML = cols[i];
         
        // Append columnName to the table row
        tr.appendChild(theader);
    }
     
    // Adding the data to the table
    for (var i = 0; i < list.length; i++) {
        
         
        // Create a new row
        trow = table.insertRow(-1);
        for (var j = 0; j < cols.length; j++) {
            var cell = trow.insertCell(-1);
 
            // Inserting the cell at particular place
            cell.innerHTML = list[i][cols[j]];

        } 

        //console.log(list[0].tag);
        const tag = list[i].tag;
        const name = list[i].name;
        const gender = list[i].gender;

        
        
        //Button
        var cell = trow.insertCell(-1);
        const EditTag = trow.cells[0]
        const EditName = trow.cells[1]
        const EditGender = trow.cells[2]

        
        var edit = document.createElement("BUTTON");
        var t = document.createTextNode("Edit");

        edit.appendChild(t);

        edit.addEventListener("click", function() {
            editprofile(EditTag, EditName, EditGender);
        });

        cell.appendChild(edit);




        var del = document.createElement("BUTTON");
        var b = document.createTextNode("Delete");
        del.appendChild(b);

        del.addEventListener("click", function() {
            remove(tag);
        });

        cell.appendChild(del);

        var showinfo = document.createElement("BUTTON");
        var show = document.createTextNode("Show info");
        showinfo.appendChild(show);



        showinfo.addEventListener("click", function() {
            showinformation(tag)
        });

        cell.appendChild(showinfo);


    }            


     
    // Add the newly created table containing json data
    var el = document.getElementById("table");
    
    el.innerHTML = "";
    el.appendChild(table);
    
}  


function remove(tag){

    fetch(`/api/users/${tag}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
       
    })
    .then(response => {

        getAllUsers()
          
        
    });
     
    
}


function showinformation(tag){

    fetch(`/api/users/${tag}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
       
    })
    .then(res => res.json())
    .then(response => { 
        document.getElementById("Decoded").innerHTML =  JSON.stringify(response);
    });
    
}

function editprofile(tag, name, gender){

    const obj = {
        tag: tag.innerHTML,
        name: name.innerHTML,
        gender: gender.innerHTML
        
    }


    fetch(`/api/users/${tag.innerHTML}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
       
    })

    .then(response => { 
        
        
    });
    
}







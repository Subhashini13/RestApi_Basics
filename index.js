const express = require("express");
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
PORT=8000;

//Routes

app.get("/users", (req, res)=>{
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    
    `
    res.send(html);
})

// /api/users 
app.get("/api/users", (req, res)=>{
    return res.json(users);
})
app
    .route("/api/users/:id")
    .get("/api/users/:id", (req, res)=>{
        const id =Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    //post
    .post((req, res) =>{
        const body  = req.body;
        users.push({id: users.length + 1, ...body});
        fs.writeFile(body);
        return res.json({ status : "sucess", id : users.length});
    })
//edit
    .patch((req, res) =>{
        return res.json({status :"Pending"});
    })
//delete
    .delete((req, res) =>{
        return res.json({status :"Pending"});
    })

// app.post("/api/users/:id", (req, res) =>{
//     return res .json({ status : "pending"});
// })




app.listen(PORT, ()=>console.log(`Server is started at PORT : ${PORT}`));

const express = require('express')
const app = express()
const port = 3000
// cors for solving cors policy
const cors = require('cors')
// use cors
app.use(cors())
app.get('/', (req, res) => {
    res.send("Frist express app")
})
const students = [
    {
        id:1,name:'Sahadat',profesion:"student",age:22
    },
    {
        id:2,name:'Alamin',profesion:"student",age:14
    },
    {
        id:3,name:'Jubayer',profesion:"student",age:7
    },
    {
        id:4,name:'Junayed',profesion:"student",age:1
    },
    {
        id:5,name:'Hafsa',profesion:"student",age:6
    },
    {
        id:6,name:'Anas',profesion:"student",age:10
    },
]
    
app.get('/user', (req, res) => {
    res.send(students)
})
app.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const nothingFound={"found":"nothing have found"}
    const searchStudentId =
      students.find((singleStudent) => singleStudent.id === id) ||
      {nothingFound};
    res.send(searchStudentId)
    console.log(req)
})
// app.get("/user/:id", (req, res) => {
//   const id = parseInt(req.params.id); // Convert id to a number
//   const student = students.find((s) => s.id === id); // Find the student by id
//   if (student) {
//     res.send(student);
//   } else {
//     res.status(404).send({ error: "Student not found" });
//   }
// });

app.listen(port,()=>console.log('app listening on port',port))
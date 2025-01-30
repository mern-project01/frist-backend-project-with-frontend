const express = require('express')
const app = express()
const port = 3000
// cors for solving cors policy
const cors = require('cors')
// midilewar
// use cors
app.use(cors())
// use this midilwar for solve req.body undifine
app.use(express.json())
app.get('/', (req, res) => {
    res.send("Frist express app")
})
const students = [
  {
    id: 1,
    name: "Sahadat",
    profesion: "student",
    age: 22,
    email: "sahadat@gmail.com",
  },
  {
    id: 2,
    name: "Alamin",
    profesion: "student",
    age: 14,
    email: "alamin@gmail.com",
  },
  {
    id: 3,
    name: "Jubayer",
    profesion: "student",
    age: 7,
    email: "jubayer@gmail.com",
  },
  {
    id: 4,
    name: "Junayed",
    profesion: "student",
    age: 1,
    email: "junayed@gmail.com",
  },{
  id: 5,
  name: "Hafsa",
  profesion: "student",
  age: 6,
  email:"hafsa@gmail.com",
  },
  {
    id: 6,
    name: "Anas",
    profesion: "student",
    age: 10,email:"anas@gmail.com"
  },
];
    
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
})

app.post("/user", (req, res) => {
    const getuser = req.body;
    getuser.id = students.length + 1;
    const getuserEmail = students.some((user) => user.email === getuser.email)
    // if (getuserEmail) {
    //     const message='already have an acount'
     
    //   return console.log(message) 
    //   //how can i send the message in frontend
    // } else {
    //   students.push(getuser)
    //   console.log(getuser);
      
    //   console.log('done')
    // }
    if (getuserEmail) {
      return res.status(400).json({ message: "Already have an account" }); // Send response
    } else {
      students.push(getuser);
      return res
        .status(201)
        .json({ message: "User added successfully", user: getuser }); // Send response
    }
});


app.listen(port,()=>console.log('app listening on port',port))
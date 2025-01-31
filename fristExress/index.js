const express = require("express");
const app = express();
const port = 3000;
// cors for solving cors policy
const cors = require("cors");
// midilewar
// use cors
app.use(cors());
// use this midilwar for solve req.body undifine
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Frist express app");
});
// const students = [
//   {
//     id: 1,
//     name: "Sahadat",
//     profesion: "student",
//     age: 22,
//     email: "sahadat@gmail.com",
//   },
//   {
//     id: 2,
//     name: "Alamin",
//     profesion: "student",
//     age: 14,
//     email: "alamin@gmail.com",
//   },
//   {
//     id: 3,
//     name: "Jubayer",
//     profesion: "student",
//     age: 7,
//     email: "jubayer@gmail.com",
//   },
//   {
//     id: 4,
//     name: "Junayed",
//     profesion: "student",
//     age: 1,
//     email: "junayed@gmail.com",
//   },{
//   id: 5,
//   name: "Hafsa",
//   profesion: "student",
//   age: 6,
//   email:"hafsa@gmail.com",
//   },
//   {
//     id: 6,
//     name: "Anas",
//     profesion: "student",
//     age: 10,email:"anas@gmail.com"
//   },
// ];

// app.get('/user', (req, res) => {
//     res.send(students)
// })
// app.get('/user/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const nothingFound={"found":"nothing have found"}
//     const searchStudentId =
//       students.find((singleStudent) => singleStudent.id === id) ||
//       {nothingFound};
//     res.send(searchStudentId)
// })

// app.post("/user", (req, res) => {
//     const getuser = req.body;
//     getuser.id = students.length + 1;
//     const getuserEmail = students.some((user) => user.email === getuser.email)
//     // if (getuserEmail) {
//     //     const message='already have an acount'

//     //   return console.log(message)
//     //   //how can i send the message in frontend
//     // } else {
//     //   students.push(getuser)
//     //   console.log(getuser);

//     //   console.log('done')
//     // }
//     if (getuserEmail) {
//       return res.status(400).json({ message: "Already have an account" }); // Send response
//     } else {
//       students.push(getuser);
//       return res
//         .status(201)
//         .json({ message: "User added successfully", user: getuser }); // Send response
//     }
// });
//from mongodb

const { MongoClient, ServerApiVersion, Collection } = require("mongodb");
const uri =
  "mongodb+srv://frist-database:3sqeaqBS46TKurGe@cluster0.3aawf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("connected");
    const database = client.db("Frist-Conlection");

    const userConlection = database.collection("users");
    // userConlection.insertMany(students);
    //for making local host
    app.get("/users", async (req, res) => {
      const cusors = userConlection.find({});
      const users = await cusors.toArray();
      //console.log(users);
      res.send(users);
    });

    //for post methode
    app.post("/users", async (req, res) => {
      const getuser = req.body;
      const pushUserInMongo = await userConlection.insertOne(getuser);
      // console.log(pushUserInMongo);

      const exists = userConlection.find(
        (user) => user.email === getuser.email
      );

      if (!exists) {
        res.send(pushUserInMongo);
        return res
          .status(201)
          .json({ message: "User added successfully", user: getuser }); // Send response
      } else {
        return res.status(400).json({ message: "Already have an account" }); // Send response
      }
       
      

      /*from chatgpt */
      //  const existingUser = await userConlection.findOne({
      //    email: getuser.email,
      //  });

      //  if (existingUser) {
      //    return res.status(400).json({ message: "Already have an account" });
      //  }

      //  // Insert the new user
      //  const pushUserInMongo = await userConlection.insertOne(getuser);

      //  return res.status(201).json({
      //    message: "User added successfully",
      //    user: { ...getuser, _id: pushUserInMongo.insertedId }, // Include the generated ID
      //  });
    });
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => console.log("app listening on port", port));

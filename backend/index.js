import e from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from 'cors';
import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";
const app = e();

app.use(e.json());
app.use(cors({
    origin: 'https://mern-todo-2025-1.onrender.com',
    credentials: false
}))

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://mern-todo-2025-1.onrender.com"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
app.use(cookieParser());

app.post("/login", async (req, resp) => {
    const userData = req.body;
    if (userData.email && userData.password) {
        const db = await connection();
        const collection = await db.collection('users');
        const result = await collection.findOne({ email: userData.email, password: userData.password });
        if (result) {
            jwt.sign(userData, 'Google', { expiresIn: '5d' }, (error, token) => {
                // resp.cookie('token', token, {
                //   httpOnly: true,
                //   secure: true,
                //   sameSite: "none",
                //   path: "/"
                // });
                resp.send({
                    success: true,
                    msg: 'login done',
                    token
                })

            })
        } else {
            resp.send({
                success: false,
                msg: 'User not found',
            })
        }

    } else {
        resp.send({
            success: false,
            msg: 'login not done',
        })
    }

})


app.post("/signup", async (req, resp) => {
    const userData = req.body;
    if (userData.email && userData.password) {
        const db = await connection();
        const collection = await db.collection('users');
        const result = await collection.insertOne(userData);
        if (result) {
            jwt.sign(userData, 'Google', { expiresIn: '5d' }, (error, token) => {
                //  resp.cookie('token', token, {
                //   httpOnly: true,
                //   secure: true,
                //   sameSite: "none",
                //   path: "/"
                // });
                resp.send({
                    success: true,
                    msg: 'signup done',
                    token
                })

            })
        }

    } else {
        resp.send({
            success: false,
            msg: 'signup not done',
        })
    }

})
app.post("/add-task",verifyJWTToken, async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    if (result) {
        resp.send({ message: 'new task added', success: true, result })
    } else {
        resp.send({ message: ' task not added', success: false })
    }

})

app.get("/tasks", verifyJWTToken, async (req, resp) => {
    const db = await connection();

    const collection = await db.collection(collectionName);
    const result = await collection.find().toArray();
    if (result) {
        resp.send({ message: 'task list fetched', success: true, result })
    } else {
        resp.send({ message: 'error try after sometime', success: false })
    }

})


app.get("/task/:id",verifyJWTToken, async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const id = req.params.id
    const result = await collection.findOne({ _id: new ObjectId(id) });
    if (result) {
        resp.send({ message: 'task  fetched', success: true, result })
    } else {
        resp.send({ message: 'error try after sometime', success: false })
    }

})


app.put("/update-task", verifyJWTToken,async (req, resp) => {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const { _id, ...fields } = req.body;
    const update = { $set: fields }
    const result = await collection.updateOne({ _id: new ObjectId(_id) }, update)
    if (result) {
        resp.send({ message: 'task data updated', success: true, result })
    } else {
        resp.send({ message: 'error try after sometime', success: false })
    }

})


app.delete("/delete/:id", verifyJWTToken,async (req, resp) => {
    const db = await connection();
    const id = req.params.id
    const collection = await db.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    if (result) {
        resp.send({ message: 'task deleted ', success: true, result })
    } else {
        resp.send({ message: 'error try after sometime', success: false })
    }

})

app.delete("/delete-multiple",verifyJWTToken, async (req, resp) => {
    const db = await connection();
    const Ids = req.body;
    const deleteTaskIds = Ids.map((item) => new ObjectId(item))
    console.log(Ids);

    const collection = await db.collection(collectionName);
    const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } })
    if (result) {
        resp.send({ message: 'task deleted ', success: result, })
    } else {
        resp.send({ message: 'error try after sometime', success: false })
    }

})


function verifyJWTToken(req, resp, next) {
     console.log("verifyJWTToken ", req.cookies['token']);
    // const token = req.cookies['token'];
   const header = req.headers['authorization'];
    if (!header) {
        return resp.send({ success: false, msg: "No token provided" });
    }
    const token = header.split(' ')[1];
  // const token = req.cookies.token;
  //   if (!token) {
  //       return resp.send({
  //           success: false,
  //           msg: "No token provided"
  //       });
  //   }

  
    jwt.verify(token, 'Google', (error, decoded) => {
        if(error){
            return resp.send({
                msg:"invalid token",
                success:false
            })
        }
         next()
    })
   
}

import path from "path";
const __dirname = path.resolve();
app.use(e.static(path.join(__dirname, "../frontend/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// app.listen(3200)
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});



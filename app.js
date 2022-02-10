let express = require("express");
const app = express();

///! server ko start kiya
app.listen( process.env || "3000", () => {
  console.log("server started");
});

app.use(express.json()); // a. express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json())

const userRouter = express.Router();
app.use("/user", userRouter);
userRouter
  .route("/")
  .get(sendUser)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(showById);

///! ab jab local:host 3000 chalega or uske piche / ya phir kuch nhi hoga , toh ye wali req chalegi
// app.get("/", (req, res) => {
//   /// req object me req se related sari deatils hoti hai , kidhar se aai , kya naam
//   console.log(req.hostname);
//   res.send("hi");
//   console.log(req.path);
// });

///! agar /home se req aayi toh /home par hi jayegi
///!  or usme hume obj bhejna
let obj = {};
// app.get("/user", sendUser);

function sendUser(req, res) {
  res.send(obj);
  //! res.send(obj)   both upper and lower are correct
}

//! how to send a file as response

// app.get("/showfile", (req, res) => {
//   res.sendFile("./views/index.html", { root: __dirname });
// });

////! POST REQUEST

// app.post("/user", createUser);

function createUser(req, res) {
  obj = req.body;
  console.log(obj);
  res.send("data added ");
}

//! KUCH OBJECT ME UPDATE KARNA HO OR PURA DATA HI REPLACE NA HO JAYE NYE WALE SE

// app.patch("/user", updateUser);

function updateUser(req, res) {
  let temp = req.body;
  for (key in temp) {
    obj[key] = temp[key];
  }
  res.send(obj);
}

//! DELETE METHOD

// app.delete("/user", deleteUser);

function deleteUser(req, res) {
  obj = {};
  res.send(obj);
}

//! PARAMS _____

// app.get("/user/:id", showById);

function showById(req, res) {
  let par = req.params;
  res.send(par.id);
}

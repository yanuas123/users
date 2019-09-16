const express = require("express");
const app = express();
const cors = require("cors");

global.rootDir = __dirname;
app.use(express.static(__dirname + "/src"));

app.use(cors());


const bodyParser = require("body-parser"); // Request content parser
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());


const fs = require("fs");


/* routing ------------------------------------------------------------------ */

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/src/index.html");
});


/* user */
app.post("/users_d", function(req, res) {
	let user = req.body;
	user.id = "123";
	res.status(201).send(user);
});
app.get("/users_d", function(req, res) {
	let data = fs.readFileSync("./src/assets/db.json", {
		encoding: "utf8"
	});
	data = data.JSON.parse();
	res.status(200).send(data);
});
app.get("/users_d/:userId", function(req, res) {

});
app.put("/users_d/:userId", function(req, res) {
	res.sendStatus(200);
});
app.delete("/users_d/:userId", function(req, res) {
	res.sendStatus(204);
});

/* address */
app.post("/address/:userId", function(req, res) {
	res.sendStatus(201);
});
app.put("/address/:userId&:addressId", function(req, res) {
	console.log(res.param.userId);
	console.log(res.param.addressId);
	res.sendStatus(200);
});
app.delete("/address/:userId&:addressId", function(req, res) {
	console.log(res.param.userId);
	console.log(res.param.addressId);
	res.sendStatus(204);
});


/* end Routing -------------------------------------------------------------- */





app.listen(process.env.PORT || 8080);
console.log("Run server!");
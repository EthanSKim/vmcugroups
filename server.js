require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require("express").Router();
const corsOptions = {
    Credential: 'true',

};

const User = require("./models/User");
const Group = require("./models/Group");
const SubGroup = require("./models/SubGroup");
const { randomInt } = require('crypto');

const app = express();

app.use(express.json())
app.options("*" , cors(corsOptions));
app.use(cors(corsOptions));



const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}, err => {
    if(err) throw err;
    else console.log("Database Connected!!")
})

app.post("/adminAuthorize", (req, res) => {
    if (req.body.secretKeyword === "admin:ourmission1004") {
        res.status(200).json({auth:true});
    } else if (req.body.secretKeyword === "admin:quit") {
        res.status(200).json({auth:false});
    } else {
        res.status(500);
    }
});


app.post("/login", async (req, res) => {
    try {
        // get last id
        let nextId = "1";
        const lastId = await User.find({}).sort({_id:-1}).limit(1);
        if (lastId[0].id) {
            nextId = String(Number(lastId[0].id) + 1);
        }


        // Select avatar
        const avatar = String(randomInt(1, 10));

        // Create new user
        const newUser = new User({
            id: nextId,
            name: req.body.name,
            year: req.body.year,
            major: req.body.major,
            avatar: avatar
        });

        // Save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);
    }
});

app.post("/changeInfo", async (req, res) => {
    try {
        const updatedUser = {
            id: req.body.id,
            name: req.body.name,
            year: req.body.year,
            major: req.body.major,
            avatar: req.body.avatar
        };
        await User.findOneAndUpdate({id: req.body.id}, updatedUser, (err, docs) => {
            if (err) res.status(500).json(err);
        });
        res.status(200).json(await User.findOne({id: updatedUser.id}));
    } catch(err) {
        res.status(500).json(err);
    }
});

app.get("/getAllMembers", async (req, res) => {
    try {
        const members = await User.find()
        res.status(200).json(members);
    } catch(err) {
        res.status(500).json(err);
    }
});

app.post("/createGroup", async (req, res) => {
    try {
        // get last id
        let nextId = String(1);
        const lastId = await Group.find({}).sort({_id:-1}).limit(1);
        if (lastId != []) {
            nextId = String(Number(lastId[0].id) + 1);
        }

        // Create new group
        const newGroup = new Group({
            id: nextId,
            name: req.body.name,
            type: req.body.type,
            count: 0,
            locked: false
        });

        // Save group and respond
        const group = await newGroup.save();
        res.status(200).json(group);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get("/getAllGroups", async (req, res) => {
    try {
        const groups = await Group.find()
        res.status(200).json(groups);
    } catch(err) {
        res.status(500).json(err);
    }
});

app.post("/getJoinedGroups", async (req, res) => {
    try {
        const groups = await Group.find({members:req.body.id});
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json(err);
    }
})

app.post("/getGroupDetails", async (req, res) => {
    try {
        const group = await Group.findOne({id:req.body.groupId});
        res.status(200).json(group);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post("/joinGroup", async (req, res) => {
    try {
        User.findOneAndUpdate({id:req.body.userId}, {
            "$addToSet": {"groups": req.body.id}
        }, (err, docs) => {
            if (err) res.status(500).json(err);
            else if (docs.groups.includes(req.body.id)) {
                res.status(400).json("Already in the group");
            } else {
                Group.findOneAndUpdate({id:req.body.id}, { 
                    "$inc": { count: 1 }, 
                    "$addToSet": { "members": req.body.userId } 
                }, (err, docs) => {
                    if (err) res.status(500).json(err);
                });

                res.status(200);
            }
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

app.post("/leaveGroup", async (req, res) => {
    try {
        Group.findOneAndUpdate({id: req.body.id}, {
            "$inc": {count: -1},
            "$pull": {"members": req.body.userId}
        }, (err, docs) => {
            //if (err) res.status(500).json(err);
            if (err) console.log(err);
        });

        User.findOneAndUpdate({id: req.body.userId}, {
            "$pull": {"groups":req.body.id}
        }, (err, docs) => {
            //if (err) res.status(500).json(err);
            if (err) console.log(err);
        });
        res.status(200);
    } catch(err) {
        res.status(500).json(err);
    }
});

app.post("/getMembersInfo", async (req, res) => {
    try {
        const members = await User.find({"id": {"$in":req.body}});
        res.status(200).json(members);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post("/createSubGroups", async (req, res) => {
    try {
        const subGroups = req.body.tempGroups;
        const groupId = req.body.groupId;

        // get last id
        let nextId = "1";
        const lastId = await SubGroup.find().sort({_id:-1}).limit(1);
        if (lastId != []) {
            nextId = String(Number(lastId[0].id) + 1);
        }

        const nextIdArr = [];
        for (let i=nextId; i<nextId+subGroups.length; i++) {
            // create members array
            const members = [];
            subGroups[i-nextId].forEach((member) => {
                members.push(member.id);
            });
    
            // Create new group
            const newSubGroup = new SubGroup({
                id: i,
                groupId: groupId,
                members: members,
                count: 0
            });
    
            // Save group and respond
            const group = await newSubGroup.save();
        }
        res.status(200);
        
    } catch(err) {
        res.status(500).json(err);
    }
});

app.post("/getSubGroupMembersInfo", async (req, res) => {
    try {
        const membersId = await SubGroup.findOne({"groupId":req.body.groupId, "members": {"$in":req.body.userId}});

        const membersInfo = await User.find({"id": {"$in": membersId.members}});
        res.status(200).json(membersInfo);
    } catch(err) {
        res.status(500).json(err);
    }
});

app.post("/lockGroup", async (req, res) => {
    try {
        await Group.findOneAndUpdate({id: req.body.id}, {
            locked: true
        });
        res.status(200);
    } catch(err) {
        res.status(500).json(err);
    }
});

app.post("/unlockGroup", async (req, res) => {
    try {
        await Group.findOneAndUpdate({id: req.body.id}, {
            locked: false
        });
        res.status(200);
    } catch(err) {
        res.status(500).json(err);
    }
});

const port = process.env.PORT || 8080;

app.listen(port, (err) => {
    console.log(`Backend server is running on ${port}`);
})
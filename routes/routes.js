const router = require('express').Router();
const User = require('../model/User');


// Get all uasers
router.get("/users", async (req, res) => {
    const posts = await User.find()
    res.send(posts)
    });


// Create a new user
router.post("/users", async (req, res) => {

const TagExist = await User.findOne({ tag: req.body.tag})

if (TagExist){
    return res.status(400).json({error: 'Tag already exists'});

}

const post = new User({
tag: req.body.tag,
name: req.body.name,
gender: req.body.gender,
})
await post.save()
res.send(post)
})



//get user
router.get("/users/:id", async (req, res) => {
    try {
    const post = await User.findOne({ tag: req.params.id })
    
    res.send(post)
  
    res.status(201).send(({error: "succeded"}))
    } catch {
    res.status(409)
    res.send({ error: "User doesn't exist!" })
    }
    })

//Uppdate user
router.patch("/users/:id", async (req, res) => {
    try {
    const post = await User.findOne({ tag: req.params.id})
    if (req.body.name) {
    post.name = req.body.name
    }
    if (req.body.gender) {
    post.gender = req.body.gender
    }
    await post.save()
    res.send(post)
    } catch {
    res.status(404)
    res.send({ error: "User doesn't exist!" })
    }
    })


//delete User
router.delete("/users/:id", async (req, res) => {
    try {
    
    await User.deleteOne({tag: req.params.id})
    res.status(204).send()
    } catch {
    res.status(404)
    res.send({ error: "User doesn't exist!" })
    }
    })



module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Song = require('../models/Song');
const Scene = require('../models/scene');
const createError = require('http-errors')
const uploadCloud = require('../config/cloudinary')

//GETS ALL SONGS FROM ALL USERS
router.get('/', (req, res, next) =>{
    Song.find()
        .then(songs =>{
            res.json(songs)
            res.status(200)
        })
        .catch(err => next(createError(err)))
})

// POSTS A NEW SONG
router.post('/save', async (req, res, next) =>{
    console.log(req.body);
    let {bpm} = req.body
    let user = req.session.currentUser._id
    try{
   const scene = await Scene.create({bpm})
  
   res
   .status(200)
   .json(scene)
    } catch(err) {
        next(createError(err))
    }
})

router.post('/', async (req, res, next) =>{
    let {name, description, urlPath} = req.body
    let user = req.session.currentUser._id
    try{
   const song = await Song.create({name, description, urlPath, user})
   await User.findByIdAndUpdate(user, {$push: {songs: song._id}})
   res
   .status(200)
   .json(song)
    } catch(err) {
        next(createError(err))
    }
})

//ADDS URL TO CLOUDINARY
router.post('/file', uploadCloud.single('urlPath'), async (req, res, next) => {
    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    } 
    try{
        res
        .status(200)
        .json({
            urlPath: req.file.secure_url
        })
    } catch(err) {
        next(createError(err))
    }
})



//DELETES ONE SONG
router.delete('/:id', async (req, res, next) =>{
    const id = req.params.id;
    try{
        const removeSong = await Song.findByIdAndDelete(id)
        res
        .status(204)
        .send()
    } catch(err) {
        next(createError(err))
    }
})

module.exports = router; 

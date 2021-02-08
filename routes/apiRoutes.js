const express = require('express');
const router = express.Router();
const {nanoid} = require('nanoid');
const fs = require('fs');
const path = require('path');
const jsonPath = path.join(__dirname,'..','db','db.json')


//Function to retrieve and read the json file. 
const getNotesFromDb = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(jsonPath, 'utf8', (err, data) => {

            if (err) {
                reject(jsonData) ;
            } else{
            console.log(JSON.parse(data))
            resolve(JSON.parse(data));

            }});
  
    });
}

//Function to write a new JSON file to the database
function writeToDb(data) {
    return new Promise((resolve, reject) => {

        fs.writeFile(jsonPath, JSON.stringify(data), 'utf-8', (err) => {
            if (err){
                reject(err)
            }else{
                console.log('Successfully saved to database!');
                resolve( true);
            }
        });
    })
}


//define routes for API request
router.get('/api/notes', (req,res) => {

    getNotesFromDb()
        .then(notes => res.json(notes))
        .catch( (err) =>  res.status(500).json({
            error: err
        }));

    
});


//post 
router.post('/api/notes', (req, res) => {
   
    req.body['id'] = nanoid();

    getNotesFromDb()
    .then(notes => [...notes, req.body])
    .then(newNotes => writeToDb(newNotes))
    .then(isSuccess => res.json({success: isSuccess}))
    .catch( (err) =>  res.status(500).json({
        error: err
    }))
    ;

   
})

//delete
router.delete('/api/notes/:id', function (req, res) {

    let id = req.params.id;

    getNotesFromDb()
    .then(notes => notes.filter((note) => note.id !== id))
    .then(filteredNotes => writeToDb(filteredNotes))
    .then(isSuccess => res.json({success: isSuccess}))
    .catch( (err) =>  res.status(500).json({
        error: err
    }));


})


module.exports = router
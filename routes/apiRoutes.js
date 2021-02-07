const express = require('express');
const router = express.Router();
const {nanoid} = require('nanoid');
const fs = require('fs');
const path = require('path');
// validation to ensure if db.json file doesnt exist, the server will still works

// run validation functions for database file db.json

//define routes for API request
//get
// validation to ensure if db.json file doesnt exist, the server will still works
let jsonData;
const jsonPath = path.join(__dirname,'..','db','db.json')
const fileExists = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {

            if (err) {
                reject(jsonData) ;
            } else{
            console.log(JSON.parse(data))
            jsonData = JSON.parse(data)
            resolve(jsonData);
            }});
  
    });
}
// run validation functions for database file db.json
fileExists(jsonPath)
.then((resp) => {
    jsonData = resp
    console.log(resp)
})
.catch(() => jsonData = []);

//define routes for API request
router.get('/api/notes', (req,res) => {
    res.json(jsonData);
});



//post 
router.post('/api/notes', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
   
    req.body['id'] = nanoid();

    //Making sure there are no duplicate id's
    const duplicate = jsonData.find(ids => ids.id === req.body['id']); 
    
    if (duplicate === undefined){
        
    } else if (duplicate.id === req.body['id']) {
        req.body['id'] = nanoid();
    }
    // console.log(req.body);
    // console.log(db);
    jsonData.push(req.body);
    // console.log(db);
    fs.writeFile(jsonPath, JSON.stringify(jsonData), 'utf-8', (err) => {
        if (err){
           throw console.log(`${err}: CANNOT saved to database`)
        }else{
            console.log('Successfully saved to database!');
            res.json({success:true});
        }
    });
})

//delete
router.delete('/api/notes/:id', function (req, res) {

    var id = req.params.id;

    const newData = jsonData.filter((note) => note.id !== id);

    console.log(newData);

    fs.writeFile(jsonPath, JSON.stringify(newData), 'utf-8', (err) => {
        if (err){
           throw console.log(`${err}: CANNOT delete to database`)
        }else{
            console.log('Successfully deleted from database!');
            res.json({success:true});
        }
    });


})


module.exports = router
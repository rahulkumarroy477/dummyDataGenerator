const express = require("express");
const {handleHomePage,handleCustomData,handleAiData} = require("../controllers/data");




const router = express.Router();


router.get('/',handleHomePage);


router.get('/customData', handleCustomData);

router.get('/aiData', handleAiData);




module.exports = router;

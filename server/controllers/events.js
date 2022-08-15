const queries=require('../../db');


const getAllEvents=(req, res)=>{
  console.log('here is the controller');
  queries.testing().then((result)=>{
    res.json(result.rows);
  });
};

const getAttendEvents=(req, res)=>{
  console.log('here is the controller');
  queries.test2(req.params.userID).then((result)=>{
    const array=result.rows.map((item)=>{
      return item.event_id;
    });
    res.json(array);
  });
};

const getAllLanguages=(req, res)=>{
  queries.allLangs().then((result)=>{
    res.json(result.rows);
  });
};
const getAllJargons=(req, res)=>{
  queries.allJargons().then((result)=>{
    res.json(result.rows);
  });
};

module.exports = {
  getAllEvents,
  getAttendEvents,
  getAllLanguages,
  getAllJargons,
};

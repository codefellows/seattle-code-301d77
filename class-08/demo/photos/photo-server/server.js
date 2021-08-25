'use strict';

// imports
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
dotenv.config();

const PORT = process.env.PORT;


const app = express();

app.use(cors());


app.get('/ping', (req, res) => {
  res.send('pong!!!');
})

app.get('/photo', getPhotos);



async function getPhotos(req, res) {

  //site.com/photo?query=burrito
  const searchQuery = req.query.query;

  // fetch some photos from another api

  const url = `https://api.unsplash.com/photos/?client_id=${process.env.UNSPLASH_PRIVATE_KEY}&query=${searchQuery}`;

  try {
    const response = await axios.get(url);
    const photoArray = response.data.map(photo => new Photo(photo));
    res.send(photoArray);
  } catch (error) {
    console.error('error from api', error);
    response.status(500).send('server error');
  }

}

class Photo {
  constructor(obj) {
    this.img_url = obj.urls.regular;
    this.original_image = obj.links.self;
    this.photographer = obj.user.name;
  }
}

app.get('*', notFound);

function notFound(request, response) {
  response.status(404).send('the page you are looking for is not there');
}

app.listen(PORT, () => console.log(`listing on port ${PORT}`));


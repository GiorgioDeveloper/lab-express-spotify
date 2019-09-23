var express = require("express");
var router = express.Router();
var spotifyApi = require("../soptify-api");
require("dotenv").config();

/* GET artists page /artist */
router.get("/", function(req, res, next) {
  spotifyApi
    .searchArtists(req.query.artist)
    .then(data => {
      res.render("artist", { singer: data.body.artists.items });
    })
    .catch(err => {
      console.error(err);
    });
});

/* GET album page /artist/albums */
router.get("/albums/:id", function(req, res, next) {
  spotifyApi.getArtistAlbums(req.params.id).then(
    function(data) {
      res.render("albums", { albums: data.body.items });
    },
    function(err) {
      console.error(err);
    }
  );
});

/* GET tracks page /artist/tracks */
router.get("/tracks/:id", function(req, res, next) {
  spotifyApi.getAlbumTracks(req.params.id).then(
    function(data) {
      res.render("tracks", { tracks: data.body.items });
    },
    function(err) {
      console.error(err);
    }
  );
});

module.exports = router;

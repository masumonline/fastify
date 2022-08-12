const photos = require("../data/Photos");

const photo = {
  type: "object",
  properties: {
    albumId: { type: "number" },
    id: { type: "number" },
    title: { type: "string" },
  },
};

const getPhotosOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: photo,
      },
    },
  },
  handler: (req, res) => {
    res.send(photos);
  },
};

const getPhotoOpts = {
  schema: {
    params: {
      id: { type: 'number' }
    },
    response: {
      200: photo,
    },
  },
  handler: (req, res) => {
    const { id } = req.params;
    const photo = photos.find((photo) => photo.id == id);
    res.send(photo);
  },
};

function photoRoute(fastify, options, done) {
  fastify.get("/photos", getPhotosOpts);
  fastify.get("/photos/:id", getPhotoOpts);
  done();
}

module.exports = photoRoute;

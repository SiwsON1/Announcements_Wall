const Ad = require('../models/ads.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');
const path = require('path');

exports.getAll = async (req, res) => {
    try {
        res.json(await Ad.find().populate('userId'));
    } catch(err) {
        res.status(500).json({ message: err });
      }
}

exports.getById = async (req, res) => {
    try {
        const ad = Ad.findOne(req.params._id).populate('userId');
        if(!ad) res.status(404).json({ message: 'Not found' });
        else res.json(await ad);

    } catch(err) {
        res.status(500).json({ message: err });
      }
}
exports.getSearch = async (req, res) => {
    try {
        const ads = await Ad.find({ title: { $regex: req.params.searchPhrase, $options: 'i' } }).populate('userId');
        if (ads) {
             res.json(ads);
        } else {
            res.status(404).json({ message: 'Ad Not found' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: { err } });
    }
}
exports.post = async (req, res) => {
    try {
        const { title, content, date, price, location } = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
        if (title && content && date && price && location && req.file && ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(fileType)) {
            const newAd = new Ad({title: title, content: content, date: date, image: req.file.filename, price: parseInt(price), location: location, user: req.session.user.login, userId: req.session.user.id});
            await newAd.save();
            res.json({ message: 'Ad added' });
        } else {
            if(req.file) {
                fs.unlinkSync(req.file.path);
            }        
            res.status(400).send({ message: 'Bad request'});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err });
      }
}
exports.put = async (req, res) => {
    try {
      const { title, content, date, price, location } = req.body;
      const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
  
      const ad = await Ad.findById(req.params.id);
      if (ad) {
        if (req.file) {
          if (!['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: 'Invalid image format' });
          }
          // Jeśli plik jest poprawnego typu, aktualizujesz pola związane ze zdjęciem
          ad.image = req.file.filename;
          if (ad.image && ad.image !== req.file.filename) {
            fs.unlinkSync(path.join('public', 'uploads', ad.image));
          }
        }
  
        const updatedAd = await Ad.updateOne(
          { _id: req.params.id },
          {
            $set: {
              title: title,
              content: content,
              date: date,
              price: parseInt(price),
              location: location,
              image: ad.image
            }
          }
        );
  
        console.log(updatedAd);
  
        res.json({ message: 'OK' });
      } else {
        res.status(404).json({ message: 'Ad Not found...' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  };
  
exports.delete = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if (ad) {
            await Ad.deleteOne({_id: req.params.id})
            fs.unlinkSync(req.file.path);
            res.json({ message: 'OK' });
        } 
        else res.status(404).json({ message: 'Not found...' });
    } catch(err) {
        res.status(500).json({ message: err });
      }
}

const pWheelLikes = require('../models/likes');

const addLike = async (req, res) =>{
    try{
    const {userId, contentId, createdAt} = req.body;
    const userLiked = await pWheelLikes.findOne({userId, contentId});
    
    if(userLiked){
    const delLike = await pWheelLikes.findOneAndDelete({userId, contentId})
     //const delLike = await pWheelLikes.findByIdAndDelete(userId);
     return res.status(204).json({ message: 'Like removed', });
     
    }
    else{
    const insertLike = await pWheelLikes.create({userId, contentId, createdAt});
      return   res.status(201).json({
      likeId: insertLike._id.toString(),


    });
    }

    }
    catch(err){
      console.log("ERROR ".err);
    }
}

module.exports = {addLike};
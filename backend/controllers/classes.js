const { MongoClient } = require("mongodb");
exports.getClasses=async(req,res)=>{
    
    // Replace the uri string with your connection string.
    const uri = "mongodb+srv://krishaang0191:franklin123@puma-cluster.idynkdh.mongodb.net/?retryWrites=true&w=majority&appName=PUMA-cluster";
    const client = new MongoClient(uri);
      try {
        const database = client.db('Puma');
        const courses = database.collection('Course');
        // Query for a movie that has the title 'Back to the Future'
        const query = { searchName: req.query.course };
        const classes = await courses.findOne(query);
        console.log(classes);
        res.json({courseInfo:classes})
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    
   
    
}
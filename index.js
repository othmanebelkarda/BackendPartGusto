const express = require("express");

const app = express();

const mongoose = require("mongoose");

const Article = require("./models/article.js")

//mongodb+srv://belkardaothmane05:<password>@cluster0.1l2p35k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;

mongoose.connect("mongodb+srv://belkardaothmane05:4954KtBMYQlhSdxe@cluster0.1l2p35k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
console.log("connected succesfully");
app.listen(3000, ()=>{
    console.log("I'm listening in port 3000")
});
}).catch((error)=>{
    console.log("error with connecting with data base",error);
});

app.use(express.json());

app.get("/hello",(req, res)=>{
    res.send("hello")
});

app.get("/hi",(req, res)=>{
    res.send("hi")
});
app.get("/test",(req, res)=>{
    res.send("test")
});

app.get("/numbers",(req,res)=>{
    let numbers=0;
    for(i=0;i<=10;i++){
    numbers=numbers+ i + "-";
    }
 //res.sendFile(__dirname + "/views/numbers.html");
 res.render("numbers.ejs",{
        name:"othy",
        numbers
    })
});
app.post("/article", async(req,res)=>{
    const newArticle = new Article();
    const artcmnd = req.body.productId ;
    const artquantity = req.body.quantity ;
    const artplace = req.body.place;
 
    newArticle.productId=artcmnd
    newArticle.quantity=artquantity
    newArticle.place=artplace
    await newArticle.save()
    res.json(newArticle)
});
app.get("/article",async(req,res)=>{
    const id=req.params.articleId;
  try{ 
   //   const article = await Article.findById(id);
   const article=await Article.find();
    res.json(article);
    console.log("the article is",article);
    } 
  catch(error){
        console.log("error");
        return res.send("error")
    }
  
   
   
})
app.delete("/articles/:articleId",async(req,res)=>{
    const id = req.params.articleId;
    try{
        const article = await Article.findByIdAndDelete(id);
        res.json(article);
    }
    catch(error){
        console.log("error");
        return res.send("error")
    }
})
// 1. POST 
// 2. GET 
// 3. GET (FOR SINGLE Author)
// 4. PUT 
// 5. DELETE 

import express from "express";
import authorsModel from "./model.js"


const authorsRouter = express.Router()

//1.
authorsRouter.post("/", async (req,res)=>{

    console.log("REQUEST BODY: ", req.body)

    const newAuthor = new authorsModel(req.body) // this is going to VALIDATE the req.body
    const savedAuthor = await newAuthor.save() // This saves the validated body into the authors' collection

    res.send(savedAuthor)

})

//2.
authorsRouter.get("/", async (req,res)=>{
    const authors = await authorsModel.find()
    res.send(authors)
})

//3.
authorsRouter.get("/:id", async (req,res)=>{
    const Author = await authorsModel.findById(req.params.id)
    res.send(Author)
})

//4.
authorsRouter.put("/:id", async (req,res)=>{
    const updatedAuthor = await authorsModel.findByIdAndUpdate(
        req.params.id, // WHO
        req.body, // HOW
        { new: true } // OPTIONS (if you want to obtain the updated Author you should specify new: true)
      )
      res.send(updatedAuthor)
})

//5.
authorsRouter.delete("/:id", async (req,res)=>{
    await authorsModel.findByIdAndDelete(req.params.id)
    res.status(204).send()
})



export default authorsRouter
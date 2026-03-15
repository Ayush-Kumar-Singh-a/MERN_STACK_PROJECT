import express from "express";
import path from "path";
import cors from "cors";
import {serve} from "inngest/express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest } from "./lib/inngest.js";
const app = express();

const __dirname = path.resolve();


//middleWare
app.use(express.json())
//credential true meaning?? =>our server allows a browser to include cookies on request
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
// if(ENV.NODE_ENV !== "production"){
//     app.use(
//         cors({
//             origin: "http://localhost:5173",
//         })
//     );
// }

app.use("/api/inngest", serve({client:inngest, functions}))

app.get("/health", (req,res) =>{
    res.status(200).json({msg:"API is up and running"})
})

app.get("/books",(req,res)=>{
    res.status(200).json({msg: "this is the books endpoint"})
});
//making my app ready for deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
}


const startServer = async() => {
    try {
        await connectDB();
        app.listen(ENV.PORT,()=>{
        console.log(`Server is running on`,ENV.PORT);
    })
    } catch (error) {
        console.error("Error starting the server", error);
        process.exit(1);
    }
};

startServer();
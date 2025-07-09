import express from "express";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js"
import candidateRouter from "./routes/candidateRoutes.js"
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

app.get("/", async (req, res) => {
  try {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Candidate Referral System</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f4f6f8;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #2c3e50;
            margin-bottom: 0.5rem;
          }
          p {
            color: #555;
            margin-bottom: 1.5rem;
          }
          a {
            text-decoration: none;
            background: #007bff;
            color: white;
            padding: 0.7rem 1.2rem;
            border-radius: 5px;
            transition: background 0.3s ease;
          }
          a:hover {
            background: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Candidate Referral Management System</h1>
          <p>Welcome! Use our API to manage candidate referrals.</p>
          <a href="/candidates">View Candidates</a>
        </div>
      </body>
      </html>
    `;
    res.status(200).send(html);
  } catch (error) {
    console.log("Error in GET /:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.use("/auth",authRouter);
app.use("/candidate",candidateRouter)


const startServer = async()=>{
    try {
        await connectDB();
        app.listen(process.env.PORT||8080,()=>{
            console.log(`server is runnig on port: ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("Failed to start server",error.message);
        process.exit(1);
    }
}

startServer();



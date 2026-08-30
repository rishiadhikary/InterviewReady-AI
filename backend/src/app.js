const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");


// -----------------------------
// MIDDLEWARE
// -----------------------------

app.use(cookieParser());

app.use(express.json());

const allowedOrigins = [
    "https://interview-ready-ai-mu.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {

            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.log("CORS blocked for origin:", origin);

            return callback(
                new Error(`CORS blocked for origin: ${origin}`)
            );
        },
        credentials: true,
    })
);

// -----------------------------
// HEALTH CHECK
// -----------------------------

app.get("/", (req, res) => {
    res.status(200).json({
        message: "InterviewReady AI backend is running"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok"
    });
});


// -----------------------------
// ROUTES
// -----------------------------

const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);

app.use("/api/interview", interviewRouter);


// -----------------------------
// EXPORT
// -----------------------------

module.exports = app;
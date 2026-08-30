import { useState } from "react";
import Interview from "./features/interview/pages/interview";

export default function Demo() {
    const sampleInterviewData = {
        _id: "699af91fe5a3daf502d43744",
        jobDescription: "Position: Backend Developer (Node.js)\nLocation: Remote / Bangalore\nExperience Required: 3+ years\nKey Requirements: Express.js, MongoDB, Redis, Message Queues, System Design",
        resume: "Ankur Sharma\nLocation: Bhopal, India\nEmail: ankur.sharma@email.com\nExperience: 2.5 years in Node.js development",
        matchScore: 88,
        technicalQuestions: [
            { id: 1, question: "Explain the Event Loop in Node.js and how it works with async operations", difficulty: "Medium" },
            { id: 2, question: "What is Redis and how is it used in modern applications?", difficulty: "Hard" },
            { id: 3, question: "Explain async/await vs Promises vs Callbacks", difficulty: "Medium" },
            { id: 4, question: "What is a Message Queue and why do we use RabbitMQ or Kafka?", difficulty: "Hard" }
        ],
        behavioralQuestions: [
            { id: 1, question: "Tell us about a time you handled a difficult team member or project conflict", difficulty: "Easy" },
            { id: 2, question: "Describe your biggest professional achievement and what you learned", difficulty: "Easy" }
        ],
        skillGaps: [
            { id: 1, skill: "Redis", proficiency: "beginner" },
            { id: 2, skill: "Message queue", proficiency: "beginner" },
            { id: 3, skill: "Event loop", proficiency: "intermediate" }
        ],
        preparationPlan: [
            { id: 1, topic: "Node.js fundamentals & Event Loop", duration: "2 hours", status: "pending" },
            { id: 2, topic: "Express.js deep dive", duration: "3 hours", status: "pending" },
            { id: 3, topic: "Database optimization & MongoDB", duration: "2.5 hours", status: "pending" },
            { id: 4, topic: "System design basics", duration: "3 hours", status: "pending" },
            { id: 5, topic: "Interview strategies & tips", duration: "1 hour", status: "pending" },
            { id: 6, topic: "Mock interviews", duration: "4 hours", status: "pending" },
            { id: 7, topic: "Final review & Q&A", duration: "1.5 hours", status: "pending" }
        ],
        createdAt: new Date("2026-02-22T12:39:59.110Z")
    };

    return <Interview interviewData={sampleInterviewData} />;
}

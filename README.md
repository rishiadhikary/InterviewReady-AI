# InterviewReady AI – AI-Powered Interview Preparation Platform

An AI-powered interview preparation platform that helps candidates prepare for job interviews through personalized resume analysis, job-description matching, skill-gap identification, and AI-generated interview questions.

**Live Demo:** https://interview-ready-ai-mu.vercel.app/

**Backend API:** https://interviewready-ai-h51l.onrender.com/

**GitHub Repository:** https://github.com/rishiadhikary/InterviewReady-AI

---

## Overview

InterviewReady AI is designed to make interview preparation smarter, more personalized, and efficient.

Users can provide their resume, personal introduction, and target job description. The platform leverages Google's Gemini AI to analyze their profile against the job requirements and generate actionable insights to improve their interview readiness.

Instead of following generic preparation strategies, candidates receive personalized recommendations based on their skills, experience, and target role.

## Key Features

- **AI-Powered Resume Analysis:** Analyze your resume and identify relevant skills, qualifications, and areas for improvement.
- **Job Description Matching:** Compare your profile against a target job description to understand how well your qualifications align with the role.
- **Match Score:** Get an AI-generated compatibility score representing your profile's alignment with the job requirements.
- **Skill Gap Analysis:** Identify missing technical skills and knowledge areas that need improvement.
- **Technical Interview Questions:** Generate role-specific technical questions based on your profile and target job description.
- **Behavioral Interview Questions:** Prepare for HR and behavioral rounds with personalized questions.
- **Personalized Learning Roadmap:** Receive actionable recommendations to strengthen weak areas and improve interview readiness.
- **PDF Report Generation:** Generate and download your personalized interview preparation report.
- **Secure Authentication:** User registration and login with JWT-based authentication using HTTP-only cookies.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| AI Integration | Google Gemini API |
| Authentication | JWT, HTTP-only Cookies |
| HTTP Client | Axios |
| Deployment | Vercel, Render |
| Version Control | Git, GitHub |

## Application Workflow

1. **Register / Login:** Create an account or log in securely.
2. **Provide Your Profile:** Enter your self-description and upload or provide your resume details.
3. **Add Job Description:** Paste the job description of your target position.
4. **AI Analysis:** Gemini AI analyzes your profile and compares it with the job requirements.
5. **Review Insights:** Explore your match score, skill gaps, and improvement areas.
6. **Prepare for Interviews:** Get personalized technical and behavioral interview questions.
7. **Download Report:** Generate a PDF containing your interview preparation insights.

## System Architecture

```text
           USER
             |
             v
      REACT + VITE
        FRONTEND
             |
             | Axios Requests
             | (Credentials Included)
             v
       NODE.JS + EXPRESS
          BACKEND
          /       \
         /         \
        v           v
  MONGODB ATLAS   GEMINI API
  (User Data)     (AI Analysis)
        |           |
        |           |
        v           v
  Authentication  Personalized
  & User Records  AI Insights
         \         /
          \       /
           v     v
       RESPONSE TO USER
              |
              v
       INTERVIEW REPORT
          (PDF)
```

## Project Structure

The project is organized into separate frontend and backend applications.

```text
InterviewReady-AI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── package.json
│   └── ...
│
└── README.md
```

*Note: Adjust the directory names above if your actual repository uses a different structure.*

## Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/rishiadhikary/InterviewReady-AI.git

cd InterviewReady-AI
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

Start the backend server using the development script configured in your `package.json`:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Configure the backend API URL in your frontend environment configuration according to your Axios setup.

For local development, use your local backend URL.

Start the frontend:

```bash
npm run dev
```

### 4. Access the Application

Open the local URL provided by Vite in your terminal.

The application should now be running locally.

## Environment Variables

The backend requires the following environment variables:

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key used for JWT authentication |
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key |
| `NODE_ENV` | Application environment |

**Important:** Never commit your `.env` file or expose API keys, database credentials, or authentication secrets in your GitHub repository.

## API Endpoints

The backend provides REST APIs for authentication and AI-powered interview analysis.

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate an existing user |
| GET | `/api/auth/get-me` | Retrieve authenticated user details |

### Interview API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/interview` | Generate AI-powered interview analysis and preparation insights |

*Additional endpoints may be added as the project evolves.*

## Deployment

The application is deployed using the following services:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **AI Service:** Google Gemini API

Live Application: https://interview-ready-ai-mu.vercel.app/

## Security Considerations

- JWT-based authentication.
- HTTP-only cookies for authentication token storage.
- Environment variables for sensitive configuration.
- Backend-managed API credentials.
- Credential-aware Axios requests for authenticated API communication.

## Future Improvements

- [ ] Interactive mock interview sessions with AI.
- [ ] Real-time interview feedback and evaluation.
- [ ] Voice-based interview practice.
- [ ] Advanced resume optimization recommendations.
- [ ] Interview performance tracking and analytics.
- [ ] Support for multiple job applications and preparation histories.

## Contributing

Contributions, suggestions, and feature requests are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch to GitHub.
5. Open a Pull Request.

## Author

**Rishi Adhikary**

B.Tech Mechanical Engineering | NIT Durgapur

Interested in Software Development, Full-Stack Engineering, Data Structures & Algorithms, and Generative AI.

- GitHub: https://github.com/rishiadhikary
- LinkedIn: Add your LinkedIn profile URL here.

---

⭐ If you find this project interesting, consider giving it a star!

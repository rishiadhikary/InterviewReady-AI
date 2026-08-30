import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import "../style/home.scss";

const documentIcon = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3.75A2.75 2.75 0 0 1 9.75 1h6.5L20 6.75v11.5A2.75 2.75 0 0 1 17.25 21h-7.5A2.75 2.75 0 0 1 7 18.25v-14.5Zm3.25 0v4.5h5.5v-4.5h-5.5Zm-1.5 8.5h7.5v1.5h-7.5v-1.5Zm0 3.5h7.5v1.5h-7.5v-1.5Z" />
    </svg>
);

const profileIcon = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.5a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Zm-6.75 16.5c.7-3.2 3.4-5.25 6.75-5.25s6.05 2.05 6.75 5.25a1 1 0 1 1-2 .38c-.48-2.2-2.32-3.63-4.75-3.63a5.1 5.1 0 0 0-4.75 3.63 1 1 0 1 1-2-.38Z" />
    </svg>
);

const uploadIcon = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5a1 1 0 0 1 1 1v7.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42l2.3 2.3V4.5a1 1 0 0 1 1-1Zm-6 12.5a1 1 0 0 1 1 1v1.5h10v-1.5a1 1 0 1 1 2 0v2.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2.5a1 1 0 0 1 1-1Z" />
    </svg>
);

const infoIcon = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.25a9.75 9.75 0 1 1 0 19.5 9.75 9.75 0 0 1 0-19.5Zm0 4.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm1.5 9.75h-3v-1.5h1.5V10.5h-1.5V9h2.25c.83 0 1.5.67 1.5 1.5v5.25h1.5v1.5Z" />
    </svg>
);

const buttonIcon = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l1.9 5.8H20l-4.9 3.6 1.9 5.8-5-3.6-5 3.6 1.9-5.8L4 7.8h6.1L12 2Z" />
    </svg>
);

const Home = () => {

    const { loading, generateReport } = useInterview();

    const navigate = useNavigate();

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resume, setResume] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const resumeInputRef = useRef(null);


    // ---------------------------------------------
    // Handle resume selection
    // ---------------------------------------------

    const handleResumeChange = (file) => {

        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Please upload a PDF or DOCX file.");
            return;
        }

        if (file.size > 3 * 1024 * 1024) {
            alert("Resume must be smaller than 3MB.");
            return;
        }

        setResume(file);
    };


    // ---------------------------------------------
    // File input
    // ---------------------------------------------

    const handleFileChange = (e) => {

        const file = e.target.files?.[0];

        handleResumeChange(file);
    };


    // ---------------------------------------------
    // Drag events
    // ---------------------------------------------

    const handleDragOver = (e) => {

        e.preventDefault();

        setIsDragging(true);
    };


    const handleDragLeave = (e) => {

        e.preventDefault();

        setIsDragging(false);
    };


    const handleDrop = (e) => {

        e.preventDefault();

        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];

        handleResumeChange(file);
    };


    // ---------------------------------------------
    // Generate report
    // ---------------------------------------------

    const handleGenerateReport = async () => {

        if (!jobDescription.trim()) {
            alert("Please enter the job description.");
            return;
        }

        if (!resume && !selfDescription.trim()) {
            alert("Please upload a resume or enter your self description.");
            return;
        }

        try {

            const data = await generateReport({
                jobDescription,
                selfDescription,
                resumeFile: resume,
            });

            if (!data?._id) {
                console.error("Invalid interview report:", data);
                alert("Interview report was not generated.");
                return;
            }

            navigate(`/interview/${data._id}`);

        } catch (error) {

            console.error(
                "Failed to generate interview report:",
                error
            );

            alert("Failed to generate interview report.");
        }
    };


    // ---------------------------------------------
    // Loading screen
    // ---------------------------------------------

    if (loading) {

        return (
            <main className="interview-home loading-screen">

                <div className="page-shell">

                    <div className="hero">

                        <h1>
                            Generating Your
                            <span> Interview Plan</span>
                        </h1>

                        <p>
                            Our AI is analyzing your profile and the job
                            requirements. This may take a few seconds...
                        </p>

                    </div>

                </div>

            </main>
        );
    }


    return (
        <main className="interview-home">

            <div className="page-shell">

                {/* -------------------------------- */}
                {/* HERO */}
                {/* -------------------------------- */}

                <header className="hero">

                    <h1>
                        Create Your Custom
                        <span>Interview Plan</span>
                    </h1>

                    <p>
                        Let our AI analyze the job requirements and your
                        unique profile to build a winning strategy.
                    </p>

                </header>


                {/* -------------------------------- */}
                {/* INPUT PANELS */}
                {/* -------------------------------- */}

                <section
                    className="plan-panel"
                    aria-label="Interview plan form"
                >

                    {/* ============================== */}
                    {/* JOB DESCRIPTION */}
                    {/* ============================== */}

                    <div className="panel-card job-panel">

                        <div className="panel-header">

                            <div
                                className="panel-icon document-icon"
                                aria-hidden="true"
                            >
                                {documentIcon}
                            </div>

                            <h2>
                                Target Job Description
                            </h2>

                            <span className="panel-badge">
                                Required
                            </span>

                        </div>


                        <textarea
                            className="panel-textarea"
                            placeholder="Paste the full job description here..."
                            aria-label="Target job description"
                            value={jobDescription}
                            onChange={(e) =>
                                setJobDescription(e.target.value)
                            }
                            maxLength={5000}
                        />


                        <div className="panel-footer">

                            <span>
                                {jobDescription.length} / 5000 chars
                            </span>

                        </div>

                    </div>


                    {/* ============================== */}
                    {/* PROFILE */}
                    {/* ============================== */}

                    <div className="panel-card profile-panel">

                        <div className="panel-header">

                            <div
                                className="panel-icon profile-icon"
                                aria-hidden="true"
                            >
                                {profileIcon}
                            </div>

                            <h2>
                                Your Profile
                            </h2>

                        </div>


                        {/* -------------------------------- */}
                        {/* RESUME UPLOAD */}
                        {/* -------------------------------- */}

                        <div className="upload-section">

                            <label>
                                Upload Resume{" "}
                                <span className="label-note">
                                    (ONE REQUIRED)
                                </span>
                            </label>


                            <div
                                className={`upload-box ${
                                    isDragging ? "dragging" : ""
                                }`}
                                onClick={() =>
                                    resumeInputRef.current?.click()
                                }
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {

                                    if (
                                        e.key === "Enter" ||
                                        e.key === " "
                                    ) {
                                        resumeInputRef.current?.click();
                                    }

                                }}
                            >

                                <div
                                    className="upload-icon"
                                    aria-hidden="true"
                                >
                                    {uploadIcon}
                                </div>


                                {resume ? (

                                    <>
                                        <p>
                                            {resume.name}
                                        </p>

                                        <small>
                                            Click to change file
                                        </small>
                                    </>

                                ) : (

                                    <>
                                        <p>
                                            Click to upload or drag &amp;
                                            drop
                                        </p>

                                        <small>
                                            PDF or DOCX (Max 3MB)
                                        </small>
                                    </>

                                )}

                            </div>


                            <input
                                id="resume-upload"
                                type="file"
                                className="file-input"
                                accept=".pdf,.docx"
                                aria-label="Upload resume file"
                                ref={resumeInputRef}
                                onChange={handleFileChange}
                            />

                        </div>


                        {/* -------------------------------- */}
                        {/* OR */}
                        {/* -------------------------------- */}

                        <div className="divider">

                            <span>
                                OR
                            </span>

                        </div>


                        {/* -------------------------------- */}
                        {/* SELF DESCRIPTION */}
                        {/* -------------------------------- */}

                        <div className="description-section">

                            <label htmlFor="self-description">
                                Quick Self-Description
                            </label>

                            <textarea
                                onChange={(e) =>
                                    setSelfDescription(
                                        e.target.value
                                    )
                                }
                                value={selfDescription}
                                id="self-description"
                                className="panel-textarea compact"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                aria-label="Quick self description"
                            />

                        </div>


                        {/* -------------------------------- */}
                        {/* INFO */}
                        {/* -------------------------------- */}

                        <div className="info-bar">

                            <span
                                className="info-icon"
                                aria-hidden="true"
                            >
                                {infoIcon}
                            </span>

                            <p>
                                Either a{" "}
                                <strong>Resume</strong>{" "}
                                or a{" "}
                                <strong>Self Description</strong>{" "}
                                is required to generate a personalized
                                plan.
                            </p>

                        </div>

                    </div>

                </section>


                {/* -------------------------------- */}
                {/* CTA */}
                {/* -------------------------------- */}

                <div className="cta-section">

                    <p className="strategy-meta">
                        AI-Powered Strategy Generation • Approx 30s
                    </p>


                    <button
                        className="generate-button"
                        type="button"
                        onClick={handleGenerateReport}
                        disabled={loading}
                    >

                        <span
                            className="button-icon"
                            aria-hidden="true"
                        >
                            {buttonIcon}
                        </span>

                        {loading
                            ? "Generating..."
                            : "Generate My Interview Strategy"}

                    </button>

                </div>

            </div>

        </main>
    );
};


export default Home;
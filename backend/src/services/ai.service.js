const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const { default: zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});


// --------------------------------------------------
// ZOD SCHEMA
// --------------------------------------------------

const interviewReportSchema = z.object({

    title: z.string(),

    matchScore: z.number()
        .min(0)
        .max(100),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string(),
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string(),
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum([
                "low",
                "medium",
                "high"
            ]),
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string()),
        })
    ),
});


// --------------------------------------------------
// GEMINI RESPONSE SCHEMA
// --------------------------------------------------

const geminiResponseSchema = {

    type: "object",

    properties: {

        title: {
            type: "string",
        },

        matchScore: {
            type: "number",
        },

        technicalQuestions: {

            type: "array",

            items: {

                type: "object",

                properties: {

                    question: {
                        type: "string",
                    },

                    intention: {
                        type: "string",
                    },

                    answer: {
                        type: "string",
                    },

                },

                required: [
                    "question",
                    "intention",
                    "answer",
                ],
            },
        },

        behavioralQuestions: {

            type: "array",

            items: {

                type: "object",

                properties: {

                    question: {
                        type: "string",
                    },

                    intention: {
                        type: "string",
                    },

                    answer: {
                        type: "string",
                    },

                },

                required: [
                    "question",
                    "intention",
                    "answer",
                ],
            },
        },

        skillGaps: {

            type: "array",

            items: {

                type: "object",

                properties: {

                    skill: {
                        type: "string",
                    },

                    severity: {

                        type: "string",

                        enum: [
                            "low",
                            "medium",
                            "high",
                        ],
                    },

                },

                required: [
                    "skill",
                    "severity",
                ],
            },
        },

        preparationPlan: {

            type: "array",

            items: {

                type: "object",

                properties: {

                    day: {
                        type: "number",
                    },

                    focus: {
                        type: "string",
                    },

                    tasks: {

                        type: "array",

                        items: {
                            type: "string",
                        },

                    },

                },

                required: [
                    "day",
                    "focus",
                    "tasks",
                ],
            },
        },

    },

    required: [
        "title",
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan",
    ],
};


// --------------------------------------------------
// GENERATE INTERVIEW REPORT
// --------------------------------------------------

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription,
}) {

    try {

        const prompt = `

You are an expert technical recruiter and interview preparation assistant.

Analyze the candidate information and target job description below.

========================
JOB DESCRIPTION
========================

${jobDescription}

========================
CANDIDATE RESUME
========================

${resume || "No resume provided."}

========================
SELF DESCRIPTION
========================

${selfDescription || "No self description provided."}

========================
TASK
========================

Generate a personalized interview preparation report.

You MUST generate:

1. A short job title.

2. A realistic match score from 0 to 100.

3. 5 to 8 technical interview questions.

4. 3 to 5 behavioral interview questions.

5. Important skill gaps.

6. A 7-day preparation plan.

========================
VERY IMPORTANT
========================

Return ONLY valid JSON.

Do not return markdown.

Do not return explanations.

Do not use different property names.

The exact top-level properties MUST be:

title
matchScore
technicalQuestions
behavioralQuestions
skillGaps
preparationPlan

technicalQuestions MUST be an array of objects.

Each technicalQuestions object MUST contain:

question
intention
answer

behavioralQuestions MUST be an array of objects.

Each behavioralQuestions object MUST contain:

question
intention
answer

skillGaps MUST be an array of objects.

Each skillGaps object MUST contain:

skill
severity

severity MUST be exactly one of:

low
medium
high

preparationPlan MUST be an array of objects.

Each preparationPlan object MUST contain:

day
focus
tasks

tasks MUST be an array of strings.

Do NOT return arrays of plain strings for technicalQuestions or behavioralQuestions.

For example, this is WRONG:

"technicalQuestions": [
    "Explain Node.js Event Loop"
]

This is CORRECT:

"technicalQuestions": [
    {
        "question": "Explain the Node.js Event Loop.",
        "intention": "To test understanding of asynchronous execution.",
        "answer": "Explain the call stack, callback queue, microtasks and event loop."
    }
]
`;

        // --------------------------------------------------
        // CALL GEMINI
        // --------------------------------------------------

        const response = await ai.models.generateContent({

            model: "gemini-3.6-flash",

            contents: prompt,

            config: {

                responseMimeType: "application/json",

                responseSchema: geminiResponseSchema,

                temperature: 0.2,

                maxOutputTokens: 12000,

            },

        });


        const rawText = response.text;

        if (!rawText) {
            throw new Error(
                "Gemini returned an empty response"
            );
        }


        // --------------------------------------------------
        // PARSE JSON
        // --------------------------------------------------

        let parsedResponse;

        try {

            parsedResponse = JSON.parse(rawText);

        } catch (error) {

            console.error(
                "Failed to parse Gemini JSON:",
                error
            );

            throw new Error(
                "Gemini returned invalid JSON"
            );
        }


        // --------------------------------------------------
        // ZOD VALIDATION
        // --------------------------------------------------

        const validatedResponse =
            interviewReportSchema.parse(
                parsedResponse
            );


        return validatedResponse;

    } catch (error) {

        console.error(
            "Gemini interview report error:",
            error
        );

        throw error;
    }
}


// --------------------------------------------------
// GENERATE PDF FROM HTML
// --------------------------------------------------

async function generatePdfFromHtml(htmlcontent) {

    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless
    });

    try {

        const page = await browser.newPage();

        await page.setContent(htmlcontent, {
            waitUntil: "networkidle0"
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "20mm",
                right: "15mm",
                bottom: "20mm",
                left: "15mm"
            }
        });

        return pdfBuffer;

    } finally {

        await browser.close();

    }
}

// --------------------------------------------------
// GENERATE RESUME PDF
// --------------------------------------------------

async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription,
}) {

    const resumepdfSchema = z.object({

        html: z.string().describe(
            "The HTML content of the resume which can be converted to PDF using Puppeteer"
        ),

    });


    const prompt = `

Generate a professional resume for a candidate using the following details.

========================
RESUME
========================

${resume}

========================
SELF DESCRIPTION
========================

${selfDescription}

========================
JOB DESCRIPTION
========================

${jobDescription}

========================
REQUIREMENTS
========================

The response should be a JSON object with a single field "html".

The "html" field must contain complete HTML content that can be converted to PDF using Puppeteer.

The resume should be tailored for the given job description.

Highlight the candidate's strengths and relevant experience.

The resume should sound human-written and professional.

Do not make the resume sound AI-generated.

Use a clean and professional design.

The resume should be ATS friendly.

The content should be easily parsable by ATS systems.

Keep the resume between 1 and 2 pages.

Focus on quality rather than unnecessary content.

Include relevant information that can increase the candidate's chances of getting an interview.

You may use simple colors and font styles.

Do not use external resources that may fail to load during PDF generation.

Return ONLY valid JSON.

`;


    try {

        const response =
            await ai.models.generateContent({

                model: "gemini-3.6-flash",

                contents: prompt,

                config: {

                    responseMimeType:
                        "application/json",

                    responseSchema:
                        zodToJsonSchema(
                            resumepdfSchema
                        ),

                    temperature: 0.2,

                    maxOutputTokens: 12000,

                },

            });


        if (!response.text) {

            throw new Error(
                "Gemini returned an empty resume response"
            );

        }


        const jsonContent =
            JSON.parse(response.text);


        const validatedContent =
            resumepdfSchema.parse(
                jsonContent
            );


        const pdfBuffer =
            await generatePdfFromHtml(
                validatedContent.html
            );


        return pdfBuffer;

    } catch (error) {

        console.error(
            "Resume PDF generation error:",
            error
        );

        throw error;

    }

}


// --------------------------------------------------
// EXPORT
// --------------------------------------------------

module.exports = {

    generateInterviewReport,

    generateResumePdf,

};
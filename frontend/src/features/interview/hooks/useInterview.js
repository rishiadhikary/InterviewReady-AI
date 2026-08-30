import {
    getAllInterviewReports,
    generateInterviewReport,
    getInterviewReportById,
    generateResumePdf,
} from "../services/interview.api";

import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";


export const useInterview = () => {

    const context = useContext(InterviewContext);
    const { interviewId } = useParams();

    if (!context) {
        throw new Error(
            "useInterview must be used within an InterviewProvider"
        );
    }

    const {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports
    } = context;


    // --------------------------------------------------
    // GENERATE INTERVIEW REPORT
    // --------------------------------------------------

    const generateReport = async ({
        jobDescription,
        selfDescription,
        resumeFile
    }) => {

        setLoading(true);

        try {

            const response = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resumeFile
            });

            console.log(
                "Generate report response:",
                response
            );

            // Backend POST returns:
            // {
            //     message: "...",
            //     report: {...}
            // }

            const interviewReport = response.report;

            setReport(interviewReport);

            return interviewReport;

        } catch (error) {

            console.error(
                "Failed to generate interview report:",
                error
            );

            throw error;

        } finally {

            setLoading(false);

        }
    };


    // --------------------------------------------------
    // GET REPORT BY ID
    // --------------------------------------------------

    const getReportById = async (interviewId) => {

        setLoading(true);

        try {

            const response =
                await getInterviewReportById(interviewId);

            console.log(
                "Get report response:",
                response
            );

            // Backend GET returns:
            // {
            //     message: "...",
            //     interviewReport: {...}
            // }

            const interviewReport =
                response.interviewReport;

            setReport(interviewReport);

            return interviewReport;

        } catch (error) {

            console.error(
                "Failed to get interview report:",
                error
            );

            throw error;

        } finally {

            setLoading(false);

        }
    };


    // --------------------------------------------------
    // GET ALL REPORTS
    // --------------------------------------------------

    const getReports = async () => {

        setLoading(true);

        try {

            const response =
                await getAllInterviewReports();

            console.log(
                "Get all reports response:",
                response
            );

            const interviewReports =
                response.interviewReports;

            setReports(interviewReports);

            return interviewReports;

        } catch (error) {

            console.error(
                "Failed to get interview reports:",
                error
            );

            throw error;

        } finally {

            setLoading(false);

        }
    };


    // --------------------------------------------------
    // GENERATE RESUME PDF
    // --------------------------------------------------

const getResumePdf = async (interviewReportId) => {

    setLoading(true);

    try {

        const response = await generateResumePdf({
            interviewReportId
        });

        // response is already a Blob because
        // interview.api.js uses responseType: "blob"
        const url = window.URL.createObjectURL(response);

        const link = document.createElement("a");

        link.href = url;
        link.download = `resume_${interviewReportId}.pdf`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        // Give the browser time to start the download
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
        }, 1000);

    } catch (error) {

        console.error(
            "Failed to generate resume PDF:",
            error
        );

        throw error;

    } finally {

        setLoading(false);

    }
};

    // --------------------------------------------------
    // LOAD REPORTS
    // --------------------------------------------------

    useEffect(() => {

        if (interviewId) {

            getReportById(interviewId);

        } else {

            getReports();

        }

    }, [interviewId]);


    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getReports,
        getResumePdf
    };
};
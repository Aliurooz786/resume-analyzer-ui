# Resume AI Analyzer (Frontend)

This project is the frontend for the Resume AI Analyzer, a tool designed to help job seekers optimize their resumes for specific job descriptions. By leveraging the power of Google's Gemini AI (via a backend service), users can upload their resume, provide a job description, and receive a comprehensive analysis.

The analysis includes a match score, identifies key strengths from the resume, and offers actionable suggestions for improvement. The application is built with user privacy in mind, and no personal data or documents are stored on the server.

## Key Features

-   **Resume Upload:** Supports uploading resumes in PDF format.
-   **Job Description Input:** A dedicated text area to paste the job description you are applying for.
-   **AI-Powered Analysis:** Instantly get a detailed analysis of how well your resume matches the job requirements.
-   **Detailed Feedback:** View a percentage-based match score, a summary of your strengths, and concrete suggestions for improvement.
-   **Easy to Use:** A clean, single-click option to copy the analysis results to your clipboard.
-   **Privacy Focused:** All processing is done in real-time, and your data is never stored.

## Application Preview

<p align="center">
  <img src="public/screenshots/Screenshot 2025-07-13 at 2.24.20 PM.png" alt="Resume Analyzer Screenshot 1" width="600" />
  <br/>
  <img src="public/screenshots/Screenshot 2025-07-13 at 2.24.55 PM.png" alt="Resume Analyzer Screenshot 2" width="600" />
</p>

## Technology Stack

-   **Core:** React 18, HTML5, CSS3
-   **API Communication:** Native Fetch API for asynchronous requests.
-   **Development Environment:** Create React App (`react-scripts`)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js and npm installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

1.  **Clone the repository** to your local machine:
    ```bash
    git clone [https://github.com/Aliurooz786/resume-analyzer-ui.git](https://github.com/Aliurooz786/resume-analyzer-ui.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd resume-analyzer-ui
    ```

3.  **Install the required dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm start
    ```

After running the start command, the application will automatically open in your default web browser at `http://localhost:3000`.

**Note:** This is a frontend-only application. For full functionality, the corresponding backend server must be running locally, as the application makes API calls to it for the analysis.

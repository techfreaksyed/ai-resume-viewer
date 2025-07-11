AI Resume Reviewer is a full-stack web application designed to provide AI-driven feedback on resumes. The system includes:

- **Frontend:** An Angular application for uploading resumes and viewing feedback.
- **Backend:** A Node.js service (`backend-resume-reviewer`) with `server.js` as the main entry point, responsible for processing uploads and integrating AI analysis. Uploaded documents are securely stored in the `uploads` directory.

This platform helps users enhance their resumes by identifying strengths, pinpointing areas for improvement, and offering actionable suggestions.

AI Resume Reviewer is a web application that leverages artificial intelligence to analyze and provide feedback on resumes. Built with Angular, it helps users improve their resumes by highlighting strengths, identifying weaknesses, and offering actionable suggestions for enhancement.

## Features

- **AI-Powered Analysis:** Automatically reviews uploaded resumes and provides detailed feedback.
- **Actionable Suggestions:** Recommends improvements for formatting, content, and keywords.
- **User-Friendly Interface:** Simple and intuitive UI for uploading and reviewing resumes.
- **Real-Time Feedback:** Instantly see suggestions and make edits.

## Tech Stack

- **Frontend:** [Angular](https://angular.dev/) (TypeScript)
- **Backend:** Node.js (Express) 
- **AI Integration:** Gemini AI
- **File Handling:** PDF and DOCX parsing libraries
- **Testing:** Jasmine, Karma
- **Build Tools:** Angular CLI, npm

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Angular CLI](https://angular.dev/tools/cli)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/ai-resume-reviewer.git
cd ai-resume-reviewer
npm install
```

### Running the Application

Start the development server:

```bash
ng serve
```
To start the Node.js backend server, open a new terminal and run:

```bash
cd backend-resume-reviewer
npm install
node server.js
```

The backend will be available at [http://localhost:3000/](http://localhost:3000/).
Open your browser and navigate to [http://localhost:4200/](http://localhost:4200/).

## Usage

1. Upload your resume in PDF or DOCX format.
2. The AI analyzes your resume and displays feedback.
3. Review suggestions and update your resume accordingly.

## Testing

Run unit tests with:

```bash
ng test
```

## Building for Production

To build the project for production:

```bash
ng build --configuration production
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Angular](https://angular.dev/)
- [OpenAI](https://openai.com/)
- Community contributors

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.4.

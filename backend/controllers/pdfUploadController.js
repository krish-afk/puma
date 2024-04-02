const fs = require('fs');
const pdfParse = require('pdf-parse');

// Function to extract text from a PDF file
const extractTextFromPDF = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    try {
        const data = await pdfParse(dataBuffer);
        return data.text;
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        return null;
    }
};

extractTextFromPDF('/Users/fionagormley/Desktop/Transcript.pdf').then((text) => { // this needs to be replaced with the path to the user's transcript
const lines = text.split('\n');

const courseCompsciLine = /COMPSCI\s+(\d+).*?([A-F][+-]?)(?=\s|\d)/ //extracts only the course name and the associated grade
const courseMathLine = /MATH\s+(\d+).*?([A-F][+-]?)(?=\s|\d)/ //extracts only the course name and the associated grade

const transcript = [];
const csCourses = [];
const mathCourses = [];

lines.forEach(line => {
    console.log('Processing line:', line);
    const csMatch = line.match(courseCompsciLine);
    const mathMatch = line.match(courseMathLine);

    if (csMatch) {
        transcript.push({
            name: `COMPSCI ${csMatch[1]}`,
            grade: csMatch[2]
        });
    }
    if (mathMatch) {
        transcript.push({
            name: `MATH ${mathMatch[1]}`,
            grade: mathMatch[2]
        });
    }
});

console.log('transcript', transcript);
});





// const multer = require('multer'); // middleware for handling file uploads
// const pdfParse = require('pdf-parse'); 
// const upload = multer({ dest: 'uploads/' }); // will upload it to the uploads directory of server

// const uploadPdf = async (req, res) => { 
//     const file = req.file; //retrieves file from request and is populated by multer
//     if (!file) {
//         return res.status(400).send({ message: 'Please upload a file.' }); //if file hasn't actually been uploaded
//     }

//     try {
//         // Read the PDF file 
//         const buffer = file.buffer ? file.buffer : fs.readFileSync(file.path); //reads file from saved path on disk

//         // Extract course name and grade from PDF
//         const data = await pdfParse(buffer);


//         const text = data.text; // Extracted text from the PDF that we need!

        
        

//         // Respond with extracted text or other relevant information
//         res.send({ message: 'File uploaded successfully', text: text });
//     } catch (error) {
//         console.error('Error extracting text from PDF:', error);
//         res.status(500).send({ message: 'Could not extract text from PDF', error: error.message });
//     }
// };


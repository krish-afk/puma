const express = require('express');
const multer = require('multer'); // middleware for handling file uploads
const fs = require('fs');
const pdfParse = require('pdf-parse'); // used to parse the PDF and extract text

// Initialize express and multer
const app = express(); //initializes express application to set up server
const upload = multer({ dest: 'uploads/' }); // files will be saved in 'uploads/' directory

// Function to extract text from a PDF file ata  given file path
const extractTextFromPDF = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath); // reads file from saved path into a buffer
    try {
        const data = await pdfParse(dataBuffer); // parses the PDF to extract text
        return data.text; // returns the extracted text
    } catch (error) {
        console.error('Error extracting text from PDF:', error); // handles parsing errors
        return null;
    }
};

// Define a route to upload and process a PDF file
app.post('/upload-pdf', upload.single('file'), async (req, res) => { //defines a POST route on the upload endpoint of the server, its processing a sinlge file we're calling file
    const file = req.file; // retrieves file from request obj popualted by multer
    if (!file) {
        return res.status(400).send({ message: 'Please upload a file.' }); // if file hasn't actually been uploaded
    }

    const text = await extractTextFromPDF(file.path);

    if (!text) {
        return res.status(500).send({ message: 'Could not extract text from PDF' });
    }

    // Process the extracted text to find course names and grades
    const lines = text.split('\n');
    const courseCompsciLine = /COMPSCI\s+(\d+).*?([A-F][+-]?)(?=\s|\d)/; // extracts only the course name and the associated grade
    const courseMathLine = /MATH\s+(\d+).*?([A-F][+-]?)(?=\s|\d)/; // extracts only the course name and the associated grade

    const transcript = [];

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

   
    res.json({ message: 'File uploaded successfully', transcript: transcript });  //Respond with extracted text and transcript
});

app.listen(3000, () => {
    console.log('Server running on port 3000'); //starts the server
});


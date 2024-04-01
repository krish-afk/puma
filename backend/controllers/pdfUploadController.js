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

// Replace the path with the absolute path to your PDF file
extractTextFromPDF('/Users/fionagormley/Desktop/Transcript.pdf').then((text) => {
    const lines = text.split('\n');
    
    const courseCompsciLine = /COMPSCI\s+(\d+)\s+(.*?)\s+(\d+\.\d+[A-F][+-]?)/; // COMPSCI followed by any number of whitespace characters, followed by one or more digits, 
    // followed by any text (course description), followed by a decimal with any number of digist followed by another decimal with any number of digits, the ? makes the plus or minus optional
    // followed by a letter grade, either parentheses indicate what we are capturing
    const courseMathLine= /MATH\s+(\d+)\s+(.*?)\s+(\d+\.\d+[A-F][+-]?)/;

    const csCourses = []
    const mathCourses = []

        lines.forEach(line =>{
             CSmatch = lines.match(courseCompsciLine);
            MAmatch = lines.match(courseMathLine);
            if(CSmatch){
                csCourses.push({
                code: `COMPSCI ${match[1]}`,
                title: match[2],
                credits: match[3]
                });
            }
        });
            
  



    console.log(text);
    // You can now see what the extracted text looks like
});





// const multer = require('multer'); // middleare for handling file uploads
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

//         // Extract text from PDF
//         const data = await pdfParse(buffer);
//         const text = data.text; // Extracted text from the PDF that we need!

        
        

//         // Respond with extracted text or other relevant information
//         res.send({ message: 'File uploaded successfully', text: text });
//     } catch (error) {
//         console.error('Error extracting text from PDF:', error);
//         res.status(500).send({ message: 'Could not extract text from PDF', error: error.message });
//     }
// };


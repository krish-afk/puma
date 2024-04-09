
const multer = require('multer'); // middleware for handling file uploads
const pdfParse = require('pdf-parse'); // used to parse the PDF and extract text
const router = express.Router(); // creates a router instance
// Initialize express and multer
const upload = multer(); // no need to specify a destination for multer, as we won't be storing the file

// Function to extract text from a PDF file at a given file buffer
exports.extractTextFromPDF = async (fileBuffer) => {
    try {
        const data = await pdfParse(fileBuffer); // parses the PDF to extract text
        return data.text; // returns the extracted text
    } catch (error) {
        console.error('Error extracting text from PDF:', error); // handles parsing errors
        return null;
    }
};

// Define a route to upload and process a PDF file
router.post('/upload-pdf', upload.single('file'), async (req, res) => {// defines a router 
    const fileBuffer = req.file.buffer; // retrieves file buffer from request obj populated by multer
    if (!fileBuffer) {
        return res.status(400).send({ message: 'Please upload a file.' }); // if file buffer is missing
    }

    const text = await extractTextFromPDF(fileBuffer); // returns all of the text in a transcript from the PDF the user uploaded

    if (!text) {
        return res.status(500).send({ message: 'Could not extract text from PDF' });
    }

    // Process the extracted text to find course names and grades
    const lines = text.split('\n');

    const courseCompsciLine = /COMPSCI\s+([A-Z]?\d+).*?([A-F][+-]?)(?=\s|\d)/ //extracts only the course name and the associated grade
    const courseCICSLine = /CICS\s+([A-Z]?\d+).*?([A-F][+-]?)(?=\s|\d)/ //extracts only the course name and the associated grade
    const courseMathLine = /MATH\s+([A-Z]?\d+).*?([A-F][+-]?)(?=\s|\d)/ //extracts only the course name and the associated grade
    const gradeForCoursesWithLettersInNums = /\d+\.\d+([A-Z])\d+\.\d+/ //handles courses with letters attached to course number
    const gradeForJrYearWriting = /ENGLWRIT\s+([A-Z]?\d+).*?([A-F][+-]?)(?=\s|\d)/ 
    const transcript = [];
    
    lines.forEach(line => {
        console.log('Processing line:', line);
        const csMatch = line.match(courseCompsciLine);
        const mathMatch = line.match(courseMathLine);
        const gradeMatch = line.match(gradeForCoursesWithLettersInNums);
        const cicsMatch = line.match(courseCICSLine);
        const englMatch = line.match(gradeForJrYearWriting);

        if(englMatch){
            if(csMatch[1] === '112'){
                transcript.push({
                    name: "ENGLWRIT112",
                    grade: gradeMatch[1]
            });
            }
        }
    
        if (csMatch) {
            if(csMatch[1] === '198'){
                transcript.push({
                    name: "CS198C",
                    grade: gradeMatch[1]
                });
            }

            else if(csMatch[1] === '186'){
                transcript.push({
                    name: "CS160",
                    grade: gradeMatch[1]
                });
            }

            else if(csMatch[1] === '187'){
                transcript.push({
                    name: "CS210",
                    grade: gradeMatch[1]
                });
            }

            else if(csMatch[1] === '121'){
                transcript.push({
                    name: "CS110",
                    grade: gradeMatch[1]
                });
            }
            
            else if(csMatch[1] === '490'){
                transcript.push({
                    name: "CS490Q",
                    grade: gradeMatch[1]
                });
            }
    
            else if(csMatch[1] === '590'){
                transcript.push({
                    name: "CS590X",
                    grade: gradeMatch[1]
                });
            }
    
            else if(csMatch[1] === '596'){
                transcript.push({
                    name: "CS596E",
                    grade: gradeMatch[1]
                });
            }
    
            else if(csMatch[1] === '690'){
                transcript.push({
                    name: "CS690K",
                    grade: gradeMatch[1]
                });
            }
    
            else{
            transcript.push({
                name: `CS${csMatch[1]}`,
                grade: csMatch[2]
            });
            }
        }

        if(cicsMatch){
            if(cicsMatch[1] === '291'){
                transcript.push({
                    name: "CICS91T",
                    grade: gradeMatch[1]
                });
            }

            else if(cicsMatch[1] === '298'){
                transcript.push({
                    name: "CICS298A",
                    grade: gradeMatch[1]
                });
            }
            
            else{
                transcript.push({
                    name: `CICS${csMatch[1]}`,
                    grade: csMatch[2]
                });
            }
        }
    
        if (mathMatch) {
            transcript.push({
                name: `MATH${mathMatch[1]}`,
                grade: mathMatch[2]
            });
        }
    });
    
    console.log('transcript', transcript);

    res.json({ message: 'File uploaded successfully', transcript: transcript });  // Respond with extracted text and transcript
});

module.exports = router;




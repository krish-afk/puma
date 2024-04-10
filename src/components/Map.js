import './Map.css';
import { useState, useEffect } from 'react';
import "@fontsource/league-spartan/800.css";
import Course from './CourseClass';
import axios from 'axios';

export default function Map() {
    const [result, setResults] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Searching");
                const response = await axios.get('http://localhost:8000/getClass?course=CS110');
                console.log(response.data);
                setResults(response.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error searching:', error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        // Render loading state while data is being fetched
        return <div>Loading...</div>;
    }

    // Check if result and result.courseInfo exist before accessing Prerequisites
    var prereqs = result && result.courseInfo ? result.courseInfo.Prerequisites : [];
    console.log("PPREREQ", prereqs);

    // example that would be returned in query:
    var courseName = result && result.courseInfo ? result.courseInfo.Name : "";
    var parentCourse = new Course(220, "CS", "Programming Methodology", "...", prereqs && prereqs.length > 0 ? prereqs[0][0] : []);

    const results = [parentCourse];
    console.log(results)
    return (
        <div className="prereq-list">
            <ul>
                {results.map((course) => (
                    <h3 key={course.id} className="course-name">{courseName}</h3>
                ))}
            </ul>
            <div className="container">
                <ul>
                    {results.map((course) => (
                        <p key={course.id}>Prerequisites: {course.prereqs}</p>
                    ))}
                </ul>
                <button class="popup" onClick="openPopup()">Course Description</button>
                <div class= "popup" id='popup1'>
                    <div class= "popup-header">Course Description</div>
                    <div className="popup-body">{result.courseInfo ? result.courseInfo.description : 'Course Information not avaliable at this time'}</div>
                </div>
                <script>
                   function openPopup() {
                     document.getElementById("popup1").classList.toggle("show")
                   }
                </script>
                <div id="overlay"></div>
                <div className="top-bar">
                    <div className="menu-icon">
                        <div className="menu-line"></div>
                        <div className="menu-line"></div>
                        <div className="menu-line"></div>
                    </div> {/* Add a div for the menu icon */}
                </div>
            </div>
        </div>
    );
}

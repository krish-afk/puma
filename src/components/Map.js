import './Map.css';
import { useState, useEffect } from 'react';
import "@fontsource/league-spartan/800.css";
import Course from './CourseClass';
import axios from 'axios';
import CustomMenu from './Menu'; // Import the CustomMenu component


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
                <h3 className="course-name">{courseName}</h3>
            </ul>
            <div className="container">
                <ul>
                    <p>Prerequisites: {parentCourse.prereqs}</p>
                </ul>
                <div className="top-bar">
                    <CustomMenu /> {/* Render the CustomMenu component */}
                </div>
            </div>
        </div>
    );
}

import './Map.css';
import { useState, useEffect } from 'react';
import "@fontsource/league-spartan/800.css";
import Course from './CourseClass';
import axios from 'axios';
import { CastRounded } from '@mui/icons-material';
import CustomMenu from './Menu'; // Import the CustomMenu component


export default function Map() {
    const [result, setResults] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    let link = 'http://localhost:8000/getClass?course=COMPSCI220'
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(link);
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
    //console.log("PREREQS", prereqs); //this is to print the prereqs.

    // example that would be returned in query:
    console.log(result.courseInfo.Name)
    var parentCourse = new Course(link.substring(40, 43), "CS", result.courseInfo.Name.substring(9), "...", prereqs && prereqs.length > 0 ? prereqs: []);
    const results = [parentCourse];
    return (
        <div className="prereq-list">
            <ul>
                {results.map((course) => (
                    <h3 key={course.id} className="course-name">{course.dept + course.id + " - " + course.name}</h3>
                ))}
            </ul>
            <div className="container">
                <ul>
                    {results.map((course) => (
                        <p key={course.id}>Prerequisites:<br></br> {course.prereqs.map(list => list.map(set => set[0] + " "))}</p>
                    ))}
                </ul>
                <div className="top-bar">
                    <CustomMenu /> {/* Render the CustomMenu component */}
                </div>
            </div>
        </div>
    );
}

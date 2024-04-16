import './Map.css';
import { useState, useEffect } from 'react';
import "@fontsource/league-spartan/800.css";
import Course from './CourseClass';
import axios from 'axios';
import './Tree.css';
import { useParams } from 'react-router-dom';
import CustomMenu from './Menu.js'; // Import CustomMenu component
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

var treeData = []

export default function Map() {
    const [result, setResults] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [treeReady, setTreeReady] = useState(false); 

    const { query } = useParams();
    const searchResult = query.toUpperCase();
    useEffect(() => {
        const fetchData = async (searchCourse) => {
            try {
                const response = await axios.get('https://puma-backend-1.onrender.com/courses/getClass?course='+searchCourse);
                setResults(response.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error searching:', error);
            }
        };
        fetchData(searchResult);
    }, []);
    useEffect(() => {
        if (!loading && result) {
         
            createTree(result).then(() => {
                setTreeReady(true); // Set tree ready state to true after creating the tree
            });
        }
    }, [loading, result]);
    //thus far, we have queried for the required class
    if (loading) {
        // Render loading state while data is being fetched
        return <div>Loading...</div>;
    }
    if (!treeReady) {
        return null; // Don't render anything until the tree is ready
    }
    //rendered loading state if loading
    var prereqs = result ? result.Prerequisites : [];
    var courseName = result ? result.Name : "";
    var parentCourse = new Course(709, "CS", "Bizarre Foods", "...", prereqs && prereqs.length > 0 ? prereqs[0][0] : []);
    //createTree(result.courseInfo);
    const results = [parentCourse];
    return (
        <div className="prereq-list">
            <ul>
                {results.map((course) => (
                    <h3 key={course.id} className="course-name">{courseName}</h3>
                ))}
            </ul>
            <div className="container">
                <div className="tree">
                    {
                        treeRendering(treeData)
                    }               
                </div>
                <ul>
                    {results.map((course) => (
                        <p key={course.id}> </p>//Prerequisites: {course.prereqs}</p> 
                    ))}
                </ul>
                <div className="top-bar">
                    <CustomMenu />
                    <Link to={`/search/`}>
                        <button type="submit" className="search-button-map" onClick="window.location.reload();">
                            <SearchIcon className="search-icon" style={{ fontSize: 40 }} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

async function createTree(courseInfo) {
    try {
        //treeData.push(await createNode(courseInfo));
        var respite = await createNode(courseInfo)
        treeData.push(respite)
    } catch (error) {
        console.error('Error creating tree:', error);
    }
}

const createNode = async (courseInfo) => {
    if(courseInfo.Prerequisites.length === 0){
        return {
            id: courseInfo._id,
            name: courseInfo.compName,
            diamond: false,
            children: []
        };
    }
    else{
    try {
        var Prereqs = [];
        // Create an array to store promises for fetching prerequisite courses
        const promises = [];
        for (let i = 0; i < courseInfo.Prerequisites.length; ++i) {
            let list = courseInfo.Prerequisites[i];
            for (let j = 0; j < courseInfo.Prerequisites[i].length; ++j) {
                // Push each promise to the array
                let link = 'https://puma-backend-1.onrender.com/courses/getClass?course=' + courseInfo.Prerequisites[i][j][0]
                promises.push(axios.get(link));
            }
        }
        // Wait for all promises to resolve using Promise.all
        const responses = await Promise.all(promises);
        console.log(responses)
        // Process the responses to create prerequisite nodes
        //console.log(responses[0].data.courseInfo.Name)
        
        let obj1 = createNode(responses[0].data)
        Prereqs = await Promise.all(responses.map(resp => createNode(resp.data)));
        return {
            id: courseInfo._id,
            name: courseInfo.compName,
            diamond: false,
            children: Prereqs
        };
    } catch (error) { // Handle errors gracefully
        console.log("error reached")
        return {
            id: courseInfo._id,
            name: courseInfo.compName,
            diamond: false,
            children: []
        };
        }
    }
}
//console.log("This is treeData " + treeData.length)
const treeRendering = (treeData) => {
    return (
        <ul>
        {
            treeData.map((item)=>                
                <li className={item.name+item.id}>
                    <div>{item.name}</div>
                    {
                        item.children && item.children.length ?
                        treeRendering(item.children)
                        :''
                    }
                </li>
            )                    
        }
        </ul>
    )
}

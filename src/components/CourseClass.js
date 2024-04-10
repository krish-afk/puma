class Course {
    id;
    dept;
    name;
    description;
    prereqs;
    // graph: Graph;
    constructor(id,dept,name,description,prereqs){
        this.id = id;
        this.dept = dept;
        this.name = name;
        this.description = description;
        this.prereqs = prereqs; // tuple of [course, grade]
        // this.graph = new Graph(self,1,this.prereqs,this.prereqs.length)
    }
}

export default Course;

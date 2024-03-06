// Course class
class Course {
    id: number;
    dept: string;
    name: string;
    description: string;
    prereqs: Course[];
    // graph: Graph;
    constructor(id,dept,name,description,prereqs){
        this.id = id;
        this.dept = dept;
        this.name = name;
        this.description = description;
        this.prereqs = prereqs;
        // this.graph = new Graph(self,1,this.prereqs,this.prereqs.length)
    }
}

// example:
const cs220 = new Course(220,"CS","Programming Methodology","...",[]);

// might not need separate graph class
// class Graph {
//     head: Course;
//     height: number;
//     children: Graph[];
//     numChildren: number;
//     constructor(head,height,children,numChildren){
//         this.head = head;
//         this.height = height;
//         this.children = children;
//         this.numChildren = numChildren;
//     }
// }
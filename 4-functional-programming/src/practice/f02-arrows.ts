

()=>{


  const students: Array<Student> = [
    { name: 'John', class: 'A', score: 50 },
    { name: 'James', class: 'A', score: 53 },
    { name: 'George', class: 'A', score: 86 },
    { name: 'John', class: 'B', score: 75 },
  ];
  
// A => B
const filterByClassA = (students:Array<Student>):Array<Student> => students.filter(students=>students.class==='A');
// B => C
const sortByScore = (students:Array<Student>):Array<Student> => [...students].sort((s1,s2)=>s1.score-s2.score);
// C => D
const getFirstAndLastStudent= (students:Array<Student>):[Student,Student] => [students[0],students[students.length-1]];

// D <- C <- B <- A
const [lowestScoreStudent, highestScoreStudent] = getFirstAndLastStudent(sortByScore( filterByClassA(students)))

 /**
  * We can go from A to D using composition
    ad = cd ∘ bc ∘ ab
    ad(a) -> D
    getLowestAndHighestScoreStudents = getFirstAndLastStudents ∘ sortByScore ∘ filterByClassA
    getLowestAndHighestScoreStudents(students) -> [Student, Student]* We can use composition to go form A to D 
  */


    

}

export interface Student {
  name: string;
  score: number;
  class: string;
};
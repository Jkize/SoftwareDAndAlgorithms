import { Edge, Graph, ImpDijkstra, Vertex } from "./dijkstra";
import { WeightedGraph } from "./interfaces";

example1();
console.log( "\n" );
example2();


function example1(){
    const V1 = new Vertex("1");
    const V2 = new Vertex("2");
    const V3 = new Vertex("3");
    const V4 = new Vertex("4");
    const V5 = new Vertex("5");

    const vertices = [V1,V2,V3,V4,V5];
    const edges = [
        new Edge(V1, V4, 3),
        new Edge(V1, V2, 5),
        new Edge(V1, V3, 4),
        new Edge(V2, V4, 6),
        new Edge(V2, V3, 5),
      ];
      const graph = new Graph();
      vertices.forEach(verticle => graph.addVertex(verticle));
      edges.forEach(edge => graph.addEdge(edge.from, edge.to, edge.weight));
    const dijkstra = new ImpDijkstra(graph);

    console.log(`\n\n******* Example 1 ********`);
    console.log( dijkstra.findShortestPath(V4, V3)); // { path: ['4', '1', '3'], distance: 7 }
    console.log( dijkstra.findShortestPath(V1, V5)); // { path: [], distance: Infinity }
    console.log( dijkstra.findShortestPath(V1, V1)); // { path: ['1'], distance: 0 }
  
    console.log(dijkstra.findAllShortestPaths(V4));

}

function example2(){
    const A = new Vertex("A");
    const B = new Vertex("B");
    const C = new Vertex("C");
    const D = new Vertex("D");
    const E = new Vertex("E");
    const F = new Vertex("F");
    const G = new Vertex("G");
    
    const listVertex = 
    [A,B,C,D,E,F,G];
    
    const listEdges = [
        new Edge(A,B,2),
        new Edge(A,D,8),
        new Edge(B,D,5),
        new Edge(B,E,6),
        new Edge(D,E,3),
        new Edge(D,F,2),
        new Edge(E,C,9),
        new Edge(E,F,1),
        new Edge(F,C,3),
    ];
    
    const graph = new Graph();
    listVertex.forEach((v) => graph.addVertex(v.id));
    listEdges.forEach((e) => graph.addEdge(e.from, e.to, e.weight));
    
    const dijkstra = new ImpDijkstra(graph);
    
    console.log("***** All Paths FROM A To Everyone ***** \n", dijkstra.findAllShortestPaths(A),"\n");
    console.log("Path From A to C: ", dijkstra.findShortestPath(A,C));
    console.log("Path From F to A: ", dijkstra.findShortestPath(F,A));
    console.log("Path From B to G: ", dijkstra.findShortestPath(B,G));
}






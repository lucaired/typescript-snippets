import { Graph, RawStreet } from './meadowField';

const combinedLocations: Array<RawStreet> = [
    "Willow Lane-Maple Grove",
    "Sunset Path-Birch Crossing",
    "Oak Hollow-Pinecrest Way",
    "Cloverfield Road-Meadowbrook Drive",
    "Foxglove Trail-Riverbend Avenue",
    "Elm Street-Sycamore Circle",
    "Bluebell Walk-Thistle Court",
    "Fernridge Lane-Stonegate Road",
    "Maple Grove-Sunset Path",
    "Birch Crossing-Oak Hollow",
    "Pinecrest Way-Cloverfield Road",
    "Meadowbrook Drive-Foxglove Trail",
    "Riverbend Avenue-Elm Street",
    "Sycamore Circle-Bluebell Walk",
    "Thistle Court-Fernridge Lane",
    "Stonegate Road-Willow Lane"
];

describe('buildGraph', () => {
    it('should build a graph with correct uni-directional edges from combinedLocations', () => {
        const graph = Graph.fromRawStreets(combinedLocations);
        // Check a few known edges
        expect(graph["Willow Lane"]).toContain("Maple Grove");
        expect(graph["Maple Grove"]).toContain("Sunset Path");
        expect(graph["Stonegate Road"]).toContain("Willow Lane");
        expect(graph["Elm Street"]).toContain("Sycamore Circle");
        // Check that all sources exist as keys
        combinedLocations.forEach(loc => {
            const [from, to] = loc.split('-');
            expect(graph[from]).toContain(to);
        });
    });
});

describe('vertexNeighborsCount', () => {
    it('should return a map with the correct neighbor counts for each vertex', () => {
        // Create a Graph instance and manually set the graph property for testing
        const graphInstance = new Graph();
        // Use the static method to get the graph structure
        const graphData = Graph.fromRawStreets(combinedLocations);
        // @ts-expect-error: Accessing private property for test purposes
        graphInstance.graph = graphData;
        const counts = graphInstance.vertexNeighborsCount();
        // Each vertex in combinedLocations should have exactly 1 neighbor
        combinedLocations.forEach(loc => {
            const [from] = loc.split('-');
            expect(counts.get(from)).toBe(1);
        });
        // The map should have as many keys as there are unique sources
        const uniqueSources = new Set(combinedLocations.map(loc => loc.split('-')[0]));
        expect(counts.size).toBe(uniqueSources.size);
    });
});


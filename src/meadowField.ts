export type RawStreet = `${string}-${string}`;

export class Graph {
    private graph: { [key: string]: string[] };
    constructor() {
        this.graph = {};
    }
    /**
     * Builds a graph containing uni-directional edges connecting one location to a set
     * of other locations (1-n).
     * 
     * @param rawStreets (Array<RawStreet>): set of raw edge data in a specific format
     */
    static fromRawStreets(rawStreets: Array<RawStreet>) {
        const graph: Record<string, string[]> = {};
        function buildEdge(from: string, to: string) {
            if (from in graph) {
                graph[from].push(to);
            } else {
                graph[from] = [to];
            }
        }
        const parsedStreets = rawStreets.map((rawStreet) => rawStreet.split('-'));
        for (const [from, to] of parsedStreets) {
            buildEdge(from, to);
        }
        return graph;
    }

    public vertexNeighborsCount(): Map<string, number> {
        return Object.entries(this.graph).reduce((acc, curr) => acc.set(curr[0], curr[1].length), new Map<string, number>());
    }
}

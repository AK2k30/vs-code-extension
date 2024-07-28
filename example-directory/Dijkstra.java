import java.util.*;

public class Dijkstra {

    private static final int INF = Integer.MAX_VALUE;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Get the number of nodes and edges
        int n = scanner.nextInt();
        int m = scanner.nextInt();

        // Create the adjacency list
        List<List<Edge>> adjList = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adjList.add(new ArrayList<>());
        }

        // Get the edges
        for (int i = 0; i < m; i++) {
            int u = scanner.nextInt();
            int v = scanner.nextInt();
            int w = scanner.nextInt();
            adjList.get(u).add(new Edge(v, w));
        }

        // Get the source node
        int s = scanner.nextInt();

        // Run Dijkstra's algorithm
        int[] distances = dijkstra(adjList, s);

        // Print the distances
        for (int i = 0; i < n; i++) {
            System.out.println(distances[i]);
        }
    }

    private static int[] dijkstra(List<List<Edge>> adjList, int s) {
        // Initialize the distances
        int[] distances = new int[adjList.size()];
        for (int i = 0; i < adjList.size(); i++) {
            distances[i] = INF;
        }
        distances[s] = 0;

        // Create a priority queue
        PriorityQueue<Edge> pq = new PriorityQueue<>();
        pq.add(new Edge(s, 0));

        // While the priority queue is not empty
        while (!pq.isEmpty()) {
            // Get the next edge
            Edge edge = pq.poll();

            // If the distance to the current node is greater than the distance to the previous node
            if (distances[edge.v] > distances[edge.u] + edge.w) {
                // Update the distance to the current node
                distances[edge.v] = distances[edge.u] + edge.w;

                // Add the current node to the priority queue
                pq.add(new Edge(edge.v, distances[edge.v]));
            }
        }

        // Return the distances
        return distances;
    }

    private static class Edge implements Comparable<Edge> {
        int v;
        int w;

        public Edge(int v, int w) {
            this.v = v;
            this.w = w;
        }

        @Override
        public int compareTo(Edge other) {
            return Integer.compare(this.w, other.w);
        }
    }
}
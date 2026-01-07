import { Graph } from "../types/graph";

const KEY = "graphs";

export function getGraphs(): Graph[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(KEY);
  if (!data) return [];
  return JSON.parse(data);
}

export function saveGraphs(graphs: Graph[]) {
  localStorage.setItem(KEY, JSON.stringify(graphs));
}

export function addGraph(graph: Graph) {
  const graphs = getGraphs();
  graphs.push(graph);
  saveGraphs(graphs);
}

export function updateLastOpened(id: string) {
  const graphs = getGraphs();
  const updated = graphs.map((g) =>
    g.id === id ? { ...g, lastOpened: Date.now() } : g
  );
  saveGraphs(updated);
}

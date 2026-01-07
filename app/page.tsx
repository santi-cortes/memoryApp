"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Graph } from "./types/graph";
import { getGraphs, updateLastOpened } from "./lib/storage";

export default function HomePage() {
  const [graphs, setGraphs] = useState<Graph[]>([]);

  useEffect(() => {
    const data = getGraphs();
    setGraphs(
      data.sort((a, b) => b.lastOpened - a.lastOpened)
    );
  }, []);

  const openGraph = (id: string) => {
    updateLastOpened(id);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-4 pb-24">
      <h1 className="text-2xl font-extrabold">Mis gráficos</h1>

      <p className="text-neutral-400 text-sm mb-4">
        Mapas de conocimiento guardados
      </p>

      {graphs.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg font-semibold">
            Aún no tienes gráficos
          </p>
          <p className="text-neutral-400 text-sm mt-2">
            Toca el botón + para crear uno nuevo
          </p>
        </div>
      )}

      <div className="space-y-3">
        {graphs.map((g) => (
          <Link
            key={g.id}
            href={`/graph/${g.id}`}
            onClick={() => openGraph(g.id)}
            className="block rounded-2xl border border-white/10 bg-neutral-900 p-4 active:scale-[0.99] transition"
          >
            <div
              className="w-3 h-3 rounded-full mb-2"
              style={{ backgroundColor: g.color }}
            />

            <h2 className="text-lg font-bold">{g.title}</h2>

            {g.description && (
              <p className="text-neutral-400 text-sm mt-1 line-clamp-2">
                {g.description}
              </p>
            )}

            <p className="text-neutral-500 text-xs mt-2">
              Última actividad:{" "}
              {new Date(g.lastOpened).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>

      {/* FAB botón flotante */}
      <Link
        href="/new"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-3xl"
      >
        +
      </Link>
    </main>
  );
}

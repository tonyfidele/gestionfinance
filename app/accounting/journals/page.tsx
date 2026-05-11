"use client";

import { useState } from "react";

const JournalsPage = () => {
  const [journals] = useState([
    { code: "ACH", name: "Achats" },
    { code: "VTE", name: "Ventes" },
    { code: "BNK", name: "Banque" },
    { code: "CAI", name: "Caisse" },
    { code: "OD", name: "Opérations diverses" },
  ]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Journaux comptables</h1>
          <p className="text-base-content/70">
            Organisation des écritures comptables
          </p>
        </div>

        <button className="btn btn-accent">
          + Nouveau journal
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Libellé</th>
            </tr>
          </thead>
          <tbody>
            {journals.map((journal) => (
              <tr key={journal.code}>
                <td className="font-mono">{journal.code}</td>
                <td>{journal.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JournalsPage;
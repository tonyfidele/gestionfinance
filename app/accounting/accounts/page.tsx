"use client";

import { useState } from "react";

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([
    { code: "512", name: "Banque", type: "ASSET" },
    { code: "401", name: "Fournisseurs", type: "LIABILITY" },
    { code: "601", name: "Achats", type: "EXPENSE" },
    { code: "701", name: "Ventes", type: "INCOME" },
  ]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Plan comptable</h1>
          <p className="text-base-content/70">
            Liste des comptes comptables
          </p>
        </div>

        <button className="btn btn-accent">
          + Nouveau compte
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Libellé</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.code}>
                <td>{account.code}</td>
                <td>{account.name}</td>
                <td>
                  <span className="badge">
                    {account.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountsPage;
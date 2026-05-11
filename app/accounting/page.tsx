import Link from "next/link";

const AccountingPage = () => {
  return (
    <div className="p-6">
      {/* Titre */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Comptabilité</h1>
        <p className="text-base-content/70">
          Vue d’ensemble de la comptabilité de votre entreprise
        </p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Total Débit</h2>
            <p className="text-2xl font-bold text-success">1 250 000 FCFA</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Total Crédit</h2>
            <p className="text-2xl font-bold text-error">1 250 000 FCFA</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Résultat</h2>
            <p className="text-2xl font-bold">0 FCFA</p>
          </div>
        </div>
      </div>

      {/* Accès rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/accounting/accounts" className="card bg-base-200 hover:bg-base-300 transition">
          <div className="card-body">
            <h2 className="card-title">Plan comptable</h2>
            <p>Gérer les comptes</p>
          </div>
        </Link>

        <Link href="/accounting/journals" className="card bg-base-200 hover:bg-base-300 transition">
          <div className="card-body">
            <h2 className="card-title">Journaux</h2>
            <p>Ventes, achats, banque…</p>
          </div>
        </Link>

        <Link href="/accounting/entries" className="card bg-base-200 hover:bg-base-300 transition">
          <div className="card-body">
            <h2 className="card-title">Écritures</h2>
            <p>Saisir et consulter</p>
          </div>
        </Link>

        <Link href="/accounting/reports" className="card bg-base-200 hover:bg-base-300 transition">
          <div className="card-body">
            <h2 className="card-title">Rapports</h2>
            <p>Balance, grand livre</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AccountingPage;
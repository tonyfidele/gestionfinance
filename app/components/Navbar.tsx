"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    fetch("/api/user/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  }, [user]);

  return (
    <div className="bg-base-200/30 px-5 md:px-[10%] py-4">
      {isLoaded &&
        (isSignedIn ? (
          <>
            <div className="flex justify-between items-center">
              <div className="flex text-2xl items-center font-bold">
                e <span className="text-accent">.Track</span>
              </div>

              <div className="md:flex hidden">
                <Link href="/budjets" className="btn">
                  Mes budgets
                </Link>
                <Link href="/dashboard" className="btn mx-4">
                  Tableau de bord
                </Link>
                <Link href="/transactions" className="btn">
                  Mes transactions
                </Link>
                 
              <div className="dropdown dropdown-hover">
  <label tabIndex={0} className="btn">
    Comptabilité
  </label>
  <ul
    tabIndex={0}
    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
  >
    <li><Link href="/accounting/accounts">Plan comptable</Link></li>
    <li><Link href="/accounting/journals">Journaux</Link></li>
    <li><Link href="/accounting/entries">Écritures</Link></li>
    <li><Link href="/accounting/reports">Rapports</Link></li>
  </ul>
</div>
              </div>

              <UserButton />
            </div>

            <div className="md:hidden flex mt-2 justify-center gap-2">
              <Link href="/budjets" className="btn btn-sm">
                Budgets
              </Link>
              <Link href="/dashboard" className="btn btn-sm">
                Dashboard
              </Link>
              <Link href="/transactions" className="btn btn-sm">
                Transactions
              </Link>
              
              <div className="dropdown dropdown-hover">
  <label tabIndex={0} className="btn btn-sm">
    Comptabilité
  </label>
  <ul
    tabIndex={0}
    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
  >
    <li><Link href="/accounting/accounts">Plan comptable</Link></li>
    <li><Link href="/accounting/journals">Journaux</Link></li>
    <li><Link href="/accounting/entries">Écritures</Link></li>
    <li><Link href="/accounting/reports">Rapports</Link></li>
  </ul>
</div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex text-2xl items-center font-bold">
              e <span className="text-accent">.Track</span>
            </div>

            <div className="flex gap-2">
              <Link href="/sign-in" className="btn btn-sm">
                Se connecter
              </Link>
              <Link href="/sign-up" className="btn btn-sm btn-accent">
                S'inscrire
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Navbar;

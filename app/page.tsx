import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import BudgetItem from "./components/BudgetItem";
import budgets from "./data";
import { Budget } from "@/type";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Prenez le contrôle <br /> de vos finances
        </h1>
        <p className="text-gray-700 mb-8">
          Suivez vos budgets et vos dépenses <br /> en toute simplicité avec
          notre application intuitive !
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/sign-in"
            className="btn btn-sm md:btn-md btn-outline btn-accent"
          >
            Se connecter
          </Link>
          <Link
            href="/sign-up"
            className="btn btn-sm md:btn-md btn-accent"
          >
            S'inscrire
          </Link>
        </div>
            <ul className="grid md:grid-cols-3 mt-6 gap-4 md:min-w-[1200px]">
              {budgets.map((Budget) => (
                <Link href={""} key={Budget.id}>
                  <BudgetItem budget={Budget} enableHover={1}></BudgetItem>
                </Link>
              ))}
            </ul>
      </main>
    </div>
  );
}

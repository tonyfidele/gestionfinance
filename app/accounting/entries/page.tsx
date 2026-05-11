"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

// Schema de validation
const entrySchema = z.object({
  date: z.string().nonempty("La date est obligatoire"),
  journal: z.string().nonempty("Le journal est obligatoire"),
  description: z.string().nonempty("La description est obligatoire"),
  lines: z
    .array(
      z.object({
        account: z.string().nonempty("Le compte est obligatoire"),
        type: z.enum(["DEBIT", "CREDIT"]),
        amount: z.number().positive("Le montant doit être positif"),
      })
    )
    .min(1, "Au moins une ligne est requise"),
});

type EntryFormData = z.infer<typeof entrySchema>;

export default function NewEntryForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EntryFormData>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      date: "",
      journal: "",
      description: "",
      lines: [{ account: "", type: "DEBIT", amount: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lines",
  });

  const [submitError, setSubmitError] = useState("");

  const onSubmit = (data: EntryFormData) => {
    const totalDebit = data.lines
      .filter((l) => l.type === "DEBIT")
      .reduce((acc, l) => acc + l.amount, 0);
    const totalCredit = data.lines
      .filter((l) => l.type === "CREDIT")
      .reduce((acc, l) => acc + l.amount, 0);

    if (totalDebit !== totalCredit) {
      setSubmitError(
        `Le total Débit (${totalDebit}) doit être égal au total Crédit (${totalCredit})`
      );
      return;
    }

    console.log("Écriture validée ✅", data);
    // TODO: envoyer à l'API /api/entries
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nouvelle écriture</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Date */}
        <div>
          <label className="label">Date</label>
          <input
            type="date"
            {...register("date")}
            className="input input-bordered w-full"
          />
          {errors.date && <p className="text-error">{errors.date.message}</p>}
        </div>

        {/* Journal */}
        <div>
          <label className="label">Journal</label>
          <input
            type="text"
            {...register("journal")}
            className="input input-bordered w-full"
          />
          {errors.journal && <p className="text-error">{errors.journal.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <input
            type="text"
            {...register("description")}
            className="input input-bordered w-full"
          />
          {errors.description && <p className="text-error">{errors.description.message}</p>}
        </div>

        {/* Lignes Débit/Crédit */}
        <div>
          <label className="label font-bold">Lignes</label>
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-4 gap-2 mb-2">
              <input
                type="text"
                placeholder="Compte"
                {...register(`lines.${index}.account` as const)}
                className="input input-bordered col-span-1"
              />

              <select
                {...register(`lines.${index}.type` as const)}
                className="select select-bordered col-span-1"
              >
                <option value="DEBIT">Débit</option>
                <option value="CREDIT">Crédit</option>
              </select>

              <input
                type="number"
                placeholder="Montant"
                {...register(`lines.${index}.amount`, { valueAsNumber: true })}
                className="input input-bordered col-span-1"
              />

              <button
                type="button"
                className="btn btn-error btn-sm"
                onClick={() => remove(index)}
              >
                Supprimer
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-accent btn-sm mt-2"
            onClick={() => append({ account: "", type: "DEBIT", amount: 0 })}
          >
            + Ajouter une ligne
          </button>
        </div>

        {submitError && <p className="text-error font-bold">{submitError}</p>}

        <button type="submit" className="btn btn-primary mt-4">
          Valider l'écriture
        </button>
      </form>
    </div>
  );
}
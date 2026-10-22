import { NextResponse } from "next/server";
import { siteConfig } from "@/components/landing/site-config";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, school, email, phone, message } = data;

    if (!name || !school || !email) {
      return NextResponse.json(
        { error: "Veuillez renseigner tous les champs obligatoires." },
        { status: 400 }
      );
    }

    // Journalisation du contact reçu côté serveur
    console.log("[CreateX School Lead]", {
      destination: siteConfig.contact.email,
      date: new Date().toISOString(),
      name,
      school,
      email,
      phone: phone || "Non renseigné",
      message: message || "Non renseigné",
    });

    return NextResponse.json({
      success: true,
      message: `Demande reçue pour transmission directe à ${siteConfig.contact.email}`,
      target: siteConfig.contact.email,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Erreur lors du traitement de la demande." },
      { status: 500 }
    );
  }
}

import React from "react";
import { notFound } from "next/navigation";
import { themes } from "../../../data/sora-content";
import ThemeK1 from "../../../components/ThemeK1";
import ThemeK2 from "../../../components/ThemeK2";
import ThemeK3 from "../../../components/ThemeK3";

interface TemaPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return themes.map((t) => ({
    slug: t.slug,
  }));
}

export function generateMetadata({ params }: TemaPageProps) {
  const theme = themes.find((t) => t.slug === params.slug);
  if (!theme) return { title: "Tema Tidak Ditemukan" };
  return {
    title: `${theme.title} — SORA Arts & Culture`,
    description: theme.tagline,
  };
}

export default function TemaPage({ params }: TemaPageProps) {
  const theme = themes.find((t) => t.slug === params.slug);

  if (!theme) {
    notFound();
  }

  // 1. Template K3 is exclusively for tari-musik
  if (theme.layout === "k3" || theme.slug === "tari-musik") {
    return <ThemeK3 theme={theme} />;
  }

  // 2. Template K1 for themes with structured narrative & accordion (rumah-adat, kain-pakaian, pertunjukan-lisan)
  if (theme.layout === "k1") {
    return <ThemeK1 theme={theme} />;
  }

  // 3. Template K2 for catalog/collection themes (bahasa-aksara, kuliner, upacara-adat, sejarah)
  return <ThemeK2 theme={theme} />;
}

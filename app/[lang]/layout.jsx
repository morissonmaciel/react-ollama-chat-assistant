import { dir } from "i18next";
import "./global.css";
import { languages } from "../i18n/settings"
import { useTranslation } from "../i18n";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function RootLayout({ children, params: { lang } }) {
  const { t } = await useTranslation(lang, "translation");

  return (
    <html lang={lang} dir={dir(lang)}>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="manifest" href="/manifest.json" />
        <title>{t("title")}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

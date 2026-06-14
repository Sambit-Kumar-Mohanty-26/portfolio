const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  "http://localhost:3000";

export const siteConfig = {
  name: "Sambit Kumar Mohanty",
  title: "Sambit Kumar Mohanty | Full Stack & Web3 Developer",
  description:
    "Sambit Kumar Mohanty is a full stack and Web3 developer building scalable Next.js, MERN, SaaS, blockchain, and smart contract applications.",
  url: configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`,
  email: "mailto:sambitkumarmohanty25@gmail.com",
  github: "https://github.com/Sambit-Kumar-Mohanty-26",
  linkedin:
    "https://www.linkedin.com/in/sambit-kumar-mohanty-36b20234a/",
};

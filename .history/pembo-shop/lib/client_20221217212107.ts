import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const clientsanityClient({
  projectId: "9m1hjh3n",
  dataset: "production",
  apiVersion: "2022-12-17",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

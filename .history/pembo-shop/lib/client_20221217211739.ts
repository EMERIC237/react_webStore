import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "9m1hjh3n",
  dataset: "production",
  apiVersion: "2022-12-17",
  useCdn: true,
  token: "",
});

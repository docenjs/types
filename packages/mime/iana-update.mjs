import { writeFileSync } from "fs";
import { convertCSVToJSON } from "@docen/csv";
import { ofetch } from "ofetch";

const mimeTypes = [
  "application",
  "audio",
  "font",
  "image",
  "message",
  "model",
  "multipart",
  "text",
  "video",
];

for (const type of mimeTypes) {
  const url = `https://www.iana.org/assignments/media-types/${type}.csv`;

  const csv = await ofetch(url, {
    responseType: "arrayBuffer",
  });

  writeFileSync(`./src/iana/${type}.csv`, csv);

  const json = convertCSVToJSON(new Uint8Array(csv), {
    header: true,
  });

  writeFileSync(`./src/iana/${type}.json`, JSON.stringify(json, null, 2));

  console.log(`Updated ${type}.csv and ${type}.json`);
}

import { readFile } from "fs/promises";
import { parse } from "smol-toml";
import * as z from "zod";

const ConfigToml = z.object({
    webhook: z.string(),
    newsRole: z.string(),
    interval: z.number()
});

const input = await readFile("config.toml", "utf8");
const document = parse(input);

export const configToml = ConfigToml.parse(document);
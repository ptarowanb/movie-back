import { model, Schema } from "mongoose";
import { ISiteConfig } from "../types/site-config.type";

const SiteConfigSchema = new Schema<ISiteConfig>({
    contact: {type: String, required: true},
    siteName: {type: String, required: true},
    createdAt: { type: Date, default: Date.now }
})

export const SiteConfig = model("site-config", SiteConfigSchema);
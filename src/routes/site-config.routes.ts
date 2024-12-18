import { FastifyInstance } from "fastify";
import { toAddSiteConfig, toDeleteSiteConfig, toGetSiteConfig, toUpdateSiteConfig } from "../controllers/site-config.controller";


const SiteConfigrRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/site-config", toGetSiteConfig);

  fastify.post("/site-config", {
    handler: toAddSiteConfig
  });
  fastify.patch("/site-config/:id", toUpdateSiteConfig);
  fastify.delete("/site-config/:id", toDeleteSiteConfig);
};

export default SiteConfigrRoutes;

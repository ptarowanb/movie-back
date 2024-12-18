import { FastifyReply, FastifyRequest } from "fastify";
import { createSiteConfig, deleteSiteConfig, getSiteConfig, updateSiteConfig } from "../services/site-config/siteConfigService.service";
import { ISiteConfig } from "../types/site-config.type";

export const toGetSiteConfig = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = await getSiteConfig();
    reply.send({status: 'success', data});
  } catch (error: unknown) {
    console.error(error);
    reply.status(500).send({
      error: "Ad retrieval failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}

export const toAddSiteConfig = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { body } = request;
    const data = await createSiteConfig(body as ISiteConfig)
    reply.send({status: 'success', data});
  } catch (error: unknown) {
    console.error(error);
    reply.status(500).send({
      error: "Ad retrieval failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}

export const toUpdateSiteConfig = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
     const { id } = request.params as { id: string };
      const updateData = request.body as Partial<ISiteConfig>; 
      const data = await updateSiteConfig(id, updateData);
      reply.send({ status: 'success', data });
    } catch (error: unknown) {
      console.error(error);
      reply.status(500).send({
        error: "SiteConfig update failed",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  };
  

export const toDeleteSiteConfig = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as {id: string};
    const data = await deleteSiteConfig(id)
    reply.send({status: 'success', data});
  } catch (error: unknown) {
    console.error(error);
    reply.status(500).send({
      error: "Ad retrieval failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
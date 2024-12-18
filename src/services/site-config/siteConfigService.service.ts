import { Model } from "mongoose";
import { ISiteConfig } from "../../types/site-config.type";

let SiteConfigModel : Model<ISiteConfig>;
export const initializeSiteConfigCollection = (model: Model<ISiteConfig>) => {
    SiteConfigModel = model;
};
export const getSiteConfig = async () => {
    try {
        return await SiteConfigModel.find()
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createSiteConfig = async (SiteConfig:ISiteConfig ) => {
    try {
        const newSiteConfig = await SiteConfigModel.create(SiteConfig)
        return newSiteConfig    
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateSiteConfig = async (id: string, updateData: Partial<ISiteConfig>) => {
    try {
        const SiteConfig = await SiteConfigModel.findById(id);
        if (!SiteConfig) {
            throw new Error('SiteConfig not found');
        }
        const result = await SiteConfigModel.updateOne({ _id: id }, { $set: updateData });
        return result;
    } catch (error) {
        console.error('Error updating SiteConfig:', error);
        throw error;
    }
}

export const deleteSiteConfig = async (id: string) => {
    try {
      const data = await SiteConfigModel.findOneAndDelete({ _id: id });
      return data
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
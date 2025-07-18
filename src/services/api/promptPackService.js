import promptPacksData from "@/services/mockData/promptPacks.json";

export const promptPackService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...promptPacksData];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return promptPacksData.find(pack => pack.id === id);
  },

  async create(promptPack) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newPack = {
      ...promptPack,
      Id: Math.max(...promptPacksData.map(p => p.Id), 0) + 1,
      usageCount: 0
    };
    promptPacksData.push(newPack);
    return newPack;
  },

  async update(id, data) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = promptPacksData.findIndex(pack => pack.id === id);
    if (index !== -1) {
      promptPacksData[index] = { ...promptPacksData[index], ...data };
      return promptPacksData[index];
    }
    return null;
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = promptPacksData.findIndex(pack => pack.id === id);
    if (index !== -1) {
      return promptPacksData.splice(index, 1)[0];
    }
    return null;
  }
};
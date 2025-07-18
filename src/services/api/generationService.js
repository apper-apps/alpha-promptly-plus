import generationsData from "@/services/mockData/generations.json";

export const generationService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...generationsData].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return generationsData.find(gen => gen.id === id);
  },

  async create(generation) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newGeneration = {
      ...generation,
      Id: Math.max(...generationsData.map(g => g.Id), 0) + 1
    };
    generationsData.unshift(newGeneration);
    return newGeneration;
  },

  async update(id, data) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = generationsData.findIndex(gen => gen.id === id);
    if (index !== -1) {
      generationsData[index] = { ...generationsData[index], ...data };
      return generationsData[index];
    }
    return null;
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = generationsData.findIndex(gen => gen.id === id);
    if (index !== -1) {
      return generationsData.splice(index, 1)[0];
    }
    return null;
  }
};
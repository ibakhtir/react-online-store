import httpService from "./http.service";

const itemEndpoint = "item/";

const itemService = {
  get: async () => {
    const { data } = await httpService.get(itemEndpoint);
    return data;
  },

  create: async (payload) => {
    const { data } = await httpService.put(itemEndpoint + payload.id, payload);
    return data;
  },

  update: async (payload) => {
    const { data } = await httpService.patch(
      itemEndpoint + payload.id,
      payload
    );
    return data;
  },

  remove: async (itemId) => {
    const { data } = await httpService.delete(itemEndpoint + itemId);
    return data;
  }
};

export default itemService;

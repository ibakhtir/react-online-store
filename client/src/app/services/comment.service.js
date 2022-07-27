import httpService from "./http.service";

const commentEndpoint = "comment/";

const commentService = {
  get: async (itemId) => {
    const { data } = await httpService.get(commentEndpoint, {
      params: {
        orderBy: "itemId",
        equalTo: `${itemId}`
      }
    });
    return data;
  },

  create: async (payload) => {
    const { data } = await httpService.post(commentEndpoint, payload);
    return data;
  },

  remove: async (commentId) => {
    const { data } = await httpService.delete(commentEndpoint + commentId);
    return data;
  }
};

export default commentService;

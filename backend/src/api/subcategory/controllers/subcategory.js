"use strict";

/**
 * subcategory controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::subcategory.subcategory", ({}) => ({
  async find(ctx) {
    // Quando ele usar o find, atribuir as subcategorias pra ele

    const { username, id } = ctx.state.user;

    const { data } = await super.find(ctx);

    return { data, id, username };
  },
}));

"use strict";

/**
 * category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async find(ctx) {
      const userId = ctx.state.user.id;
      const username = ctx.state.user.username;
      const createdAt = ctx.state.user.createdAt;
      const instagramURL = ctx.state.user.InstagramURL || "";
      const bio = ctx.state.user.bio || "";
      const birthday = ctx.state.user.birthday || "";
      const brewfatherURL = ctx.state.user.BrewfatherURL || ""
      const equipment = ctx.state.user.equipment || ""

      const date = new Date(createdAt);
      const padTo2Digits = (num) => num.toString().padStart(2, "0");
      const RegistrationDate = `${padTo2Digits(date.getDate())}/${padTo2Digits(
        date.getMonth() + 1
      )}/${date.getFullYear()}`;

      const subcategories = await strapi.db
        .query("api::subcategory.subcategory")
        .findMany();

      for (const subcategory of subcategories) {
        // Verificar se o relacionamento já existe
        const existingRelationship = await strapi.db
          .query("api::user-subcategory.user-subcategory")
          .findOne({
            where: {
              user: userId,
              subcategory: subcategory.id,
            },
          });

        // Se o relacionamento não existir, cria um novo
        if (!existingRelationship) {
          await strapi.db
            .query("api::user-subcategory.user-subcategory")
            .create({
              data: {
                user: userId,
                subcategory: subcategory.id,
                completed: false, // Status inicial como não completado
              },
            });
          console.log(
            `Relacionamento criado para subcategoria ID: ${subcategory.id}`
          );
        }
      }

      // Chama a implementação padrão do método find
      const { data } = await super.find(ctx);

      // Itera sobre as categorias e subcategorias para adicionar o campo 'completed'
      const categories = await Promise.all(
        data.map(async (category) => {
          const categoryData = category.attributes;

          const subcategories = await Promise.all(
            categoryData.subcategories.data.map(async (subcategory) => {
              const subcategoryData = subcategory.attributes;

              // Encontra o status 'completed' da subcategoria para o usuário autenticado
              const userSubcategory = await strapi.db
                .query("api::user-subcategory.user-subcategory")
                .findOne({
                  where: {
                    user: userId,
                    subcategory: subcategory.id,
                  },
                });

              return {
                id: subcategory.id,
                ...subcategoryData,
                completed: userSubcategory ? userSubcategory.completed : false,
              };
            })
          );

          return {
            ...categoryData,
            subcategories,
          };
        })
      );

      const completedSubcategories = await strapi.db
        .query("api::user-subcategory.user-subcategory")
        .count({
          where: {
            user: userId,
            completed: true,
          },
        });

      ctx.body = {
        userId,
        username,
        completedSubcategories,
        bio,
        birthday,
        instagramURL,
        brewfatherURL,
        equipment,
        RegistrationDate,
        categories: categories,
      };
    },
  })
);

"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::user-subcategory.user-subcategory",
  ({ strapi }) => ({
    async updateCompletedStatus(ctx) {
      const { userId, subcategoryId } = ctx.request.body;
      const { id } = ctx.state.user;

      if (userId != id) {
        return ctx.throw(404, "Acesso Negado!");
      }

      // Verifica se a relação UserSubcategory já existe
      let userSubcategory = await strapi.db
        .query("api::user-subcategory.user-subcategory")
        .findOne({
          where: { user: userId, subcategory: subcategoryId },
        });

      userSubcategory = await strapi.db
        .query("api::user-subcategory.user-subcategory")
        .update({
          where: { id: userSubcategory.id },
          data: {
            completed: !userSubcategory.completed,
          },
        });
      ctx.send(userSubcategory);
    },

    async findCompleted(ctx) {
      const userId = ctx.state.user.id;

      // Obtenha as subcategorias completadas pelo usuário
      const completedSubcategories = await strapi.db
        .query("api::user-subcategory.user-subcategory")
        .findMany({
          where: {
            user: userId,
            completed: true,
          },
          populate: {
            subcategory: true,
          },
        });

      // Retorne as subcategorias completadas
      ctx.send(completedSubcategories);
    },
    async getRanking(ctx) {
      // Busca todos os usuários com o campo avatar populado
      const users = await strapi.db
        .query("plugin::users-permissions.user")
        .findMany({
          populate: {
            avatar: true, // Garante que o campo avatar seja incluído
          },
        });

      const ranking = [];

      // Itera sobre os usuários
      for (const user of users) {
        // Conta o número de subcategorias completadas pelo usuário
        const completedCount = await strapi.db
          .query("api::user-subcategory.user-subcategory")
          .count({
            where: {
              user: user.id,
              completed: true,
            },
          });

        // Adiciona o usuário ao ranking com o número de subcategorias completadas
        ranking.push({
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar ? user.avatar.url : null, // Adiciona o avatar do usuário
          },
          completedCount,
        });
      }

      // Ordena o ranking pelo número de subcategorias completadas em ordem decrescente
      ranking.sort((a, b) => b.completedCount - a.completedCount);

      // Envia a resposta com o ranking
      ctx.send(ranking);
    },

    async findRanking(ctx) {
      const userId = ctx.params.userId;

      // Encontre o usuário
      const user = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: userId },
          select: ["username", "bio", "created_at", "birthday", "InstagramURL", "BrewfatherURL", "equipment"],
        });

      const birthday = user.birthday || "";
      const instagramURL = user.InstagramURL || "";
      const brewfatherURL = user.BrewfatherURL || ""
      const bio = user.bio || "";
      const equipment = user.equipment || ""
      const createdAt = user.createdAt;

      const date = new Date(createdAt);

      const padTo2Digits = (num) => num.toString().padStart(2, "0");

      const RegistrationDate = `${padTo2Digits(date.getDate())}/${padTo2Digits(
        date.getMonth() + 1
      )}/${date.getFullYear()}`;

      if (!user) {
        return ctx.throw(404, "Usuário não encontrado");
      }

      // Encontre as subcategorias do usuário
      const userSubcategories = await strapi.db
        .query("api::user-subcategory.user-subcategory")
        .findMany({
          where: { user: userId },
          populate: { subcategory: { populate: { category: true } } },
        });

      // Calcular o número de subcategorias completadas
      const completedSubcategories = userSubcategories.filter(
        (sub) => sub.completed
      ).length;

      // Organizar as subcategorias dentro de suas respectivas categorias
      const categoriesMap = {};
      userSubcategories.forEach((userSubcategory) => {
        const { subcategory } = userSubcategory;
        const { category } = subcategory;

        if (!categoriesMap[category.id]) {
          categoriesMap[category.id] = {
            id: category.id,
            name: category.name,
            subcategories: [],
          };
        }

        categoriesMap[category.id].subcategories.push({
          id: subcategory.id,
          name: subcategory.name,
          completed: userSubcategory.completed,
        });
      });

      const categories = Object.values(categoriesMap);

      // Preparar a resposta
      const response = {
        userId: userId,
        username: user.username,
        bio: bio,
        birthday: birthday,
        instagramURL,
        brewfatherURL,
        equipment,
        RegistrationDate,
        completedSubcategories,
        categories,
      };

      ctx.send(response);
    },
  })
);

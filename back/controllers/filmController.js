import { Film } from "../models/index.js";
import { checkObjectFields } from "../helpers/index.js";
import slugify from "slugify";

export class FilmController {
  async create(req, res) {
    try {
      const { name, duration, budget, imdb } = req.body;

      if (!checkObjectFields(req.body)) {
        return res.status(400).send("Заполни по-человечески");
      }
      const slug = slugify(name, {
        locale: "ru",
        lower: true,
      });

      const film = await Film.create({ name, slug, duration, budget, imdb });

      return res.json(film);
    } catch (e) {
      console.error(e.message);
      return res.status(500).send("Ошибка вышла");
    }
  }

  async get(req, res) {
    try {
      const { slug } = req.params;
      const film = await Film.findOne({
        where: { slug },
      });

      return res.json(film);
    } catch (e) {
      return e;
    }
  }

  async patch(req, res) {
    const { name, slug, duration } = req.body;

    await Film.update({ name, duration }, { where: { slug } });
    const film = await Film.findOne({ where: { slug } });

    return res.json(film);
  }

  async getAll(req, res) {
    try {
      const films = await Film.findAll();
      return res.json(films);
    } catch (e) {
      console.log(3);
    }
  }

  async delete(req, res) {
    const { slug } = req.params;

    try {
      if (slug) {
        await Film.destroy({ where: { slug } });
      }
    } catch (e) {
      return res.status(400).send("Удаление не удалось");
    }

    return res.status(200).send("Успешно удалено");
  }
}

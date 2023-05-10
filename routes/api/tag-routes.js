const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      includes: [{model: Product}, {model: ProductTag}]
    });

    if (!tags) {
      res.status(404).json({message: 'No tags found'});
      return;
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    if (!tags) {
      res.status(404).json({message: 'no tag found with this id'});
      return;
    };
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tags = await Tag.create(req.body);
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  };
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const [updatedRow, updatedTag] = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        },
        returning: true,
      });

      if (updatedRow === 0) {
        response.status(400).json({message: 'no category found with this id'});
        return;
      }
      res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  };
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tags = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!tags) {
      res.status(404).json({message: 'No tag found with this id'});
      return;
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

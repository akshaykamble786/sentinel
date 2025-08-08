import Category from '../models/category-model.js';

const defaultCategories = [
  { name: 'Important', color: '#EC4899', isDefault: true },
  { name: 'Social media', color: '#F97316', isDefault: true },
  { name: 'Streaming', color: '#22C55E', isDefault: true },
  { name: 'Sports', color: '#EAB308', isDefault: true }
];

const initializeDefaultCategories = async (userId) => {
  try {
    for (const category of defaultCategories) {
      await Category.findOneAndUpdate(
        { userId, name: category.name },
        { ...category, userId },
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    console.error('Error initializing default categories:', error);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.userId }).sort({ isDefault: -1, name: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;
    
    if (!name || !color) {
      return res.status(400).json({ success: false, message: 'Name and color are required' });
    }

    const existingCategory = await Category.findOne({ 
      userId: req.userId, 
      name: name.trim() 
    });

    if (existingCategory) {
      return res.status(400).json({ success: false, message: 'Category with this name already exists' });
    }

    const category = new Category({
      userId: req.userId,
      name: name.trim(),
      color,
      isDefault: false
    });

    await category.save();
    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;

    const category = await Category.findOne({ _id: id, userId: req.userId });
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    if (category.isDefault) {
      return res.status(400).json({ success: false, message: 'Cannot modify default categories' });
    }

    if (name) {
      const existingCategory = await Category.findOne({ 
        userId: req.userId, 
        name: name.trim(),
        _id: { $ne: id }
      });

      if (existingCategory) {
        return res.status(400).json({ success: false, message: 'Category with this name already exists' });
      }
      category.name = name.trim();
    }

    if (color) {
      category.color = color;
    }

    await category.save();
    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ _id: id, userId: req.userId });
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    if (category.isDefault) {
      return res.status(400).json({ success: false, message: 'Cannot delete default categories' });
    }

    await Category.findByIdAndDelete(id);
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  initializeDefaultCategories,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
}; 
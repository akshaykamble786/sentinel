import { useState, useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { CategoryForm } from "../sidebar/category-form";

export function CategorySelect({ value, onChange, className = "" }) {
  const { categories, createCategory } = useContext(AppContext);
  const [isCreating, setIsCreating] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const trimmed = inputValue.trim();
    const exactMatch = categories.some(
      (cat) => cat.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (trimmed === "" || exactMatch) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((cat) =>
        cat.name.toLowerCase().includes(trimmed.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [inputValue, categories]);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowDropdown(true);
    
    const matchingCategory = categories.find(cat =>
      cat.name.toLowerCase() === newValue.toLowerCase()
    );
    
    if (matchingCategory) {
      onChange(matchingCategory.name);
    } else {
      onChange(newValue);
    }
  };

  const handleCategorySelect = (categoryName) => {
    setInputValue(categoryName);
    onChange(categoryName);
    setShowDropdown(false);
  };

  const handleCreateNew = async () => {
    if (!inputValue.trim()) return;
    
    const success = await createCategory({
      name: inputValue.trim(),
      color: "#3B82F6"
    });
    
    if (success) {
      setInputValue(inputValue.trim());
      onChange(inputValue.trim());
      setShowDropdown(false);
    }
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = async () => {
    setTimeout(async () => {
      setShowDropdown(false);
      
      if (inputValue.trim() && !categories.find(cat => 
        cat.name.toLowerCase() === inputValue.toLowerCase()
      )) {
        const success = await createCategory({
          name: inputValue.trim(),
          color: "#3B82F6"
        });
        
        if (success) {
          onChange(inputValue.trim());
        }
      }
    }, 200);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Select or create category..."
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      />
      
      {showDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredCategories.length > 0 && (
            <div className="py-1">
              {filteredCategories.map((category) => (
                <div
                  key={category._id}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  onClick={() => handleCategorySelect(category.name)}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          )}
          
          {inputValue.trim() && !categories.find(cat => 
            cat.name.toLowerCase() === inputValue.toLowerCase()
          ) && (
            <div className="border-t border-input">
              <div
                className="flex items-center gap-2 px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer text-primary"
                onClick={handleCreateNew}
              >
                <span className="text-sm">+ Create "{inputValue.trim()}"</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 
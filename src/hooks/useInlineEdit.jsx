// hooks/useInlineEdit.js
import { useState } from "react";

const useInlineEdit = () => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (e, product) => {
    e.stopPropagation();
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      category: product.category,
      unit: product.unit,
      brand: product.brand,
      stock: product.stock,
      status: product.status || "In Stock",
    });
  };

  const cancel = (e) => {
    e.stopPropagation();
    setEditingId(null);
    setEditForm({});
  };

  const updateField = (field, value) =>
    setEditForm((prev) => ({ ...prev, [field]: value }));

  return { editingId, editForm, startEdit, cancel, updateField, setEditingId };
};

export default useInlineEdit;

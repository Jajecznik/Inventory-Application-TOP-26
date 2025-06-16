const toggleEditMode = (index) => {
  const categoryName = document.getElementById(`label-${index}`);
  const form = document.getElementById(`form-${index}`);
  const editBtn = document.getElementById(`edit-btn-${index}`);
  const deleteBtn = document.getElementById(`delete-btn-${index}`);

  categoryName.style.display = categoryName.style.display === "none" ? "block" : "none";
  form.style.display = form.style.display === "none" ? "block" : "none";
  editBtn.style.display = editBtn.style.display === "none" ? "block" : "none";
  deleteBtn.style.display = deleteBtn.style.display === "none" ? "block" : "none";
};
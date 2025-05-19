export const getAllExpenses = async () => {
  const response = await fetch("http://localhost:8080/api/api/expenses");
  if (!response.ok) throw new Error("Failed to fetch");
  return await response.json();
};

export const createExpense = async (expense) => {
  const response = await fetch("http://localhost:8080/api/api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  if (!response.ok) throw new Error("Failed to create");
};

export const deleteExpense = async (id) => {
  const response = await fetch(`http://localhost:8080/api/api/expenses/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete");
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const baseURL = "http://127.0.0.1:8000/api/";

const fetchUsers = async () => {
  const response = await fetch(`${baseURL}users`);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data;
};

const registerUser = async (newUser) => {
  console.log("Registering user:", newUser);

  const response = await fetch(`${baseURL}users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    console.error(
      "Network response was not ok:",
      response.status,
      response.statusText,
    );
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  console.log("Registration response:", data);
  return data;
};

const setCurrentUser = async (id) => {
  const response = await fetch(`${baseURL}currentUser`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

// Delete a user
const deleteUser = async (id) => {
  const response = await fetch(`${baseURL}users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    onError: (error) => {
      console.error("Error fetching users:", error);
    },
  });
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error registering user:", error);
    },
  });
};

export const useSetCurrentUser = () => {
  return useMutation({
    mutationFn: setCurrentUser,
    onError: (error) => {
      console.error("Error setting current user:", error);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });
};

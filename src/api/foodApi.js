import { useQuery } from "@tanstack/react-query";

const baseURL = "http://127.0.0.1:8000/api/";

const fetchFood = async () => {
  const response = await fetch(`${baseURL}food`);
  if (!response.ok) throw new Error("Food data could not be found");
  const data = await response.json();
  return data.member;
};

export const useGetFood = () => {
  return useQuery({
    queryKey: ["food"],
    queryFn: fetchFood,
  });
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { signIn } from "next-auth/react";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: async ({ email, password }) =>
      await axios.post("/api/register", { email, password }),
  });
};

export const useUserLoginWithGoogle = () => {
  return useMutation({
    mutationFn: async () => await signIn("google", { callbackUrl: "/" }),
  });
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["GET_USER_INFO"],
    queryFn: async () => {
      const response = await axios("/api/profile");
      return response.data;
    },
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => await axios.put("/api/profile", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_USER_INFO"],
      });
    },
  });
};

export const useUploadImageToBucket = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/api/upload", data);
      return response.data;
    },
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["GET_CATEGORIES"],
    queryFn: async () => {
      const response = await axios("/api/categories");
      return response.data;
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => await axios.post("/api/categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_CATEGORIES"],
      });
    },
  });
};
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => await axios.put("/api/categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_CATEGORIES"],
      });
    },
  });
};
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id) => await axios.delete("/api/categories?_id=" + _id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_CATEGORIES"],
      });
    },
  });
};

export const useGetMenuItems = () => {
  return useQuery({
    queryKey: ["GET_MENU_ITEMS"],
    queryFn: async () => {
      const response = await axios("/api/menu-items");
      return response.data;
    },
  });
};

export const useGetMenuItemById = (id) => {
  return useQuery({
    queryKey: ["GET_MENU_ITEM_BY_ID", id],
    queryFn: async () => {
      const response = await axios("/api/menu-items");
      const item = response.data.find((i) => i._id === id);
      return item;
    },
  });
};
export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => await axios.put("/api/menu-items", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_MENU_ITEMS", "GET_MENU_ITEM_BY_ID"],
      });
    },
  });
};

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => await axios.delete("/api/menu-items?_id=" + id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_CATEGORIES"],
      });
    },
  });
};

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => await axios.post("/api/menu-items", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_MENU_ITEMS", "GET_MENU_ITEM_BY_ID"],
      });
    },
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["GET_USERS"],
    queryFn: async () => {
      const response = await axios("/api/users");
      return response.data;
    },
  });
};

export const useGetUserInfoById = (id) => {
  return useQuery({
    queryKey: ["GET_USER_INFO_BY_ID", id],
    queryFn: async () => {
      const response = await axios("/api/profile?_id=" + id);
      return response.data;
    },
  });
};

export const useUpdateUserInfoById = () => {
  return useMutation({
    mutationFn: async ({ data, id }) =>
      await axios.put("/api/profile", { ...data, _id: id }),
  });
};

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["GET_ORDERS"],
    queryFn: async () => {
      const response = await axios("/api/orders");
      return response.data;
    },
  });
};

export const useGetOrderById = (id) => {
  return useQuery({
    queryKey: ["GET_ORDER_BY_ID", id],
    queryFn: async () => {
      const response = await axios("/api/orders?_id=" + id);
      return response.data;
    },
  });
};

export const useGetBestSellers = () => {
  return useQuery({
    queryKey: ["GET_BEST_SELLERS"],
    queryFn: async () => {
      const response = await axios("/api/menu-items");
      return response.data.slice(-8);
    },
  });
};

export const useCheckout = () => {
  return useMutation({
    mutationFn: async ({ address, cartProducts }) =>
      await axios.post("/api/checkout", { address, cartProducts }),
  });
};

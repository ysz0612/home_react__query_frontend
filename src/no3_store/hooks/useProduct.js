import {
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";

import {
  productAllGetApi,
  productGetApi,
  productPostApi,
  productPutApi,
  productDeleteApi,
} from "../apis/product.api";

// 전체 조회
export const useAllGetProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productAllGetApi,
  });
};

// 단일 조회
export const useGetProduct = (id) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productGetApi(id),
    enabled: !!id,
  });
};

// 등록
export const usePostRegisterProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productPostApi,

    onSuccess: (dataObj) => {
      queryClient.setQueryData(
        ["products"],
        (old = []) => [...old, dataObj]
      );

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

// 수정
export const usePutUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productPutApi,

    onSuccess: (dataObj) => {
      queryClient.setQueryData(
        ["products"],
        (old = []) =>
          old.map((item) =>
            item.id === dataObj.id ? dataObj : item
          )
      );

      queryClient.invalidateQueries({
        queryKey: ["products", dataObj.id],
      });
    },
  });
};

// 삭제
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productDeleteApi,

    onSuccess: (id) => {
      queryClient.setQueryData(
        ["products"],
        (old = []) =>
          old.filter((item) => item.id !== id)
      );

      queryClient.removeQueries({
        queryKey: ["products", id],
      });
    },
  });
};
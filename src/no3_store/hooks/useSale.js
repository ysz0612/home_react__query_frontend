import {
    useQuery,
    useQueryClient,
    useMutation,
} from "@tanstack/react-query";

import {
    saleAllGetApi,
    saleGetApi,
    salePostApi,
    salePutApi,
    saleDeleteApi,
} from "../apis/sale.api";

export const useAllGetSale = () => {
    return useQuery({
        queryKey: ["sales"],
        queryFn: saleAllGetApi,
    });
};

export const useGetSale = (id) => {
    return useQuery({
        queryKey: ["sales", id],
        queryFn: () => saleGetApi(id),
        enabled: !!id,
    });
};

export const usePostRegisterSale = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: salePostApi,

        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["sales"],
                (old = []) => [...old, dataObj]
            );

            queryClient.invalidateQueries({
                queryKey: ["sales"],
            });
        },
    });
};

export const usePutUpdateSale = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: salePutApi,

        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["sales"],
                (old = []) =>
                    old.map((item) =>
                        item.id === dataObj.id
                            ? dataObj
                            : item
                    )
            );

            queryClient.invalidateQueries({
                queryKey: ["sales", dataObj.id],
            });
        },
    });
};

export const useDeleteSale = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saleDeleteApi,

        onSuccess: (id) => {
            queryClient.setQueryData(
                ["sales"],
                (old = []) =>
                    old.filter(
                        (item) => item.id !== id
                    )
            );

            queryClient.removeQueries({
                queryKey: ["sales", id],
            });
        },
    });
};
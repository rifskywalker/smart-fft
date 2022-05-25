import { useQuery, useMutation, useQueryClient } from "react-query";
import SuperHeroServices from "../../api/services/SuperHeroServices";

const fetchSuperHeroes = () => {
  const data = SuperHeroServices.getAllSuperHeroes();
  return data;
};

export const useSuperHeroesData = () => {
  return useQuery("super-heroes", fetchSuperHeroes);
};

const search = (pageIndex, pageSize, name, queryPageSortBy) => {
  return SuperHeroServices.search(pageIndex, pageSize, name, queryPageSortBy);
};

export const useSearch = (
  pageIndex,
  pageSize,
  onSuccess,
  onError,
  name,
  queryPageSortBy
) => {
  return useQuery(
    ["super-heroes", pageIndex, pageSize],
    () => search(pageIndex, pageSize, name, queryPageSortBy),
    {
      keepPreviousData: false,
      staleTime: false,
      onSuccess,
      onError,
    }
  );
};

const searchById = (id) => {
  return SuperHeroServices.searchById(id);
};

export const useSearchById = (onSuccess, onError, id) => {
  return useQuery(["super-hero", id], () => searchById(id), {
    onSuccess,
    onError,
    // refetchOnMount: true,
    // keepPreviousData: false,
    // cacheTime: 0,
    // staleTime: 0,

    enabled: id ? true : false,
  });
};

const editById = (id, dataEdit) => {
  const data = SuperHeroServices.updateById(id, dataEdit);
  return data;
};

export const useEditById = (onSuccess, onError, id) => {
  return useMutation((dataEdit) => editById(id, dataEdit), {
    onSuccess,
    onError,
  });
};

// export const Search = async (pageIndex, pageSize) => {
//   // try {
//   // const response = await fetch(
//   //   `http://localhost:4000/superheroes?_page=${pageIndex}&_limit=${pageSize}`
//   // );
//   // const data = await response.json();

//   const response = await SuperHeroServices.search(pageIndex, pageSize);
//   // const data = await response.json();

//   return response;
//   // } catch (e) {
//   //   throw new Error(`API error:${e?.message}`);
//   // }
// };

const addSuperHero = (hero) => {
  const data = SuperHeroServices.create(hero);
  return data;
};

export const useAddSuperHeroData = (onSuccess, onError) => {
  return useMutation(addSuperHero, {
    onSuccess,
    onError,
  });
};

const deleteSuperHero = (id) => {
  console.log(id);
  const data = SuperHeroServices.delete(id);
  return data;
};

export const useDeleteSuperHeroData = (onSuccess, onError) => {
  return useMutation(deleteSuperHero, {
    onSuccess,
    onError,
  });
};

// export const useAddSuperHeroData = () => {
//   const queryClient = useQueryClient();

//   return useMutation(addSuperHero, {
//     onMutate: async (newHero) => {
//       await queryClient.cancelQueries("super-heroes");
//       const previousHeroData = queryClient.getQueryData("super-heroes");
//       queryClient.setQueryData("super-heroes", (oldQueryData) => {
//         return {
//           ...oldQueryData,
//           data: [
//             ...oldQueryData.data,
//             { id: oldQueryData?.data?.length + 1, ...newHero },
//           ],
//         };
//       });
//       return { previousHeroData };
//     },
//     onError: (_err, _newTodo, context) => {
//       queryClient.setQueryData("super-heroes", context.previousHeroData);
//       return _err;
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries("super-heroes");
//     },
//   });
// };

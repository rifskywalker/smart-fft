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

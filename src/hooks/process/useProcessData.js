// import { useQuery, useMutation, useQueryClient } from "react-query";
// import { request } from "../../utils/axios-utils";

// const fetchSuperHeroes = () => {
//   return request({ url: "/processes" });
// };

// export const useSuperHeroesData = () => {
//   return useQuery("processes", fetchSuperHeroes);
// };

// const addSuperHero = (hero) => {
//   return request({ url: "/processes", method: "post", data: hero });
// };

// export const useAddSuperHeroData = () => {
//   const queryClient = useQueryClient();

//   return useMutation(addSuperHero, {
//     onMutate: async (newHero) => {
//       await queryClient.cancelQueries("processes");
//       const previousHeroData = queryClient.getQueryData("processes");
//       queryClient.setQueryData("processes", (oldQueryData) => {
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
//       queryClient.setQueryData("processes", context.previousHeroData);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries("processes");
//     },
//   });
// };

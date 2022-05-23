
//const statuses = ["success", "error", "warning", "info"];

export const useToastSuccess = (description = "success") => {
  return {
    title: "Success",
    description,
    status: "success",
    duration: 2000,
    isClosable: true,
    position: "top-right",
  };
};

// export const useToastError = (description = "Error") => {
//   const toast = useToast();
//   return useToast({
//     title: "Error",
//     description,
//     status: "error",
//     duration: 2000,
//     isClosable: true,
//     position: "top-right",
//   });
// };

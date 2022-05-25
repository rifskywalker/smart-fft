import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { useRef, useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import {
  useAddSuperHeroData,
  useSearchById,
  useEditById,
} from "../../hooks/SuperHero/useSuperHeroData";

const SuperHero = ({
  tableRef,
  muiTableKey,
  setMuiTableKey,
  setNameForSearch,
  actionMenu,
  isOpenManagePage,
  onOpenManagePage,
  onCloseManagePage,
  rowSelectedForActions,
}) => {
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const initialRef = useRef();
  const cancelRef = useRef();

  const toast = useToast();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    //if cannot insert in server
    if (data) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });

      setName("");
      setAlterEgo("");
      // queryClient.invalidateQueries("super-heroes"); //refresh data table
      onCloseAlert();
      onCloseManagePage();

      //refetch data
      //tableRef.current && tableRef.current.onQueryChange();
      setNameForSearch("");
      setMuiTableKey(muiTableKey + 1);
    } else {
      initialRef.current.focus();
      toast({
        title: "Account created.",
        description: "Mistake",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setName("");
      setAlterEgo("");
    }
  };

  const onError = (error) => {
    initialRef.current.focus();
    toast({
      title: "Account created.",
      description: error.message,
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  };

  const { mutateAsync: addHero, isLoading } = useAddSuperHeroData(
    onSuccess,
    onError
  );

  const onSuccessEditProcess = (data) => {
    if (data) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });

      tableRef.current && tableRef.current.onQueryChange();
      setName("");
      setAlterEgo("");
      onCloseAlert();
      onCloseManagePage();
    } else {
      initialRef.current.focus();
      toast({
        title: "Account created.",
        description: "Mistake",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setName("");
      setAlterEgo("");
    }
  };

  const onErrorEditProcess = (error) => {
    initialRef.current.focus();
    toast({
      title: "Account created.",
      description: error.message,
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  };

  const { mutateAsync: EditProcess, isLoading: isLoadingEditProcess } =
    useEditById(
      onSuccessEditProcess,
      onErrorEditProcess,
      rowSelectedForActions?.id
    );

  const handleClickSave = async () => {
    onCloseAlert();

    if (actionMenu == "Edit") {
    }

    switch (actionMenu) {
      case "Add":
        const dataAdd = { name, alterEgo };
        await addHero(dataAdd);
        break;
      case "Edit":
        const dataEdit = { name, alterEgo };
        await EditProcess(dataEdit);
        break;
      default:
        alert("Error Action : " + actionMenu);
    }
  };

  const onSuccessSearchForEdit = (data) => {
    if (data) {
      setName(data.data.name);
    } else {
      toast({
        title: "Account created.",
        description: "Mistake",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      onCloseManagePage();
    }
  };

  const onErrorSearchForEdit = (error) => {
    toast({
      title: "Error",
      description: error.message,
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
    onCloseManagePage();
  };

  // useEffect(() => {
  //   console.log("refresh");
  //   refetch();
  // }, [rowSelectedForActions]);

  const {
    isLoading: isLoadingSearchForEdit,
    data,
    isError,
    error,
    refetch,
    isFetching,
    isPreviousData,
    is,
  } = useSearchById(
    onSuccessSearchForEdit,
    onErrorSearchForEdit,
    rowSelectedForActions?.id
  );

  if (actionMenu == "Edit") {
    if (isLoadingSearchForEdit) {
      return <h2>Loading...</h2>;
    }
    if (isError) {
      return (
        <>
          <Button onClick={refetch}>Try connection</Button>
          <h2>{error.message}</h2>
        </>
      );
    }

    console.log("render");
    queryClient.invalidateQueries(["super-hero", { type: "done" }]);
  }

  // if (isPreviousData |) {
  //   refetch();
  // }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpenManagePage}
        onClose={onCloseManagePage}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {actionMenu == "Add" ? "Create " : "Edit "}Process
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Process name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Process name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                placeholder="Last name"
                type="text"
                value={alterEgo}
                onChange={(e) => setAlterEgo(e.target.value)}
                disabled={isLoading}
              />
            </FormControl> */}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onOpenAlert}
              isDisabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              onClick={() => {
                setName("");
                setAlterEgo("");
                onCloseManagePage();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Save Data
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleClickSave} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default SuperHero;

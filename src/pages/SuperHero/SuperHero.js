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
  Spinner,
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
import { useAddSuperHeroData } from "../../hooks/SuperHero/useSuperHeroData";

const SuperHero = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef();

  const toast = useToast();

  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries("super-heroes"); //refresh data table
      onCloseAlert();
      onClose();
      // refetch();
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

  const handleClickSave = async () => {
    onCloseAlert();
    const hero = { name, alterEgo };

    // const result = await addHero(hero);

    // try {
    await addHero(hero);
    // } catch (error) {
    //   toast({
    //     title: "Account created.",
    //     description: error.message,
    //     status: "error",
    //     duration: 2000,
    //     isClosable: true,
    //     position: "top-right",
    //   });
    // } finally {
    //   // console.log("done");
    // }

    // if (isError) {
    //   toast({
    //     title: "Account created.",
    //     description: "We've created your account for you.",
    //     status: "error",
    //     duration: 2000,
    //     isClosable: true,
    //     position: "top-right",
    //   });
    //   return;
    // }

    // toast({
    //   title: "Account created.",
    //   description: "We've created your account for you.",
    //   status: "success",
    //   duration: 2000,
    //   isClosable: true,
    //   position: "top-right",
    // });
    // onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Add</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="First name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                placeholder="Last name"
                type="text"
                value={alterEgo}
                onChange={(e) => setAlterEgo(e.target.value)}
                disabled={isLoading}
              />
            </FormControl>
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
            <Button onClick={onClose}>Cancel</Button>
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
              Delete Customer
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

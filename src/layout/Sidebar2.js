import {
    Avatar,
    Box,
    Collapse,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    useColorModeValue,
    useDisclosure,
  } from "@chakra-ui/react";
  import { FaBell } from "react-icons/fa";
  import { AiOutlineFileText } from "react-icons/ai";
  import { FiMenu, FiSearch } from "react-icons/fi";
  //import { HiCode } from "react-icons/hi";
  import { MdKeyboardArrowRight } from "react-icons/md";
  import React  from "react";
  
  export default function SidebarComponent() {
    const sidebar = useDisclosure();
    const integrations = useDisclosure();
    const std_costs = useDisclosure();
    const products = useDisclosure();
    const materials = useDisclosure();
    const processes = useDisclosure();
    const flow_process = useDisclosure();
    const orders = useDisclosure();
  
    const NavItem = (props) => {
      const { icon, children, ...rest } = props;
      return (
        <Flex
          align="center"
          px="4"
          pl="4"
          py="3"
          cursor="pointer"
          color={useColorModeValue("inherit", "gray.400")}
          _hover={{
            bg: useColorModeValue("gray.100", "gray.900"),
            color: useColorModeValue("gray.900", "gray.200"),
          }}
          role="group"
          fontWeight="semibold"
          transition=".15s ease"
          {...rest}
        >
          {icon && (
            <Icon
              mr="2"
              boxSize="4"
              _groupHover={{
                color: "gray.400",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      );
    };
  
    const SidebarContent = (props) => (
      <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("inherit", "gray.700")}
        borderRightWidth="1px"
        w="60"
        {...props}
      >
        <Flex px="4" py="5" align="center">
          <Text
            fontSize="2xl"
            ml="2"
            color={useColorModeValue("black.500", "white")}
            fontWeight="bold"
          >
            Smart FFT
          </Text>
        </Flex>
  
        <Flex px="4" py="1" align="center">
          <Text
            fontSize="lg"
            ml="2"
            color={useColorModeValue("blue.400", "white")}
            fontWeight="semibold"
          >
            MAIN NAVIGATION
          </Text>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color="gray.600"
          aria-label="Main Navigation"
        >
          <NavItem icon={AiOutlineFileText} onClick={integrations.onToggle}>
            Dashboard
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={integrations.isOpen && "rotate(90deg)"}
            />
          </NavItem>
          <Collapse in={integrations.isOpen}>
            <NavItem pl="12" py="2">
              Topic 1
            </NavItem>
            <NavItem pl="12" py="2">
              Topic 2
            </NavItem>
          </Collapse>
  
          <NavItem icon={AiOutlineFileText} onClick={std_costs.onToggle}>
            Standard Cost
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={std_costs.isOpen && "rotate(90deg)"}
            />
          </NavItem>
          <Collapse in={std_costs.isOpen}>
            <NavItem pl="12" py="2">
              Standard Cost
            </NavItem>
            <NavItem pl="12" py="2">
              Bil Of Materials - BOM
            </NavItem>
            <NavItem pl="12" py="2">
              Processing Cost
            </NavItem>
          </Collapse>
  
          <NavItem icon={AiOutlineFileText} onClick={products.onToggle}>
            Product
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={products.isOpen && "rotate(90deg)"}
            />
          </NavItem>
          <Collapse in={products.isOpen}>
            <NavItem pl="12" py="2">
              Product Category
            </NavItem>
            <NavItem pl="12" py="2">
              Product Main
            </NavItem>
            <NavItem pl="12" py="2">
              Product Sub
            </NavItem>
            <NavItem pl="12" py="2">
              Product Type
            </NavItem>
          </Collapse>
  
          <NavItem icon={AiOutlineFileText} onClick={materials.onToggle}>
            Material
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={materials.isOpen && "rotate(90deg)"}
            />
          </NavItem>
          <Collapse in={materials.isOpen}>
            <NavItem pl="12" py="2">
              Material
            </NavItem>
          </Collapse>
  
          <NavItem icon={AiOutlineFileText} onClick={processes.onToggle}>
            Process
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={processes.isOpen && "rotate(90deg)"}
            />
          </NavItem>
          <Collapse in={processes.isOpen}>
            <NavItem pl="12" py="2">
              Process
            </NavItem>
          </Collapse>
  
          <NavItem icon={AiOutlineFileText} onClick={flow_process.onToggle}>
            Flow Process
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={flow_process.isOpen && "rotate(90deg)"}
            />
          </NavItem>
          <Collapse in={flow_process.isOpen}>
            <NavItem pl="12" py="2">
              Flow Process
            </NavItem>
          </Collapse>
  
          <NavItem icon={AiOutlineFileText} onClick={orders.onToggle}>
            Order Management
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={orders.isOpen && "rotate(90deg)"}
            />
          </NavItem>
          <Collapse in={orders.isOpen}>
            <NavItem pl="12" py="2">
              Internal Order
            </NavItem>
            <NavItem pl="12" py="2">
              External Order
            </NavItem>
          </Collapse>
        </Flex>
  
        <Flex px="4" py="1" align="center">
          <Text
            fontSize="lg"
            ml="2"
            color={useColorModeValue("blue.400", "white")}
            fontWeight="semibold"
          >
            OTHERS
          </Text>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color="gray.600"
          aria-label="Others"
        >
          <NavItem icon={AiOutlineFileText}>Other 1</NavItem>
          <NavItem icon={AiOutlineFileText}>Other 2</NavItem>
        </Flex>
      </Box>
    );
    return (
      <Box
        as="section"
        bg={useColorModeValue("gray.50", "gray.700")}
        minH="100vh"
      >
        <SidebarContent display={{ base: "none", md: "unset" }} />
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
        {/* <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
          <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="4"
            bg={useColorModeValue("white", "gray.800")}
            borderBottomWidth="1px"
            borderColor={useColorModeValue("inherit", "gray.700")}
            h="14"
          >
            <IconButton
              aria-label="Menu"
              display={{ base: "inline-flex", md: "none" }}
              onClick={sidebar.onOpen}
              icon={<FiMenu />}
              size="sm"
            /> */}
            {/* <InputGroup w="96" display={{ base: "none", md: "flex" }}>
              <InputLeftElement color="gray.500" children={<FiSearch />} />
              <Input placeholder="Search for articles..." />
            </InputGroup> */}
  
            {/* <Flex align="center">
              <Icon color="gray.500" as={FaBell} cursor="pointer" />
              <Avatar
                ml="4"
                size="sm"
                name="anubra266"
                src="https://avatars.githubusercontent.com/u/30869823?v=4"
                cursor="pointer"
              />
            </Flex>
          </Flex>
   */}
          {/* <Box as="main" p="4">
           
            <Box borderWidth="4px" borderStyle="dashed" rounded="md" h="96" />
          </Box>

        </Box> */}
      </Box>
    );
  }
  
import {
  Button,
  useColorMode,
  Flex,
  Spacer,
  ButtonGroup,
  Box,
  Heading,
  IconButton,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md">Smart FFT</Heading>
      </Box>
      <Spacer />
      {/* <ButtonGroup gap="2">
        <Button colorScheme="teal">Sign Up</Button>
        <Button colorScheme="teal">Log in</Button>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </ButtonGroup> */}

      <IconButton
        onClick={toggleColorMode}
        aria-label="Search database"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      />
      <Wrap>
        <WrapItem>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </WrapItem>
      </Wrap>
    </Flex>
  );
};

export default Header;

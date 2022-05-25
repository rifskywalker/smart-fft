//Chakra UI
import { ChakraProvider, Container } from "@chakra-ui/react";
import theme from "./theme/theme";

import MainRoutes from "./routes/Routes";
import Sidebar from "./layout/Sidebar";
import Sidebar2 from "./layout/Sidebar2";
import Header from "./layout/Header";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl">
        <Header />
        <Sidebar2 />
        <MainRoutes />
      </Container>
    </ChakraProvider>
  );
}

export default App;

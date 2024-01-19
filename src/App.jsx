// App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  extendTheme,
  CSSReset,
  HStack,
} from "@chakra-ui/react";
import io from "socket.io-client";

// Create a custom theme
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.800", // Dark background color
        color: "white", // Text color
      },
    },
  },
});

function App() {
  const [data, setData] = useState([]);

  const refreshTable = async () => {
    const movies = await axios.get(
      "https://postman-api-v26l.onrender.com/getAllMovies"
    );

    console.log(movies);
    setData(movies.data);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={4} textAlign="center">
        <HStack
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Heading as="h1" mb={4}>
            API 101{" "}
          </Heading>
          <Text fontSize="1xl" fontWeight={600} color="gray">
            {" "}
            by CSE Society{" "}
          </Text>
          <Button
            onClick={() => refreshTable()}
            size={"sm"}
            variant={"outline"}
            color={"white"}
            sx={{ _hover: {} }}
          >
            Refresh
          </Button>
        </HStack>
        <Table variant="simple" colorScheme="teal" size="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Favourite Movie</Th>
              <Th>Favourite Actor</Th>
              <Th>Timestamp</Th>
              {/* Add other table headers as needed */}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item._id}>
                <Td>{item.name}</Td>
                <Td>{item.movie}</Td>
                <Td>{item.actor}</Td>
                <Td>{item.timestamp}</Td>
                {/* Add other table cells as needed */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <CSSReset />
    </ChakraProvider>
  );
}

export default App;

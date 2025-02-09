import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"
import { Theme } from "@chakra-ui/react"
import Header from "./components/Header";
import SearchBooks from "./components/SearchBooks.tsx";

function App() {

  return (
    <ChakraProvider value={defaultSystem}>
        <Theme appearance="light">  
          <Header />
          <SearchBooks />
        </Theme>      
    </ChakraProvider>
  )
}

export default App;

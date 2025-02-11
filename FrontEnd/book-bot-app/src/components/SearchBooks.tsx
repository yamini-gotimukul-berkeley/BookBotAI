import React, { useState, useEffect } from 'react';
import {  
  Container,
  Flex,
  Box,
  Stack,
  Text,
  Button
} from "@chakra-ui/react";

interface Book {
  id: string;
  title: string;
  author: string;  
}

function SearchBooks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clicked, hasclicked] = useState(false);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8000/books");
        if (!response.ok) {
          throw new Error('HTTP error! status: ${response.status}');
        }
        const json = await response.json();
        console.log(json.data)
        setData(json.data || []);
        setDisplay(true);
      } catch (e) {
        setError(e);
        setData([]);
        setDisplay(false);
      } finally {
        setLoading(false);
        setDisplay(false);
      }
    };
      
    if(searchTerm != ''){
     setData([]);
    }else{
     setDisplay(false);
    }

    if (clicked) {
        console.log(searchTerm)
        fetchData();
    } else {
        setData([]);
    }
  }, [searchTerm, clicked, display]);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setData([]);
    if(searchTerm == ''){
        setDisplay(false);
        hasclicked(false);
    }

  };
    
  const handleClick = () => {
      console.log("Click Event");
      hasclicked(true);
      setDisplay(true);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container maxW="container.xl" pt="100px">
          
    <div>
    <Flex mt="5">
        <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Describe a book"
        aria-label="Describe a book"
      />

    </Flex>
       <Flex mt="5">
          <Button onClick={handleClick}>Books</Button>  
    </Flex>
        {clicked && searchTerm != '' && (
        <Flex>
        <Stack gap={5}>
            {data.map((item) => (
            <Box p={1} shadow="sm" mt="5">
                <Flex justify="space-between">
                    <Text mt={4} as="div">
                    Title: {item.title}
                    </Text>
                    <Text mt={4} as="div">
                      Author: {item.author}
                    </Text>
              </Flex>
            </Box>        
            ))}
        </Stack>
       </Flex>  
        )}           
       
    </div>
    </Container>
  );
}

export default SearchBooks;
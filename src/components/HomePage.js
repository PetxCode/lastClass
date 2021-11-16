import React from "react";
import data from "./data.json";
import styled from "styled-components";

import { Link } from "react-router-dom";
import Val from "./Val";

const HomePage = () => {
  const [search, setSearch] = React.useState("");
  return (
    <Container>
      <input
        placeholder="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Wrapper>
        {data
          .filter((val) => {
            if (search === "") {
              return val;
            } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
              return val;
            }
          })
          .map((props, i) => {
            return (
              <Card key={i} to={`/payment/${i}`}>
                <Image src={props.img} />
                <Name>{props.name}</Name>
                <Price>#{props.price}</Price>
              </Card>
            );
          })}
      </Wrapper>
      <Val />
    </Container>
  );
};

export default HomePage;

const Price = styled.div`
  padding-bottom: 10px;
  font-weight: bold;
`;
const Card = styled(Link)`
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  width: 300px;
  height: 350px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;
// const Container = styled.div``;
const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  margin-bottom: 20px;
`;
const Name = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  flex: 1;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 100vh;
`;
const Container1 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

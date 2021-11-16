import React from "react";
import styled from "styled-components";
import { app } from "./base";

export const HomeScreen = () => {
  const [task, setTask] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const getData = async () => {
    await app
      .firestore()
      .collection("myTask")
      .onSnapshot((snaphot) => {
        const r = [];
        snaphot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setTask(r);
      });
  };
  React.useEffect(() => {
    getData();
    console.log(task);
  }, []);
  return (
    <Container>
      <Div>
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </Div>
      <Wrapper>
        {task
          .filter((val) => {
            if (search === "") {
              return val;
            } else if (val.task.toLowerCase().includes(search.toLowerCase())) {
              return val;
            }
          })
          ?.map((props, i) => (
            <Card key={i}>
              {console.log(props)}
              <Image />
              <Content>
                <Name>{props.task}</Name>
                <Desc>{props.done}</Desc>
              </Content>
            </Card>
          ))}
      </Wrapper>
    </Container>
  );
};

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 50px;
`;
const Input = styled.input`
  margin-right: 30px;
  width: 300px;
  height: 40px;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding-left: 10px;
  outline: none;
`;
const Desc = styled.div``;

const Name = styled.div`
  font-weight: bold;
  flex: 1;
  text-align: center;
`;

const Content = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: calc(350px - 250px);
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  background-color: green;
`;

const Card = styled.div`
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  width: 300px;
  min-height: 350px;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 50px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 100px);
  background-color: lightgray;
`;

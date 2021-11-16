import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { app } from "./base";
export const Header = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const [user, setUser] = React.useState([]);

  const getUser = async () => {
    await app
      .firestore()
      .collection("testUsers")
      .doc(currentUser?.uid)
      .get()
      .then((user) => setUser(user.data()));
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Link to="/">
          <Image />
        </Link>
        <div> Welcome {user?.userName}</div>
        {currentUser ? (
          <Button1
            onClick={() => {
              app.auth().signOut();
            }}
          >
            Log Out
          </Button1>
        ) : (
          <Link to="/reg" style={{ color: "white", textDecoration: "none" }}>
            <Button>Log In</Button>
          </Link>
        )}
      </Wrapper>
    </Container>
  );
};

const Button1 = styled.div`
  padding: 15px 25px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 3px;
  cursor: pointer;
`;

const Button = styled.div`
  padding: 15px 25px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 3px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  object-fit: cover;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0 20px;
`;

const Container = styled.div`
  background-color: #004080;
  width: 100%;
  height: 100px;
  color: white;
`;

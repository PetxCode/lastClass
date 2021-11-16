import React from "react";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { app } from "./base";
import firebase from "firebase";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [count, setCount] = React.useState(0);

  const schema = yup.object().shape({
    userName: yup.string().required("This field must be filled"),
    email: yup.string().email().required("This field must be filled"),
    phone: yup.number().positive().integer().required(),
    password: yup.string().required().min(6),
    confirm: yup.string().oneOf([yup.ref("password"), null]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const saveImage = URL.createObjectURL(file);
    setImage(saveImage);

    const fileRef = await app.storage().ref();
    const storageRef = fileRef.child("image/" + file.name).put(file);

    storageRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const counter = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setCount(counter);
        console.log(counter);
      },
      (err) => console.log(err.message),

      () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          setAvatar(url);
        });
      }
    );
  };

  const onSubmit = async (data) => {
    console.log(data);
    const { email, password, phone, userName } = data;

    const res = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (res) {
      await app.firestore().collection("testUsers").doc(res.user.uid).set({
        userName,
        phone,
        email,
        avatar,
        createdBy: res.user.uid,
      });
    }

    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Image src={image} />
        <LinearProgress />
        {count > 0 && count < 99.9999 ? (
          <CircularProgress variant="determinate" value={count} />
        ) : null}

        <LabelImage htmlFor="pix">Upload an Image</LabelImage>
        <ImageInput
          placeholder="upload a"
          id="pix"
          accept="image/*"
          type="file"
          onChange={uploadImage}
        />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputHold>
            <Input placeholder="User Name" {...register("userName")} />
            <Error>{errors.userName?.message}</Error>
          </InputHold>
          <InputHold>
            <Input placeholder="User Email" {...register("email")} />
            <Error>{errors.email?.message}</Error>
          </InputHold>
          <InputHold>
            <Input placeholder="User Phone" {...register("phone")} />
            <Error>{errors.phone?.message}</Error>
          </InputHold>
          <InputHold>
            <Input placeholder="User Password" {...register("password")} />
            <Error>{errors.password?.message}</Error>
          </InputHold>
          <InputHold>
            <Input placeholder="Confirm Password" {...register("confirm")} />
            <Error>{errors.confirm?.message}</Error>
          </InputHold>

          <Button type="submit">Register</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Form = styled.form``;
const Input = styled.input`
  width: 300px;
  height: 30px;
  border: 1px solid lightgray;
  padding-left: 10px;
  border-radius: 3px;
  outline: none;
`;

const Button = styled.button`
  padding: 15px 25px;
  background-color: #004080;
  border-radius: 3px;
  cursor: pointer;
  color: white;
`;

const Error = styled.div`
  text-align: center;
  font-size: 10px;
  color: red;
`;
const InputHold = styled.div`
  margin: 10px;
`;
const ImageInput = styled.input`
  display: none;
`;
const LabelImage = styled.label`
  padding: 10px 15px;
  background-color: #004080;
  color: white;
  border-radius: 30px;
  margin-bottom: 30px;
  font-weight: bold;
  cursor: pointer;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px 0;
  background-color: red;
  object-fit: cover;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  padding-top: 20px;
  width: 500px;
  /* height: 100%; */
  min-height: 80vh;
  border-radius: 5px;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  CircularProgress,
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon.jsx";
import { LockIcon } from "./LockIcon.jsx";
import { useForm } from "react-hook-form";
import userAPI from "../APIcalls/userAPI.js";
import { login } from "../store/slices/authSlice.js";
import { useDispatch } from "react-redux";

export default function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const loginUser = async (loginData) => {
    try {
      setLoading(true);
      const loginResponse = await userAPI.login(loginData);
      if (loginResponse) {
        dispatch(login(loginResponse.data));
        console.log("Login response:", loginResponse);
        setLoading(false);
        setLoginStatus(true);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      setErrorMessage(errorMessage);

      setLoading(false);
    }
  };

  return (
    <>
      {/* <Button onPress={onOpen} color="primary">Open Modal</Button> */}
      <button onClick={onOpen}>Login</button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="bg-background dark text-white"
      >
        <form action="" onSubmit={handleSubmit(loginUser)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    id="email"
                    label="Email"
                    placeholder="Enter your email"
                    variant="bordered"
                    {...register("email", { required: true })}
                  />
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    id="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                    {...register("password", { required: true })}
                  />
                  {errorMessage && (
                    <p className="text-red-600 text-center">{errorMessage}</p>
                  )}
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      Remember me
                    </Checkbox>
                    
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="ghost" onPress={onClose}>
                    Cancel
                  </Button>

                  {loading ? (
                    <CircularProgress aria-label="Signing in..." />
                  ) : (
                    <Button color="primary" variant="ghost" type="submit">
                      Login
                    </Button>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Avatar,
  CircularProgress,
} from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFiledIcon";
import { useForm } from "react-hook-form";
import userAPI from "../APIcalls/userAPI";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice.js";

export default function Signup() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisible2, setIsVisible2] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityForConfirm = () => setIsVisible2(!isVisible2);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);

  const signupUser = async (userData) => {
    try {
      if (userData.password === userData.confirmPassword) {
        setLoading(true);
        const response = await userAPI.signupUser(userData);
        if (response) {
          console.log("Response Data:", response);
          dispatch(login(response.data));
          setLoading(false);
        }
      } else {
        setErrorMessage("Both passwords should be same");
      }
    } catch (error) {
      console.log("Error while registering:", error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={onOpen} className="border-none">
        Signup
      </button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        className=" text-foreground dark bg-gray-600"
      >
        <form action="" onSubmit={handleSubmit(signupUser)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className=" w-full flex flex-col gap-1 ">
                  Sign Up
                </ModalHeader>
                <ModalBody>
                  <div className="w-full pb-4 flex justify-center">
                    <label className="relative">
                      {image ? (
                        <Avatar
                          size="lg"
                          src={image}
                          className="w-40 h-40 text-large"
                        />
                      ) : (
                        <div className="w-40 h-40 rounded-full bg-gray-200 border-2 border-blue-500 flex items-center justify-center">
                          <span className="text-sm text-gray-500 text-center">
                            Click to upload
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        id="avatar"
                        name="photo"
                        accept="image/*"
                        required
                        // onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        // {...register("chatIcon", { required: true })}

                        {...register("avatar", {
                          required: true,
                          onChange: (e) => {
                            // Custom onChange logic
                            const file = e.target.files[0];
                            if (file) {
                              const imageUrl = URL.createObjectURL(file);
                              setImage(imageUrl); // Preview or other custom logic
                            }
                          },
                        })}
                      />
                    </label>
                  </div>

                  <div className="w-full px-4 mx-auto flex flex-col gap-4">
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 font-">
                      <Input
                        type="text"
                        variant="bordered"
                        label="Name"
                        placeholder="Enter your full name"
                        id="fullName"
                        {...register("fullName", { required: true })}
                      />
                    </div>

                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 ">
                      <Input
                        type="text"
                        variant="bordered"
                        label="Email"
                        placeholder="Enter your email"
                        id="email"
                        {...register("email", {
                          required: true,
                        })}
                      />
                    </div>

                    <Input
                      label="Password"
                      variant="bordered"
                      placeholder="Enter your password"
                      id="password"
                      {...register("password", {
                        required: true,
                      })}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                          aria-label="toggle password visibility"
                        >
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                      className="max-w-xs"
                    />

                    <Input
                      label="Confirm Password"
                      variant="bordered"
                      placeholder="Re-enter your password"
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        // validate: {
                        //   matchesPassword: (value) =>
                        //     value === getValues("password") || "Passwords do not match",
                        // },
                      })}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibilityForConfirm}
                          aria-label="toggle password visibility"
                        >
                          {isVisible2 ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible2 ? "text" : "password"}
                      className="max-w-xs"
                    />
                    {errorMessage && (
                      <p className="text-red-600 text-center">{errorMessage}</p>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="ghost" onPress={onClose}>
                    Cancel
                  </Button>
                  {loading ? (
                    <CircularProgress aria-label="Signing up..." />
                  ) : (
                    <Button color="primary" variant="ghost" type="submit">
                      Signup
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

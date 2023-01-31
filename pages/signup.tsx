import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import Input from '../components/input'
import underscorize from '../utils/underscorize'
import { equalityCheck, minLengthCheck, regexCheck } from '../utils/validation'


const SignUp: NextPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });

    const [errorMessage, setErrorMessage] = useState<string | null>();

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setFormErrors((prevState) => ({
            ...prevState,
            [fieldName]: ""
        }));

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const validateForm = () => {
        const newFormErrors: Record<string, string> = {};

        const name = formData.firstName;
        if (!minLengthCheck(name, 2)) {
            newFormErrors.firstName = "Please enter a first name longer than 2 characters."
        }

        const lastName = formData.lastName;
        if (!minLengthCheck(lastName, 2)) {
            newFormErrors.lastName = "Please enter a last name longer than 2 characters."
        }

        const email = formData.email;
        if (!regexCheck(email, /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            newFormErrors.email = "Please enter a valid email."
        }

        const password = formData.password;
        if (!minLengthCheck(password, 6)) {
            newFormErrors.password = "Please enter a password longer than 6 characters."
        }

        const passwordConfirmation = formData.passwordConfirmation;
        if (!equalityCheck(password, passwordConfirmation)) {
            newFormErrors.passwordConfirmation = "Passwords must match"
        }

        setFormErrors(newFormErrors)

        const errorsExist = Object.values(newFormErrors).length > 0
        return errorsExist;
    }

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errorsExist = validateForm()
        if (errorsExist) {
            setErrorMessage("Please fix the issues before continuing")
            return;
        }

        const formDataCopy: Record<string, string> = { ...formData };
        delete formDataCopy.passwordConfirmation;

        try {
            const res = await axios.post("/api/auth/signup", {
                body: formDataCopy,
                headers: {
                    'accept': 'application/json',
                },
            });

            if (res.status === 200) {
                const data = res.data;

                if (data) {
                    saveLocalAuthData(data);
                    Router.router?.push("/profile")
                }
            } else {
                setErrorMessage("Something went wrong... we're working on it!")
            }


        } catch (e: any) {
            setErrorMessage(e.response.data.message)
        }
    }

    const saveLocalAuthData = (data: Record<string, any>) => {
        const token = data.token;
        const user = data.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>Sign Up</title>
            </Head>

            <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">

                <div className="w-full p-6 bg-white rounded-md ring ring-2 ring-red-500 lg:max-w-xl">
                    <h1 className="text-xl font-regular text-gray-800">
                        Create your Quickly Account
                    </h1>
                    {errorMessage && (
                        <h1 className="text-l font-regular text-red-400">
                            {errorMessage}
                        </h1>
                    )}

                    <form className="mt-6" onSubmit={submitForm}>
                        <Input
                            label={'First Name'}
                            type={'text'}
                            name={'firstName'}
                            error={formErrors.firstName}
                            onChange={handleInput}
                        />
                        <Input
                            label={'Last Name'}
                            type={'text'}
                            name={'lastName'}
                            error={formErrors.lastName}
                            onChange={handleInput}
                        />
                        <Input
                            label={'Email'}
                            type={'email'}
                            name={'email'}
                            error={formErrors.email}
                            onChange={handleInput}
                        />
                        <Input
                            label={'Password'}
                            type={'password'}
                            name={'password'}
                            error={formErrors.password}
                            onChange={handleInput}
                        />
                        <Input
                            label={'Confirm Password'}
                            type={'password'}
                            name={"passwordConfirmation"}
                            error={formErrors.passwordConfirmation}
                            onChange={handleInput}
                        />
                        <div className="mt-6">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-500 focus:outline-none focus:bg-purple-600">
                                Create account
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        Already have an account?{" "}
                        <Link
                            href="/signin"
                            className="font-medium text-red-500 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </main>
        </div >
    )
}

export default SignUp;

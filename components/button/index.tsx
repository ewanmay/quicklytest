import { ChangeEvent } from "react"

interface ButtonPropsI {
    type: string,
    name: string,
    error: string | null,

    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}


const Button = (props: ButtonPropsI) => {

    const {
        type,
        name,
        error,
        onChange
    } = props

    return (
        <>
            {error && <label>{error}</label>}
            <input
                type={type}
                name={name}
                onChange={onChange}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
        </>
    )
}

export default Button;
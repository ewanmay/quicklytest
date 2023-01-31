import { ChangeEvent } from "react"

interface InputPropsI {
    type: string,
    name: string,
    error: string | null,
    label: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}


const Input = (props: InputPropsI) => {

    const {
        label,
        type,
        name,
        error,
        onChange
    } = props

    return (
        <div className="mb-2">
            <label
                htmlFor={name}
                className="block text-sm font-semibold text-gray-800"
            >
                {label}
            </label>
            {error && <label className="block text-xs font-semibold text-red-400">{error}</label>}
            <input
                type={type}
                name={name}
                onChange={onChange}
                className="block w-full px-4 py-2 mt-2 text-grey-700 bg-white border rounded-md focus:border-grey-400 focus:ring-grey-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
        </div>
    )
}

export default Input;
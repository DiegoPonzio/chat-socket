import axios from "axios";
import { useForm } from "react-hook-form";
import Router from "next/router";


export default function User () {

    const { register, formState: { errors }, watch, handleSubmit } = useForm();

    const actionHandler = async e => {

        const { userName, description } = e

        const res = await axios.post('/api/auth', {
            userName,
            description
        }).then(Verify).catch(console.log)
    }

    const Verify = (status) => {
        try {
            console.log(status.data.status);
            if (status.data.status === 200) {
                Router.replace("/")
            } else if (status === 408) {
                //se ponen los errores
            }
        } catch (eror) {
            //se ponen los errores
        }
    }

    return (
        <div className="place-content-center min-h-screen flex items-center justify-center" onSubmit={handleSubmit(actionHandler)}>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className={`block text-gray-700 text-sm font-bold mb-2`} htmlFor="username">
                            Usuario
                        </label>
                        <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.userName && 'border-red-500'}`} id="username" type="text" placeholder="Username" {...register("userName", { required: true })} />
                        {errors.userName && <p className="text-red-500 text-xs italic">Ingrese un Nombre de usuario.</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Descripción
                        </label>
                        <textarea
                            id="desc"
                            rows="4"
                            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${errors.description && 'border-red-500'}`}
                            placeholder="Habia una vez un patito que decia miau miau"
                            {...register("description", { required: true, pattern: /^[\s\S]{0,25}$/ })}
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-xs italic">Ingrese una breve descripción.</p>}
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="submit">
                            Unete al Chat
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2022 Chat Ponzio
                </p>
            </div>
        </div>
    )
}

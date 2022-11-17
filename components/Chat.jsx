import { data } from "autoprefixer";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import io from "socket.io-client";
import Comment from "./Comment"

let socket = io()

export default function Chat ({ user }) {

    const { register, formState: { errors }, watch, handleSubmit } = useForm();
    const [chat, setChat] = useState([])
    const [keyPress, setKeyPress] = useState()
    let Lista = []

    const actionHandler = e => {
        const { description } = e
        const data = {
            mensaje: description,
            usuario: user
        }

        socket.emit('chat:mensaje', data);
    }

    const typing = () => {
        socket.emit('chat:escribiendo', user);
    }

    useEffect(() => {
        socket.on('chat:mensaje', data => {
            setChat(newChat => [...newChat, data])
        });

        socket.on('chat:escribiendo', data => {
           setKeyPress(`${data.usuario} esta escribiendo...`)
        });

    }, [])

    return (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 h-full">
            <div className="max-w-2xl mx-auto px-4" id="coso">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Ponzio Chat</h2>
                </div>
                <form className="mb-6" onSubmit={handleSubmit(actionHandler)}>
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="6"
                            className={`px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800 ${errors.description && 'border-red-500'}`}
                            placeholder="Write a comment..."
                            onKeyDown={() => typing}
                            {...register("description", { required: true, pattern: /^[\s\S]{0,25}$/ })}
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-xs italic">Ingrese una breve descripción.</p>}
                    </div>
                    <button type="submit"
                        className="bg-blue-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ">
                        Post comment
                    </button>
                </form>
                {console.log(chat)}
                {keyPress && <h3>{keyPress}</h3>}
                {chat.length !== 0 && chat.filter( (item, index) => (chat.indexOf(item) === index) ).map( (value, index) => (
                    <Comment user={value.usuario} text={value.mensaje} key={index} />
                ))}
            </div>
        </section>
    )
}


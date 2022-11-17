import { AiOutlineUser } from 'react-icons/ai'

const Comment = ({user, text}) => {
    return (
        <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <AiOutlineUser />{" "}
                        {/* hay que poner el nombre del usuario */}
                        {user}
                    </p>
                </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">
                {/* hay que poner le mensaje de la persona */}
                {text}
            </p>
        </article>
    )
}

export default Comment
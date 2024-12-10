import React from 'react'
import { GrDocumentUpdate } from 'react-icons/gr'
import { LuFileJson2 } from 'react-icons/lu'
import { MdOutlineDelete } from 'react-icons/md'

function McqFiles({ filterDatas, update, deletePop }) {
    return (
        <>
            <h1 className="text-2xl">Uploaded MCQ Files</h1>


            <div class="w-full relative overflow-x-scroll shadow-md">
                <table class="w-full text-left rtl:text-right">
                    <thead class="text-xs lg:text-lg text-bluetext uppercase">
                        <tr>
                            <th scope="col">
                                File Name
                            </th>
                            <th scope="col">
                                Category
                            </th>
                            <th scope="col">
                                Level
                            </th>
                            <th scope="col">

                            </th>
                            <th scope="col">

                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-xs lg:text-lg'>
                        {filterDatas.map((file) => (
                            <tr>
                                <th scope="row" className="font-medium whitespace-nowrap">
                                    <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-row gap-2 items-center"
                                    >
                                        <LuFileJson2 className="text-bluelg" /> {file.name}
                                    </a>
                                </th>
                                <td>
                                    <span>{file.category}</span>
                                </td>
                                <td>
                                    <span>{file.level}</span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => update(file.id, file.name)}
                                        className="flex gap-2 justify-center items-center px-4 py-2 text-sm bg-secondary text-bluebg border border-secondary duration-200 hover:bg-bluebg hover:text-secondary rounded"
                                    >
                                        <GrDocumentUpdate />  Update
                                    </button>
                                </td>
                                <td>
                                    {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                    <button
                                        onClick={() => deletePop(file.id, file.name)}
                                        className="flex gap-2 justify-center items-center px-4 py-2 text-sm bg-redbg text-bluebg border border-redbg duration-200 hover:bg-bluebg hover:text-redbg rounded"
                                    >
                                        <MdOutlineDelete size={20} /> Delete
                                    </button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default McqFiles
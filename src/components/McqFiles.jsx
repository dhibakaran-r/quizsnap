import React from 'react'
import { GrDocumentUpdate } from 'react-icons/gr'
import { LuFileJson2 } from 'react-icons/lu'
import { MdOutlineDelete } from 'react-icons/md'

function McqFiles({ filterDatas, update, deletePop }) {
    return (
        <>
            <h1 className="text-2xl">Uploaded MCQ Files</h1>
            <table className="table-fixed text-secgray">
                <thead>
                    <tr className=''>
                        <th>File Name</th>
                        <th>Category</th>
                        <th>Level</th>
                        <th></th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody className=''>
                    {filterDatas.map((file) => (
                        // <li key={file.id} className="my-4 flex justify-between items-center">
                        <tr className=''>
                            <td>
                                <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-row gap-2 items-center"
                                >
                                    <LuFileJson2 className="text-bluelg" /> {file.name}
                                </a>
                            </td>
                            <td>
                                <span>{file.category}</span>
                            </td>
                            <td>
                                <span>{file.level}</span>
                            </td>
                            <td className='flex gap-4'>

                                <button
                                    onClick={() => update(file.id, file.name)}
                                    className="flex gap-2 justify-center items-center px-4 py-2 text-sm bg-secondary text-bluebg border border-secondary duration-200 hover:bg-bluebg hover:text-secondary rounded"
                                >
                                    <GrDocumentUpdate />  Update
                                </button>
                            {/* </td>
                            <td> */}
                                <button
                                    onClick={() => deletePop(file.id, file.name)}
                                    className="flex gap-2 justify-center items-center px-4 py-2 text-sm bg-redbg text-bluebg border border-redbg duration-200 hover:bg-bluebg hover:text-redbg rounded"
                                >
                                    <MdOutlineDelete size={20} /> Delete
                                </button>

                            </td>
                        </tr>
                        // </li>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default McqFiles
import React from 'react'
import { Table, Badge } from 'components/ui'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import SurveyFilter from '../SurveyFilter'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
const { Tr, Th, Td, THead, TBody, Sorter } = Table

const statusColor = {
    Complete: 'bg-emerald-500',
    pending: 'bg-amber-400',
}

const columns = [
    {
        header: 'Survey No',
        accessorKey: 'id',
        // cell: (props) => {
        //     const row = props.row.original
        //     return (
        //         <div>
        //             <span className="cursor-pointer">{row.id}</span>
        //         </div>
        //     )
        // },
    },
    {
        header: 'Description',
        accessorKey: 'item',
    },
    {
        header: 'Status',
        accessorKey: 'status',
        // cell: (props) => {
        //     const row = props.row.original
        //     return (
        //         <div className="flex items-center">
        //             <Badge className={statusColor[row.status]} />
        //             <span className="ml-2 rtl:mr-2 capitalize">
        //                 {row.status}
        //             </span>
        //         </div>
        //     )
        // },
    },
    {
        header: 'Date',
        accessorKey: 'date',
        // cell: (props) => {
        //     const row = props.row.original
        //     return (
        //         <div className="flex items-center">
        //             {dayjs.unix(row.date).format('MM/DD/YYYY')}
        //         </div>
        //     )
        // },
    },
    {
        header: 'Amount',
        accessorKey: 'amount',
        // cell: (props) => {
        //     const row = props.row.original
        //     return (
        //         <div className="flex items-center">
        //             <NumberFormat
        //                 displayType="text"
        //                 value={(Math.round(row.amount * 100) / 100).toFixed(2)}
        //                 prefix={'$'}
        //                 thousandSeparator={true}
        //             />
        //         </div>
        //     )
        // },
    },
]

const SurveyTableDetails = () =>{
    const table = useReactTable({
        
        columns,
       
    })
    return (
        <div className="mb-8">
            
            <Table>
                <THead>
                {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                               
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {/* {table
                        .getRowModel()
                        .rows.slice(0, 10)
                        .map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Td>
                                        )
                                    })}
                                </Tr>
                            )
                        })} */}
                </TBody>
            </Table>
        </div>
    )
}

export default SurveyTableDetails
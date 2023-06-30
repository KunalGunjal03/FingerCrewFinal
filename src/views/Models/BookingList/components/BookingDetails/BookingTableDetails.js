import React from 'react'
import { Table, Badge } from 'components/ui'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import useThemeClass from 'utils/hooks/useThemeClass'
import { FcDownload } from 'react-icons/fc'
import { AdaptableCard } from 'components/shared'
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
        header :'Booking No',
        accessorKey: 'booking_No'
      
    },
    {
        header :'Date',
        accessorKey: 'booking_date',
        cell: (props) => {
            const row = props.row.original
            return <span className="capitalize">{row.booking_date}</span>
        },
      
    },
    {
        header: 'Survey No',
        accessorKey: 'survey_no',
       
    },
   
    {
        header: 'surveyor Name',
        accessorKey: 'surveyor_name',
      
    },
    {
        header: 'Solar company',
        accessorKey: '',
              
    },
    {
        header: 'Package',
        accessorKey: '',
              
    },
    {
        header: 'Survey Status',
        accessorKey: 'survye_status',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <Badge className={statusColor[row.survye_status]} />
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.survye_status}
                    </span>
                </div>
            )
        },
    },
    // {
    //     header: 'Survey form',
    //     accessorKey: '',
    //     cell: (props) => <SurveyFormColumn row={props.row.original} />,
    // }
]
const SurveyFormColumn = ({row}) =>{
  
    const { textTheme } = useThemeClass()
   

    const onDownload = () => {
        fetch('http://fingercrewapi.alphonsol.com//FingerCrew/2023/June/15.06.2023/Surveyor/Documents/7020702110/360_F_350696716_k5DaMluvXolFKxGIM3psna1svysIbwNB.jpg')
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = '360_F_350696716_k5DaMluvXolFKxGIM3psna1svysIbwNB.jpg';
                    a.click();
                });
                //window.location.href = response.url;
        });
    }

    // const onDelete = () => {
    //     dispatch(toggleDeleteConfirmation(true))
    //     dispatch(setSelectedProduct(row.id))
    // }

    return (
        <div className="flex justify-center text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onDownload}
            >
                <FcDownload/>
                {/* <FcSurvey/> */}
            </span>
        </div>
    )
}

const BookingTableDetails = () =>{
    const table = useReactTable({
        
        columns,
       
    })
    return (
        <div className="grid lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-4 h-full">
        <div className='2xl:col-span-4 lg:col-span-4 xl:col-span-4 mt-4'>
        <AdaptableCard className="mb-4" divider>
            <h5>Booking Details</h5>
            <p className="mb-7"></p>
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
        </AdaptableCard>
        </div>
        </div>
        
        
    )
}

export default BookingTableDetails
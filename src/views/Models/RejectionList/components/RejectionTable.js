import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useCallback, useMemo,useState } from 'react'
import useThemeClass from 'utils/hooks/useThemeClass'
import { HiEye } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom'
import { Badge ,Table, Pagination, Select} from 'components/ui'
import { getRejectionList } from '../store/dataSlice';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'
import {Input } from 'components/ui'
import { rankItem } from '@tanstack/match-sorter-utils'
import { FcDownload } from 'react-icons/fc'
import {Tooltip} from 'components/ui';
const statusColor = {
    Completed: 'bg-emerald-500',
    'In Process' : 'bg-yellow-400',
    Verified: 'bg-sky-500',
    Cancelled : 'bg-red-600'
}
const { Tr, Th, Td, THead, TBody } = Table

// const totalData = tableData().length


function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value,debounce,onChange])

    return (
        <div className="flex justify-end">
            <div className="flex items-center mb-4">
                <span className="mr-2">Search:</span>
                <Input
                    {...props}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

const fuzzyFilter = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)
    
    // Store the itemRank info
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}
const RejectionTable = ()=>{
    const [columnFilters, setColumnFilters] = React.useState([])
    const [globalFilter, setGlobalFilter] = React.useState('')
    const dispatch = useDispatch()
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    const data = useSelector((state) => state.crmRejectionlist.data.RejectionList.getData)
    console.log(data) 
    var totalData = ''
    if(data)
    {
        totalData = data.length
        console.log(totalData)
    }
    const pageSizeOption = [
        { value: 10, label: `1  /${totalData}`},
        { value: 20, label: '20 / page' },
        { value: 30, label: '30 / page' },
        { value: 40, label: '40 / page' },
        { value: 50, label: '50 / page' },
    ]
    const fetchData = useCallback(() => {
        try{
        dispatch(getRejectionList({ token,tokenKey }))
        }
        catch(error)
        {
        console.error(error)    
        return error;
        }
        
    }
    , [dispatch,token,tokenKey])
  
    
    useEffect(() => {
        fetchData()
    }, [fetchData,])

    const columns = useMemo(
        () => [
            {
                header :'Booking No',
                accessorKey: 'booking_No'
              
            },
            {
                header :'Booking Date',
                accessorKey: 'booking_date',
                // cell: (props) => {
                //     const row = props.row.original
                //     const bookingDate = new Date(row.booking_date);
                //     const formattedDate = bookingDate.toLocaleDateString('en-GB'); // Change 'en-GB' to your desired locale
                //     return <span className="capitalize">{formattedDate}</span>;     
                // },
              
            },
            {
                header: 'Survey No',
                accessorKey: 'survey_no',
               
            },
           
            // {
            //     header: 'Solar company',
            //     accessorKey: '',
              
            // },
            // {
            //     header: 'Package',
            //     accessorKey: '',
              
            // },
            {
                header: 'surveyor Name',
                accessorKey: 'surveyor_name',
              
            },
            {
                header: 'Survey Location',
                accessorKey: 'survey_location',
              
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
            // },
            {
                header: 'Action',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )
    const table = useReactTable({
        data,
        columns,
        // Pipeline
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugHeaders: true,
        debugColumns: false,
    })
    const onPaginationChange = (page) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value) => {
        table.setPageSize(Number(value))
    }
    const ActionColumn = ({ row }) => {
        // const dispatch = useDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()
    
        const onView = () => {
            
            navigate(`/RejectionDetails/${row.survey_no}`)
        }
    
        // const onDelete = () => {
        //     dispatch(toggleDeleteConfirmation(true))
        //     dispatch(setSelectedProduct(row.id))
        // }
    
        return (
            <div className="flex justify-left text-lg">
                <Tooltip title="view">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiEye/>
                </span>
                </Tooltip>
            </div>
        )
    }
    return (
        <>
        <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 font-lg shadow border border-block"
            placeholder="Search all columns..."
        />
    {data ? (
        <div>
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
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </Th>
                            )
                        })}
                    </Tr>
                ))}
            </THead>
            <TBody>
                {table.getRowModel().rows.map((row) => {
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
                })}
            </TBody>
        </Table>
        <div className="flex items-center justify-between mt-4">
            <Pagination
                pageSize={table.getState().pagination.pageSize}
                currentPage={table.getState().pagination.pageIndex + 1}
                total={totalData}
                onChange={onPaginationChange}
            />
            <div style={{ minWidth: 130 }}>
                <Select
                    size="sm"
                    isSearchable={false}
                    value={pageSizeOption.filter(
                        (option) =>
                            option.value ===
                            table.getState().pagination.pageSize
                    )}
                    options={pageSizeOption}
                    onChange={(option) => onSelectChange(option.value)}
                />
            </div>
        </div>
    </div>
    ):(
        <p></p>
    )}
    
    </>
    )
}

export default  RejectionTable
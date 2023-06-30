
import { Table, Pagination, Select } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import {  Badge } from 'components/ui'
import React, { useEffect, useCallback, useMemo,useState } from 'react'
import { getServeyList } from '../store/dataSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { HiEye } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom'
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
const statusColor = {
    Complete: 'bg-emerald-500',
    Pending: 'bg-red-500',
    Verified: 'bg-sky-500',
    Rejected : 'bg-red-600'
}
const { Tr, Th, Td, THead, TBody } = Table

// const tableData = () => {
//     const arr = []
//     for (let i = 0; i < 100; i++) {
//         arr.push({
//             firstName: `Maria ${i}`,
//             lastName: `Anders ${i}`,
//             age: i,
//         })
//     }
//     return arr
// }
// console.log(tableData)  


const pageSizeOption = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
]
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
    }, [value])

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
const SampleList = () => {
    const [columnFilters, setColumnFilters] = React.useState([])
    const [globalFilter, setGlobalFilter] = React.useState('')
    const dispatch = useDispatch()
    const data1 = useSelector((state) => state.crmCustomers.data.SurveyList)
    // console.log(data1)
    const data = data1.getData
    console.log(data)
    const totalData = data.length
    console.log(totalData)
    const {token,tokenKey} = useSelector((state) => state.auth.user)

    const fetchData = useCallback(() => {
        try{
        dispatch(getServeyList({ token,tokenKey }))
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
    const ActionColumn = ({ row }) => {
        // const dispatch = useDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()
    
        const onView = () => {
            console.log(row.survey_id)
            navigate(`/SurveyView/${row.survey_id}`)
        }
    
        // const onDelete = () => {
        //     dispatch(toggleDeleteConfirmation(true))
        //     dispatch(setSelectedProduct(row.id))
        // }
    
        return (
            <div className="flex justify-center text-lg">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiEye/>
                </span>
            </div>
        )
    }
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
    
    const columns = useMemo(
        () => [
            {
                header :'Survey No',
                accessorKey: 'survey_id'
              
            },
            {
                header: 'Survey Name',
                accessorKey: 'description',
               
            },
           
            {
                header: 'Installer Name',
                accessorKey: 'InstallerName',
              
            },
            {
                header: 'surveyor Name',
                accessorKey: 'SurveyorName',
              
            },
            {
                header: 'Survey Location',
                accessorKey: 'SurveyLocation',
              
            },
            {
                header: 'Survey Status',
                accessorKey: 'SurveyStatus',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor[row.SurveyStatus]} />
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {row.SurveyStatus}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Survey form',
                accessorKey: '',
                cell: (props) => <SurveyFormColumn row={props.row.original} />,
            },
            {
                header: 'Action',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

     //const [data] = React.useState(() => tableData())

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

    return (
        <>
        <DebouncedInput
                value={globalFilter ?? ''}
                onChange={(value) => setGlobalFilter(String(value))}
                className="p-2 font-lg shadow border border-block"
                placeholder="Search all columns..."
            />
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
    </>
    )
}

export default SampleList
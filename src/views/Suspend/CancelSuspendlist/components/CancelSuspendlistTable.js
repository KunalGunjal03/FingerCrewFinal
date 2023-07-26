import React, { useEffect, useMemo, useRef ,useCallback,useState} from 'react'
import { HiOutlinePencil,HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getSurveyor } from '../store/dataSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import useAuth from 'utils/hooks/useAuth'
import '../../../../assets/styles/components/color.css';

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
import {Input,Avatar } from 'components/ui'
import { rankItem } from '@tanstack/match-sorter-utils'
import { Badge,Table, Pagination, Select } from 'components/ui'
import { HiEye } from 'react-icons/hi'
const { Tr, Th, Td, THead, TBody } = Table

// const totalData = tableData().length
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

const SurveyorColumn = ({ row }) => {
   
    return (    
        <div className="flex items-center">
           {/* <Avatar size={28} shape="circle" src={Img} /> */}
            {/* {row.registration_no} */}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.user_name}</span>
        </div>
    )
}

const SuspendlistTable = () => {
    const [columnFilters, setColumnFilters] = React.useState([])
    const [globalFilter, setGlobalFilter] = React.useState('')
    // const {signOut} = useAuth()
    const tableRef = useRef(null)
    const dispatch = useDispatch()

    var  d = useSelector((state) => state.listsSurveyorList.data.surveyorList.status)
    console.log(d)

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.listsSurveyorList.data.tableData
    )

    const filterData = useSelector(
        (state) => state.listsSurveyorList.data.filterData
    )

    const loading = useSelector((state) => state.listsSurveyorList.data.loading)
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    const data= useSelector((state) => state.listsSurveyorList.data.surveyorList.getData)
    console.log(data)
    var totalData = ''
    // const data = data1.getData
    // console.log(data)
    // const [data] = React.useState(() => tableData())
    if(data)
    {
        totalData = data.length
        console.log(totalData)
    }
    const fetchData = useCallback(() => {
        try{
        dispatch(getSurveyor({ token,tokenKey}))
        }catch(error)
        {
            console.error(error)
            return error;
        }
    },[dispatch,token,tokenKey])
    useEffect(() => {
        fetchData()
    }, [fetchData,])
 
    const columns = useMemo(
        () => [
            {
                header: 'user_id',
                accessorKey: 'user_id',
               
            },    
            {
                header: 'user_type',
                accessorKey: 'user_type',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.user_type}</span>
                },
            },
            {
              header: 'Suspended_account_name',
              accessorKey: 'Suspended_account_name',
              cell: (props) => {
                  const row = props.row.original
                  return <span className="capitalize">{row.Suspended_account_name}</span>
              },
            },
            {
              header: 'no_of_suspend_days',
              accessorKey: 'no_of_suspend_days',
              cell: (props) => {
                  const row = props.row.original
                  return <span className="capitalize">{row.no_of_suspend_days}</span>
              },
            },
            {
              header: 'Suspend_status',
              accessorKey: 'Suspend_status',
              cell: (props) => {
                  const row = props.row.original
                  return <span className="capitalize">{row.Suspend_status}</span>
              },
            },
            {
              header: 'Suspend_remarks',
              accessorKey: 'Suspend_remarks',
              cell: (props) => {
                  const row = props.row.original
                  return <span className="capitalize">{row.Suspend_remarks}</span>
              },
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
     if( d ==="Failed")
    {
        try{
            
            dispatch(signOut)
        }
        catch(error)
        {
            console.log(error)
        }
      
    }
    else
    {
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
}

export default SuspendlistTable
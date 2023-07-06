import React, { useEffect, useMemo, useRef ,useCallback,useState} from 'react'
import { HiOutlinePencil } from 'react-icons/hi'

import { useDispatch, useSelector } from 'react-redux'
import { getInstaller } from '../store/dataSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import useAuth from 'utils/hooks/useAuth'
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

const ActionColumn = ({ row }) => {
    // const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
    //     var CryptoJS = require("crypto-js");

    //    var ciphertext = CryptoJS.AES.encrypt(row.surveyor_master_id, 'secret key 123');
    //    console.log("encrypted text", ciphertext.toString());
        navigate(`/VerifyInstaller/${row.installer_master_id}`)
    }
    // ${row.id}
    // const onDelete = () => {
    //     dispatch(toggleDeleteConfirmation(true))
    //     dispatch(setSelectedSurveyor(row.id))
    // }
    //console.log(row)    
    return (
        <div className="flex justify-start text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiEye/>
            </span>
            {/* <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span> */}
        </div>
    )
}

const InstallerCloumn = ({ row }) => {
    // const avatar = row.img ? (
    //     <Avatar src={row.img} />
    // ) : (
    //     <Avatar icon={<FiPackage />} />
        
    // )

    return (    
        <div className="flex items-center">
           {/* <Avatar size={28} shape="circle" src={Img} /> */}
            {/* {row.registration_no} */}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.installer_name}</span>
        </div>
    )
}






const InstallerTable = () => {
    const [columnFilters, setColumnFilters] = React.useState([])
    const [globalFilter, setGlobalFilter] = React.useState('')
    const {signOut} = useAuth()
    const tableRef = useRef(null)
    const dispatch = useDispatch()

    var  d = useSelector((state) => state.listsInstallerList.data.InstallerList.status)
    console.log(d)

   
  

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.listsInstallerList.data.tableData
    )

    const filterData = useSelector(
        (state) => state.listsInstallerList.data.filterData
    )

    const loading = useSelector((state) => state.listsInstallerList.data.loading)
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    const data= useSelector((state) => state.listsInstallerList.data.InstallerList.getData)
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
        dispatch(getInstaller({ token,tokenKey}))
        }catch(error)
        {
            console.error(error)
            return error;
        }
    },[dispatch,token,tokenKey])
    useEffect(() => {
        fetchData()
        //getSurveyor()
        //apiGetlistsSurveyor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData,])
    // const statusColor = {
       
    //     Rejected: 'bg-red-500',
    //     Verified : 'bg-emerald-500'
    // }
   
    const columns = useMemo(
        () => [
            {
                header: 'Registration No.',
                accessorKey: 'installer_master_id',
                // cell: (props) => {
                //     const row = props.row.original
                //     return <SurveyorColumn row={row} />
                // },
            },
            {
                header: 'Installer Name',
                accessorKey: 'installer_name',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.installer_name}</span>
                },
            },
            {
                header: 'Company Name',
                accessorKey: 'installer_company',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.installer_company}</span>
                },
            },
            {
                header: 'Email-ID',
                accessorKey: 'installer_email_id',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.installer_email_id}</span>
                },
            },
            {
                header: 'Mobile No.',
                accessorKey: 'installer_contact_number',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.installer_contact_number}</span>
                },
            },
            
            {
                header: 'Date of Birth',
                accessorKey: 'installer_dob',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.installer_dob}</span>
                },
            },
            
            
         
          
            // {
            //     header: 'Status',
            //     accessorKey: 'registration_status',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 <Badge className={statusColor[row.registration_status]} />
            //                 <span className="ml-2 rtl:mr-2 capitalize">
            //                     {row.registration_status}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
           
            {
                header: 'Action',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />
                
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
export default InstallerTable




// import React, { useEffect, useMemo, useRef } from 'react'
// import { Avatar } from 'components/ui'
// import { DataTable } from 'components/shared'
// import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
// import { FiPackage } from 'react-icons/fi'
// import { useDispatch, useSelector } from 'react-redux'
// import { getProducts, setTableData } from '../store/dataSlice'
// import { setSelectedProduct } from '../store/stateSlice'
// import { toggleDeleteConfirmation } from '../store/stateSlice'
// import useThemeClass from 'utils/hooks/useThemeClass'

// import { useNavigate } from 'react-router-dom'
// import cloneDeep from 'lodash/cloneDeep'

// //new code changes
// import { useState } from 'react'



// const ActionColumn = ({ row }) => {
//     const dispatch = useDispatch()
//     const { textTheme } = useThemeClass()
//     const navigate = useNavigate()

//     const onEdit = () => {
//         navigate(`/app/sales/product-edit/${row.id}`)
//     }

//     const onDelete = () => {
//         dispatch(toggleDeleteConfirmation(true))
//         dispatch(setSelectedProduct(row.id))
//     }

//     return (
//         <div className="flex justify-end text-lg">
//             <span
//                 className={`cursor-pointer p-2 hover:${textTheme}`}
//                 onClick={onEdit}
//             >
//                 <HiOutlinePencil />
//             </span>
//             <span
//                 className="cursor-pointer p-2 hover:text-red-500"
//                 onClick={onDelete}
//             >
//                 <HiOutlineTrash />
//             </span>
//         </div>
//     )
// }

// const SurveyorColumn = ({ row }) => {
//     const avatar = row.img ? (
//         <Avatar src={row.img} />
//     ) : (
//         <Avatar icon={<FiPackage />} />
//     )

//     return (    
//         <div className="flex items-center">
//             {avatar}
//             <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
//         </div>
//     )
// }

// const SurveyorTable = () => {

//     const [data, setData] = useState([])


//     const tableRef = useRef(null)

//     const dispatch = useDispatch()

//     const { pageIndex, pageSize, sort, query, total } = useSelector(
//         (state) => state.salesProductList.data.tableData
//     )

//     const filterData = useSelector(
//         (state) => state.salesProductList.data.filterData
//     )

//    // const loading = useSelector((state) => state.salesProductList.data.loading)
//    const [isLoading, setIsLoading] = useState(true)

    
//    // const data = useSelector((state) => state.salesProductList.data.productList)

//     // useEffect(() => {
//     //     fetchData()
//     //     // eslint-disable-next-line react-hooks/exhaustive-deps
//     // }, [pageIndex, pageSize, sort])

//     useEffect(() => {
//         if (tableRef) {
//             tableRef.current.resetSorting()
//         }
//     }, [filterData])

//     const tableData = useMemo(
//         () => ({ pageIndex, pageSize, sort, query, total }),
//         [pageIndex, pageSize, sort, query, total]
//     )

//     // const fetchData = () => {
//     //     dispatch(getProducts({ pageIndex, pageSize, sort, query, filterData }))
//     // }
//     const fetchData = async () => {
//         setIsLoading(true)
//         try {
//             const response = await fetch('https://localhost:7021/api/Surveyor/getSurveyor')
//             const json = await response.json()
//             setData(json)
//         } catch (error) {
//             console.error(error)
//         } finally {
//             setIsLoading(false)
//         }
//     }
    
    
//     useEffect(() => {
//         fetchData()
//     }, [])
    

//     const columns = useMemo(
//         () => [
//             {
//                 header: 'Surveyor id',
//                 accessorKey: 'surveyor_master_id',
//                 cell: (props) => {
//                     const row = props.row.original
//                     return <SurveyorColumn row={row.surveyor_master_id} />
//                 },
//             },
//             // {
//             //     header: 'Salutation',
//             //     accessorKey: 'category',
//             //     cell: (props) => {
//             //         const row = props.row.original
//             //         return <span className="capitalize">{row.category}</span>
//             //     },
//             // },
            
            
//             {
//                 header: 'Surveyor Name',
//                 accessorKey: 'surveyor_name',
//                 cell: (props) => {
//                     const row = props.row.original
//                     return <span className="capitalize">{row.surveyor_name}</span>
//                 },
//             },
//             {
//                 header: 'DOB',
//                 accessorKey: 'dob',
//                 cell: (props) => {
//                     const row = props.row.original
//                     return <span className="capitalize">{row.dob}</span>
//                 },
//             },
//             {
//                 header: 'Email-ID',
//                 accessorKey: 'email_id',
//                 cell: (props) => {
//                     const row = props.row.original
//                     return <span className="capitalize">{row.email_id}</span>
//                 },
//             },
//             {
//                 header: 'Mobile No',
//                 accessorKey: 'mobile_no',
//                 cell: (props) => {
//                     const row = props.row.original
//                     return <span className="capitalize">{row.mobile_no}</span>
//                 },
//             },
//             {
//                 header: '',
//                 id: 'action',
//                 cell: (props) => <ActionColumn row={props.row.original} />,
//             },
//         ],
//         []
//     )

//     const onPaginationChange = (page) => {
//         const newTableData = cloneDeep(tableData)
//         newTableData.pageIndex = page
//         dispatch(setTableData(newTableData))
//     }

//     const onSelectChange = (value) => {
//         const newTableData = cloneDeep(tableData)
//         newTableData.pageSize = Number(value)
//         newTableData.pageIndex = 1
//         dispatch(setTableData(newTableData))
//     }

//     const onSort = (sort, sortingColumn) => {
//         const newTableData = cloneDeep(tableData)
//         newTableData.sort = sort
//         dispatch(setTableData(newTableData))
//     }

//     return (
//         <>
//             {/* <DataTable
//                 ref={tableRef}
//                 columns={columns}
//                 data={data}
//                // skeletonAvatarColumns={[0]}
//                 skeletonAvatarProps={{ className: 'rounded-md' }}
//                 loading={loading}
//                 pagingData={tableData}
//                 onPaginationChange={onPaginationChange}
//                 onSelectChange={onSelectChange}
//                 onSort={onSort}
//             /> */}

// <DataTable
//     ref={tableRef}
//     columns={columns}
//     data={isLoading ? [] : data}
//     loading={isLoading}
//     skeletonAvatarProps={{ className: 'rounded-md' }}
//     onPaginationChange={onPaginationChange}
//     onSelectChange={onSelectChange}
//     onSort={onSort}
// />

           
//         </>
//     )
// }

// export default SurveyorTable
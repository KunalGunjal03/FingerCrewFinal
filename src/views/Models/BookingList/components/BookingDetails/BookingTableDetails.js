import React,{useMemo,lazy,useState,useEffect} from 'react'
import { Table, Badge,Pagination,Select,Input,Button ,Tooltip} from 'components/ui'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { HiEye } from "react-icons/hi2";
import { FcSearch } from 'react-icons/fc';
import useThemeClass from 'utils/hooks/useThemeClass'
import { FcDownload } from 'react-icons/fc'
import { AdaptableCard } from 'components/shared'
import { useNavigate } from 'react-router-dom'
import Subscription from './Subscription'
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
import InstallerInfo from './InstallerInfo';
import { rankItem } from '@tanstack/match-sorter-utils'
import { MdArrowBackIosNew } from 'react-icons/md';
import { theme } from 'twin.macro';
const { Tr, Th, Td, THead, TBody, Sorter } = Table

const statusColor = {
    Completed: 'bg-emerald-500',
    'In Process' : 'bg-yellow-400',
    Verified: 'bg-sky-500',
    Cancelled : 'bg-red-600'
}
const pageSizeOption = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
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
            <div className="flex items-center mb-2">
                
                <Input
                    {...props}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    icon = {<FcSearch />}
                />
                {/* <span className="mr-2"><FcSearch style={{ fontSize: '25px' }}/></span> */}
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
const BookingTableDetails = ({
        data={
                booking_mast_id : '',
                booking_no:'',
                survey_no:'',
                installer_master_id:'',
                installer_name:'',
                installer_company:'',
                surveyor_master_id:'',
                surveyor_name:'',
                survey_client_name:'',
                booking_date:'',
                survey_location:'',
                survey_scheduled_date:'',
                survye_status:''
            },
        InstallerData={
            installer_master_id:'',
            installer_name:'',
            installer_company:'',
            installer_email:'',
            kyc_path:'',
            installer_contact:''
        },
        PackageData={
            package_name:'',
            valid_from:'',
            valid_to:''
        },
            onNextChange
        }) =>{
            const [columnFilters, setColumnFilters] = React.useState([])
            const [globalFilter, setGlobalFilter] = React.useState('')
            const navigate = useNavigate()
            const ActionColumn = ({ row }) => {
                // const dispatch = useDispatch()
                const { textTheme } = useThemeClass()
                const navigate = useNavigate()
            
                const onView = async () => {
                    navigate(`/bookingSurveyDetails/${row.survey_no}`)
                    
                   
                    
                 
                } 
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
            const columns = useMemo(
                () => [
                    {
                        header :'Booking No',
                        accessorKey: 'booking_no'
                      
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
                    //     header: 'Package',
                    //     accessorKey: '',
                      
                    // },
                    // {
                    //     header: 'surveyor Name',
                    //     accessorKey: 'surveyor_name',
                      
                    // },
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
                    {
                        header: 'Action',
                        id: 'action',
                        cell: (props) => <ActionColumn row={props.row.original} />,
                    },
                    // {
                    //     header: 'Survey form',
                    //     accessorKey: '',
                    //     cell: (props) => <SurveyFormColumn row={props.row.original} />,
                    // },
                ],
                []
            )
            
    const table = useReactTable({
        data,
        columns,
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
    console.log(data)
    var totalData = ''
    if(data)
    {
        totalData = data.length
        console.log(totalData)
    }
    // var InstallerData 
    // if(data)
    // {
    //  InstallerData = { installer_master_id : data[0].installer_master_id, installer_name: data[0].installer_name, installer_company: data[0].installer_company,installer_contact: data[0].installer_contact,
    //     installer_email: data[0].installer_email,kyc_path: data[0].kyc_path
    // }
     
    // }
    const onPaginationChange = (page) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value) => {
        table.setPageSize(Number(value))
    }
    const onBackClick = ()=>{
        
        try{
            navigate('/BookingList')
        }
        catch(error)
        {
            console.error(error)
        }
    }
    console.log(InstallerData)
    console.log(PackageData)
    console.log(data)
    return (
    <>
        {/* <InstallerInfo /> */}
       <div className="grid lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-2 h-full">
           
            <div className="col-start-1 col-end-3 ">
            <AdaptableCard>
            <InstallerInfo data = {InstallerData}/>
                </AdaptableCard>
            </div>
            <div className="col-start-3 col-span-2">
                <AdaptableCard>
                <Subscription data={PackageData}/>
                
                </AdaptableCard>
            </div>        
        <AdaptableCard className="col-start-1 col-end-7">
            {/* <h5>Booking Details</h5>
            <p className="mb-4"></p> */}
            <div className='flex justify-end' >
            <DebouncedInput
                value={globalFilter ?? ''}
                onChange={(value) => setGlobalFilter(String(value))}
                className="p-2 font-lg shadow border border-block"
                placeholder="Search"
            />
            </div>
            {data ?(
            <div className="mb-4">
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
                    {table
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
        </AdaptableCard>
        
            
        </div>
        
        </>
    )
}

export default BookingTableDetails
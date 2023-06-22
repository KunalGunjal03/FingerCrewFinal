import React, { useEffect, useMemo, useRef } from 'react'

import { DataTable } from 'components/shared'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'

import { useDispatch, useSelector } from 'react-redux'
import { getreqSurveyor, setTableData } from '../store/dataSlice'
// import { setSelectedSurveyor } from '../store/stateSlice'
// import { toggleDeleteConfirmation } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'

import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import useAuth from 'utils/hooks/useAuth'
import { Badge } from 'components/ui'
//import { apiGetlistsSurveyor }  from 'services/SalesService'


const ActionColumn = ({ row }) => {
    // const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
    //     var CryptoJS = require("crypto-js");

    //    var ciphertext = CryptoJS.AES.encrypt(row.surveyor_master_id, 'secret key 123');
    //    console.log("encrypted text", ciphertext.toString());
        navigate(`/VerifySurveyor/${row.registration_no}`)
    }
    // ${row.id}
    // const onDelete = () => {
    //     dispatch(toggleDeleteConfirmation(true))
    //     dispatch(setSelectedSurveyor(row.id))
    // }
    //console.log(row)    
    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
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

const SurveyorColumn = ({ row }) => {
    // const avatar = row.img ? (
    //     <Avatar src={row.img} />
    // ) : (
    //     <Avatar icon={<FiPackage />} />
        
    // )

    return (    
        <div className="flex items-center">
            {/* {avatar} */}
            {row.registration_no}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}





const SurveyorTable = () => {
    const {signOut} = useAuth()
    const tableRef = useRef(null)
    const dispatch = useDispatch()
    // var  d = useSelector((state) => state.listsSurveyorList.data.surveyorList.status)
    // console.log(d)

    // if(d ==="Failed")
    // {
    //     try{
            
    //         dispatch(signOut)
    //     }
    //     catch(error)
    //     {
    //         console.log(error)
    //     }
      
    // }
  

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.listsSurveyorList.data.tableData
    )

    const filterData = useSelector(
        (state) => state.listsSurveyorList.data.filterData
    )

    const loading = useSelector((state) => state.listsSurveyorList.data.loading)
    
    const data= useSelector((state) => state.listsSurveyorList.data.surveyorList.getData)
  
    useEffect(() => {
        fetchData()
        //getSurveyor()
        //apiGetlistsSurveyor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    // useEffect(() => {
    //     if (tableRef) {
    //         tableRef.current.resetSorting()
    //     }
    // }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const {token,tokenKey} = useSelector((state) => state.auth.user)
   
    const fetchData = () => {
        try{
        dispatch(getreqSurveyor({ pageIndex, pageSize, sort, query, filterData,token,tokenKey}))
        }catch(error)
        {
            console.error(error)
            return error;
        }
    }
    const statusColor = {
       
        1: 'bg-red-500',
    }
   
    const columns = useMemo(
        () => [
            {
                header: 'Registration No.',
                accessorKey: 'registration_no',
                cell: (props) => {
                    const row = props.row.original
                    return <SurveyorColumn row={row} />
                },
            },

            
            {
                header: 'Date',
                accessorKey: 'registration_date',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.registration_date}</span>
                },
            },
            
            
            {
                header: 'Surveyor Name',
                accessorKey: 'surveyor_name',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.surveyor_name}</span>
                },
            },
           
            {
                header: 'Mobile No.',
                accessorKey: 'mobile_no',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.mobile_no}</span>
                },
            },
            {
                header: 'Status',
                accessorKey: 'registration_status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor[row.registration_status]} />
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {row.registration_status ? 'Pending':'pending'}
                            </span>
                        </div>
                    )
                },
            },
           
            {
                header: 'Action',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />
                
            },
        ],
        []
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort, sortingColumn) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }
  
    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
               // skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
           
        </>
    )
}

export default SurveyorTable




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
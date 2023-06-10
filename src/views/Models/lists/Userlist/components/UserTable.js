import React, { useEffect, useMemo, useRef } from 'react'
import { DataTable } from 'components/shared'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getSurveyor, setTableData } from '../store/dataSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/EditServeyor/${row.user_id}`)
    }
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
    return (    
        <div className="flex items-center">
            {/* {avatar} */}
            {row.user_id}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const UserTable = () => {

    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.listsSurveyorList.data.tableData
    )

    const filterData = useSelector(
        (state) => state.listsSurveyorList.data.filterData
    )

    const loading = useSelector((state) => state.listsSurveyorList.data.loading)
    
    const data= useSelector((state) => state.listsSurveyorList.data.surveyorList.getData)
    console.log(data)

    useEffect(() => {
        fetchData()
        
    }, [pageIndex, pageSize, sort])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const {token,tokenKey} = useSelector((state) => state.auth.user)
    const fetchData = () => {
        try{
        dispatch(getSurveyor({ pageIndex, pageSize, sort, query, filterData,token,tokenKey}))
        }catch(error)
        {
            console.error(error)
            return error;
        }
    }
   
    const columns = useMemo(
        () => [
            {
                header: 'user-Id',
                accessorKey: 'user_id',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.user_id}</span>
                },
            },
            {
                header: 'Employee Code',
                accessorKey: 'employee_code',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.employee_code}</span>
                },
            },
            {
                header: 'username',
                accessorKey: 'username',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.username}</span>
                },
            },       
            {
                header: 'User FullName',
                accessorKey: 'user_fullname',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.user_fullname}</span>
                },
            },
            {
                header: 'Email-Id',
                accessorKey: 'user_mail_id',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.user_mail_id}</span>
                },
            },
            {
                header: 'Contact No.',
                accessorKey: 'contact_detail',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.contact_detail}</span>
                },
            },
            {
                header: 'User Role',
                accessorKey: 'user_role',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.user_role}</span>
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

export default UserTable



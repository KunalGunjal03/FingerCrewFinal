import React, { useEffect, useCallback, useMemo } from 'react'
import {  Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getServeyList, setTableData } from '../store/dataSlice'
import { HiDownload} from 'react-icons/hi'
import { HiEye } from "react-icons/hi2";
import {
    setSelectedCustomer,
    setDrawerOpen,
} from '../store/stateSlice'
import { useNavigate } from 'react-router-dom'
import useThemeClass from 'utils/hooks/useThemeClass'
import { Link } from 'react-router-dom'
// import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import { AES, enc } from 'crypto-js';
import useAuth from 'utils/hooks/useAuth'
import appConfig from 'configs/app.config'
import { FcDownload } from 'react-icons/fc'
import { FcSurvey } from 'react-icons/fc'
const statusColor = {
    Complete: 'bg-emerald-500',
    Pending: 'bg-red-500',
    Verified: 'bg-sky-500',
    Rejected : 'bg-red-600'
}

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
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
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onDownload = () => {
        fetch('C:/Users/DELL/Downloads/')
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'February2023_SalarySlip.pdf';
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



const columns = [
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
]

const SurveyTable = () => {

    const {signOut} = useAuth()
    const dispatch = useDispatch()
    
    var  d = useSelector((state) => state.crmCustomers.data.SurveyList.status)
    
    if(d ==="Failed")
    {
        try{
            dispatch(signOut)
        }
        catch(error)
        {
            console.log(error)
        }
      
    }
    const data = useSelector((state) => state.crmCustomers.data.SurveyList.getData)
    const loading = useSelector((state) => state.crmCustomers.data.loading)
    const filterData = useSelector(
        (state) => state.crmCustomers.data.filterData
    )
   
    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.crmCustomers.data.tableData
    )
    const {token,tokenKey} = useSelector((state) => state.auth.user)

    const fetchData = useCallback(() => {
        try{
        dispatch(getServeyList({ pageIndex, pageSize, sort, query, filterData,token,tokenKey }))
        }
        catch(error)
        {
        console.error(error)
        return error;
        }
        
    }
    , [pageIndex, pageSize, sort, query, filterData, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort, filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
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

    const onSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{ pageIndex, pageSize, sort, query, total }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                // onSort={onSort}
            />
        </>
    )
}

export default SurveyTable

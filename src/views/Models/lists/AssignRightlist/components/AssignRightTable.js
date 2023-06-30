import React, { useEffect, useMemo, useRef } from 'react'
import { DataTable } from 'components/shared'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getSurveyor, setTableData } from '../store/dataSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { DeleteRightData } from 'services/Rights'

const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()
    
    const onDelete = async () => {
        try {
          await DeleteRightData(row.userrightsid);
            } catch (error) {
          console.error(error);
        }
      };
    return (
        <div className="flex text-lg">
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const SurveyorColumn = ({ row }) => {
    return (    
        <div className="flex items-center">
            {row.user_id}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const AssignRightTable = () => {
    const tableRef = useRef(null)
    const dispatch = useDispatch()
    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.listsRightslist.data.tableData
    )

    const filterData = useSelector(
        (state) => state.listsRightslist.data.filterData
    )

    const loading = useSelector((state) => state.listsRightslist.data.loading)
    const data= useSelector((state) => state.listsRightslist.data.surveyorList.getdata
    )
    console.log(data)
    useEffect(() => {
        fetchData()
        
    }, [pageIndex, pageSize, sort])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const {token,tokenKey} = useSelector((state) => state.auth.user)
    // const fetchData = () => {
    //     try{
    //     dispatch(getSurveyor({ pageIndex, pageSize, sort, query, filterData,token,tokenKey}))
    //     }catch(error)
    //     {
    //         console.error(error)
    //         return error;
    //     }
    // }
    
    const fetchData = () => {
        try {
          dispatch(getSurveyor({ pageIndex, pageSize, sort, query, filterData, token, tokenKey }));
        } catch (error) {
          console.error(error);
          return error;
        }
      };
         
    const columns = useMemo(
        () => [
            {
                header: 'userrightsid',
                accessorKey: 'userrightsid',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.userrightsid}</span>
                },
            },
            {
                header: 'user_role',
                accessorKey: 'user_role',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.user_role}</span>
                },
            },  
            {
                header: 'menu',
                accessorKey: 'menu',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.menu}</span>
                },
            },
            {
                header: 'SubMenu',
                accessorKey: 'SubMenu',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.SubMenu}</span>
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
export default AssignRightTable
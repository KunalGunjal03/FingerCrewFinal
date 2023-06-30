import React, { useEffect, useMemo, useRef } from 'react'
import { DataTable } from 'components/shared'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getSurveyor, setTableData } from '../store/dataSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
// import '../../../../../assets/styles/components/color.css';

import { DeleteRoleData} from 'services/RolesApi';


const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass();
    const navigate = useNavigate();

    const onEdit = () => {
      navigate(`/editRole/${row.roleid}`);
    };

    const onDelete = async () => {
      try {
        await DeleteRoleData(row.roleid);
          } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="flex justify-end text-lg">
        <span
          className={`cursor-pointer p-2 hover:${textTheme} mr-2`}
          onClick={onEdit}
        >
          <HiOutlinePencil />
        </span>
        <span className="cursor-pointer p-2 hover:text-red-500" onClick={onDelete}>
          <HiOutlineTrash />
        </span>

      </div>
    );
  };   

// const SurveyorColumn = ({ row }) => {
//     return (    
//         <div className="flex items-center">
//             {row.roleid}
//             <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
//         </div>
//     )
// }

const RoleTable = () => {
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
            header: 'Role ID',
            accessorKey: 'roleid',
            width: '25%',
            cell: (props) => {
              const row = props.row.original;
              return <span className="capitalize">{row.roleid}</span>;
            },
          },
          {
            header: 'Role',
            accessorKey: 'roledescription',
            width: '50%',
            cell: (props) => {
              const row = props.row.original;
              return <span className="capitalize">{row.roledescription}</span>;
            },
          },
          {
            header: 'Action',
            id: 'action',
            cell: (props) => <ActionColumn row={props.row.original} />
            
        },
        ],
        []
      );      

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
export default RoleTable
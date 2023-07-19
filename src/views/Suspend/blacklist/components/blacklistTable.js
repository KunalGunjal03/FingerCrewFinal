import React, { useEffect,useState, useMemo, useRef } from 'react'
import { DataTable } from 'components/shared'
import { Input, FormItem, FormContainer, Select } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dialog } from 'components/ui'
import { getSurveyor, setTableData } from '../store/dataSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import '../../../../assets/styles/components/color.css';
import { CancelBlacklist } from 'services/blacklist';

const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass();
    const navigate = useNavigate();

    const [dialogIsOpen, setIsOpen] = useState(false)
    const [remarks, setRemarks] = useState('');

  const openDialog = () => {
    setIsOpen(true)
  }

  const onDialogClose = (e) => {
      console.log('onDialogClose', e)
      setIsOpen(false)
  }

  const onDialogOk = async () => {
    try {
      await CancelBlacklist(row.user_id,remarks);
        } catch (error) {
      console.error(error);
    }
    setIsOpen(false);
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };
    
  return (
    <div className="flex justify-center">
    <Button variant="solid" onClick={() => openDialog()}>
      Cancel
    </Button>
    <Dialog isOpen={dialogIsOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
      <h5 className="mb-4 text-center">Blacklist Account</h5>
      <p className="mb-2 text-center">ARE YOU SURE..?</p>
      <p className="mb-2 text-center">Do you want to Blacklist User</p>
      <br/><br/>
      <Input type="text" value={remarks} onChange={handleRemarksChange} placeholder="Remark" />
      <div className="text-right mt-6">
        <Button className="ltr:mr-2 rtl:ml-2" variant="plain" onClick={onDialogClose}>
          Cancel
        </Button>
        <Button variant="solid" onClick={onDialogOk}>
          Okay
        </Button>
      </div>
    </Dialog>
  </div>
  );
};   

const BlacklistTable = () => {
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
            header: 'user_id',
            accessorKey: 'user_id',
            width: '25%',
            cell: (props) => {
              const row = props.row.original;
              return <span className="capitalize">{row.user_id}</span>;
            },
          },
          {
            header: 'user_type',
            accessorKey: 'user_type',
            width: '25%',
            cell: (props) => {
              const row = props.row.original;
              return <span className="capitalize">{row.user_type}</span>;
            },
          },
          {
            header: 'Blacklisted_account_name',
            accessorKey: 'Blacklisted_account_name',
            width: '50%',
            cell: (props) => {
              const row = props.row.original;
              return <span className="capitalize">{row.Blacklisted_account_name}</span>;
            },
          },
          {
            header: 'Blacklisted_Days',
            accessorKey: 'Blacklisted_Days',
            width: '50%',
            cell: (props) => {
              const row = props.row.original;
              return <span className="capitalize">{row.Blacklisted_Days}</span>;
            },
          },
          {
            header: 'Suspend_status',
            accessorKey: 'Suspend_status',
            width: '50%',
            cell: (props) => {
              const row = props.row.original;
              return <span className="capitalize">{row.Suspend_status}</span>;
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
export default BlacklistTable
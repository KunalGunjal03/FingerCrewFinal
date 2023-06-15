import React, { useRef } from 'react'
import { Button } from 'components/ui'
import { getServeyList, setTableData, setFilterData } from '../store/dataSlice'
import SurveyorTableSearch from './SurveyTableSearch'

import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import SurveyFilter from './SurveyFilter'
import SurveyorTableFilter from './SurveyTableFilter'
const SurveyTableTools = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.crmCustomers.data.tableData)

    const handleInputChange = (val) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        dispatch(setTableData(data))
        dispatch(getServeyList(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = ''
        inputRef.current.value = ''
        dispatch(setFilterData({ status: '' }))
        fetchData(newTableData)
    }

    return (
        <div className="md:flex items-center justify-between">
        <div className="md:flex items-center gap-4">
            <SurveyorTableSearch
            />
        </div>
        <div className="ml-2">
        <SurveyorTableFilter/>
        </div>
        <div className="mb-4">
        <SurveyFilter 
       
        />
        </div>
       
    </div>
    )
}

export default SurveyTableTools

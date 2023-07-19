import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetCancelBlacklist } from 'services/blacklist';

export const getSurveyor = createAsyncThunk(
  'listsSurveyorList/data/getSurveyor',
  async (data) => {
    try {
      const response = await apiGetCancelBlacklist(data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: '',
  sort: {
    order: '',
    key: '',
  },
};

export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
  name: 'listsSurveyorList/data',
  initialState: {
    loading: false,
    surveyorList: [],
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    updateSurveyorList: (state, action) => {
      state.surveyorList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSurveyor.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSurveyor.fulfilled, (state, action) => {
        state.surveyorList = action.payload;
        state.tableData.total = action.payload.length;
        state.loading = false;
      })
      .addCase(getSurveyor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateSurveyorList, setTableData, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;


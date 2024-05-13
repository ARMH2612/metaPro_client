import { createSlice } from "@reduxjs/toolkit";
import api from "../../Utils/api";

export const studentSlice = createSlice({
    name: 'student',
    initialState: {
        studentsList: [],
        loading: false,
        error: null
    },
    reducers: {
        fetchStudentsStart: (state) => {
            state.loading = true
            state.error = null
        },
        fetchStudentsSuccess: (state, action) => {
            state.loading = false
            state.studentsList = action.payload
        },
        fetchStudentsFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        createStudentStart: (state) => {
            state.loading = true
            state.error = null
        },
        createStudentSuccess: (state, action) => {
            state.loading = false
            state.studentsList.push(action.payload)
        },
        createStudentFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteStudentStart: (state) => {
            state.loading = true
            state.error = null
        },
        deleteStudentSuccess: (state, action) => {
            state.loading = false
            state.studentsList = state.studentsList.filter(student => student.id !== action.payload)
        },
        deleteStudentFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateStudentStart: (state) => {
            state.loading = true
            state.error = null
        },
        updateStudentSuccess: (state, action) => {
            state.loading = false
            const index = state.studentsList.findIndex(student => student.id === action.payload.id)
            if (index !== -1) {
                state.studentsList[index] = action.payload
            }

        },
        updateStudentFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export const {
    fetchStudentsStart,
    fetchStudentsSuccess,
    fetchStudentsFailure,
    createStudentStart,
    createStudentSuccess,
    createStudentFailure,
    deleteStudentStart,
    deleteStudentSuccess,
    deleteStudentFailure,
    updateStudentStart,
    updateStudentSuccess,
    updateStudentFailure,
} = studentSlice.actions

export const fetchStudents = () => async (dispatch) => {
    dispatch(fetchStudentsStart());
    try {
        const response = await api.get('/students');
        dispatch(fetchStudentsSuccess(response.data));
    } catch (error) {
        dispatch(fetchStudentsFailure(error.message));
    }
};


export const createStudent = (studentData) => async (dispatch) => {
    dispatch(createStudentStart());
    try {
        const response = await api.post('/students', studentData);
        dispatch(createStudentSuccess(response.data));
    } catch (error) {
        dispatch(createStudentFailure(error.message));
    }
};


export const deleteStudent = (studentId) => async (dispatch) => {
    dispatch(deleteStudentStart());
    try {
        await api.delete(`/students/${studentId}`);
        dispatch(deleteStudentSuccess(studentId));
    } catch (error) {
        dispatch(deleteStudentFailure(error.message));
    }
};


export const updateStudent = (studentId, updatedStudentData) => async (dispatch) => {
    dispatch(updateStudentStart());
    try {
        const response = await api.put(`/students/${studentId}`, updatedStudentData);
        dispatch(updateStudentSuccess(response.data));
    } catch (error) {
        dispatch(updateStudentFailure(error.message));
    }
};

export const addStudentGroup = (studentId, groupData) => async (dispatch) => {
    dispatch(updateStudentStart());
    try {
        const response = await api.put(`/students/groups/${studentId}`, groupData);
        dispatch(updateStudentSuccess(response.data));
    } catch (error) {
        dispatch(updateStudentFailure(error.message));
    }
};


export default studentSlice.reducer
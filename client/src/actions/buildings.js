import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_BUILDINGS,
  BUILDINGS_ERROR,
  ADD_BUILDING,
  DELETE_BUILDING,
  GET_SINGLE_BUILDING,
  CLEAR_SINGLE_BUILDING,
  UPDATE_BUILDING,
} from "./types";

export const getBuildings = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/buildings/me");

    dispatch({
      type: GET_BUILDINGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUILDINGS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const getAllBuildings = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/buildings");

    dispatch({
      type: GET_BUILDINGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUILDINGS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const getSingleBuilding = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/buildings/me/${id}`);
    dispatch({
      type: GET_SINGLE_BUILDING,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUILDINGS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const addBuilding = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/buildings/me", formData, config);

    dispatch({
      type: ADD_BUILDING,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUILDINGS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const deleteBuilding = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/buildings/me/${id}`);

    dispatch({
      type: DELETE_BUILDING,
      payload: id,
    });

    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: BUILDINGS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const clearSingleBuilding = () => (dispatch) => {
  dispatch({
    type: CLEAR_SINGLE_BUILDING,
  });
};

export const addTransparentEl = (formData, id, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/buildings/me/trans/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_BUILDING,
      payload: res.data,
    });

    dispatch(setAlert("Transparent Element Added", "success"));

    history.push(`/single-building/${id}`);
  } catch (err) {
    dispatch({
      type: BUILDINGS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const addUnTransparentEl = (formData, id, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/buildings/me/ne-trans/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_BUILDING,
      payload: res.data,
    });

    dispatch(setAlert("UnTransparent Element Added", "success"));

    history.push(`/single-building/${id}`);
  } catch (err) {
    dispatch({
      type: BUILDINGS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const deleteTransEl = (build_id, trans_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/buildings/me/trans/${build_id}/${trans_id}`
    );

    dispatch({
      type: UPDATE_BUILDING,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUILDINGS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const deleteUnTransEl = (build_id, untrans_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/buildings/me/ne-trans/${build_id}/${untrans_id}`
    );

    dispatch({
      type: UPDATE_BUILDING,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUILDINGS_ERROR,
      payload: { msg: err.message },
    });
  }
};

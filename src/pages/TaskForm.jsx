import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask, viewTask } from "../features/taskSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase"

const taskListOption = ["coding", "graphics", "ui/ux"];
const priorityOptions = ["Low", "Medium", "High"];
const statusOptions = ["Pending", "In Progress", "Completed"];

const TaskForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  //////authentication credential
  const [authUser, setAuthUser] = useState(null)

  /////get id form url(parameter)
  const { id } = useParams();
  const { taskList } = useSelector((state) => state)

  const redirect = useNavigate()

  // ///////// single task
  const singleTask = taskList?.find((task) => task.id === id)

  useEffect(() => {
    dispatch(viewTask())
    reset(singleTask)
  }, [dispatch, id])

  function Add(data) {
    if (id == null) {
      dispatch(createTask(data))
    } else {
      alert('update')
      dispatch(updateTask(data))
    }
    reset();
    redirect('/')
  }

  //authentication
  function singupGoogle() {
    const Provider = new GoogleAuthProvider()
    signInWithPopup(auth, Provider)
      .then((result) => {
        console.log(result.user.providerData[0])
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      setAuthUser(user)
    })
  }, [])

  function logout() {
    signOut(auth)
      .then(() => {
        alert('logout')
        localStorage.removeItem('userId')
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      {/* Task Form */}
      <form
        onSubmit={handleSubmit(Add)}
        className="col-lg-6 mx-auto p-5 shadow"
      >
        {/* Task Category */}
        <div className="mt-4">
          <select
            className="form-select"
            {...register("task_category")}
            defaultValue=""
          >
            <option value="" disabled>
              --select task category
            </option>
            {taskListOption.map((ele) => (
              <option key={ele} value={ele}>{ele}</option>
            ))}
          </select>
        </div>

        {/* Task Title */}
        <div className="mt-4">
          <input
            type="text"
            {...register("task_title")}
            placeholder="add task title"
            className="form-control"
          />
        </div>

        {/* Task Description */}
        <div className="mt-4">
          <textarea
            {...register("task_description")}
            placeholder="add task description"
            className="form-control"
            rows="3"
          />
        </div>

        {/* Priority */}
        <div className="mt-4">
          <select
            className="form-select"
            {...register("priority")}
            defaultValue=""
          >
            <option value="" disabled>--select priority</option>
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div className="mt-4">
          <input
            type="date"
            {...register("due_date")}
            className="form-control"
          />
        </div>

        {/* Status */}
        <div className="mt-4">
          <select
            className="form-select"
            {...register("status")}
            defaultValue=""
          >
            <option value="" disabled>--select status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Estimated Hours */}
        <div className="mt-4">
          <input
            type="number"
            {...register("estimated_hours")}
            placeholder="estimated hours"
            className="form-control"
            min="0"
            step="0.5"
          />
        </div>

        <div className="mt-5">
          <button className="btn btn-dark">Submit</button>
        </div>
      </form>
    </>
  );
};

export default TaskForm;
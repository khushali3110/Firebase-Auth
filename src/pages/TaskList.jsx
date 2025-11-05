import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, viewTask } from "../features/taskSlice";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";

const TaskList = () => {
  const { taskList } = useSelector((state) => state)
  console.log(taskList)
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(viewTask())
  }, [])

  function trash(id){
    if(confirm("do you want to delete")){
      dispatch(deleteTask(id))
      dispatch(viewTask())
    }
  }

  return (
    <>
      <div className="container my-5">
        <div className="row">
          {taskList.map((ele, index) => (
            <div className="col-lg-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{ele.task_title}</h5>
                  <p className="card-text">
                    <strong>Category:</strong> {ele.task_category}<br/>
                    <strong>Description:</strong> {ele.task_description}<br/>
                    <strong>Priority:</strong> {ele.priority}<br/>
                    <strong>Status:</strong> {ele.status}<br/>
                    <strong>Due Date:</strong> {ele.due_date}<br/>
                    <strong>Estimated Hours:</strong> {ele.estimated_hours}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button 
                      className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                      onClick={()=>trash(ele.id)}
                    >
                      <FaTrash/> Delete
                    </button>
                    <NavLink 
                      className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
                      to={`/updateTask/${ele.id}`}
                    >
                      <FaPencil/> Edit
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskList;
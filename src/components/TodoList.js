import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdDelete, MdEdit } from "react-icons/md"; // Import MdEdit from react-icons/md
import { useDispatch } from 'react-redux';
import { deleteTodos, editTodo } from '../reduxStore/TodoSlice'; // Import editTodo action
import { Checkbox } from 'antd';

const TodoList = ({ todo, _id }) => {
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);
  const [editing, setEditing] = useState(false); // Add editing state
  const [editedTodo, setEditedTodo] = useState(todo); // Add editedTodo state

  const handleTodoRemove = () => {
    dispatch(deleteTodos(_id));
  };

  const handleTodoEdit = () => {
    if (editing) {
      dispatch(editTodo({ _id, todo: editedTodo }));
    }
    setEditing(!editing);
  };

  const handleTodoInputChange = (e) => {
    setEditedTodo(e.target.value);
  };

  return (
    <motion.li
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        y: { type: "spring", stiffness: 120 },
      }}
      className={`${
        done ? "line-through text-gray-500" : ""
      } w-full font-tiitleFont font-medium text-base border-[1px] border-l-[6px]  px-2 py-1 cursor-pointer flex items-center justify-between`}
    >
      <Checkbox checked={done} onChange={(e) => setDone(e.target.checked)} />
      {editing ? (
        <input
          type="text"
          value={editedTodo}
          onChange={handleTodoInputChange}
          onBlur={handleTodoEdit} // Save changes on blur
          autoFocus // Automatically focus on input when editing starts
        />
      ) : (
        <span>{todo}</span>
      )}
      <div>
        <span onClick={handleTodoEdit} className="text-xl text-gray-300 hover:text-blue-500 duration-300 cursor-pointer">
          {editing ? <MdEdit /> : <MdEdit />}
        </span>
        <span onClick={handleTodoRemove} className="text-xl text-gray-300 hover:text-red-500 duration-300 cursor-pointer">
          <MdDelete />
        </span>
      </div>
    </motion.li>
  );
}

export default TodoList;

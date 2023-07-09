import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteTodos } from '../reduxStore/TodoSlice';
import { Checkbox } from 'antd';

const TodoList = ({ todo, _id }) => {
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);

  const handleTodoRemove = () => {
    dispatch(deleteTodos(_id));
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
      <span>{todo}</span>
      <span onClick={handleTodoRemove} className="text-xl text-gray-300 hover:text-red-500 duration-300 cursor-pointer">
        <MdDelete />
      </span>
    </motion.li>
  );
}

export default TodoList;

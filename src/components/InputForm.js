import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addTodos, removeTodos } from '../reduxStore/TodoSlice';
import { motion } from 'framer-motion';
import { Input, Button, Select, Alert } from 'antd';
import TodoList from './TodoList';

const { Option } = Select;

const InputForm = () => {
  const dispatch = useDispatch();
  const todosItem = useSelector((state) => state.todos.todosList);
  const [todoValue, setTodoValue] = useState('');
  const [category, setCategory] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  

  const options = [
    {
      _id: 1000,
      title: 'Categories',
    },
    {
      _id: 1001,
      title: 'low',
    },
    {
      _id: 1002,
      title: 'medium',
    },
    {
      _id: 1003,
      title: 'high',
    },
  ];

  const handleTodo = (e) => {
    e.preventDefault();
    if (todoValue === '') {
      setErrMsg('Please write your todo!');
      setShowErr(true);
      setShowSuccess(false);
    } else if (category === '') {
      setErrMsg('Select a category!');
      setShowErr(true);
      setShowSuccess(false);
    } else if (category === 'categories') {
      setErrMsg('Select a valid Category!');
      setShowErr(true);
      setShowSuccess(false);
    } else {
      dispatch(
        addTodos({
          _id: Math.random(),
          todo: todoValue,
          category: category,
        })
      );
      setTodoValue('');
      setShowSuccess(true);
      setShowErr(false);
      setSuccessMsg('Todo added Successfully!');
    }
  };

  const handleFilterChange = (value) => {
    setCategory(value);
  };

  const filteredTodos = category === 'Categories' ? todosItem : todosItem.filter(item => item.category === category);

  useEffect(() => {
    const timer = setTimeout(() => {
      showErr && setShowErr(false);
      showSuccess && setShowSuccess(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showErr, showSuccess]);

  return (
    <div className="w-full bg-bodyColor flex flex-col gap-4">
      <div className="flex items-center gap-4 h-12">
        <Input
          onChange={(e) => setTodoValue(e.target.value)}
          value={todoValue}
          className="w-[80%] h-full bg-bodyColor border-[1px] border-gray-400 py-2 px-4 placeholder:text-gray-400 text-white text-base placeholder:text-sm tracking-wide rounded-md outline-none focus-visible:border-orange-600 hover:border-white"
          type="text"
          placeholder="Enter your Todo..."
        />
        <div className="w-[20%] h-full relative">
          <Select
            onChange={handleFilterChange}
            value={category || 'categories'}
            className="w-full h-full text-center capitalize outline-none "
          >
            {options.map((item) => (
              <Option key={item._id} value={item.title}>
                {item.title}
              </Option>
            ))}
          </Select>
          <span className="absolute right-3 top-4">
            <FaChevronDown />
          </span>
        </div>
      </div>
      <Button
        onClick={handleTodo}
        className="w-full border-[1px] border-gray-400 hover:border-gray-200 duration-300 font-titleFont font-semibold tracking-wider text-gray-300 hover:text-orange-600 h-10 uppercase rounded-md"
      >
        Add Todo
      </Button>
      <div className="flex flex-col gap-4">
        <ul className="grid grid-cols-1 gap-4 border border-gray-600 shadow-todoShodow mt-6 p-4">
          {filteredTodos.length > 0 ? (
            <>
              {filteredTodos.map((item) => (
                <TodoList key={item._id} todo={item.todo} _id={item._id} />
              ))}
            </>
          ) : (
            <p className="text-center text-base text-yellow-500 font-titleFont font-medium tracking-wide">
              Your todo list is Empty!
            </p>
          )}
        </ul>
        {todosItem.length > 0 && (
          <motion.button
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setShowRemove(true)}
            className="w-40 h-8 text-sm font-titleFont text-orange-500 hover:text-red-500 font-semibold mx-auto bg-transparent border-[1px] border-gray-500 hover:border-red-500 duration-300"
          >
            Remove Todos
          </motion.button>
        )}
      </div>
      {/* ========================= Error Message start here ======================== */}
      {showErr && <Alert type="error" message={errMsg} />}
      {/* ========================= Error Message end here ========================== */}
      {/* ========================= Success Message start here ====================== */}
      {showSuccess && <Alert type="success" message={successMsg} />}
      {/* ========================= Success Message end here ======================== */}

      {showRemove && (
        <div className="w-full h-screen fixed bg-bodyColor top-0 left-0 bg-opacity-60">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 bg-bodyColor border border-red-500 rounded-md z-50 flex flex-col gap-4 shadow-todoShodow">
            <p className="text-xl text-center font-medium text-red-500">
              Are you sure to{' '}
              <span className="font-semibold underline underline-offset-2 decoration-[1px]">
                remove
              </span>{' '}
              all the todos?
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={() => dispatch(removeTodos()) & setShowRemove(false)}
                className="px-6 py-2 text-base font-titleFont text-orange-500 hover:text-red-500 font-semibold bg-transparent border-[1px] border-gray-500 hover:border-red-500 duration-300"
              >
                Yes
              </Button>
              <Button
                onClick={() => setShowRemove(false)}
                className="px-6 py-2 text-base font-titleFont text-orange-500 hover:text-green-500 font-semibold bg-transparent border-[1px] border-gray-500 hover:border-green-500 duration-300"
              >
No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputForm;

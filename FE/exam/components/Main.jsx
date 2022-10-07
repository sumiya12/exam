import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";

const Main = () => {
  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  // const [countdata, setCountdata] = useState(false);
  
  const handlechange = () => {
    console.log(count + 1);
  };

  const handleSubmit = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    axios
      .post("https://sumiya.ilearn.mn/crud/create", {
        task: e.target.task.value,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success === "Succesfull") {
          console.log("amjilltai");
          location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get("https://sumiya.ilearn.mn/crud/get")
      .then((res) => {
        if (res.data.message === "Succesfull") {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);



console.log(typeof (c));
  return (
    <div className="flex bg-[#d8dced] items-center  justify-center h-full">
      <div className="w-[500px] items-center justify-center h-screen  ">
        <div className=" p-4 bg-[#5f92e3]  flex-2 font-bold text-white flex justify-between items-center">
          <div className="flex-2">My ToDo List</div>
          <div className="flex bg-[#3c4a82] rounded-full w-[50px] items-center text-center justify-center">
            <pre>{`${count && count} / ${data?.length}`}</pre>
          </div>
        </div>
        <br />
        <div className="bg-white">
          <ul className="flex flex-col p-4">
            {data &&
              data.map((item, i) => {
                return (
                  <div key={i}>
                    <li className="p-5 font-bold text-[gray] flex-1 flex justify-between">
                      <div className="flex ">
                        <input
                          onChange={() => handlechange(setCount(i + 1) )}
                          type="checkbox"
                          className="m-2"
                          value={item.task}
                        />
                        {item.task} #{i + 1}
                      </div>
                      <div className="flex gap-4 items-center ">
                        <MdOutlineModeEditOutline className="text-[gray]   " />
                        <MdDelete className="text-[gray]  " />
                      </div>
                    </li>

                    <hr />
                  </div>
                );
              })}
          </ul>
          <form
            className="m-2 mx-4 flex relative"
            action="submit"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="task"
              className="border-[1px] rounded-full text-[gray] pl-4  w-full p-1 mb-3"
            />

            <button className="bg-[#5f92e3] top-[40px] left-[125px] items-center justify-center flex text-white absolute rounded-full h-[30px]  w-[200px]">
              Add task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;

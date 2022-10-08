import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";

const Main = () => {
  const [data, setData] = useState();

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`https://sumiya.ilearn.mn/crud/delete/${id}`).then((res) => {
      if (res.data.success === "Succesfull") {
        console.log("amjilltai");
        location.reload();
      }
    });
  };

  const handleSubmit = (e) => {
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
  return (
    <div className="flex bg-[#d8dced] items-center  justify-center h-full sx:p-3  ">
      <div className="w-[500px] items-center justify-center h-screen   ">
        <div className=" p-4 bg-[#5f92e3]  flex-2 font-bold text-white flex justify-between items-center rounded">
          <div className="flex-2">My ToDo List</div>
          <div className="flex bg-[#3c4a82] rounded-full w-[50px] items-center text-center justify-center">
            <pre>{`${data?.length}`}</pre>
          </div>
        </div>
        <br />
        <div className="bg-white rounded">
          <ul className="flex flex-col p-4">
            {data &&
              data.map((item, i) => {
                return (
                  <div key={i}>
                    <li className="p-5 font-bold text-[gray] flex-1 flex justify-between">
                      <div className="flex ">
                        #{i + 1}. {item.task.toUpperCase()}
                      </div>
                      <div className="flex gap-4 items-center ">
                        <button onClick={() => handleDelete(item._id)}>
                          <MdDelete className="text-[gray] text-[30px] " />
                        </button>
                      </div>
                    </li>

                    <hr />
                  </div>
                );
              })}
          </ul>
          <form
            className="m-2 mx-4 flex relative  sm:mb-3 sm:pb-2"
            action="submit"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="task"
              value="What's next"
              className="border-[3px] rounded-full text-[gray] pl-4  w-full p-1 mb-6 sm:mb-4  "
            />

            <button className="bg-[#5f92e3] top-[45px] left-[125px] sm:left-[40px] sm:top-[40px] items-center justify-center flex text-white absolute rounded-full h-[30px]  w-[200px]">
              Add task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;

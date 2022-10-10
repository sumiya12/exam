import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import PageLoader from "./PageLoader";
import moment from "moment";

const Main = () => {
  const [data, setData] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [loadFailed, setLoadFailed] = useState();
  const create = "https://sumiya.ilearn.mn/crud/create";
  const get = "https://sumiya.ilearn.mn/crud/get";
  const deletes = "https://sumiya.ilearn.mn/crud/delete";

  useEffect(() => {
    if (!data) loader(get);
  }, []);

  async function loaderCreate(url, value) {
    setShowLoader(true);
    try {
      const res1 = await axios.post(url, { task: value }).then((e) => {
        if (e.data.success === "Succesfull") {
          loader(get);
        }
      });
    } catch (error) {
      console.log(error);
      setLoadFailed(true);
    }
    setShowLoader(false);
  }

  async function loader(url) {
    setShowLoader(true);
    try {
      const res = await axios.get(url);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
      setLoadFailed(true);
    }
    setShowLoader(false);
  }

  async function loaderDelete(url, id) {
    setShowLoader(true);
    try {
      const res = await axios.delete(`${url + "/" + id}`).then((e) => {
        if (e.data.success === "Succesfull") {
          loader(get);
        }
      });
    } catch (error) {
      console.log(error);
      setLoadFailed(true);
    }
    setShowLoader(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = e.target.task.value;
    await loaderCreate(create, value);
    e.target.task.value = "";
  };

  const handleDelete = async (id) => {
    await loaderDelete(deletes, id);
  };

  return (
    <>
      {showLoader ? <PageLoader /> : ""}
      {data && (
        <div className="flex bg-[#d8dced] items-center  justify-center h-screen sx:p-3 sm:p-3  ">
          <div className="w-[500px] items-center justify-center    ">
            <div className=" p-4 bg-[#5f92e3]  flex-2 font-bold text-white flex justify-between items-center rounded">
              <div className="flex-2">My ToDo List</div>
              <div className="flex bg-[#3c4a82] rounded-full relative w-[150px] sx:w-[160px]  items-center text-center justify-center">
                <pre className="py-1 px-2">Task Count: {`${data?.length}`}</pre>
              </div>
            </div>
            <br />
            <div className="bg-white rounded">
              <ul className="flex flex-col p-4">
                {data &&
                  data?.map((item, i) => {
                    return (
                      <div key={i}>
                        <li className="py-2 font-bold text-[gray] flex-1 flex justify-between">
                          <div className="flex w-full">
                            #{i + 1}. {item.task.toUpperCase()}
                          </div>
                          <div className="flex">
                            <div className="w-full ">
                              {moment().format("l", item.createdAt)}
                            </div>
                            <div className="flex items-center ml-2">
                              <button onClick={() => handleDelete(item._id)}>
                                <MdDelete className="text-[gray] text-[30px] " />
                              </button>
                            </div>
                          </div>
                        </li>
                        <hr />
                      </div>
                    );
                  })}
              </ul>
              <form
                className="m-2 mx-4 flex  flex-col justify-center items-center sx:mb-3 sx:pb-2"
                action="submit"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  name="task"
                  placeholder="What's next"
                  className="border-[3px] rounded-full text-[gray] pl-4  w-full p-1 mb-2 sx:mb-4  "
                />
                <button className="bg-[#5f92e3] text-[20px] font-bold  mb-2 items-center justify-center flex text-white  rounded-full h-[30px]  w-[200px]">
                  Add task
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;

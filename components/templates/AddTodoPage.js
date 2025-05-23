import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { useState } from "react";
import RadioButton from "../elements/RadioButton";
import { ToastContainer, toast } from "react-toastify";

function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");

  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        status: status,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (data.status === "success") {
      setTitle("");
      setStatus("todo");
      toast.success("Todo added successfully!", { toastId: "todo-success" });
    }
  };

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Add New Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-form__input--second">
          <RadioButton
            title="Todo"
            value="todo"
            status={status}
            setStatus={setStatus}
          >
            <BsAlignStart />
          </RadioButton>

          <RadioButton
            title="In Progress"
            value="inProgress"
            status={status}
            setStatus={setStatus}
          >
            <FiSettings />
          </RadioButton>

          <RadioButton
            title="Review"
            value="review"
            status={status}
            setStatus={setStatus}
          >
            <AiOutlineFileSearch />
          </RadioButton>

          <RadioButton
            title="Done"
            value="done"
            status={status}
            setStatus={setStatus}
          >
            <MdDoneAll />
          </RadioButton>
        </div>
        <button onClick={addHandler}>Add</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddTodoPage;

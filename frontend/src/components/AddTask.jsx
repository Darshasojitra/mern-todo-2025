import '../style/addtask.css'

 export default function AddTask(){
    return(
        <div className="container">
            <h1>Add New Task</h1>
            <form>
                <label htmlFor="">Title</label>
                <input type="text" name="title" placeholder="Enter task title"/>
                <label htmlFor="">Description</label>
                <textarea rows={4} name="description" placeholder="Enter task description " id=""></textarea>
           <button className="submit">Add New Task</button>
            </form>
        </div>
    )
}


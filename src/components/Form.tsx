import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";

export interface Building {
    id: number;
    name: string;
}

function Form()
{
    const {register, handleSubmit, formState: {errors, isValid, dirtyFields}} = useForm();
    
    const handleAddClick = (data: FieldValues) => {
        console.log(data);
        var building: Building = {id: data.id, name: data.name};
        axios.post(`http://localhost:5109/Buildings?name=${building.name}&id=${building.id}`)
    }

    return (
        <div className="contianer">
            <form onSubmit={handleSubmit(handleAddClick)}>
                <div>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" {...register('name', {required: true})} id="name" className="form-control"/>
                    {errors.name?.type ==='required' && <span> A name is required</span>}
                </div>

                <div>
                    <label htmlFor="id" className="form-label">ID</label>
                    <input type="text" {...register('id', {required: true})} id="id" className="form-control"/>
                    {errors.name?.type === 'required' && <span> An ID is required</span>}
                </div>

                <div>
                    <button type="submit" onClick={handleAddClick} className="btn btn-primary" disabled={!isValid || !dirtyFields}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default Form;
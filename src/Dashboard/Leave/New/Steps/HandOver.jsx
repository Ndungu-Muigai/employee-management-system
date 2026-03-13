import { toast } from "react-toastify"
import { useState } from "react"

import Table from "../../../Components/Table"

const HandOver = ({ leaveApplicationData, setLeaveApplicationData, filtersContainerStyling, labelStyling, inputStyling, select, employees, setStep, requiredInputLabel }) => 
{
    const [taskInput, setTaskInput] = useState("")

    const addTask = () => 
    {
        if (!taskInput.trim()) 
        {
            toast.error("Task cannot be empty.")
            return
        }

        setLeaveApplicationData(prev => ({ ...prev, handover: { ...prev.handover, tasks: [...prev.handover.tasks, taskInput]}}))

        setTaskInput("") // Reset input
    }

    const removeTask = index => 
    {
        const tasks = [...leaveApplicationData.handover.tasks]
        tasks.splice(index, 1)

        setLeaveApplicationData(prev => ({ ...prev, handover: { ...prev.handover, tasks } }))
    }

    const handleEmployeeChange = e => 
    {
        const selectedId = e.target.value
        const selectedEmployee = employees.find(emp => emp.id === selectedId) || 
        {
            id: "",
            name: ""
        }

        setLeaveApplicationData(prev => ({...prev, handover: { ...prev.handover, employee: selectedEmployee}}))
    }

    const handleNext = () => 
    {
        if (!leaveApplicationData.handover.employee.id)
        {
            toast.error("Please select an employee to hand over tasks to.")
            return
        }

        if (leaveApplicationData.handover.tasks.length === 0) 
        {
            toast.error("Please add at least one task before proceeding.")
            return
        }

        setStep(3)
    }

    const isNextDisabled = !leaveApplicationData.handover.employee.id || leaveApplicationData.handover.tasks.length === 0

    // Table headers & rows to be renderer
    const taskHeaders = [
        { label: "#" },
        { label: "Task" },
        { label: "Action", center: true }
    ]

    const renderTaskRow = (task, idx, td) => (
        <>
            <td className={td}>{idx + 1}</td>
            <td className={td}>{task}</td>
            <td className={`${td} flex justify-center items-center`}>
                <button type="button" className="btn btn-error btn-sm text-white" onClick={() => removeTask(idx)}>Delete</button>
            </td>
        </>
    )
    
    return (
        <>
            {/* Employee Selector */}
            <div className={filtersContainerStyling}>
                <label className={labelStyling}>Employee to hand over tasks {requiredInputLabel()}</label>

                <select className={select} value={leaveApplicationData.handover.employee.id} onChange={handleEmployeeChange}>
                    <option value="">Select employee</option>
                    {
                        employees.map(employee => <option key={employee.id} value={employee.id}>{employee.name}</option>)
                    }
                </select>
            </div>

            {/* Input at the top */}
            <div className="space-y-3">
                <label className={labelStyling}>Add a task to hand over {requiredInputLabel()}</label>
                <input type="text" value={taskInput} onChange={e => setTaskInput(e.target.value)} className={`${inputStyling} w-full`} placeholder="Enter task..."/>

                <div className="flex justify-end">
                    <button type="button" className="btn btn-primary text-white" onClick={addTask}>Add Task</button>
                </div>
            </div>

            {/* Table showing tasks */}
            {
                leaveApplicationData.handover.tasks.length > 0 && 
                    <Table headers={taskHeaders} data={leaveApplicationData?.handover?.tasks} emptyMessage="No tasks added." renderRow={renderTaskRow}/>
            }

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
                <button type="button" className="btn btn-neutral" onClick={() => setStep(1)}>Previous</button>
                <button type="button" className={`btn btn-success text-white ${ isNextDisabled ? "opacity-50 cursor-not-allowed" : "" }`} onClick={handleNext}>Next</button>
            </div>
        </>
    )
}

export default HandOver
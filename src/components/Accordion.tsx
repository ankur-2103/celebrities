import { Data } from "./AccordionList";
import DownArrow from '../assets/down.svg'
import { useEffect, useState } from "react";
import { CheckOne, CloseOne, Delete, Pencil } from "@icon-park/react";

// This file is used to create accordion

// Props for Accordion
interface AccordionProps{
  item: Data,
  open: boolean,
  index: number,
  handleOpen: (index:number,e:React.MouseEvent<HTMLDivElement>) => void
  handleEdit: (val:boolean) => void
  handleDelete: (id:number) => void
  handleUpdate: (index:number, newData:Data) => void
}

// Accordion data interface
interface itemData{
  name: string,
  age: number,
  gender: string,
  country: string,
  desc: string
}

const Accordion = ({ item, open, handleOpen, handleUpdate, handleEdit, handleDelete, index }: AccordionProps) => {
  
  // States for storing data
  const year = Math.floor((new Date().getTime() - new Date(item.dob.split('-').join()).getTime()) / 3.15576e+10);
  const [update, setUpdate] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const [data, setData] = useState<itemData>({ name: item.first + " " + item.last, age: year, gender: item.gender, country: item.country, desc: item.description });

  // Update values of item
  const updateItem = () => {
    if (data.name.length===0 || data.country.length === 0 || data.desc.length === 0 || data.gender.length === 0 || !data.age) {
      return
    }
    const nameArr = data.name.trim().split(' ');
    const firstName = nameArr[0];
    const lastName = nameArr[nameArr.length - 1]?.length ? nameArr[nameArr.length - 1] : "";
    const newDate = new Date(new Date().getTime() - data.age * 3.15576e+10)
    const newData:Data = {
      ...item,
      first:firstName,
      last: lastName,
      gender: data.gender,
      country: data.country,
      dob: newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate(),
      description: data.desc
    }
    handleUpdate(index, newData);
    setUpdate(false);
    setSave(false);
  }

  // Manage edit and save state
  useEffect(() => {
    const checkEditState = () => {
      handleEdit(update);
    } 

    const checkData = () => {
      if (data.name !== item.first + " " + item.last || data.age !== year || data.gender !== item.gender || data.country !== item.country || data.desc !== item.description) {
        setSave(true);
        console.log()
      } else {
        setSave(false);
      }
    }

    checkData();
    checkEditState();
  },[open, data, item, year, update])
  
  // Cancel update 
  const cancelUpdate = () => {
    setUpdate(false);
    setData({
      name: item.first + " " + item.last,
      age: year,
      gender: item.gender,
      country: item.country,
      desc: item.description
    })
  }

  // Custom react functional component for gender dropdown
  const GenderDropDown = () => {
    // dropdown open state
    const [dropDown, setDropDown] = useState<boolean>(false);

    // handle dropdown state
    const handleDropDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setDropDown(!dropDown)
    }

    // handle dropdown value change
    const handleChange = (val:string, e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      setData({...data, gender:val});
      setDropDown(false);
    }

    return (
      <button className="flex flex-1 items-center outline-none w-full justify-between ring-1 ring-gray-300 rounded-md px-2 py-1 relative" onClick={handleDropDown}>
        <span className="capitalize truncate overflow-hidden w-[75px] text-start">{data.gender}</span>
        <img src={DownArrow} />
        {dropDown && 
          <div className="flex flex-col flex-1 absolute top-9 text-start z-10 bg-white right-0 w-full rounded-md break-words shadow-[0_10px_20px_0_rgba(0,0,0,0.55)]">
            <span className={`flex-1 px-2 py-1 hover:bg-white ${data.gender === 'male' && "bg-slate-200"}`} onClick={(e)=>handleChange("male",e)}>Male</span>
            <span className={`flex-1 px-2 py-1 hover:bg-white ${data.gender === 'female' && "bg-slate-200"}`} onClick={(e)=>handleChange("female",e)}>Female</span>
            <span className={`flex-1 px-2 py-1 hover:bg-white ${data.gender === 'transgender' && "bg-slate-200"}`} onClick={(e)=>handleChange("transgender",e)}>Transgender</span>
            <span className={`flex-1 px-2 py-1 hover:bg-white ${data.gender === 'rather not say' && "bg-slate-200"}`} onClick={(e)=>handleChange("rather not say",e)}>Rather not say</span>
            <span className={`flex-1 px-2 py-1 hover:bg-white ${data.gender === 'other' && "bg-slate-200"}`} onClick={(e)=>handleChange("other",e)}>Other</span>
          </div>
        }
      </button>
    )
  }

  return (
    <div className="flex flex-col ring-1 ring-gray-300 rounded-md px-4 py-2 w-full md:w-96 gap-2" onClick={(e)=>handleOpen(index,e)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-6">
          <img className="w-14 h-14 md:w-20 md:h-20 ring-2 ring-gray-300  rounded-full" src={item.picture} />
          <span className="text-xl font-medium flex">
            {update ? <input value={data.name} placeholder="Name" onChange={(e) => setData({ ...data, name: e.target.value })} className={`w-full outline-none ring-1 ${data.name.length === 0 ? "ring-red-500" : "ring-gray-300"} rounded-md px-2 py-1`} onClick={(e) => e.stopPropagation()} /> : data.name}
          </span>
        </span>
        <img src={DownArrow} className={`w-6 text-gray-300 ${open && 'rotate-180'} duration-500`} />
      </div>
      <div className={`flex flex-col gap-2 ${open ? 'block' : 'hidden'}`}>
        <div className="flex gap-2">
          
          <span className="flex flex-1 flex-col text-gray-400">Age<span className="text-black">{update ? <input value={data.age} type="number" placeholder="Age" onChange={(e) => setData({...data,age:parseInt(e.target.value)})} className={`w-full outline-none ring-1 ${!data.age ? "ring-red-500" : "ring-gray-300"} rounded-md px-2 py-1`} onClick={(e) => e.stopPropagation()} /> : data.age + " Years"}</span></span>
          
          <span className="flex flex-1 flex-col text-gray-400">Gender<span className="text-black capitalize break-words">{update ? <GenderDropDown /> : data.gender}</span></span>
          
          <span className="flex flex-1 flex-col text-gray-400">Country<span className="text-black">{update ? <input value={data.country} type="text"  placeholder="Country" onChange={(e) => setData({...data,country:e.target.value.replace(/[^a-z ]/gi, '')})} className={`w-full outline-none ring-1 ${data.country.length === 0 ? "ring-red-500" : "ring-gray-300"} rounded-md px-2 py-1`} onClick={(e) => e.stopPropagation()} /> : data.country}</span></span>
          
        </div>
          <div>
            <span className="text-gray-400">Description</span>
            <p>{update ? <textarea value={data.desc} rows={Math.ceil(data.desc.length/40)} cols={1} placeholder="Description" onChange={(e)=>setData({...data,desc:e.target.value})} className={`w-full outline-none ring-1 ${data.desc.length === 0 ? "ring-red-500":"ring-gray-300"} rounded-md px-2 py-1`} onClick={(e)=>e.stopPropagation()} /> : data.desc}</p>
          </div>
        <div className="flex justify-end gap-4">
          {update ?
            <>
              <button disabled={!save} onClick={(e)=>{e.stopPropagation();updateItem();}} className={`outline-none ${save ? "cursor-pointer" : "cursor-not-allowed"}`}><CheckOne theme="outline" size="36" fill={save ? "#0cd002" : "#e8e8e8"} strokeLinecap="square"/></button>
              <button onClick={(e) => { e.stopPropagation(); cancelUpdate()}} className=" outline-none"><CloseOne theme="outline" size="36" fill="#d0021b" strokeLinecap="square"/></button>
            </> :
            <>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id)}} className=" outline-none"><Delete theme="outline" size="30" fill="#d0021b" strokeLinecap="square"/></button>
              <button onClick={(e) => {e.stopPropagation();setUpdate(data.age > 18 && !update)}} className={`outline-none ${data.age > 18 ? "cursor-pointer" : "cursor-not-allowed"}`}><Pencil theme="outline" size="30" fill={data.age > 18 ? "#4a90e2" : "#e8e8e8"} strokeLinecap="square"/></button>
            </>}
          </div>
        </div>
    </div>
  )
}

export default Accordion
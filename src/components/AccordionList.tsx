import {useState, useEffect, useRef} from 'react';
import rawData from '../assets/celebrities.json';
import Search from '../assets/search.svg';
import Accordion from './Accordion';
import DeleteDialog from './DeleteDialog';

export interface Data{
    id: number,
    first: string,
    last: string,
    dob: string,
    gender: string,
    email: string,
    picture: string,
    country: string,
    description: string
}

const AccordionList = () => {

    const [data, setData] = useState<Data[]>(rawData);
    const [open, setOpen] = useState<boolean[]>(Array(rawData.length).fill(false));
    const [edit, setEdit] = useState<boolean>();
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
    const [deleteItemId, setDeleteItemId] = useState<number>(0);
    const [search, setSearch] = useState<string>('');
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const filterData = () => {
            if (search.length === 0) {
                setData(rawData);
                return;
            }
            const newData = data.filter(item => (item.first + " " + item.last).toLowerCase().includes(search.toLowerCase()))
            setData(newData.length === 0 ? rawData : newData);
        }
        filterData();
    },[search])

    const handleEdit = (val:boolean) => {
        setEdit(val);
    }

    const handleDelete = (id:number) => {
        setDeleteDialog(true);
        setDeleteItemId(id);
    }
    
    const deleteItem = () => {
        setData(data.filter(item => item.id !== deleteItemId));
        setOpen(Array(data.length-1).fill(false))
        setDeleteDialog(false);
        setDeleteItemId(0);
    }

    const handleOpen = (index: number) => {
        if (edit) {
            return;
        }
        const newArr = open.map((item, i) => {
            if (i === index) {
                return !item;
            } else {
                return false;
            }
        })
        setOpen(newArr);
        if (window.matchMedia('(min-width: 768px)').matches) {
            ref.current?.scrollTo(0, 80 * index+1);
        } else {
            ref.current?.scrollTo(0, 65 * index);
        }
    }

    const handleUpdate = (index:number, newData:Data) => {
        const newArr = data.map((item, i) => {
            if (i === index) {
                return newData;
            } else {
                return item;
            }
        });
        setData(newArr);
    }

    return (
        <div className='flex flex-col md:w-screen h-screen items-center p-4 md:p-10'>
            <span className='flex ring-1 ring-gray-300 w-full rounded-md items-center md:w-96 gap-2 p-2'>
                <img src={Search}/>
                <input placeholder='Search' className='w-full outline-0' onChange={(e)=>setSearch(e.target.value)}/>
            </span>
            <span className='flex flex-1 flex-col scroll-smooth overflow-auto gap-4 w-full md:w-fit items-center m-2 p-2 h-[100%]' ref={ref}>
                {data.map((item, index) => <Accordion key={item.id} open={open[index]} handleOpen={handleOpen} index={index} item={item} handleEdit={handleEdit} handleUpdate={handleUpdate} handleDelete={handleDelete} />)}
            </span>
            <DeleteDialog isOpen={deleteDialog} handleDelete={deleteItem} close={()=>setDeleteDialog(false)} />
        </div>
    )
}

export default AccordionList
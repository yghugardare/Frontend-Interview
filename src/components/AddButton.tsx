import { Button } from '@/components/ui/button';

const AddButton = ({setIsAddFormOpen}) => {
  return (
      <Button className='bg-indigo-800 hover:bg-indigo-500 hover:cursor-pointer' onClick={()=>setIsAddFormOpen(true)}>
        Add Blog +
      </Button>
  )
}

export default AddButton;

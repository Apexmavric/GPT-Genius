'use client'
import TourInfo from "./TourInfo";
import {generateTourResponse, getExistingTour, createNewTour} from "@/utlis/action";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import toast from "react-hot-toast";
const NewTour = () => {
  const quertClient = useQueryClient();
    const {mutate, isPending, data : tour} = useMutation({
        mutationFn : async(destination) =>{
            const existing_tour = await getExistingTour(destination);
            if(existing_tour) return existing_tour;
            const newTour = await generateTourResponse(destination);
            if(!newTour){
                toast.error("No matching city found ...!");
                return null;
            }
            await createNewTour(newTour);
            quertClient.invalidateQueries({queryKey:['tours']});
            return newTour;
        }
    })
    const handleSubmit = (e)=>{
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        const destination = Object.fromEntries(formdata.entries());
        // console.log(destination);
        mutate(destination);
    }
    if(isPending){
        return <span className="loading loading-lg"></span>
    }
  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-2xl'>
        <h2 className='mb-4'>Select your dream destination</h2>
        <div className='join w-full'>
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='city'
            name='city'
            required
          />
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='country'
            name='country'
            required
          />
          <button className='btn btn-primary join-item' type='submit'>
            generate tour
          </button>
        </div>
      </form>
      <div className='mt-16'>{tour ? <TourInfo tour={tour} /> : null}</div>
    </>
  )
}

export default NewTour
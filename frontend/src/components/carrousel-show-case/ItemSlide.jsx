import { useNavigate } from "react-router-dom"

const ItemSlide = () => {

    const navigate = useNavigate();
    
    return (
      <div onClick={() => navigate('/learning')} className="w-[60vw] h-auto  sm:w-[240px] sm:h-[200px] md:w-[290px] md:h-[240px] lg:w-[350px] lg:h-[250px] p-2  rounded-md cursor-pointer  hover:bg-stone-50">
          <div className="w-full md:h-[calc(100%-6rem)] h-[calc(100%-4rem)] flex items-center justify-center pb-1 ">
              <img  className="h-full w-full object-cover rounded-sm" src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/07/Subject-Complement.png" alt="" />
          </div>
          <div className="px-2 flex flex-col items-start  md:h-[6rem]  h-auto ">
              <p className="flex justify-between flex-col text-sm font-semibold"> <span>Class name • Lesson 10</span> <span className="font-medium">Course Name</span> </p>
              <p className=" font-semibold text-xs">#algebra #geometry #science</p>
          </div>
      </div>
    )
  }
  
  export default ItemSlide
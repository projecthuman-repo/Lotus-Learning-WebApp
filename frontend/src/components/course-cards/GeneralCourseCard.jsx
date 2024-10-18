import React from "react";
import { useNavigate } from "react-router-dom";

const GeneralCourseCard = ({ item = {
  _id: 'id',
  title: 'General Course',
  creator: {
    username: 'creator',
  },
  createdAt: '2023-07-15T00:00:00.000Z'
},userId }) => {
  const navigate = useNavigate();

  const handleNavigateToCoursePreface = () => {
console.log("item",item);
//console.log("item2",userId);
    navigate('/course-preface', {
      state: {
        courseId: item._id,
        courseTitle: item.title,
        creatorName: item.creator.username,
        dateCreated: item.createdAt,
        item:item,
        userId:userId,
      }
    });
  };

  return (
    <div
      onClick={handleNavigateToCoursePreface}
      className="m-1 bg-stone-50 cursor-pointer xl:w-[350px] lg:w-[320px] md:w-[270px] xl:h-[250px] lg:h-[250px] md:h-[200px] sm:h-[250px] sm:w-[50vw] w-[90vw] h-[80vw] hover:bg-white rounded-md transition-all hover:scale-[1.01]"
    >
      <div className="w-full h-[calc(100%-6rem)] sm:h-[calc(100%-4rem)] flex items-center justify-center p-2">
        <img
          className="h-full w-full object-cover rounded-sm"
          src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2023/07/Subject-Complement.png"
          alt=""
        />
      </div>
      <div className="px-2 flex flex-col justify-between h-[3rem]">
        <p className="flex justify-between text-sm font-semibold">
          <span>{item.title}</span> <span className="font-medium">$10 CAD</span>
        </p>
        <p className="font-semibold text-xs">Instructor: {item.creator.username} </p>
      </div>
    </div>
  );
};

export default GeneralCourseCard;

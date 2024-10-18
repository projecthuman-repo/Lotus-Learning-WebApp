import React, { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const CommentsPopUp = ({ setOpen, open, value = null }) => {
  const testDataReviews = [
    {
      id: "_twxm5sbdg",
      at: "2021-11-09T13:53:43.000Z",
      user: {
        userName: "user123",
        pfp: "https://i.imgur.com/fHMzxUM.jpeg",
      },
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla leo nec leo dictum, vel viverra turpis consequat.",
      stars: 3,
    },
    {
      id: "_kf1cmuj0z",
      at: "2020-05-24T06:11:23.000Z",
      user: {
        userName: "cool_user",
        pfp: "https://i.imgur.com/fHMzxUM.jpeg",
      },
      comment:
        "Aenean id lacus in tortor rutrum lacinia sed ac dolor. Integer efficitur, orci et tincidunt bibendum, libero arcu finibus lectus, nec convallis turpis velit eu purus. Nullam aliquam purus in justo posuere, vitae egestas neque dignissim.",
      stars: 5,
    },
    {
      id: "_2ox5mly2m",
      at: "2019-12-01T08:36:34.000Z",
      user: {
        userName: "john_doe",
        pfp: "https://i.imgur.com/fHMzxUM.jpeg",
      },
      comment:
        "Pellentesque tincidunt urna in massa consequat, a facilisis turpis volutpat. Integer pretium, quam id lacinia congue, est turpis tempus eros, vitae gravida eros sem id orci.",
      stars: 4,
    },
    {
      id: "_mo9znei4a",
      at: "2022-06-21T20:39:20.000Z",
      user: {
        userName: "random_user123",
        pfp: "https://i.imgur.com/fHMzxUM.jpeg",
      },
      comment:
        "Duis id lorem in quam faucibus cursus ac nec libero. Sed viverra risus a tortor tincidunt, quis aliquet odio venenatis.",
      stars: 2,
    },
    {
      id: "_nz3j1pam3",
      at: "2023-02-28T01:45:56.000Z",
      user: {
        userName: "awesome_user99",
        pfp: "https://i.imgur.com/fHMzxUM.jpeg",
      },
      comment:
        "Vestibulum et nunc eget metus tincidunt fermentum. Integer ullamcorper urna velit, ut consequat elit aliquam et.",
      stars: 1,
    },
  ];

  const divRef = useRef();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.scroll = "yes";
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[11111] bg-[#00000021]">
      <div
        ref={divRef}
        className="w-[800px] md:h-[550px] h-[700px] bg-white rounded-md border flex md:flex-row flex-col"
      >
        <div className="md:w-[40%] w-full md:h-full h-auto flex flex-col md:pl-5 pl-3 pr-3 md:pr-0 md:pt-5 pt-3 pb-3 md:pb-0">
          <div className="flex space-x-2 items-center">
            <div className="">
              <p className="text-3xl font-semibold text_linearGradient_ver1">
                4.6
              </p>
            </div>
            <div>
              <div className="flex space-x-2 text-xs">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <div>
                <p className="underline text-xs">
                  {testDataReviews.length} Reviews
                </p>
              </div>
            </div>
          </div>
          <div className="p-2">
            <StarsLevel total={100} amount={70} tier={5} />
            <StarsLevel total={100} amount={15} tier={4} />
            <StarsLevel total={100} amount={9} tier={3} />
            <StarsLevel total={100} amount={5} tier={2} />
            <StarsLevel total={100} amount={1} tier={1} />
          </div>
        </div>
        <div className="w-full flex flex-col items-center h-full overflow-y-auto pt-3">
          {testDataReviews.map((data, i) => {
            return (
              <div key={data.id} className="w-full">
                <CommentCard data={data} />
              </div>
            );
          })}
          {testDataReviews.map((data, i) => {
            return (
              <div key={data.id} className="w-full">
                <CommentCard data={data} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CommentCard = ({ data }) => {
  return (
    <div className="w-full py-3 flex">
      <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
        <img src={data.user.pfp} alt="pfp_comment" className="w-full h-full" />
      </div>
      <div className="w-full px-3">
        <div className="flex items-center justify-between">
          <div className="flex text-xs space-x-1 ml-1 text-stone-500">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </div>
          <div>
            <p className="text-xs text-stone-600">3 weeks ago</p>
          </div>
        </div>
        <div>
          <p className="text-xs my-1 text-justify text-stone-500 ">
            {data.comment}
          </p>
        </div>
      </div>
    </div>
  );
};

const StarsLevel = ({ total, amount, tier }) => {
  const percentage = () => {
    const per = (100 * amount) / total;
    return per;
  };

  return (
    <div className="w-full flex items-center">
      <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden">
        <div
          style={{ width: percentage() + "%" }}
          className=" h-full linearGradient_ver1  rounded-full"
        ></div>
      </div>
      <div className="text-xs flex items-center mx-1 text-stone-300">
        <p className="font-semibold">{tier}</p>
        <FaStar className="mx-1" />
      </div>
    </div>
  );
};

export default CommentsPopUp;

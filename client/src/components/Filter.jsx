import { useNavigate } from "react-router-dom";

export const Filter = ({ setSort }) => {
  const navigate = useNavigate();

  const sortRecent = () => {
    setSort("mostRecent");
    navigate("/posts/mostRecent");
  };
  const sortPopular = () => {
    setSort("popular");
    navigate("/posts/popular");
  };
  return (
    <div className='bg-white my-4 h-11 border-2 md:w-[650px] md:mx-auto'>
      <div className='flex p-2 gap-3'>
        <div className='cursor-pointer' onClick={sortRecent}>
          Most Recent
        </div>
        <div onClick={sortPopular}>Popular</div>
      </div>
    </div>
  );
};

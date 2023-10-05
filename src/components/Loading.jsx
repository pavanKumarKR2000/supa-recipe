import loading from "../../public/loading.svg";
const Loading = () => {
  return (
    <div className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-[rgba(0,0,0,0.1)] ">
      <img src={loading} alt="loading" height="50" width="50" />
    </div>
  );
};

export default Loading;

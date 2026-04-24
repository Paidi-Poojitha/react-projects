import { TailSpin } from "react-loader-spinner";
import '../styles/loader.css'

const Loader = () => {
  return (
    <div className="loader-container">
      <TailSpin
        height="50"
        width="50"
        color="#2563eb"
        ariaLabel="loading"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Loader;
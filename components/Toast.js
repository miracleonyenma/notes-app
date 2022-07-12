import { RefreshIcon } from "@heroicons/react/solid";

import { useToast, useDispatchToast } from "../modules/AppContext";

const Toast = () => {
  const setToast = useDispatchToast();
  const { isLoading, msg } = useToast();

  return (
    <div className={`toast ${isLoading ? "active" : ""}`}>
      <RefreshIcon className="icon solid rotate" />
      <span>{msg || "Loading... please wait"}</span>
    </div>
  );
};

export default Toast;

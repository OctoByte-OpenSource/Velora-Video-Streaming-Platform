import { asyncMutationHandler } from "@/hooks/hook";
import {
  useSubscribeChannelMutation,
  useUnsubscribeChannelMutation,
} from "@/redux/api/userApiSlice";
import { useSelector } from "react-redux";
import CircleLoader from "../Loaders/CircleLoader";

export const SubscribeToTheChannelBtn = ({
  id,
  refetch,
  subscribers = [],
  textSize = "text-lg",
}) => {
  const userId = useSelector((store) => store.auth.user._id);

  const [subscribeChannelFn, subscribeIsLoading] = asyncMutationHandler(
    useSubscribeChannelMutation
  );
  const [unsubscribeChannelFn, unsubscribeIsLoading] = asyncMutationHandler(
    useUnsubscribeChannelMutation
  );

  const isSubscriber = subscribers.includes(userId);
  const subscribeToTheChannel = async () => {
    await subscribeChannelFn("subscribing to the channel", id);
    if (refetch) refetch();
  };

  const unsubscribeToTheChannel = async () => {
    await unsubscribeChannelFn("unsubscribing...", id);
    if (refetch) refetch();
  };

  return (
    <>
      {isSubscriber ? (
        <button
          className={`${textSize} px-2 py-1 bg-pink-700 text-white  rounded-2xl w-36`}
          onClick={unsubscribeToTheChannel}
          disabled={unsubscribeIsLoading}
        >
          unsubscribe
        </button>
      ) : (
        <button
          className={`${textSize} text-base px-2 py-1 bg-blue-600 text-white rounded-2xl w-36`}
          disabled={subscribeIsLoading}
          onClick={subscribeToTheChannel}
        >
          subscribe
        </button>
      )}
    </>
  );
};

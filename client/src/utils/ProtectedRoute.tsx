import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "@/features/auth/api/getUser";
import { useUserStore } from "@/store/store";

type ProtectedRouteProps = PropsWithChildren;

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const { isPending, data: userData } = useGetUser();

  useEffect(() => {
    setUser(userData?.data?.user);
  }, [userData]);

  return !isPending && children;
};

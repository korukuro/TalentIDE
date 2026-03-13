import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionsApi } from "../api/sessions";

export const useCreateSession = () => {
  const result = useMutation({
    mutationKey: ["createSession"],
    mutationFn: sessionsApi.createSession,
    onSuccess: () => {
      toast.success("Session created successfully");
    },
    onError: (error) => {
      toast.error(
        "Error creating session: " + error.response?.data?.message ||
          error.message,
      );
    },
  });
  return result;
};

export const useActiveSessions = () => {
  const result = useQuery({
    queryKey: ["activeSessions"],
    queryFn: sessionsApi.getActiveSession,
  });
  return result;
};

export const useMyRecentSessions = () => {
  const result = useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: sessionsApi.getMyRecentSession,
  });
  return result;
};

export const useSessionById = (id) => {
  const result = useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionsApi.getSessionById(id),
    enabled: !!id,
    refetchInterval: 5000,
  });
  return result;
};

export const useJoinSession = (id) => {
  const result = useMutation({
    mutationKey: ["joinSession"],
    mutationFn:() => sessionsApi.joinSession(id),
    onSuccess: () => {
      toast.success("Joined session successfully");
    },
    onError: (error) => {
      toast.error(
        "Error joining session: " + error.response?.data?.message ||
          error.message,
      );
    },
  });
  return result;
};

export const useEndSession = (id) => {
  const result = useMutation({
    mutationKey: ["endSession"],
    mutationFn:() => sessionsApi.endSession(id),
    onSuccess: () => {
      toast.success("Session ended successfully");
    },
    onError: (error) => {
      toast.error(
        "Error ending session: " + error.response?.data?.message ||
          error.message,
      );
    },
  });
  return result;
};
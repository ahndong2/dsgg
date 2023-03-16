import { useMutation, UseMutationResult } from "@tanstack/react-query";

const sampleMutationFunction = (data: any) => new Promise<Response>(() => {});

export const useMutateSample = ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess: (result: any) => void;
  onError: (err: any) => void;
  onMutate: (data: any) => void;
}): UseMutationResult<any, any, string, any> => {
  return useMutation((data) => sampleMutationFunction(data), {
    onSuccess: (result) => {
      typeof onSuccess && onSuccess(result);
    },
    onError: async (err) => {
      typeof onError && onError(err);
    },
    onMutate: async (data) => {
      typeof onMutate && onMutate(data);
    },
  });
};

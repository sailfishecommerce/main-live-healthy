import { useQueryClient } from "react-query";

export default function useQueryData(dataKey: string) {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData(dataKey);
  return queryData;
}

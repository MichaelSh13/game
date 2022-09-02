import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Main } from "./views/main";

function App() {
  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 60 * 1000,
          retry: 2,
          refetchOnWindowFocus: false,
          onError: (error: any) => {
            console.error(error)
          }
        }
      }
    })
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

export default App;

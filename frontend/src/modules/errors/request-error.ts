import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const handleError = (error: unknown) => {
  let errorMessage = 'Tente novamente';

  if (isAxiosError(error)) {
    errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  toast.error('Erro ao processar', {
    description: errorMessage,
  });
};

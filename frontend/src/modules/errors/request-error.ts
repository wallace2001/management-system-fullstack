import { HTTPError } from "ky";
import { toast } from "sonner";

export const handleError = async (error: HTTPError<{ message: string }> | Error) => {
    let errorMessage = 'Tente novamente';

    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json();
      errorMessage = errorResponse?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error('Erro ao processar', {
      description: errorMessage,
    });
  };
type IErrorMessage = {
  error: any;
}

export const ErrorMessage = ({ error }: IErrorMessage) => {
  return (
    <div>
      Error: <br />
      {JSON.stringify(error)}
    </div>
  );
}
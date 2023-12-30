import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";

export const EmailForm: FunctionComponent<{ id: string }> = ({ id }) => {
  const [inputs, setInputs] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const [isInputCompleted, setIsInputCompleted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
  };

  const handleEmail = (event: any) => {
    event.preventDefault();

    setInputs((values: any) => ({
      ...values,
      clientOrigin: window.location.origin,
      id,
    }));
    setIsInputCompleted(true);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "api/files/email",
        data: inputs,
      });
      setSuccessMessage(data.message);
      setErrorMessage(undefined);
      setIsInputCompleted(false);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      setSuccessMessage(undefined);
    }
  };

  useEffect(() => {
    if (isInputCompleted) {
      fetchData();
    }
  }, [isInputCompleted]);

  return (
    <div className="flex flex-col items-center justify-center w-full p-2 space-y-3">
      <h3 className="mt-5">You can also send the file through mail</h3>
      <form
        className="flex flex-col items-center justify-center w-full p-2 space-y-3"
        onSubmit={handleEmail}
      >
        <input
          type="email"
          placeholder="Email From"
          required
          name="emailFrom"
          onChange={handleChange}
          value={inputs.emailFrom}
          className="p-1 text-white bg-gray-800 border-2 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email To"
          required
          name="emailTo"
          onChange={handleChange}
          value={inputs.emailTo}
          className="p-1 text-white bg-gray-800 border-2 focus:outline-none"
        />
        <button className="button" type="submit">
          Email
        </button>
        {successMessage && (
          <p className="font-medium text-green-500">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="font-medium text-red-500">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

import axios from "axios";
import React, { FunctionComponent, useState } from "react";

export const EmailForm: FunctionComponent<{ id: string }> = ({ id }) => {
  const [inputs, setInputs] = useState<any>({});
  const [message, setMessage] = useState();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
  };

  const handleEmail = async (event: any) => {
    event.preventDefault();
    console.log("Inputs ", inputs);

    setInputs((values: any) => ({
      ...values,
      clientOrigin: window.location.origin,
      id,
    }));

    console.log("Inputs ", inputs);

    try {
      const { data } = await axios({
        method: "POST",
        url: "api/files/email",
        data: inputs,
      });
      console.log(data);
    } catch (error) {}
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-2 space-y-3">
      <h3>You can also send the file through mail</h3>
      <form className="flex flex-col items-center justify-center w-full p-2 space-y-3">
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
        <button className="button" type="submit" onClick={handleEmail}>
          Email
        </button>
      </form>
    </div>
  );
};

"use client";
import React, { useState } from "react";
import { EyeFilledIcon } from "./eyefill";
import { Input, Button } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "./EyesSlash";
import { BrowserProvider, formatEther } from "ethers";

export default function App() {
  const [to, setTo] = useState("");
  const [value, setValue] = useState();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleTransfer = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    const eth = formatEther(balance);

    if (eth >= value) {
      const tx = await signer.sendTransaction({
        to: to,
        value: value,
      });
      await tx.wait();

    }else {
        console.log("anda tidak memiliki saldo")
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto">
      <div className="my-8">
        <p className="font-bold">Wei: </p>
        <input
          type="number"
          placeholder="Eth"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className=" mb-4 border-2 px-4 py-2 rounded-md font-bold"
        />
        <div className="flex items-center gap-2">
          <Input
            label="Address"
            variant="bordered"
            placeholder="Enter your address"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-md rounded-none"
            onChange={(e) => setTo(e.target.value)}
          />
          <Button
            size="lg"
            color="primary"
            className="rounded-sm"
            onClick={handleTransfer}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

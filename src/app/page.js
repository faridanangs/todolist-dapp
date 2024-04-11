'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import { BrowserProvider, Contract } from 'ethers';
import Input from '@mui/material/Input';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";



const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_text",
        "type": "string"
      }
    ],
    "name": "addTodo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "changeStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLists",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "text",
            "type": "string"
          },
          {
            "internalType": "enum TodoList.Status",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          }
        ],
        "internalType": "struct TodoList.List[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
const contratcAddress = "0x43a1EE282cdc8FE3e242e613181EB7a17ec2ff92"
const privateKey = "0x822e2c5c9887c8e542bba331ba43408cca597449ccee1b2df9acfd8b13d9944c";

export default function Home() {
  const [account, setAccount] = React.useState();
  const [datas, setDatas] = React.useState();
  const [text, setText] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));

  const statusMap = {
    0: 'Pending',
    1: 'Completed',
    // tambahkan pemetaan lain sesuai kebutuhan
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner()
        const contract = new Contract(contratcAddress, abi, signer);
        let data = await contract.getLists();
        data = data.map(entry => ({
          text: entry[0],
          status: entry[1],
          time: entry[2]
        }));

        setAccount(await signer.getAddress())
        setDatas(data);
      } else {
        return console.log("install metamask");
      }
    } catch (error) {
      console.error(error)
    }
  }

  const addTodo = async () => {
    try {
      // const provider = new JsonRpcProvider("http://127.0.0.1:7545");
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner()
      // const signer = new Wallet(privateKey, provider);
      const contract = new Contract(contratcAddress, abi, signer);
      const tx = await contract.addTodo(text);
      await tx.wait();
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  }

  const changeStatusLol = async (i) => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contratcAddress, abi, signer);
      const tx = await contract.changeStatus(i);
      await tx.wait();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    connectWallet();
  }, [])

  console.log(datas)
  return (
    <div className='max-w-xl w-full mx-auto'>
      <div className='flex items-center justify-between'>
        <h1 className='my-8 text-red-400 font-bold text-2xl text-center'>Todo Decentrilzed App</h1>
        <Button variant="contained" disableElevation>
          {account ? account?.slice(0, 10) + ". ." : <span onClick={connectWallet}>Connect</span>}
        </Button>
      </div>
      <div>
        <div className='bg-slate-200 max-w-[19rem] flex justify-between px-4 items-center rounded-md my-4'>
          <Input size="sm" type="text" onChange={(e) => setText(e.target.value)} placeholder='Add Todo Here..' className='my-4' />
          <button onClick={() => addTodo()} className='bg-slate-500 px-2 py-1 rounded-sm text-white font-bold'>Submit</button>
        </div>
      </div>
      <Table removeWrapper aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Text</TableColumn>
          <TableColumn>Time</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {datas?.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.text}</TableCell>
              <TableCell>{new Date(Number(item.time) * 1000).toLocaleString()}</TableCell>
              <TableCell>{Number(item.status) == 0 ? <span className='bg-red-500 px-2 py-1 rounded-sm text-white font-bold'>Pending</span> : <span className='bg-green-500 px-2 py-1 rounded-sm text-white font-bold'>Finished</span>}</TableCell>
              <TableCell> <button onClick={() => changeStatusLol(i)} className='bg-green-500 px-2 py-1 rounded-sm text-white font-bold'>Checklist</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

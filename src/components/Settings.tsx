'use client'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { HereWallet } from "@here-wallet/core";
import { initHere,signOut } from "@/hooks/hereWallet";

const Settings = () =>{
    const [isSound, setIsSound] = useState<boolean>(false);
    const [account, setAccount] = useState<string|null>(null);
    let here: HereWallet;

    useEffect(()=>{
        loadAccount()
    },[])

    const loadAccount = async() =>{
        try{
            here = await initHere();
            if(!here) return;
            if(await here.isSignedIn()) {
                const accounts = await here.getAccounts(); // Ensure accounts are fetched correctly
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                }
            }
        }
        catch (error){
            console.error(error);
            throw error;
        }
    }

    const copyAddress = () => {
        if(account){
            navigator.clipboard.writeText(account as string)
            alert("Copied")
        }
    }

    const handlelogout = async () => {
        here = await initHere();
        if(!here) return;
        if(await here.isSignedIn()) {
            await signOut();
            location.replace("/")
        }
        
    }

    return(
        <div className="h-full w-full flex flex-col">
            <div className="mt-3 border-2 border-[#304053] h-12 w-full flex flex-row justify-between items-center p-2 rounded-lg">
                <span className="text-black">Wallet address</span>
                <div className="flex cursor-pointer flex-row gap-1" onClick={copyAddress}>
                    <span className="text-black">{account?account:"-"}</span>
                    <img width={15} src="/assets/icon/copy.svg" alt="copy" />
                </div>
            </div>
            <div className="mt-3 flex flex-col justify-between items-center gap-3">
                <div className="flex flex-row justify-between items-center gap-3 border-2 text-center border-[#304053] rounded-lg w-full p-2 text-black">
                    <span>Invite code</span>
                    <span>Coming soon</span>
                </div>
                <div className="flex flex-row justify-between items-center gap-3 border-2 text-center border-[#304053] rounded-lg  w-full p-2 text-black">
                    <span>Referals</span>
                    <span>Coming soon</span>
                </div>
            </div>
            <div className="mt-5 flex flex-col border-2 border-[#304053] rounded-lg p-2 w-full text-black">
                <span>Balance</span>
                <div className="flex mt-3 flex-row justify-between items-center">
                    <div className="flex flex-row gap-1 items-center">
                        <img width={16} className="mt-1" src="/assets/icon/near-dark.svg" alt="near" />
                        <span className="text-lg">NEAR</span>
                    </div>
                    <span>0.001</span>
                </div>
                <div className="flex mt-1 flex-row justify-between items-center">
                    <div className="flex flex-row gap-1 items-center">
                        <img width={16} className="mt-1" src="data:image/png;base64,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" alt="near" />
                        <span className="text-lg">HOT</span>
                    </div>
                    <span>0.001</span>
                </div>
            </div>
            <button onClick={handlelogout} className="w-full mt-4 bg-[#304053] hover:bg-opacity-85 rounded-lg h-14">
                <span className="text-xl">LOG OUT</span>
            </button>
            <div className="flex flex-col mt-5 gap-2">
                <div className="flex flex-row gap-1 cursor-pointer items-center text-black" onClick={()=>setIsSound((prv)=>!prv)}>
                    {
                        isSound?(
                            <img width={30} src="/assets/icon/sound.svg" alt="sound" />
                        ):(
                            <img width={30} src="/assets/icon/disable-sound.svg" alt="sound" />
                        )
                    }
                    <span className="text-lg ml-1 -mt-1">Sound</span>
                </div>
                <Link to={"#"} className="flex gap-1 flex-row cursor-pointer items-center text-black">
                    <img width={28} src="/assets/icon/telegram.svg" alt="telegram" />
                    <span className="text-lg ml-1 -mt-1">Telegram</span>
                </Link>
                <Link to={"#"} className="flex gap-1 flex-row cursor-pointer items-center text-black">
                    <img width={30} src="/assets/icon/feedback.svg" alt="feedback" />
                    <span className="text-lg ml-1 -mt-1">feedback</span>
                </Link>
                <Link to={"#"} className="flex gap-1 flex-row cursor-pointer items-center text-black">
                    <img width={26} src="/assets/icon/docs.svg" alt="docs" />
                    <span className="text-lg ml-2 -mt-1">docs</span>
                </Link>
            </div>
        </div>
    )
}

export default Settings;
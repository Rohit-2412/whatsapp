import * as EmailValidator from "email-validator";

import { Avatar, Button, IconButton } from "@mui/material";
import { Chat, MoreVertOutlined, Search } from "@mui/icons-material";
import { auth, db } from "../../firebase";

import ChatComponent from "./Chat";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection("chats").where(
        "users",
        "array-contains",
        user.email
    );

    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt(
            "Please enter an email address for the user you wish to chat with"
        );

        if (!input) return null;

        // add the chat into the chats collection if it doesn't already exist and is valid
        if (EmailValidator.validate(input)
            && !chatAlreadyExists(input)
            && input !== user.email) {
            // we need to add the chat into the DB 'chats' collection if it doesn't already exist and is valid

            db.collection("chats").add({
                users: [user.email, input],
            });
        }
    };

    // check if chat already exists
    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find(
                    (user) => user === recipientEmail
                )?.length > 0
        );
    ;

    return (
        // container
        <div
            className=" flex-[0.45] border-r border-[#e5e5e5] min-w-[250px] max-w-[350px] overflow-y-scroll scrollbar-hide h-screen"
        >
            {/* header */}
            <div className="flex sticky top-0 bg-white z-10 justify-between items-center p-[6px] h-[80] border-b-2 border-gray-200">
                <IconButton
                    onClick={() => auth.signOut()}
                >
                    <Avatar
                        src={user.photoURL}
                        className="cursor-pointer hover:opacity-80"
                    />
                </IconButton>

                {/* icon container */}
                <div>
                    <IconButton>
                        <Chat />
                    </IconButton>

                    <IconButton>
                        <MoreVertOutlined />
                    </IconButton>
                </div>
            </div>

            {/* search container */}
            <div className="flex items-center p-4 rounded-sm">
                <Search />
                <input
                    className="flex-1 ml-2 outline-none border-none"
                    type="text"
                    placeholder="Search chat"
                />
            </div>

            {/* start new chat */}
            <div className="border-y border-y-gray-200">
                <Button onClick={createChat} className="w-full ">
                    Start a new chat
                </Button>
            </div>

            {/* list of chats */}
            <div className="overflow-y-scroll scrollbar-hide h-[calc(100vh-80px)]">
                {chatsSnapshot?.docs.map((chat) => (
                    <ChatComponent key={chat.id} id={chat.id} users={chat.data().users} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

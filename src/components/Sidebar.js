import * as EmailValidator from "email-validator";

import { Avatar, Button, IconButton } from "@mui/material";
import { Chat, MoreVertOutlined, Search } from "@mui/icons-material";
import {
    addDoc,
    collection,
    query,
    where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

import ChatComponent from "./Chat";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const userChatRef = query(
        collection(db, "chats"),
        where("users", "array-contains", user.email)
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

            addDoc(collection(db, "chats"), {
                users: [user.email, input],
            });
        }
    };

    // check if chat already exists
    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user === recipientEmail)
                    ?.length > 0
        );
    ;

    return (
        <div>
            {/* header */}
            <header className="flex sticky top-0 bg-white z-1 justify-between items-center p-2 h-[80] border-b-2 border-gray-200">
                <IconButton>
                    <Avatar
                        src={user.photoURL}
                        onClick={() => auth.signOut()}
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
            </header>

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
